
import React from 'react';
import { DropSource } from '../types';
import { DROP_RATES } from '../constants';
import { useGame } from '../context/GameContext';
import { BookOpen } from 'lucide-react';

// OSRS Wiki Icon URLs
const OSRS_ICONS = {
  SLAYER: 'https://oldschool.runescape.wiki/images/Slayer_icon.png',
  STATS: 'https://oldschool.runescape.wiki/images/Stats_icon.png',
  COLL_LOG: 'https://oldschool.runescape.wiki/images/Collection_log_icon.png',
  CLUE: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28master%29.png'
};

const CLUE_ICONS = {
  BEGINNER: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28beginner%29.png',
  EASY: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28easy%29.png',
  MEDIUM: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28medium%29.png',
  HARD: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28hard%29.png',
  ELITE: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28elite%29.png',
  MASTER: 'https://oldschool.runescape.wiki/images/Clue_scroll_%28master%29.png'
};

// Unified OSRS Difficulty Tier Styles
const TIER_STYLES = {
  STONE: {
    bg: 'bg-[#2a2620]',
    border: 'border-[#4a453d]',
    hover: 'hover:bg-[#38332a] hover:border-[#6a655d]',
    text: 'text-[#a8a29a]',
    pill: 'bg-[#151310] border-[#3a352e] text-[#888]'
  },
  GREEN: { // Easy / Novice
    bg: 'bg-[#142618]',
    border: 'border-[#2a4c30]',
    hover: 'hover:bg-[#1a3320] hover:border-[#3a6640]',
    text: 'text-[#4ade80]',
    pill: 'bg-[#0a150c] border-[#1f3823] text-[#4ade80]'
  },
  BLUE: { // Medium / Intermediate
    bg: 'bg-[#141e26]',
    border: 'border-[#2a3d4c]',
    hover: 'hover:bg-[#1a2833] hover:border-[#3a5466]',
    text: 'text-[#60a5fa]',
    pill: 'bg-[#0a0f13] border-[#1f2d38] text-[#60a5fa]'
  },
  RED: { // Hard / Experienced
    bg: 'bg-[#2a1414]',
    border: 'border-[#4c2a2a]',
    hover: 'hover:bg-[#331a1a] hover:border-[#663a3a]',
    text: 'text-[#f87171]',
    pill: 'bg-[#150a0a] border-[#2e1515] text-[#f87171]'
  },
  PURPLE: { // Elite / Master (Quest)
    bg: 'bg-[#22142a]',
    border: 'border-[#422a4c]',
    hover: 'hover:bg-[#2d1a33] hover:border-[#573a66]',
    text: 'text-[#c084fc]',
    pill: 'bg-[#110a15] border-[#29152e] text-[#c084fc]'
  },
  AMBER: { // Master (CA/Clue)
    bg: 'bg-[#2a1d14]',
    border: 'border-[#4c352a]',
    hover: 'hover:bg-[#33241a] hover:border-[#66473a]',
    text: 'text-[#fbbf24]',
    pill: 'bg-[#150f0a] border-[#2e2015] text-[#fbbf24]'
  },
  GOLD: { // Grandmaster
    bg: 'bg-[#262314]',
    border: 'border-[#4c462a]',
    hover: 'hover:bg-[#332f1a] hover:border-[#665e3a]',
    text: 'text-[#facc15]',
    pill: 'bg-[#13110a] border-[#2e2a15] text-[#facc15] shadow-[0_0_8px_rgba(250,204,21,0.2)]'
  },
  BROWN: { // Collection Log / Misc
    bg: 'bg-[#2a2016]',
    border: 'border-[#5c4033]',
    hover: 'hover:bg-[#3d2e24] hover:border-[#7d5642]',
    text: 'text-[#e0c0a0]',
    pill: 'bg-[#1c120a] border-[#38261b] text-[#e0c0a0]'
  }
};

type TierStyle = typeof TIER_STYLES.GREEN;

const getTierStyle = (tier: string): TierStyle => {
  const t = tier.toLowerCase();
  if (t.includes('grandmaster')) return TIER_STYLES.GOLD;
  if (t.includes('master') && !t.includes('grand')) return TIER_STYLES.AMBER;
  if (t.includes('elite')) return TIER_STYLES.PURPLE;
  if (t.includes('hard') || t.includes('experienced')) return TIER_STYLES.RED;
  if (t.includes('medium') || t.includes('intermediate')) return TIER_STYLES.BLUE;
  if (t.includes('easy') || t.includes('novice')) return TIER_STYLES.GREEN;
  if (t.includes('beginner')) return TIER_STYLES.STONE;
  return TIER_STYLES.STONE;
};

const RollButton = ({
  label,
  chance,
  onClick,
  style = TIER_STYLES.STONE,
  icon: Icon,
  iconSrc
}: {
  label: string;
  chance: string;
  onClick: (e: React.MouseEvent) => void;
  style?: TierStyle;
  icon?: any;
  iconSrc?: string;
}) => (
  <button
    onClick={onClick}
    className={`w-full flex flex-col items-center justify-center px-3 py-3 rounded-[4px] text-sm transition-all border shadow-sm group relative overflow-hidden active:scale-[0.97] active:brightness-125 ${style.bg} ${style.border} ${style.hover}`}
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    <div className="flex items-center gap-2 mb-1 relative z-10 justify-center w-full">
      {iconSrc ? (
        <img src={iconSrc} alt="" className="w-4 h-4 object-contain opacity-80 group-hover:opacity-100 transition-opacity drop-shadow-md shrink-0" />
      ) : Icon ? (
        <Icon className={`w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity ${style.text} shrink-0`} />
      ) : null}
      <span className={`font-bold tracking-wide ${style.text} text-shadow-sm leading-tight text-center`}>{label}</span>
    </div>
    <div className={`text-[10px] font-mono px-3 py-0.5 rounded-full border relative z-10 tracking-wider font-bold ${style.pill}`}>
        {chance}
    </div>
  </button>
);

const GridButton = ({
  tier,
  chance,
  onClick,
  iconSrc,
  icon: Icon,
  style: styleOverride
}: {
  tier: string;
  chance: string;
  onClick: (e: React.MouseEvent) => void;
  iconSrc?: string;
  icon?: any;
  style?: TierStyle;
}) => {
  const style = styleOverride || getTierStyle(tier);
  return (
    <button
      onClick={onClick}
      className={`${style.bg} ${style.border} ${style.hover} w-full flex flex-col items-center justify-center px-2 py-3 rounded-[4px] text-sm transition-all border shadow-sm group h-full relative active:scale-[0.97] active:brightness-125`}
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      <div className="flex items-center gap-2 mb-1.5 justify-center relative z-10">
        {iconSrc ? (
          <img src={iconSrc} alt="" className="w-6 h-6 object-contain drop-shadow-[0_2px_2px_rgba(0,0,0,0.6)] opacity-90 group-hover:opacity-100 transition-transform group-hover:scale-110" />
        ) : Icon ? (
          <Icon className={`w-5 h-5 ${style.text} drop-shadow-md opacity-80 group-hover:opacity-100 transition-transform group-hover:scale-110`} />
        ) : (
          <div className={`w-1.5 h-1.5 rounded-full ${style.text} bg-current opacity-70 group-hover:opacity-100 shadow-[0_0_4px_currentColor]`} />
        )}
        <span className={`font-bold text-xs uppercase tracking-wider ${style.text} text-shadow-sm`}>{tier}</span>
      </div>
      <div className={`text-[10px] font-mono px-2 py-0.5 rounded-full border font-bold relative z-10 ${style.pill}`}>
        {chance}
      </div>
    </button>
  );
};

export const ActionSection: React.FC = () => {
  const { rollForKey } = useGame();

  const handleRoll = (source: string, chance: number, e: React.MouseEvent) => {
    rollForKey(source, chance, e.clientX, e.clientY);
  };

  return (
    <div className="h-full p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Left Column: Slayer & Collection Log */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-1">
              <img src={OSRS_ICONS.SLAYER} alt="Slayer" className="w-3.5 h-3.5 object-contain opacity-70" />
              Slayer Tasks
            </h3>
            <div className="flex flex-col gap-2">
              <RollButton
                label="Turael/Spria/Mazchna"
                chance={`${DROP_RATES[DropSource.SLAYER_EASY]}%`}
                style={TIER_STYLES.STONE}
                onClick={(e) => handleRoll(DropSource.SLAYER_EASY, DROP_RATES[DropSource.SLAYER_EASY], e)}
              />
              <RollButton
                label="Vannaka/Chaeldar/Krystilia"
                chance={`${DROP_RATES[DropSource.SLAYER_MEDIUM]}%`}
                style={TIER_STYLES.BLUE}
                onClick={(e) => handleRoll(DropSource.SLAYER_MEDIUM, DROP_RATES[DropSource.SLAYER_MEDIUM], e)}
              />
              <RollButton
                label="Nieve/Duradel/Konar"
                chance={`${DROP_RATES[DropSource.SLAYER_HARD]}%`}
                style={TIER_STYLES.RED}
                onClick={(e) => handleRoll(DropSource.SLAYER_HARD, DROP_RATES[DropSource.SLAYER_HARD], e)}
              />
              <RollButton
                label="Boss Task"
                chance={`${DROP_RATES[DropSource.SLAYER_BOSS]}%`}
                style={TIER_STYLES.PURPLE}
                onClick={(e) => handleRoll(DropSource.SLAYER_BOSS, DROP_RATES[DropSource.SLAYER_BOSS], e)}
              />
            </div>
          </div>

          <div className="space-y-3">
            <div className="w-full bg-[#111] border border-dashed border-[#333] px-3 py-3 rounded text-[10px] text-gray-500 flex flex-col items-center justify-center text-center font-mono gap-1">
               <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 opacity-50" />
                  <span className="font-bold">Collection Log</span>
               </div>
               <span>Track drops in the new "Collection Log" tab.</span>
             </div>
          </div>
        </div>

        {/* Right Column: Clue Scrolls & Info Panels */}
        <div className="space-y-6">
          <div className="space-y-3">
            <h3 className="text-xs font-bold text-[#888] uppercase tracking-widest flex items-center gap-2 border-b border-white/5 pb-1">
              <img src={OSRS_ICONS.CLUE} alt="Clue" className="w-3.5 h-3.5 object-contain opacity-70" />
              Clue Scrolls
            </h3>
            <div className="grid grid-cols-2 gap-2">
              <GridButton tier="Beginner" chance={`${DROP_RATES[DropSource.CLUE_BEGINNER]}%`} iconSrc={CLUE_ICONS.BEGINNER} onClick={(e) => handleRoll(DropSource.CLUE_BEGINNER, DROP_RATES[DropSource.CLUE_BEGINNER], e)} />
              <GridButton tier="Easy" chance={`${DROP_RATES[DropSource.CLUE_EASY]}%`} iconSrc={CLUE_ICONS.EASY} onClick={(e) => handleRoll(DropSource.CLUE_EASY, DROP_RATES[DropSource.CLUE_EASY], e)} />
              <GridButton tier="Medium" chance={`${DROP_RATES[DropSource.CLUE_MEDIUM]}%`} iconSrc={CLUE_ICONS.MEDIUM} onClick={(e) => handleRoll(DropSource.CLUE_MEDIUM, DROP_RATES[DropSource.CLUE_MEDIUM], e)} />
              <GridButton tier="Hard" chance={`${DROP_RATES[DropSource.CLUE_HARD]}%`} iconSrc={CLUE_ICONS.HARD} onClick={(e) => handleRoll(DropSource.CLUE_HARD, DROP_RATES[DropSource.CLUE_HARD], e)} />
              <GridButton tier="Elite" chance={`${DROP_RATES[DropSource.CLUE_ELITE]}%`} iconSrc={CLUE_ICONS.ELITE} onClick={(e) => handleRoll(DropSource.CLUE_ELITE, DROP_RATES[DropSource.CLUE_ELITE], e)} />
              <GridButton tier="Master" chance={`${DROP_RATES[DropSource.CLUE_MASTER]}%`} iconSrc={CLUE_ICONS.MASTER} onClick={(e) => handleRoll(DropSource.CLUE_MASTER, DROP_RATES[DropSource.CLUE_MASTER], e)} />
            </div>
          </div>

          <div className="space-y-3">
             <div className="w-full bg-[#111] border border-dashed border-[#333] px-3 py-3 rounded text-[10px] text-gray-500 flex flex-col items-center justify-center text-center font-mono gap-1">
               <div className="flex items-center gap-2">
                  <img src={OSRS_ICONS.STATS} alt="" className="w-4 h-4 grayscale opacity-50" />
                  <span className="font-bold">Skill Rolling</span>
               </div>
               <span>Click unlocked skills in the panel below to roll for levels.</span>
             </div>

             <div className="w-full bg-[#111] border border-dashed border-[#333] px-3 py-3 rounded text-[10px] text-gray-500 flex flex-col items-center justify-center text-center font-mono gap-1">
               <div className="flex items-center gap-2">
                  <BookOpen className="w-3.5 h-3.5 opacity-50" />
                  <span className="font-bold">Journal Activities</span>
               </div>
               <span>Quests, Diaries & Combat Achievements are now tracked in the Journal tab.</span>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};
