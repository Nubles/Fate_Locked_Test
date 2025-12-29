import { WIKI_OVERRIDES } from '../constants';

interface WikiCacheEntry {
  url: string | null;
  timestamp: number;
}

const CACHE_KEY = 'fate_uim_wiki_cache_v1';
const CACHE_TTL = 1000 * 60 * 60 * 24 * 7; // 7 Days
const BASE_API = 'https://oldschool.runescape.wiki/api.php';

// Images to strictly ignore if we have to scan a page manually
const BLACKLIST_IMAGES = [
  'Share.png', 'Question_mark.png', 'Bank_filler.png',
  'Placeholder.png', 'Transparent.png', 'Skill_icon',
  'Sigil', 'Badge', 'chathead'
];

class WikiService {
  private memoryCache: Map<string, string | null>;
  private pendingRequests: Map<string, Promise<string | null>>;

  constructor() {
    this.memoryCache = new Map();
    this.pendingRequests = new Map();
    this.loadCache();
  }

  /**
   * Loads persistence cache from LocalStorage
   */
  private loadCache() {
    try {
      const saved = localStorage.getItem(CACHE_KEY);
      if (saved) {
        const parsed: Record<string, WikiCacheEntry> = JSON.parse(saved);
        const now = Date.now();
        Object.entries(parsed).forEach(([key, entry]) => {
          if (now - entry.timestamp < CACHE_TTL) {
            this.memoryCache.set(key, entry.url);
          }
        });
      }
    } catch (e) {
      console.warn('Failed to load Wiki cache', e);
    }
  }

  /**
   * Saves current memory cache to LocalStorage
   */
  private saveCache() {
    try {
      const serializable: Record<string, WikiCacheEntry> = {};
      this.memoryCache.forEach((val, key) => {
        serializable[key] = { url: val, timestamp: Date.now() };
      });
      localStorage.setItem(CACHE_KEY, JSON.stringify(serializable));
    } catch (e) {
      console.warn('Wiki cache quota exceeded', e);
    }
  }

  /**
   * Normalizes input strings to MediaWiki format
   * e.g. "twisted bow" -> "Twisted_bow"
   */
  private normalize(input: string): string {
    if (!input) return '';
    const override = WIKI_OVERRIDES[input];
    if (override) return override;

    // Capitalize first letter, replace spaces with underscores
    let formatted = input.charAt(0).toUpperCase() + input.slice(1);
    return formatted.trim().replace(/ /g, '_');
  }

  /**
   * The Main Public Method
   */
  public async fetchImage(itemName: string): Promise<string | null> {
    const term = this.normalize(itemName);

    // 1. Check Memory Cache
    if (this.memoryCache.has(term)) {
      return this.memoryCache.get(term) || null;
    }

    // 2. Check Pending Requests (Deduplication)
    if (this.pendingRequests.has(term)) {
      return this.pendingRequests.get(term) || null;
    }

    // 3. Execute Request
    const request = this.executeFetch(term);
    this.pendingRequests.set(term, request);

    try {
      const result = await request;
      this.memoryCache.set(term, result);
      this.saveCache(); // Persist on success
      return result;
    } catch (error) {
      console.error(`Wiki Fetch Error for ${term}:`, error);
      return null;
    } finally {
      this.pendingRequests.delete(term);
    }
  }

  private async executeFetch(term: string): Promise<string | null> {
    // Strategy A: Direct PageImage Query with Redirects
    const params = new URLSearchParams({
      action: 'query',
      prop: 'pageimages|images', // Get thumbnail AND list of images (fallback)
      titles: term,
      pithumbsize: '300',
      format: 'json',
      origin: '*',
      redirects: '1', // Automatically follow "Tbow" -> "Twisted bow"
    });

    try {
      const res = await fetch(`${BASE_API}?${params.toString()}`);
      const data = await res.json();
      const pages = data.query?.pages;

      if (!pages) return null;

      const pageId = Object.keys(pages)[0];
      const page = pages[pageId];

      if (pageId === '-1') return null; // Page not found

      // A1. Best Case: The Wiki has a defined "Page Image"
      if (page.thumbnail?.source) {
        return page.thumbnail.source;
      }

      // A2. Fallback: Parse the 'images' array
      // Sometimes a page exists but has no "main" image defined, but contains file links.
      if (page.images && Array.isArray(page.images)) {
        const candidate = this.findBestCandidate(page.images);
        if (candidate) {
          // We found a file name (e.g., "File:Abyssal_whip.png"), now we need its URL
          return await this.fetchImageUrl(candidate);
        }
      }

      return null;
    } catch (e) {
      throw e;
    }
  }

  /**
   * Filters through a list of images on a page to find the best item representation
   */
  private findBestCandidate(images: { ns: number, title: string }[]): string | null {
    // Filter out known garbage
    const candidates = images.filter(img => {
      const title = img.title;
      if (title.endsWith('.svg')) return false; // Usually icons
      if (title.endsWith('.gif')) return false; // Usually animations (optional, maybe you want gifs)

      const cleanName = title.replace('File:', '');
      if (BLACKLIST_IMAGES.some(bad => cleanName.includes(bad))) return false;

      return true;
    });

    // Heuristic: Prefer images that contain the page title?
    // For now, return the first clean candidate.
    return candidates.length > 0 ? candidates[0].title : null;
  }

  /**
   * Helper to resolve a specific File:Name to a URL
   */
  private async fetchImageUrl(fileTitle: string): Promise<string | null> {
    const params = new URLSearchParams({
      action: 'query',
      titles: fileTitle,
      prop: 'imageinfo',
      iiprop: 'url',
      format: 'json',
      origin: '*'
    });

    try {
      const res = await fetch(`${BASE_API}?${params.toString()}`);
      const data = await res.json();
      const pages = data.query?.pages;
      const pageId = Object.keys(pages)[0];
      if (pageId === '-1') return null;

      return pages[pageId].imageinfo?.[0]?.url || null;
    } catch (e) {
      return null;
    }
  }
}

export const wikiService = new WikiService();
