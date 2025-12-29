
import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { GameState, LogEntry, UnlockState, DropSource, TableType } from '../types';
import { EQUIPMENT_SLOTS, SKILLS_LIST, REGIONS_LIST, MOBILITY_LIST, ARCANA_LIST, POH_LIST, MERCHANTS_LIST, MINIGAMES_LIST, BOSSES_LIST, STORAGE_LIST, GUILDS_LIST, FARMING_PATCH_LIST } from '../data/items';
import { EQUIPMENT_TIER_MAX } from '../config/rules';
import { rollDice, calculateUnlockCost } from '../utils/gameEngine';

// --- Types ---
const STORAGE_KEY = 'FATE_UIM_SAVE_V1';

type GameEvent = {
  id: string;
  type: 'ROLL_SUCCESS' | 'ROLL_FAIL' | 'ROLL_OMNI' | 'ROLL_PITY' | 'UNLOCK' | 'RITUAL' | 'LEVEL_UP';
  x?: number;
  y?: number;
  meta?: any;
};

interface GameContextType extends GameState {
  lastEvent: GameEvent | null;
  rollForKey: (source: string, threshold: number, x?: number, y?: number) => void;
  unlockContent: (table: TableType, item: string, costType: 'key' | 'specialKey' | 'chaosKey', cost: number) => void;
  performRitual: (type: 'LUCK' | 'GREED' | 'CHAOS' | 'TRANSMUTE') => void;
  levelUpSkill: (skill: string) => void;
  toggleAnimations: () => void;
  completeOnboarding: () => void;
  importSave: (data: Partial<GameState>) => void;
  resetGame: () => void;
  togglePin: (id: string) => void;
  saveNote: (id: string, text: string) => void;
  toggleQuest: (id: string) => void;
  toggleDiary: (id: string) => void;
  toggleCA: (id: string) => void;
  toggleTask: (id: string) => void;
  logCollectionItem: (itemId: number) => void;
}

// --- Initial State ---
const getInitialUnlocks = (): UnlockState => ({
  equipment: EQUIPMENT_SLOTS.reduce((acc, slot) => ({ ...acc, [slot]: 0 }), {} as Record<string, number>),
  skills: { 'Hitpoints': 1 },
  levels: SKILLS_LIST.reduce((acc, skill) => ({
    ...acc,
    [skill]: skill === 'Hitpoints' ? 10 : 1
  }), {} as Record<string, number>),
  regions: [],
  mobility: [],
  arcana: [],
  housing: [],
  merchants: [],
  minigames: [],
  bosses: [],
  storage: [],
  guilds: [],
  farming: [],
  quests: [],
  diaries: [],
  cas: [],
  completedTasks: [],
  collectionLog: {}
});

const initialState: GameState = {
  keys: 3,
  specialKeys: 0,
  chaosKeys: 0,
  fatePoints: 0,
  activeBuff: 'NONE',
  unlocks: getInitialUnlocks(),
  history: [],
  animationsEnabled: true,
  hasSeenOnboarding: false,
  pinnedGoals: [],
  userNotes: {},
};

// --- Reducer ---
type Action =
  | { type: 'LOAD_SAVE'; payload: Partial<GameState> }
  | { type: 'RESET' }
  | { type: 'TOGGLE_ANIMATIONS' }
  | { type: 'COMPLETE_ONBOARDING' }
  | { type: 'ROLL_RESULT'; payload: { success: boolean; omni: boolean; pity: boolean; roll: number; threshold: number; source: string; x?: number; y?: number } }
  | { type: 'UNLOCK'; payload: { table: TableType; item: string; costType: 'key' | 'specialKey' | 'chaosKey'; cost: number } }
  | { type: 'RITUAL_LUCK' }
  | { type: 'RITUAL_GREED' }
  | { type: 'RITUAL_CHAOS' }
  | { type: 'RITUAL_TRANSMUTE' }
  | { type: 'LEVEL_UP'; payload: { skill: string } }
  | { type: 'ADD_LOG'; payload: LogEntry }
  | { type: 'TOGGLE_PIN'; payload: string }
  | { type: 'UPDATE_NOTE'; payload: { id: string; text: string } }
  | { type: 'TOGGLE_QUEST'; payload: string }
  | { type: 'TOGGLE_DIARY'; payload: string }
  | { type: 'TOGGLE_CA'; payload: string }
  | { type: 'TOGGLE_TASK'; payload: string }
  | { type: 'LOG_ITEM'; payload: number };

const gameReducer = (state: GameState & { lastEvent: GameEvent | null }, action: Action): GameState & { lastEvent: GameEvent | null } => {
  const uuid = () => Math.random().toString(36).substr(2, 9);
  const now = Date.now();

  switch (action.type) {
    case 'LOAD_SAVE':
      const loadedUnlocks = { ...getInitialUnlocks(), ...action.payload.unlocks };
      // Ensure collectionLog exists for older saves
      if (!loadedUnlocks.collectionLog) loadedUnlocks.collectionLog = {};

      if ((action.payload.unlocks as any)?.power) loadedUnlocks.arcana = (action.payload.unlocks as any).power;

      let hasSeenOnboarding = action.payload.hasSeenOnboarding;
      if (hasSeenOnboarding === undefined) {
         hasSeenOnboarding = (action.payload.history && action.payload.history.length > 0) ? true : false;
      }

      return {
        ...state,
        ...action.payload,
        unlocks: loadedUnlocks,
        hasSeenOnboarding,
        pinnedGoals: action.payload.pinnedGoals || [],
        userNotes: action.payload.userNotes || {},
        lastEvent: null
      };

    case 'RESET':
      return { ...initialState, lastEvent: null };

    case 'TOGGLE_ANIMATIONS':
      return { ...state, animationsEnabled: !state.animationsEnabled };

    case 'COMPLETE_ONBOARDING':
      return { ...state, hasSeenOnboarding: true };

    case 'ROLL_RESULT': {
      const { success, omni, pity, roll, threshold, source, x, y } = action.payload;
      const isGreed = state.activeBuff === 'GREED';

      let newState = { ...state, activeBuff: state.activeBuff === 'LUCK' || state.activeBuff === 'GREED' ? 'NONE' : state.activeBuff } as any;

      const newHistory = [...state.history];
      const addHistory = (msg: string, details?: string, type: 'ROLL' | 'PITY' = 'ROLL', result?: 'SUCCESS' | 'FAIL') => {
        newHistory.push({ id: uuid(), timestamp: now, type, message: msg, details, source, rollValue: roll, threshold, result });
      };

      if (success) {
        if (omni) {
          newState.specialKeys += 1;
          newState.keys += 1;

          newState.lastEvent = { id: uuid(), type: 'ROLL_OMNI', x, y, meta: { roll, threshold } };
          addHistory('LEGENDARY DROP! You found an Omni-Key!', `Critical Success! Rolled ${roll} vs ${threshold}.`, 'ROLL', 'SUCCESS');
        } else {
          const amount = isGreed ? 2 : 1;
          newState.keys += amount;
          newState.lastEvent = { id: uuid(), type: 'ROLL_SUCCESS', x, y, meta: { roll, threshold } };
          addHistory(`Key Found!${isGreed ? ' (Doubled by Greed)' : ''}`, `Rolled ${roll} (needed ≤ ${threshold}). Fate reset.`, 'ROLL', 'SUCCESS');
        }
        newState.fatePoints = 0;
      } else {
        if (pity) {
          newState.keys += 1;
          newState.fatePoints = 0;
          newState.lastEvent = { id: uuid(), type: 'ROLL_PITY', x, y, meta: { roll, threshold } };
          addHistory(`No Key. Rolled ${roll}.`, 'MAX FATE REACHED! Pity Key granted.', 'ROLL', 'FAIL');
          newHistory.push({ id: uuid(), timestamp: now, type: 'PITY', message: 'The Fates take pity on you.', details: '+1 Key Added' });
        } else {
          newState.fatePoints += 1;
          newState.lastEvent = { id: uuid(), type: 'ROLL_FAIL', x, y, meta: { roll, threshold } };
          addHistory(`No Key.${isGreed ? ' (Greed Wasted)' : ''}`, `Rolled ${roll} (needed ≤ ${threshold}). Fate: ${newState.fatePoints}/50`, 'ROLL', 'FAIL');
        }
      }

      return { ...newState, history: newHistory };
    }

    case 'UNLOCK': {
      const { table, item, costType, cost } = action.payload;

      const newUnlocks = { ...state.unlocks };

      if (table === TableType.SKILLS) newUnlocks.skills = { ...newUnlocks.skills, [item]: (newUnlocks.skills[item] || 0) + 1 };
      else if (table === TableType.EQUIPMENT) newUnlocks.equipment = { ...newUnlocks.equipment, [item]: (newUnlocks.equipment[item] || 0) + 1 };
      else if (table === TableType.REGIONS) newUnlocks.regions = [...newUnlocks.regions, item];
      else if (table === TableType.MOBILITY) newUnlocks.mobility = [...newUnlocks.mobility, item];
      else if (table === TableType.ARCANA) newUnlocks.arcana = [...newUnlocks.arcana, item];
      else if (table === TableType.POH) newUnlocks.housing = [...newUnlocks.housing, item];
      else if (table === TableType.MERCHANTS) newUnlocks.merchants = [...newUnlocks.merchants, item];
      else if (table === TableType.MINIGAMES) newUnlocks.minigames = [...newUnlocks.minigames, item];
      else if (table === TableType.BOSSES) newUnlocks.bosses = [...newUnlocks.bosses, item];
      else if (table === TableType.STORAGE) newUnlocks.storage = [...newUnlocks.storage, item];
      else if (table === TableType.GUILDS) newUnlocks.guilds = [...newUnlocks.guilds, item];
      else if (table === TableType.FARMING_LAYERS) newUnlocks.farming = [...newUnlocks.farming, item];

      let newState = { ...state, unlocks: newUnlocks };
      if (costType === 'key') newState.keys -= cost;
      else if (costType === 'specialKey') newState.specialKeys -= 1;
      else if (costType === 'chaosKey') newState.chaosKeys -= 1;

      const log: LogEntry = { id: uuid(), timestamp: now, type: 'UNLOCK', message: `Unlocked ${item}`, details: `Category: ${table}` };

      return {
        ...newState,
        history: [...state.history, log],
        lastEvent: { id: uuid(), type: 'UNLOCK', meta: { item } }
      };
    }

    case 'RITUAL_LUCK':
      return {
        ...state,
        fatePoints: state.fatePoints - 15,
        activeBuff: 'LUCK',
        history: [...state.history, { id: uuid(), timestamp: now, type: 'ALTAR', message: 'Ritual of Clarity', details: 'Next roll has Advantage.' }],
        lastEvent: { id: uuid(), type: 'RITUAL', meta: { type: 'LUCK' } }
      };

    case 'RITUAL_GREED':
      return {
        ...state,
        fatePoints: state.fatePoints - 30,
        activeBuff: 'GREED',
        history: [...state.history, { id: uuid(), timestamp: now, type: 'ALTAR', message: 'Ritual of Greed', details: 'Next success gives 2 Keys.' }],
        lastEvent: { id: uuid(), type: 'RITUAL', meta: { type: 'GREED' } }
      };

    case 'RITUAL_CHAOS':
      return {
        ...state,
        fatePoints: state.fatePoints - 25,
        chaosKeys: state.chaosKeys + 1,
        history: [...state.history, { id: uuid(), timestamp: now, type: 'ALTAR', message: 'Ritual of Chaos', details: 'Fate converted to Chaos Key.' }],
        lastEvent: { id: uuid(), type: 'RITUAL', meta: { type: 'CHAOS' } }
      };

    case 'RITUAL_TRANSMUTE':
      return {
        ...state,
        keys: state.keys - 5,
        specialKeys: state.specialKeys + 1,
        history: [...state.history, { id: uuid(), timestamp: now, type: 'ALTAR', message: 'Ritual of Transmutation', details: '5 Keys fused into 1 Omni-Key.' }],
        lastEvent: { id: uuid(), type: 'RITUAL', meta: { type: 'TRANSMUTE' } }
      };

    case 'LEVEL_UP': {
      const { skill } = action.payload;

      const newLevel = (state.unlocks.levels[skill] || 1) + 1;
      const newUnlocks = { ...state.unlocks, levels: { ...state.unlocks.levels, [skill]: newLevel } };

      const prevTotal = Object.values(state.unlocks.levels).reduce((a, b) => a + (b as number), 0);
      const newTotal = prevTotal + 1;
      let logs = [...state.history];
      let newChaosKeys = state.chaosKeys;
      let eventMeta = { skill, level: newLevel };

      if (Math.floor(newTotal / 50) > Math.floor(prevTotal / 50)) {
         newChaosKeys += 1;
         logs.push({ id: uuid(), timestamp: now, type: 'UNLOCK', message: `Milestone: Total Level ${newTotal}!`, details: '+1 Chaos Key Awarded' });
      }

      return {
        ...state,
        unlocks: newUnlocks,
        chaosKeys: newChaosKeys,
        history: logs,
        lastEvent: { id: uuid(), type: 'LEVEL_UP', meta: eventMeta }
      };
    }

    case 'TOGGLE_PIN': {
      const goalId = action.payload;
      const isPinned = state.pinnedGoals.includes(goalId);
      return {
        ...state,
        pinnedGoals: isPinned
          ? state.pinnedGoals.filter(id => id !== goalId)
          : [...state.pinnedGoals, goalId]
      };
    }

    case 'UPDATE_NOTE': {
      return {
        ...state,
        userNotes: {
          ...state.userNotes,
          [action.payload.id]: action.payload.text
        }
      };
    }

    case 'TOGGLE_QUEST': {
      const questId = action.payload;
      const isCompleted = state.unlocks.quests.includes(questId);
      const newQuests = isCompleted
        ? state.unlocks.quests.filter(q => q !== questId)
        : [...state.unlocks.quests, questId];

      return {
        ...state,
        unlocks: { ...state.unlocks, quests: newQuests }
      };
    }

    case 'TOGGLE_DIARY': {
      const id = action.payload;
      const isCompleted = state.unlocks.diaries.includes(id);
      const newDiaries = isCompleted
        ? state.unlocks.diaries.filter(d => d !== id)
        : [...state.unlocks.diaries, id];
      return { ...state, unlocks: { ...state.unlocks, diaries: newDiaries } };
    }

    case 'TOGGLE_CA': {
      const id = action.payload;
      const isCompleted = state.unlocks.cas.includes(id);
      const newCAs = isCompleted
        ? state.unlocks.cas.filter(c => c !== id)
        : [...state.unlocks.cas, id];
      return { ...state, unlocks: { ...state.unlocks, cas: newCAs } };
    }

    case 'TOGGLE_TASK': {
      const taskId = action.payload;
      const isCompleted = state.unlocks.completedTasks.includes(taskId);
      const newTasks = isCompleted
        ? state.unlocks.completedTasks.filter(t => t !== taskId)
        : [...state.unlocks.completedTasks, taskId];
      return { ...state, unlocks: { ...state.unlocks, completedTasks: newTasks } };
    }

    case 'LOG_ITEM': {
      const itemId = action.payload;
      const currentCount = state.unlocks.collectionLog[itemId] || 0;

      const newUnlocks = {
        ...state.unlocks,
        collectionLog: {
          ...state.unlocks.collectionLog,
          [itemId]: currentCount + 1
        }
      };

      return {
        ...state,
        unlocks: newUnlocks
      };
    }

    default:
      return state;
  }
};

// --- Context ---
const GameContext = createContext<GameContextType | null>(null);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, { ...initialState, lastEvent: null });

  // Persistence
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        dispatch({ type: 'LOAD_SAVE', payload: JSON.parse(saved) });
      }
    } catch (e) { console.error("Failed to load save", e); }
  }, []);

  useEffect(() => {
    const { lastEvent, ...persistState } = state;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(persistState));
  }, [state]);

  // --- Actions ---
  const rollForKey = useCallback((source: string, threshold: number, x?: number, y?: number) => {
    let roll = rollDice(100);
    const advantageRoll = rollDice(100);

    if (state.activeBuff === 'LUCK') {
      roll = Math.min(roll, advantageRoll);
    }

    const success = roll <= threshold;
    let omni = false;
    let pity = false;

    if (success) {
      let omniChance = 2;
      if (source === DropSource.QUEST_GRANDMASTER) omniChance = 20;
      else if (source === DropSource.DIARY_ELITE) omniChance = 10;
      else if (source === "Diary Section Complete") omniChance = 10;
      else if (source === "CA Tier Complete") omniChance = 10;

      if (rollDice(100) <= omniChance) omni = true;
    } else {
      if (state.fatePoints + 1 >= 50) pity = true;
    }

    dispatch({ type: 'ROLL_RESULT', payload: { success, omni, pity, roll, threshold, source, x, y } });
  }, [state.activeBuff, state.fatePoints]);

  const unlockContent = useCallback((table: TableType, item: string, costType: 'key' | 'specialKey' | 'chaosKey', cost: number) => {
    dispatch({ type: 'UNLOCK', payload: { table, item, costType, cost } });
  }, []);

  const performRitual = useCallback((type: 'LUCK' | 'GREED' | 'CHAOS' | 'TRANSMUTE') => {
    if (type === 'LUCK') dispatch({ type: 'RITUAL_LUCK' });
    if (type === 'GREED') dispatch({ type: 'RITUAL_GREED' });
    if (type === 'CHAOS') dispatch({ type: 'RITUAL_CHAOS' });
    if (type === 'TRANSMUTE') dispatch({ type: 'RITUAL_TRANSMUTE' });
  }, []);

  const levelUpSkill = useCallback((skill: string) => {
    dispatch({ type: 'LEVEL_UP', payload: { skill } });
    const newLevel = (state.unlocks.levels[skill] || 1) + 1;
    const rollChance = Math.ceil(newLevel / 3);
    rollForKey(`${skill} Level ${newLevel}`, rollChance);
  }, [state.unlocks.levels, rollForKey]);

  const logCollectionItem = useCallback((itemId: number) => {
    dispatch({ type: 'LOG_ITEM', payload: itemId });
  }, []);

  const completeOnboarding = useCallback(() => dispatch({ type: 'COMPLETE_ONBOARDING' }), []);
  const toggleAnimations = useCallback(() => dispatch({ type: 'TOGGLE_ANIMATIONS' }), []);
  const importSave = useCallback((data: Partial<GameState>) => dispatch({ type: 'LOAD_SAVE', payload: data }), []);
  const resetGame = useCallback(() => dispatch({ type: 'RESET' }), []);
  const togglePin = useCallback((id: string) => dispatch({ type: 'TOGGLE_PIN', payload: id }), []);
  const saveNote = useCallback((id: string, text: string) => dispatch({ type: 'UPDATE_NOTE', payload: { id, text } }), []);
  const toggleQuest = useCallback((id: string) => dispatch({ type: 'TOGGLE_QUEST', payload: id }), []);
  const toggleDiary = useCallback((id: string) => dispatch({ type: 'TOGGLE_DIARY', payload: id }), []);
  const toggleCA = useCallback((id: string) => dispatch({ type: 'TOGGLE_CA', payload: id }), []);
  const toggleTask = useCallback((id: string) => dispatch({ type: 'TOGGLE_TASK', payload: id }), []);

  return (
    <GameContext.Provider value={{ ...state, rollForKey, unlockContent, performRitual, levelUpSkill, toggleAnimations, completeOnboarding, importSave, resetGame, togglePin, saveNote, toggleQuest, toggleDiary, toggleCA, toggleTask, logCollectionItem }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) throw new Error("useGame must be used within a GameProvider");
  return context;
};
