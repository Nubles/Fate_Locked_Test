
import React, { useState, useMemo, useEffect } from 'react';
import { useGame } from '../context/GameContext';
import { COLLECTION_LOG_DATA } from '../data/collectionLogData';
import { Search, CheckCircle2, Lock } from 'lucide-react';
import { DropSource } from '../types';
import { DROP_RATES } from '../constants';

interface CollectionLogProps {
  searchTerm?: string;
}

export const CollectionLog: React.FC<CollectionLogProps> = ({ searchTerm = '' }) => {
  const { unlocks, logCollectionItem, rollForKey } = useGame();
  const [activeTab, setActiveTab] = useState(Object.keys(COLLECTION_LOG_DATA)[0]);
  const [activePage, setActivePage] = useState<string>('');

  // Determine which page to show
  const currentTabContent = COLLECTION_LOG_DATA[activeTab];

  // Set default page when tab changes
  useEffect(() => {
    // If the current active page doesn't exist in the new tab, switch to the first page of the new tab.
    // This handles manual tab switching.
    // When searching, we explicitly set both Tab and Page, so this effect should verify validity.
    if (currentTabContent && !currentTabContent.pages[activePage]) {
      const firstPage = Object.keys(currentTabContent.pages)[0];
      setActivePage(firstPage);
    }
  }, [activeTab, currentTabContent, activePage]);

  // Handle Item Click (Log + Fate Roll)
  const handleItemClick = (e: React.MouseEvent, itemId: number, itemName: string) => {
    const isNewUnlock = !unlocks.collectionLog[itemId];

    // 1. Mark as obtained in state
    logCollectionItem(itemId);

    // 2. Trigger Fate Roll if it's a new unlock
    if (isNewUnlock) {
       rollForKey(`Col. Log: ${itemName}`, DROP_RATES[DropSource.COLLECTION_LOG], e.clientX, e.clientY);
    }
  };

  // Filter Logic - Now supports Global Search
  const filteredPages = useMemo(() => {
    // If Searching: Scan ALL tabs
    if (searchTerm) {
        const lowerSearch = searchTerm.toLowerCase();
        const results: { tab: string; key: string; data: any }[] = [];

        Object.entries(COLLECTION_LOG_DATA).forEach(([tabName, tabData]) => {
            Object.entries(tabData.pages).forEach(([pageKey, pageData]) => {
                const nameMatch = pageData.name.toLowerCase().includes(lowerSearch);
                const itemMatch = pageData.items.some(item => item.name.toLowerCase().includes(lowerSearch));

                if (nameMatch || itemMatch) {
                    results.push({ tab: tabName, key: pageKey, data: pageData });
                }
            });
        });
        return results;
    }

    // Default: Return pages from current active tab
    if (!currentTabContent) return [];
    return Object.entries(currentTabContent.pages).map(([key, data]) => ({
        tab: activeTab,
        key,
        data
    }));
  }, [activeTab, currentTabContent, searchTerm]);

  // Calculate Global Stats
  const globalStats = useMemo(() => {
    let obtained = 0;
    let total = 0;

    Object.values(COLLECTION_LOG_DATA).forEach(tab => {
        Object.values(tab.pages).forEach(page => {
            page.items.forEach(item => {
                total++;
                if (unlocks.collectionLog[item.id]) obtained++;
            });
        });
    });
    return { obtained, total };
  }, [unlocks.collectionLog]);

  return (
    <div className="flex flex-col h-full bg-[#3e3529] border-2 border-[#5a5245] rounded-lg overflow-hidden font-sans shadow-2xl relative text-[#ff981f]">

      {/* Header Stats */}
      <div className="flex justify-between items-center p-2 bg-[#3e3529] border-b-2 border-[#5a5245] shadow-md shrink-0">
        <h2 className="text-[#ff981f] text-shadow font-bold px-2 text-sm uppercase tracking-wider">Collection Log</h2>
        <div className="text-xs font-mono bg-black/30 px-2 py-1 rounded border border-[#5a5245]">
           <span className="text-white">{globalStats.obtained}</span> / {globalStats.total} Unique
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-[#3e3529] border-b border-[#5a5245] overflow-x-auto no-scrollbar shrink-0">
        {Object.keys(COLLECTION_LOG_DATA).map(tab => (
          <button
            key={tab}
            onClick={() => { setActiveTab(tab); }}
            className={`flex-1 min-w-[80px] py-1.5 text-center text-[10px] font-bold border-r border-[#5a5245] hover:bg-[#4b4236] transition-colors uppercase tracking-wide
              ${activeTab === tab ? 'bg-[#4b4236] text-white shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]' : 'text-[#ff981f] bg-[#3e3529]'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex flex-1 overflow-hidden">

        {/* Left Sidebar: Page List */}
        <div className="w-1/3 min-w-[120px] bg-[#3e3529] border-r-2 border-[#5a5245] flex flex-col">
           {/* Page List Container */}
           <div className="overflow-y-auto custom-scrollbar flex-1 bg-[#3e3529]">
             {filteredPages.map(({ tab, key, data }) => {
                // Page Progress
                const totalItems = data.items.length;
                const unlockedItems = data.items.filter(i => unlocks.collectionLog[i.id]).length;
                const isComplete = totalItems > 0 && totalItems === unlockedItems;
                const isActive = activePage === key && activeTab === tab;

                return (
                  <button
                    key={`${tab}-${key}`}
                    onClick={() => {
                        setActiveTab(tab);
                        setActivePage(key);
                    }}
                    className={`w-full text-left px-2 py-1.5 border-b border-[#463d32] hover:bg-[#4b4236] flex flex-col transition-colors
                      ${isActive ? 'bg-[#52483a]' : ''}
                    `}
                  >
                    <div className="flex justify-between items-center w-full">
                        <span className={`text-[10px] truncate pr-1 ${isActive ? 'text-white' : isComplete ? 'text-green-400' : 'text-[#ff981f]'}`}>
                            {data.name}
                        </span>
                        {isComplete && <CheckCircle2 size={8} className="text-green-500 shrink-0" />}
                    </div>
                    {/* Show Tab Name if searching */}
                    {searchTerm && (
                        <span className="text-[8px] text-[#887] uppercase tracking-wide leading-tight">{tab}</span>
                    )}
                  </button>
                );
             })}
             {filteredPages.length === 0 && (
                <div className="p-4 text-center text-[10px] text-[#887] italic">
                    {searchTerm ? 'No results found' : 'No pages'}
                </div>
             )}
           </div>
        </div>

        {/* Right Content: The Items Grid */}
        <div className="w-2/3 bg-[#1e1b16] flex flex-col relative">

           {/* Page Header */}
           <div className="p-1.5 text-center border-b border-[#3e3529] bg-[#2c241b] shadow-md shrink-0">
             <h3 className="text-[#ff981f] text-sm font-bold text-shadow">
                {currentTabContent?.pages[activePage]?.name || "Select a Category"}
             </h3>
             {currentTabContent?.pages[activePage] && (
               <div className="text-[9px] text-[#887] mt-0.5">
                  {currentTabContent.pages[activePage].items.filter(i => unlocks.collectionLog[i.id]).length} / {currentTabContent.pages[activePage].items.length} Obtained
               </div>
             )}
           </div>

           {/* Items Grid Area */}
           <div className="p-2 overflow-y-auto custom-scrollbar flex-1 bg-[url('https://www.transparenttextures.com/patterns/dark-leather.png')]">
             {currentTabContent?.pages[activePage] ? (
               <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 place-items-center">
                 {currentTabContent.pages[activePage].items.map((item, index) => {
                   const count = unlocks.collectionLog[item.id] || 0;
                   const isUnlocked = count > 0;
                   const isHighlighted = searchTerm && item.name.toLowerCase().includes(searchTerm.toLowerCase());

                   // Fallback logic for images: Use Chisel ID if > 0, else try Wiki URL by name
                   const imageUrl = item.id > 0
                        ? `https://chisel.weirdgloop.org/static/img/osrs-sprite/${item.id}.png`
                        : `https://oldschool.runescape.wiki/images/${item.name.replace(/ /g, '_').replace(/'/g, '%27')}.png`;

                   return (
                     <div
                       key={`${item.id}-${index}`}
                       className={`
                         group relative flex flex-col items-center justify-center p-1 rounded transition-all duration-200 cursor-pointer
                         ${isHighlighted ? 'bg-white/10 ring-1 ring-[#ff981f]' : 'hover:bg-white/5'}
                       `}
                       onClick={(e) => handleItemClick(e, item.id, item.name)}
                       title={`${item.name} ${isUnlocked ? `(x${count})` : '(Locked)'}`}
                     >
                       <div className="relative w-10 h-10 flex items-center justify-center">
                         <img
                           src={imageUrl}
                           alt={item.name}
                           className={`max-w-full max-h-full object-contain transition-all duration-300 ${isUnlocked ? 'opacity-100 drop-shadow-md' : 'opacity-30 grayscale blur-[1px] group-hover:blur-0'}`}
                           onError={(e) => {
                               // Fallback to a placeholder or hide if even wiki image fails
                               const target = e.target as HTMLImageElement;
                               if (target.src.includes('weirdgloop')) {
                                   target.src = `https://oldschool.runescape.wiki/images/${item.name.replace(/ /g, '_').replace(/'/g, '%27')}.png`;
                               } else {
                                   target.style.opacity = '0.1'; // Ghost it out if missing
                               }
                           }}
                         />
                         {isUnlocked && count > 1 && (
                           <div className="absolute -top-1 -right-1 text-[8px] font-bold text-black bg-[#ff981f] px-1 rounded-full border border-black shadow-sm leading-tight z-10">
                             {count}
                           </div>
                         )}
                         {!isUnlocked && (
                           <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-40">
                             <Lock size={12} className="text-[#887]" />
                           </div>
                         )}
                       </div>
                       <span className={`text-[8px] mt-1 text-center leading-tight line-clamp-2 w-full ${isUnlocked ? 'text-green-400' : 'text-[#887]'} ${isHighlighted ? 'text-white font-bold' : ''}`}>
                         {item.name}
                       </span>
                     </div>
                   );
                 })}
               </div>
             ) : (
               <div className="flex flex-col items-center justify-center h-full text-[#5a5245] italic text-xs gap-2">
                 <Search size={24} className="opacity-20" />
                 <span>Select a category to view items</span>
               </div>
             )}
           </div>
        </div>
      </div>
    </div>
  );
};
