
import { DropSource } from '../types';

export interface QuestData {
  id: string;
  name: string;
  regions: string[]; // Specific regions (e.g. 'Lumbridge', 'Varrock')
  skills: Record<string, number>;
  prereqs: string[]; // Previous quests required
  points: number;
  series?: string;
  difficulty: DropSource;
}

export const QUEST_DATA: Record<string, QuestData> = {
  // ============================================================================
  // F2P QUESTS
  // ============================================================================
  'Cook\'s Assistant': {
    id: 'Cook\'s Assistant', name: 'Cook\'s Assistant',
    regions: ['Lumbridge'],
    skills: {}, prereqs: [], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Demon Slayer': {
    id: 'Demon Slayer', name: 'Demon Slayer',
    regions: ['Varrock', 'Wizards\' Tower'],
    skills: {}, prereqs: [], points: 3,
    difficulty: DropSource.QUEST_NOVICE
  },
  'The Restless Ghost': {
    id: 'The Restless Ghost', name: 'The Restless Ghost',
    regions: ['Lumbridge', 'Wizards\' Tower'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Romeo & Juliet': {
    id: 'Romeo & Juliet', name: 'Romeo & Juliet',
    regions: ['Varrock'],
    skills: {}, prereqs: [], points: 5,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Sheep Shearer': {
    id: 'Sheep Shearer', name: 'Sheep Shearer',
    regions: ['Lumbridge'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Shield of Arrav': {
    id: 'Shield of Arrav', name: 'Shield of Arrav',
    regions: ['Varrock'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Ernest the Chicken': {
    id: 'Ernest the Chicken', name: 'Ernest the Chicken',
    regions: ['Draynor Village'],
    skills: {}, prereqs: [], points: 4,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Vampyre Slayer': {
    id: 'Vampyre Slayer', name: 'Vampyre Slayer',
    regions: ['Draynor Village', 'Varrock'],
    skills: {}, prereqs: [], points: 3,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Imp Catcher': {
    id: 'Imp Catcher', name: 'Imp Catcher',
    regions: ['Wizards\' Tower'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Prince Ali Rescue': {
    id: 'Prince Ali Rescue', name: 'Prince Ali Rescue',
    regions: ['Al Kharid', 'Draynor Village'],
    skills: {}, prereqs: [], points: 3,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Doric\'s Quest': {
    id: 'Doric\'s Quest', name: 'Doric\'s Quest',
    regions: ['Falador'], // North of Falador gate
    skills: { 'Mining': 15 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Black Knights\' Fortress': {
    id: 'Black Knights\' Fortress', name: 'Black Knights\' Fortress',
    regions: ['Ice Mountain', 'Falador'],
    skills: { 'Quest Points': 12 }, prereqs: [], points: 3,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Witch\'s Potion': {
    id: 'Witch\'s Potion', name: 'Witch\'s Potion',
    regions: ['Rimmington'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'The Knight\'s Sword': {
    id: 'The Knight\'s Sword', name: 'The Knight\'s Sword',
    regions: ['Falador', 'Varrock'],
    skills: { 'Mining': 10 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Goblin Diplomacy': {
    id: 'Goblin Diplomacy', name: 'Goblin Diplomacy',
    regions: ['Goblin Village'],
    skills: {}, prereqs: [], points: 5,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Pirate\'s Treasure': {
    id: 'Pirate\'s Treasure', name: 'Pirate\'s Treasure',
    regions: ['Port Sarim', 'Falador', 'Varrock'],
    skills: {}, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Dragon Slayer I': {
    id: 'Dragon Slayer I', name: 'Dragon Slayer I',
    regions: ['Varrock', 'Edgeville', 'Port Sarim', 'Draynor Village', 'Crandor', 'Ice Mountain'],
    skills: { 'Quest Points': 32, 'Crafting': 8 }, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Rune Mysteries': {
    id: 'Rune Mysteries', name: 'Rune Mysteries',
    regions: ['Lumbridge', 'Varrock'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Misthalin Mystery': {
    id: 'Misthalin Mystery', name: 'Misthalin Mystery',
    regions: ['Lumbridge'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Below Ice Mountain': {
    id: 'Below Ice Mountain', name: 'Below Ice Mountain',
    regions: ['Ice Mountain'],
    skills: { 'Quest Points': 16 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'The Corsair Curse': {
    id: 'The Corsair Curse', name: 'The Corsair Curse',
    regions: ['Port Sarim', 'Feldip Hills'],
    skills: {}, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'X Marks the Spot': {
    id: 'X Marks the Spot', name: 'X Marks the Spot',
    regions: ['Lumbridge', 'Draynor Village', 'Port Sarim'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },

  // ============================================================================
  // RECIPE FOR DISASTER (Sub-Quests)
  // ============================================================================
  'RFD: The Cook': {
    id: 'RFD: The Cook', name: 'RFD: Start (The Cook)',
    regions: ['Lumbridge'],
    skills: { 'Cooking': 10 }, prereqs: ['Cook\'s Assistant'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_NOVICE
  },
  'RFD: Dwarf': {
    id: 'RFD: Dwarf', name: 'RFD: Dwarf',
    regions: ['Falador', 'Ice Mountain'],
    skills: {}, prereqs: ['Fishing Contest'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_NOVICE
  },
  'RFD: Goblins': {
    id: 'RFD: Goblins', name: 'RFD: Goblins',
    regions: ['Goblin Village'],
    skills: { 'Cooking': 48 }, prereqs: ['Goblin Diplomacy'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_NOVICE
  },
  'RFD: Pirate Pete': {
    id: 'RFD: Pirate Pete', name: 'RFD: Pirate Pete',
    regions: ['Lumbridge', 'Port Sarim', 'Islands & Others'], // Underwater
    skills: { 'Cooking': 31 }, prereqs: [], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'RFD: Lumbridge Guide': {
    id: 'RFD: Lumbridge Guide', name: 'RFD: Lumbridge Guide',
    regions: ['Lumbridge', 'Draynor Village', 'Wizards\' Tower'],
    skills: { 'Cooking': 40 }, prereqs: ['Big Chompy Bird Hunting', 'Biohazard', 'Demon Slayer', 'Murder Mystery', 'Nature Spirit', 'Priest in Peril', 'The Restless Ghost', 'Witch\'s House'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'RFD: Evil Dave': {
    id: 'RFD: Evil Dave', name: 'RFD: Evil Dave',
    regions: ['Edgeville'],
    skills: { 'Cooking': 25, 'Magic': 25 }, prereqs: ['Gertrude\'s Cat', 'Shadow of the Storm'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'RFD: Skrach Uglogwee': {
    id: 'RFD: Skrach Uglogwee', name: 'RFD: Skrach Uglogwee',
    regions: ['Feldip Hills'],
    skills: { 'Cooking': 41, 'Firemaking': 20 }, prereqs: ['Big Chompy Bird Hunting'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'RFD: Sir Amik Varze': {
    id: 'RFD: Sir Amik Varze', name: 'RFD: Sir Amik Varze',
    regions: ['Falador', 'Karamja', 'Lumbridge', 'Zanaris'],
    skills: { 'Cooking': 70, 'Quest Points': 107 }, prereqs: ['Legends\' Quest'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'RFD: King Awowogei': {
    id: 'RFD: King Awowogei', name: 'RFD: King Awowogei',
    regions: ['Ape Atoll', 'Tree Gnome Stronghold'],
    skills: { 'Cooking': 70, 'Agility': 48 }, prereqs: ['Monkey Madness I'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'RFD: Finale': {
    id: 'RFD: Finale', name: 'RFD: Finale',
    regions: ['Lumbridge'], // Culinaromancer
    skills: { 'Quest Points': 175 }, prereqs: ['RFD: The Cook', 'RFD: Dwarf', 'RFD: Goblins', 'RFD: Pirate Pete', 'RFD: Lumbridge Guide', 'RFD: Evil Dave', 'RFD: Skrach Uglogwee', 'RFD: Sir Amik Varze', 'RFD: King Awowogei'], points: 1, series: 'Recipe for Disaster',
    difficulty: DropSource.QUEST_MASTER
  },

  // ============================================================================
  // MEMBER QUESTS
  // ============================================================================
  'Priest in Peril': {
    id: 'Priest in Peril', name: 'Priest in Peril',
    regions: ['Varrock', 'Paterdomus'],
    skills: {}, prereqs: [], points: 1, series: 'Myreque',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Lost City': {
    id: 'Lost City', name: 'Lost City',
    regions: ['Lumbridge', 'Zanaris'],
    skills: { 'Woodcutting': 36, 'Crafting': 31 }, prereqs: [], points: 3, series: 'Fairy Tale',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Fairytale I - Growing Pains': {
    id: 'Fairytale I - Growing Pains', name: 'Fairytale I - Growing Pains',
    regions: ['Zanaris', 'Draynor Village'],
    skills: {}, prereqs: ['Lost City', 'Nature Spirit'], points: 2, series: 'Fairy Tale',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Fairytale II - Cure a Queen': {
    id: 'Fairytale II - Cure a Queen', name: 'Fairytale II - Cure a Queen',
    regions: ['Zanaris', 'Karamja'],
    skills: { 'Thieving': 40, 'Farming': 49, 'Herblore': 57 }, prereqs: ['Fairytale I - Growing Pains'], points: 2, series: 'Fairy Tale',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Druidic Ritual': {
    id: 'Druidic Ritual', name: 'Druidic Ritual',
    regions: ['Taverley'],
    skills: {}, prereqs: [], points: 4,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Recruitment Drive': {
    id: 'Recruitment Drive', name: 'Recruitment Drive',
    regions: ['Falador'],
    skills: { 'Quest Points': 12 }, prereqs: ['Black Knights\' Fortress'], points: 1, series: 'Temple Knights',
    difficulty: DropSource.QUEST_NOVICE
  },
  'The Tourist Trap': {
    id: 'The Tourist Trap', name: 'The Tourist Trap',
    regions: ['Al Kharid', 'Bedabin Camp'],
    skills: { 'Fletching': 10, 'Smithing': 20 }, prereqs: [], points: 2, series: 'Desert',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Waterfall Quest': {
    id: 'Waterfall Quest', name: 'Waterfall Quest',
    regions: ['Baxtorian Falls', 'Tree Gnome Stronghold'],
    skills: {}, prereqs: [], points: 1, series: 'Elf',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Tree Gnome Village': {
    id: 'Tree Gnome Village', name: 'Tree Gnome Village',
    regions: ['Gnome Village', 'Tree Gnome Stronghold'],
    skills: {}, prereqs: [], points: 2, series: 'Gnome',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Grand Tree': {
    id: 'The Grand Tree', name: 'The Grand Tree',
    regions: ['Tree Gnome Stronghold'],
    skills: { 'Agility': 25 }, prereqs: [], points: 5, series: 'Gnome',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Merlin\'s Crystal': {
    id: 'Merlin\'s Crystal', name: 'Merlin\'s Crystal',
    regions: ['Camelot', 'Falador'],
    skills: {}, prereqs: [], points: 6, series: 'Camelot',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Holy Grail': {
    id: 'Holy Grail', name: 'Holy Grail',
    regions: ['Camelot', 'Entrana'],
    skills: { 'Attack': 20 }, prereqs: ['Merlin\'s Crystal'], points: 2, series: 'Camelot',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'King\'s Ransom': {
    id: 'King\'s Ransom', name: 'King\'s Ransom',
    regions: ['Camelot', 'Falador'],
    skills: { 'Magic': 45, 'Defence': 65 }, prereqs: ['Black Knights\' Fortress', 'Holy Grail', 'Murder Mystery', 'One Small Favour'], points: 1, series: 'Camelot',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Plague City': {
    id: 'Plague City', name: 'Plague City',
    regions: ['East Ardougne', 'West Ardougne'],
    skills: {}, prereqs: [], points: 1, series: 'Elf',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Biohazard': {
    id: 'Biohazard', name: 'Biohazard',
    regions: ['East Ardougne', 'Rimmington', 'West Ardougne'],
    skills: {}, prereqs: ['Plague City'], points: 3, series: 'Elf',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Underground Pass': {
    id: 'Underground Pass', name: 'Underground Pass',
    regions: ['West Ardougne', 'Isafdar'],
    skills: { 'Ranged': 25 }, prereqs: ['Biohazard'], points: 5, series: 'Elf',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Regicide': {
    id: 'Regicide', name: 'Regicide',
    regions: ['Isafdar', 'West Ardougne'],
    skills: { 'Agility': 56, 'Crafting': 10 }, prereqs: ['Underground Pass'], points: 3, series: 'Elf',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Roving Elves': {
    id: 'Roving Elves', name: 'Roving Elves',
    regions: ['Isafdar'],
    skills: { 'Agility': 56 }, prereqs: ['Regicide', 'Waterfall Quest'], points: 1, series: 'Elf',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Mourning\'s End Part I': {
    id: 'Mourning\'s End Part I', name: 'Mourning\'s End Part I',
    regions: ['Isafdar', 'East Ardougne', 'Lletya'],
    skills: { 'Ranged': 60, 'Thieving': 50 }, prereqs: ['Roving Elves', 'Big Chompy Bird Hunting', 'Sheep Herder'], points: 2, series: 'Elf',
    difficulty: DropSource.QUEST_MASTER
  },
  'Mourning\'s End Part II': {
    id: 'Mourning\'s End Part II', name: 'Mourning\'s End Part II',
    regions: ['Lletya', 'Isafdar'],
    skills: { 'Agility': 65 }, prereqs: ['Mourning\'s End Part I'], points: 2, series: 'Elf',
    difficulty: DropSource.QUEST_MASTER
  },
  'Song of the Elves': {
    id: 'Song of the Elves', name: 'Song of the Elves',
    regions: ['Lletya', 'East Ardougne', 'Varrock', 'Kharidian Desert'],
    skills: { 'Agility': 70, 'Construction': 70, 'Farming': 70, 'Herblore': 70, 'Hunter': 70, 'Mining': 70, 'Smithing': 70, 'Woodcutting': 70 }, prereqs: ['Mourning\'s End Part II', 'Making History'], points: 4, series: 'Elf',
    difficulty: DropSource.QUEST_GRANDMASTER
  },
  'Dragon Slayer II': {
    id: 'Dragon Slayer II', name: 'Dragon Slayer II',
    regions: ['Varrock', 'Feldip Hills', 'Rellekka', 'Kourend & Kebos', 'Fossil Island'],
    skills: { 'Magic': 75, 'Smithing': 70, 'Mining': 68, 'Crafting': 62, 'Agility': 60, 'Thieving': 60, 'Construction': 50, 'Hunter': 50 }, prereqs: ['Legends\' Quest', 'Dream Mentor', 'A Tail of Two Cats', 'Animal Magnetism', 'Ghosts Ahoy', 'Bone Voyage', 'Client of Kourend'], points: 5, series: 'Dragonkin',
    difficulty: DropSource.QUEST_GRANDMASTER
  },
  'The Fremennik Trials': {
    id: 'The Fremennik Trials', name: 'The Fremennik Trials',
    regions: ['Rellekka'],
    skills: { 'Fletching': 25, 'Woodcutting': 40, 'Crafting': 40 }, prereqs: [], points: 3, series: 'Fremennik',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Fremennik Isles': {
    id: 'The Fremennik Isles', name: 'The Fremennik Isles',
    regions: ['Rellekka', 'Jatizso', 'Neitiznot'],
    skills: { 'Construction': 20, 'Agility': 40 }, prereqs: ['The Fremennik Trials'], points: 1, series: 'Fremennik',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'The Fremennik Exiles': {
    id: 'The Fremennik Exiles', name: 'The Fremennik Exiles',
    regions: ['Rellekka', 'Jatizso', 'Neitiznot'],
    skills: { 'Crafting': 65, 'Slayer': 60, 'Smithing': 60, 'Fishing': 60, 'Runecraft': 55 }, prereqs: ['The Fremennik Isles', 'Lunar Diplomacy', 'Mountain Daughter', 'Heroes\' Quest'], points: 2, series: 'Fremennik',
    difficulty: DropSource.QUEST_MASTER
  },
  'Monkey Madness I': {
    id: 'Monkey Madness I', name: 'Monkey Madness I',
    regions: ['Tree Gnome Stronghold', 'Ape Atoll'],
    skills: {}, prereqs: ['The Grand Tree', 'Tree Gnome Village'], points: 3, series: 'Gnome',
    difficulty: DropSource.QUEST_MASTER
  },
  'Monkey Madness II': {
    id: 'Monkey Madness II', name: 'Monkey Madness II',
    regions: ['Tree Gnome Stronghold', 'Ape Atoll', 'Kourend & Kebos'],
    skills: { 'Slayer': 69, 'Crafting': 70, 'Hunter': 60, 'Agility': 55, 'Thieving': 55, 'Firemaking': 60 }, prereqs: ['Monkey Madness I', 'Enlightened Journey', 'The Eyes of Glouphrie', 'Troll Stronghold', 'Watchtower', 'RFD: King Awowogei'], points: 4, series: 'Gnome',
    difficulty: DropSource.QUEST_GRANDMASTER
  },
  'Nature Spirit': {
    id: 'Nature Spirit', name: 'Nature Spirit',
    regions: ['Mort Myre Swamp'],
    skills: { 'Crafting': 18 }, prereqs: ['Priest in Peril', 'The Restless Ghost'], points: 2, series: 'Myreque',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'In Search of the Myreque': {
    id: 'In Search of the Myreque', name: 'In Search of the Myreque',
    regions: ['Canifis', 'Mort Myre Swamp', 'Varrock'],
    skills: { 'Agility': 25 }, prereqs: ['Nature Spirit'], points: 2, series: 'Myreque',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'In Aid of the Myreque': {
    id: 'In Aid of the Myreque', name: 'In Aid of the Myreque',
    regions: ['Burgh de Rott', 'Mort Myre Swamp'],
    skills: { 'Crafting': 25, 'Mining': 15, 'Magic': 7 }, prereqs: ['In Search of the Myreque'], points: 2, series: 'Myreque',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Darkness of Hallowvale': {
    id: 'Darkness of Hallowvale', name: 'Darkness of Hallowvale',
    regions: ['Burgh de Rott', 'Meiyerditch'],
    skills: { 'Construction': 5, 'Mining': 20, 'Thieving': 22, 'Agility': 26, 'Crafting': 32 }, prereqs: ['In Aid of the Myreque'], points: 2, series: 'Myreque',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'A Taste of Hope': {
    id: 'A Taste of Hope', name: 'A Taste of Hope',
    regions: ['Meiyerditch', 'Theatre of Blood'],
    skills: { 'Crafting': 48, 'Agility': 45, 'Attack': 40, 'Herblore': 40, 'Slayer': 38 }, prereqs: ['Darkness of Hallowvale'], points: 1, series: 'Myreque',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Sins of the Father': {
    id: 'Sins of the Father', name: 'Sins of the Father',
    regions: ['Darkmeyer', 'Slepe'],
    skills: { 'Woodcutting': 62, 'Fletching': 60, 'Crafting': 56, 'Agility': 52, 'Attack': 50, 'Slayer': 50, 'Magic': 49 }, prereqs: ['A Taste of Hope', 'Vampyre Slayer'], points: 2, series: 'Myreque',
    difficulty: DropSource.QUEST_MASTER
  },
  'Shilo Village': {
    id: 'Shilo Village', name: 'Shilo Village',
    regions: ['Shilo Village', 'Tai Bwo Wannai'],
    skills: { 'Crafting': 20, 'Agility': 32 }, prereqs: ['Jungle Potion'], points: 2, series: 'Karamja',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Jungle Potion': {
    id: 'Jungle Potion', name: 'Jungle Potion',
    regions: ['Tai Bwo Wannai'],
    skills: { 'Herblore': 3 }, prereqs: ['Druidic Ritual'], points: 1, series: 'Karamja',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Tai Bwo Wannai Trio': {
    id: 'Tai Bwo Wannai Trio', name: 'Tai Bwo Wannai Trio',
    regions: ['Tai Bwo Wannai'],
    skills: { 'Agility': 15, 'Cooking': 30, 'Fishing': 5 }, prereqs: ['Jungle Potion'], points: 2, series: 'Karamja',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'One Small Favour': {
    id: 'One Small Favour', name: 'One Small Favour',
    regions: ['Shilo Village', 'Port Sarim', 'Brimhaven', 'East Ardougne', 'Catherby', 'Seers\' Village', 'Draynor Village'],
    skills: { 'Agility': 36, 'Crafting': 25, 'Herblore': 18, 'Smithing': 30 }, prereqs: ['Rune Mysteries', 'Shilo Village'], points: 2,
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Client of Kourend': {
    id: 'Client of Kourend', name: 'Client of Kourend',
    regions: ['Kourend Castle', 'Hosidius', 'Shayzien', 'Lovakengj', 'Arceuus'],
    skills: {}, prereqs: [], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_NOVICE
  },
  'A Kingdom Divided': {
    id: 'A Kingdom Divided', name: 'A Kingdom Divided',
    regions: ['Kourend Castle', 'Hosidius', 'Shayzien', 'Lovakengj', 'Arceuus', 'Kebos Lowlands'],
    skills: { 'Agility': 54, 'Thieving': 52, 'Woodcutting': 52, 'Herblore': 50, 'Mining': 42, 'Crafting': 38, 'Magic': 35 }, prereqs: ['Client of Kourend', 'The Depths of Despair', 'Queen of Thieves', 'Tale of the Righteous', 'The Forsaken Tower', 'The Ascent of Arceuus'], points: 2, series: 'Kourend',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'The Depths of Despair': {
    id: 'The Depths of Despair', name: 'The Depths of Despair',
    regions: ['Hosidius', 'Kourend Castle'],
    skills: { 'Agility': 18 }, prereqs: ['Client of Kourend'], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Queen of Thieves': {
    id: 'Queen of Thieves', name: 'The Queen of Thieves',
    regions: ['Port Piscarilius', 'Kourend Castle'],
    skills: { 'Thieving': 20 }, prereqs: ['Client of Kourend'], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Tale of the Righteous': {
    id: 'Tale of the Righteous', name: 'Tale of the Righteous',
    regions: ['Shayzien', 'Kourend Castle'],
    skills: { 'Strength': 16, 'Mining': 10 }, prereqs: ['Client of Kourend'], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Forsaken Tower': {
    id: 'The Forsaken Tower', name: 'The Forsaken Tower',
    regions: ['Lovakengj', 'Kourend Castle'],
    skills: {}, prereqs: ['Client of Kourend'], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Ascent of Arceuus': {
    id: 'The Ascent of Arceuus', name: 'The Ascent of Arceuus',
    regions: ['Arceuus', 'Kourend Castle'],
    skills: { 'Hunter': 12 }, prereqs: ['Client of Kourend'], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Getting Ahead': {
    id: 'Getting Ahead', name: 'Getting Ahead',
    regions: ['Kourend Castle', 'Kebos Lowlands'],
    skills: { 'Crafting': 30, 'Construction': 26 }, prereqs: ['Client of Kourend'], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Animal Magnetism': {
    id: 'Animal Magnetism', name: 'Animal Magnetism',
    regions: ['Draynor Village', 'Morytania'],
    skills: { 'Slayer': 18, 'Crafting': 19, 'Ranged': 30, 'Woodcutting': 35 }, prereqs: ['The Restless Ghost', 'Ernest the Chicken', 'Priest in Peril'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Another Slice of H.A.M.': {
    id: 'Another Slice of H.A.M.', name: 'Another Slice of H.A.M.',
    regions: ['Lumbridge', 'Dorgesh-Kaan'],
    skills: { 'Attack': 15, 'Prayer': 25 }, prereqs: ['Death to the Dorgeshuun', 'The Dig Site'], points: 1, series: 'Dorgeshuun',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Between a Rock...': {
    id: 'Between a Rock...', name: 'Between a Rock...',
    regions: ['Keldagrim'],
    skills: { 'Defence': 30, 'Mining': 40, 'Smithing': 50 }, prereqs: ['The Giant Dwarf', 'Fishing Contest'], points: 2, series: 'Dwarf',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Big Chompy Bird Hunting': {
    id: 'Big Chompy Bird Hunting', name: 'Big Chompy Bird Hunting',
    regions: ['Feldip Hills'],
    skills: { 'Fletching': 5, 'Cooking': 30, 'Ranged': 30 }, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Cabin Fever': {
    id: 'Cabin Fever', name: 'Cabin Fever',
    regions: ['Mos Le\'Harmless', 'Port Phasmatys'],
    skills: { 'Ranged': 40, 'Smithing': 50, 'Crafting': 45 }, prereqs: ['Pirate\'s Treasure', 'Rum Deal'], points: 2, series: 'Pirate',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Clock Tower': {
    id: 'Clock Tower', name: 'Clock Tower',
    regions: ['East Ardougne'], // South of Ardougne
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Cold War': {
    id: 'Cold War', name: 'Cold War',
    regions: ['Rellekka', 'Ardougne Zoo'],
    skills: { 'Hunter': 10, 'Agility': 30, 'Crafting': 30, 'Construction': 34 }, prereqs: [], points: 1, series: 'Penguin',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Contact!': {
    id: 'Contact!', name: 'Contact!',
    regions: ['Sophanem', 'Kharidian Desert'],
    skills: {}, prereqs: ['Prince Ali Rescue', 'Icthlarin\'s Little Helper'], points: 1, series: 'Desert',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Creature of Fenkenstrain': {
    id: 'Creature of Fenkenstrain', name: 'Creature of Fenkenstrain',
    regions: ['Fenkenstrain\'s Castle', 'Canifis'],
    skills: { 'Crafting': 20, 'Thieving': 25 }, prereqs: ['Priest in Peril', 'The Restless Ghost'], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Death Plateau': {
    id: 'Death Plateau', name: 'Death Plateau',
    regions: ['Burthorpe', 'Trollheim'],
    skills: {}, prereqs: [], points: 1, series: 'Troll',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Death to the Dorgeshuun': {
    id: 'Death to the Dorgeshuun', name: 'Death to the Dorgeshuun',
    regions: ['Lumbridge', 'Dorgesh-Kaan'],
    skills: { 'Agility': 23, 'Thieving': 23 }, prereqs: ['The Lost Tribe'], points: 1, series: 'Dorgeshuun',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Desert Treasure I': {
    id: 'Desert Treasure I', name: 'Desert Treasure I',
    regions: ['Al Kharid', 'Bandit Camp', 'Canifis', 'Ice Mountain', 'Trollheim', 'Wilderness'],
    skills: { 'Thieving': 53, 'Firemaking': 50, 'Slayer': 10, 'Magic': 50 }, prereqs: ['The Dig Site', 'Temple of Ikov', 'The Tourist Trap', 'Troll Stronghold', 'Priest in Peril', 'Waterfall Quest'], points: 3, series: 'Mahjarrat',
    difficulty: DropSource.QUEST_MASTER
  },
  'Desert Treasure II': {
    id: 'Desert Treasure II', name: 'Desert Treasure II',
    regions: ['The Stranglewood', 'Ghorrock', 'The Scar', 'Lassar'],
    skills: { 'Magic': 75, 'Firemaking': 75, 'Thieving': 70, 'Herblore': 62, 'Runecraft': 60, 'Construction': 60, 'Prayer': 60 }, prereqs: ['Desert Treasure I', 'Secrets of the North', 'Enakhra\'s Lament', 'Temple of the Eye', 'The Garden of Death', 'Below Ice Mountain'], points: 5, series: 'Mahjarrat',
    difficulty: DropSource.QUEST_GRANDMASTER
  },
  'Devious Minds': {
    id: 'Devious Minds', name: 'Devious Minds',
    regions: ['Paterdomus', 'Entrana', 'Burthorpe'],
    skills: { 'Smithing': 65, 'Runecraft': 50, 'Fletching': 50 }, prereqs: ['Doric\'s Quest', 'Troll Stronghold', 'Wanted!', 'Enter the Abyss'], points: 1,
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Dream Mentor': {
    id: 'Dream Mentor', name: 'Dream Mentor',
    regions: ['Lunar Isle'],
    skills: { 'Combat': 85 }, prereqs: ['Lunar Diplomacy', 'Eadgar\'s Ruse'], points: 2, series: 'Fremennik',
    difficulty: DropSource.QUEST_MASTER
  },
  'Dwarf Cannon': {
    id: 'Dwarf Cannon', name: 'Dwarf Cannon',
    regions: ['Fishing Guild', 'Ice Mountain'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Eadgar\'s Ruse': {
    id: 'Eadgar\'s Ruse', name: 'Eadgar\'s Ruse',
    regions: ['Trollheim', 'Burthorpe'],
    skills: { 'Herblore': 31 }, prereqs: ['Druidic Ritual', 'Troll Stronghold'], points: 1, series: 'Troll',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Eagles\' Peak': {
    id: 'Eagles\' Peak', name: 'Eagles\' Peak',
    regions: ['Piscatoris Fishing Colony', 'East Ardougne'],
    skills: { 'Hunter': 27 }, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Elemental Workshop I': {
    id: 'Elemental Workshop I', name: 'Elemental Workshop I',
    regions: ['Seers\' Village'],
    skills: { 'Mining': 20, 'Smithing': 20, 'Crafting': 20 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Elemental Workshop II': {
    id: 'Elemental Workshop II', name: 'Elemental Workshop II',
    regions: ['Seers\' Village'],
    skills: { 'Magic': 20, 'Smithing': 30 }, prereqs: ['Elemental Workshop I'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Enakhra\'s Lament': {
    id: 'Enakhra\'s Lament', name: 'Enakhra\'s Lament',
    regions: ['Kharidian Desert'],
    skills: { 'Crafting': 50, 'Firemaking': 45, 'Magic': 39, 'Mining': 45, 'Prayer': 43 }, prereqs: [], points: 2, series: 'Desert',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Enlightened Journey': {
    id: 'Enlightened Journey', name: 'Enlightened Journey',
    regions: ['Entrana', 'Taverley', 'Varrock'],
    skills: { 'Firemaking': 20, 'Farming': 30, 'Crafting': 36 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Family Crest': {
    id: 'Family Crest', name: 'Family Crest',
    regions: ['Varrock', 'Al Kharid', 'Falador', 'Dwarven Mine', 'Witchaven'],
    skills: { 'Mining': 40, 'Smithing': 40, 'Magic': 59, 'Crafting': 40 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Fight Arena': {
    id: 'Fight Arena', name: 'Fight Arena',
    regions: ['Yanille'],
    skills: {}, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Fishing Contest': {
    id: 'Fishing Contest', name: 'Fishing Contest',
    regions: ['Hemester', 'Catherby'],
    skills: { 'Fishing': 10 }, prereqs: [], points: 1, series: 'Dwarf',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Forgettable Tale...': {
    id: 'Forgettable Tale...', name: 'Forgettable Tale of a Drunken Dwarf',
    regions: ['Keldagrim'],
    skills: { 'Cooking': 22, 'Farming': 17 }, prereqs: ['The Giant Dwarf', 'Fishing Contest'], points: 2, series: 'Dwarf',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Garden of Tranquillity': {
    id: 'Garden of Tranquillity', name: 'Garden of Tranquillity',
    regions: ['Varrock'],
    skills: { 'Farming': 25 }, prereqs: ['Creature of Fenkenstrain'], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Garden of Death': {
    id: 'The Garden of Death', name: 'The Garden of Death',
    regions: ['Kebos Lowlands'],
    skills: { 'Farming': 20 }, prereqs: [], points: 1, series: 'Kourend',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Gertrude\'s Cat': {
    id: 'Gertrude\'s Cat', name: 'Gertrude\'s Cat',
    regions: ['Varrock'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'The Giant Dwarf': {
    id: 'The Giant Dwarf', name: 'The Giant Dwarf',
    regions: ['Keldagrim'],
    skills: { 'Crafting': 12, 'Firemaking': 16, 'Magic': 33, 'Thieving': 14, 'Mining': 20, 'Smithing': 20 }, prereqs: [], points: 2, series: 'Dwarf',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Great Brain Robbery': {
    id: 'The Great Brain Robbery', name: 'The Great Brain Robbery',
    regions: ['Mos Le\'Harmless', 'Harmony Island', 'Port Phasmatys'],
    skills: { 'Crafting': 16, 'Construction': 30, 'Prayer': 50 }, prereqs: ['Creature of Fenkenstrain', 'Cabin Fever'], points: 2, series: 'Pirate',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Grim Tales': {
    id: 'Grim Tales', name: 'Grim Tales',
    regions: ['Taverley', 'White Wolf Mountain', 'Keldagrim'],
    skills: { 'Farming': 45, 'Herblore': 52, 'Thieving': 58, 'Agility': 59, 'Woodcutting': 71 }, prereqs: ['Witch\'s House'], points: 1,
    difficulty: DropSource.QUEST_MASTER
  },
  'Hand in the Sand': {
    id: 'Hand in the Sand', name: 'The Hand in the Sand',
    regions: ['Yanille', 'Brimhaven'],
    skills: { 'Thieving': 17, 'Crafting': 49 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Haunted Mine': {
    id: 'Haunted Mine', name: 'Haunted Mine',
    regions: ['Mort Myre Swamp'],
    skills: { 'Agility': 15, 'Runecraft': 35 }, prereqs: ['Priest in Peril'], points: 2,
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Hazeel Cult': {
    id: 'Hazeel Cult', name: 'Hazeel Cult',
    regions: ['East Ardougne'],
    skills: {}, prereqs: ['Sheep Herder'], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Heroes\' Quest': {
    id: 'Heroes\' Quest', name: 'Heroes\' Quest',
    regions: ['Heroes\' Guild', 'Taverley', 'Entrana', 'Karamja'],
    skills: { 'Cooking': 53, 'Fishing': 53, 'Herblore': 25, 'Mining': 50, 'Quest Points': 55 }, prereqs: ['Shield of Arrav', 'Lost City', 'Merlin\'s Crystal', 'Dragon Slayer I', 'Druidic Ritual'], points: 1, series: 'Guild',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Horror from the Deep': {
    id: 'Horror from the Deep', name: 'Horror from the Deep',
    regions: ['Lighthouse', 'Rellekka'],
    skills: { 'Agility': 35 }, prereqs: ['Alfred Grimhand\'s Barcrawl'], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Icthlarin\'s Little Helper': {
    id: 'Icthlarin\'s Little Helper', name: 'Icthlarin\'s Little Helper',
    regions: ['Sophanem'],
    skills: {}, prereqs: ['Gertrude\'s Cat'], points: 2, series: 'Desert',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Legends\' Quest': {
    id: 'Legends\' Quest', name: 'Legends\' Quest',
    regions: ['Legends\' Guild', 'Shilo Village', 'Kharazi Jungle'],
    skills: { 'Agility': 50, 'Crafting': 50, 'Herblore': 45, 'Magic': 56, 'Mining': 52, 'Prayer': 42, 'Smithing': 50, 'Strength': 50, 'Thieving': 50, 'Woodcutting': 50, 'Quest Points': 107 }, prereqs: ['Family Crest', 'Heroes\' Quest', 'Shilo Village', 'Underground Pass', 'Waterfall Quest'], points: 4, series: 'Guild',
    difficulty: DropSource.QUEST_MASTER
  },
  'The Lost Tribe': {
    id: 'The Lost Tribe', name: 'The Lost Tribe',
    regions: ['Lumbridge', 'Dorgesh-Kaan'],
    skills: { 'Agility': 13, 'Thieving': 13, 'Mining': 17 }, prereqs: ['Goblin Diplomacy'], points: 1, series: 'Dorgeshuun',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Making Friends with My Arm': {
    id: 'Making Friends with My Arm', name: 'Making Friends with My Arm',
    regions: ['Trollheim', 'Weiss', 'Rellekka'],
    skills: { 'Firemaking': 66, 'Mining': 72, 'Construction': 35, 'Agility': 68 }, prereqs: ['My Arm\'s Big Adventure', 'Romeo & Juliet', 'Swan Song', 'Cold War'], points: 2, series: 'Troll',
    difficulty: DropSource.QUEST_MASTER
  },
  'Making History': {
    id: 'Making History', name: 'Making History',
    regions: ['East Ardougne', 'Rellekka', 'Port Phasmatys'],
    skills: { 'Quest Points': 3, 'Crafting': 18 }, prereqs: ['Priest in Peril', 'The Restless Ghost'], points: 3,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Monk\'s Friend': {
    id: 'Monk\'s Friend', name: 'Monk\'s Friend',
    regions: ['East Ardougne'], // South of it
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Mountain Daughter': {
    id: 'Mountain Daughter', name: 'Mountain Daughter',
    regions: ['Fremennik'], // Mountain Camp
    skills: { 'Agility': 20 }, prereqs: ['The Fremennik Trials'], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Murder Mystery': {
    id: 'Murder Mystery', name: 'Murder Mystery',
    regions: ['Seers\' Village'], // Sinclair Mansion
    skills: {}, prereqs: [], points: 3, series: 'Camelot',
    difficulty: DropSource.QUEST_NOVICE
  },
  'My Arm\'s Big Adventure': {
    id: 'My Arm\'s Big Adventure', name: 'My Arm\'s Big Adventure',
    regions: ['Trollheim', 'Tai Bwo Wannai'],
    skills: { 'Woodcutting': 10, 'Farming': 29 }, prereqs: ['Eadgar\'s Ruse', 'The Feud', 'Jungle Potion'], points: 1, series: 'Troll',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'A Night at the Theatre': {
    id: 'A Night at the Theatre', name: 'A Night at the Theatre',
    regions: ['Theatre of Blood'],
    skills: {}, prereqs: ['A Taste of Hope'], points: 2, series: 'Myreque',
    difficulty: DropSource.QUEST_MASTER
  },
  'Observatory Quest': {
    id: 'Observatory Quest', name: 'Observatory Quest',
    regions: ['Castle Wars'], // Observatory
    skills: { 'Crafting': 10 }, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Olaf\'s Quest': {
    id: 'Olaf\'s Quest', name: 'Olaf\'s Quest',
    regions: ['Rellekka'],
    skills: { 'Firemaking': 40, 'Woodcutting': 50 }, prereqs: ['The Fremennik Trials'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'A Porcine of Interest': {
    id: 'A Porcine of Interest', name: 'A Porcine of Interest',
    regions: ['Draynor Village'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Rag and Bone Man I': {
    id: 'Rag and Bone Man I', name: 'Rag and Bone Man I',
    regions: ['Varrock'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Rag and Bone Man II': {
    id: 'Rag and Bone Man II', name: 'Rag and Bone Man II',
    regions: ['Varrock'], // Global hunt
    skills: { 'Slayer': 40, 'Defence': 20 }, prereqs: ['Rag and Bone Man I', 'Skippy and the Mogres'], points: 1,
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Ratcatchers': {
    id: 'Ratcatchers', name: 'Ratcatchers',
    regions: ['Varrock', 'East Ardougne', 'Keldagrim', 'Pollnivneach'],
    skills: { 'Thieving': 32, 'Herblore': 32 }, prereqs: ['Icthlarin\'s Little Helper'], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Royal Trouble': {
    id: 'Royal Trouble', name: 'Royal Trouble',
    regions: ['Miscellania & Etceteria'],
    skills: { 'Agility': 40, 'Slayer': 40 }, prereqs: ['Throne of Miscellania'], points: 1, series: 'Fremennik',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Rum Deal': {
    id: 'Rum Deal', name: 'Rum Deal',
    regions: ['Mos Le\'Harmless', 'Port Phasmatys'],
    skills: { 'Farming': 40, 'Prayer': 47, 'Fishing': 50, 'Crafting': 42, 'Slayer': 42 }, prereqs: ['Zogre Flesh Eaters', 'Priest in Peril'], points: 2, series: 'Pirate',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Scorpion Catcher': {
    id: 'Scorpion Catcher', name: 'Scorpion Catcher',
    regions: ['Seers\' Village', 'Taverley', 'Al Kharid'],
    skills: { 'Prayer': 31 }, prereqs: ['Alfred Grimhand\'s Barcrawl'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Sea Slug': {
    id: 'Sea Slug', name: 'Sea Slug',
    regions: ['Fishing Platform', 'Witchaven'],
    skills: { 'Firemaking': 30 }, prereqs: [], points: 1, series: 'Temple Knights',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Secrets of the North': {
    id: 'Secrets of the North', name: 'Secrets of the North',
    regions: ['Weiss', 'East Ardougne', 'Ghorrock'],
    skills: { 'Agility': 69, 'Thieving': 64, 'Hunter': 56 }, prereqs: ['Making Friends with My Arm', 'Hazeel Cult', 'The General\'s Shadow', 'Devious Minds'], points: 2, series: 'Mahjarrat',
    difficulty: DropSource.QUEST_MASTER
  },
  'Shadow of the Storm': {
    id: 'Shadow of the Storm', name: 'Shadow of the Storm',
    regions: ['Ruins of Uzer'],
    skills: { 'Crafting': 30 }, prereqs: ['The Golem', 'Demon Slayer'], points: 1, series: 'Desert',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Sheep Herder': {
    id: 'Sheep Herder', name: 'Sheep Herder',
    regions: ['East Ardougne'],
    skills: {}, prereqs: ['Plague City'], points: 4, series: 'Elf',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Sleeping Giants': {
    id: 'Sleeping Giants', name: 'Sleeping Giants',
    regions: ['Al Kharid'], // Giants Foundry
    skills: { 'Smithing': 15 }, prereqs: [], points: 1, series: 'Desert',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'A Soul\'s Bane': {
    id: 'A Soul\'s Bane', name: 'A Soul\'s Bane',
    regions: ['Digsite'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Spirits of the Elid': {
    id: 'Spirits of the Elid', name: 'Spirits of the Elid',
    regions: ['Nardah'],
    skills: { 'Magic': 33, 'Ranged': 37, 'Mining': 37, 'Thieving': 37 }, prereqs: [], points: 2, series: 'Desert',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Swan Song': {
    id: 'Swan Song', name: 'Swan Song',
    regions: ['Piscatoris Fishing Colony'],
    skills: { 'Quest Points': 100, 'Magic': 66, 'Cooking': 62, 'Fishing': 62, 'Smithing': 45, 'Firemaking': 42, 'Crafting': 40 }, prereqs: ['One Small Favour', 'Garden of Tranquillity'], points: 2,
    difficulty: DropSource.QUEST_MASTER
  },
  'A Tail of Two Cats': {
    id: 'A Tail of Two Cats', name: 'A Tail of Two Cats',
    regions: ['Burthorpe'],
    skills: {}, prereqs: ['Icthlarin\'s Little Helper'], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Tears of Guthix': {
    id: 'Tears of Guthix', name: 'Tears of Guthix',
    regions: ['Lumbridge Swamp'], // Caves
    skills: { 'Quest Points': 43, 'Firemaking': 49, 'Crafting': 20, 'Mining': 20 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Temple of Ikov': {
    id: 'Temple of Ikov', name: 'Temple of Ikov',
    regions: ['East Ardougne'], // North of it
    skills: { 'Thieving': 42, 'Ranged': 40 }, prereqs: [], points: 1, series: 'Mahjarrat',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Temple of the Eye': {
    id: 'Temple of the Eye', name: 'Temple of the Eye',
    regions: ['Al Kharid'],
    skills: { 'Runecraft': 10 }, prereqs: ['Enter the Abyss'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Chosen Commander': {
    id: 'The Chosen Commander', name: 'The Chosen Commander',
    regions: ['Dorgesh-Kaan'],
    skills: { 'Agility': 46, 'Strength': 46, 'Thieving': 46 }, prereqs: ['Land of the Goblins'], points: 3, series: 'Dorgeshuun',
    difficulty: DropSource.QUEST_MASTER
  },
  'The Dig Site': {
    id: 'The Dig Site', name: 'The Dig Site',
    regions: ['Digsite'],
    skills: { 'Agility': 10, 'Herblore': 10, 'Thieving': 25 }, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Eyes of Glouphrie': {
    id: 'The Eyes of Glouphrie', name: 'The Eyes of Glouphrie',
    regions: ['Tree Gnome Stronghold'],
    skills: { 'Construction': 5, 'Magic': 46 }, prereqs: ['The Grand Tree'], points: 2, series: 'Gnome',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Feud': {
    id: 'The Feud', name: 'The Feud',
    regions: ['Pollnivneach', 'Al Kharid'],
    skills: { 'Thieving': 30 }, prereqs: [], points: 1, series: 'Desert',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Golem': {
    id: 'The Golem', name: 'The Golem',
    regions: ['Ruins of Uzer', 'Al Kharid'],
    skills: { 'Crafting': 20, 'Thieving': 25 }, prereqs: [], points: 1, series: 'Desert',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Path of Glouphrie': {
    id: 'The Path of Glouphrie', name: 'The Path of Glouphrie',
    regions: ['Tree Gnome Village', 'Poison Waste'],
    skills: { 'Strength': 60, 'Slayer': 56, 'Thieving': 56, 'Ranged': 47, 'Agility': 45 }, prereqs: ['The Eyes of Glouphrie', 'Waterfall Quest'], points: 2, series: 'Gnome',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'The Slug Menace': {
    id: 'The Slug Menace', name: 'The Slug Menace',
    regions: ['Witchaven'],
    skills: { 'Crafting': 30, 'Runecraft': 30, 'Slayer': 30, 'Thieving': 30 }, prereqs: ['Sea Slug', 'Wanted!'], points: 1, series: 'Temple Knights',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Throne of Miscellania': {
    id: 'Throne of Miscellania', name: 'Throne of Miscellania',
    regions: ['Miscellania & Etceteria'],
    skills: { 'Woodcutting': 45, 'Farming': 10, 'Mining': 30, 'Fishing': 35 }, prereqs: ['The Fremennik Trials', 'Heroes\' Quest'], points: 1, series: 'Fremennik',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Tower of Life': {
    id: 'Tower of Life', name: 'Tower of Life',
    regions: ['East Ardougne'],
    skills: { 'Construction': 10 }, prereqs: [], points: 2,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Tribal Totem': {
    id: 'Tribal Totem', name: 'Tribal Totem',
    regions: ['Brimhaven'],
    skills: { 'Thieving': 21 }, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Troll Romance': {
    id: 'Troll Romance', name: 'Troll Romance',
    regions: ['Trollheim'],
    skills: { 'Agility': 28 }, prereqs: ['Troll Stronghold'], points: 2, series: 'Troll',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Troll Stronghold': {
    id: 'Troll Stronghold', name: 'Troll Stronghold',
    regions: ['Trollheim', 'Burthorpe'],
    skills: { 'Agility': 15 }, prereqs: ['Death Plateau'], points: 1, series: 'Troll',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Wanted!': {
    id: 'Wanted!', name: 'Wanted!',
    regions: ['Falador'],
    skills: { 'Quest Points': 32, 'Slayer': 20 }, prereqs: ['Recruitment Drive', 'The Lost Tribe', 'Priest in Peril'], points: 1, series: 'Temple Knights',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Watchtower': {
    id: 'Watchtower', name: 'Watchtower',
    regions: ['Yanille'],
    skills: { 'Magic': 14, 'Thieving': 15, 'Agility': 25, 'Herblore': 14, 'Mining': 40 }, prereqs: [], points: 4, series: 'Ogre',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'What Lies Below': {
    id: 'What Lies Below', name: 'What Lies Below',
    regions: ['Varrock'],
    skills: { 'Runecraft': 35 }, prereqs: ['Rune Mysteries'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'While Guthix Sleeps': {
    id: 'While Guthix Sleeps', name: 'While Guthix Sleeps',
    regions: ['Falador', 'Brimhaven', 'Varrock', 'Wilderness'],
    skills: { 'Thieving': 72, 'Magic': 67, 'Herblore': 65, 'Agility': 66, 'Farming': 65, 'Hunter': 62 }, prereqs: ['Defender of Varrock', 'The Path of Glouphrie', 'Fight Arena', 'Dream Mentor', 'Hand in the Sand', 'Wanted!', 'Temple of the Eye', 'Tears of Guthix', 'Nature Spirit', 'A Tail of Two Cats'], points: 5, series: 'Mahjarrat',
    difficulty: DropSource.QUEST_GRANDMASTER
  },
  'Witch\'s House': {
    id: 'Witch\'s House', name: 'Witch\'s House',
    regions: ['Taverley'],
    skills: {}, prereqs: [], points: 4,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Zogre Flesh Eaters': {
    id: 'Zogre Flesh Eaters', name: 'Zogre Flesh Eaters',
    regions: ['Feldip Hills'],
    skills: { 'Smithing': 4, 'Herblore': 8, 'Ranged': 30 }, prereqs: ['Big Chompy Bird Hunting', 'Jungle Potion'], points: 1, series: 'Ogre',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Children of the Sun': {
    id: 'Children of the Sun', name: 'Children of the Sun',
    regions: ['Varrock'],
    skills: {}, prereqs: [], points: 1, series: 'Twilight Emissaries',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Twilight\'s Promise': {
    id: 'Twilight\'s Promise', name: 'Twilight\'s Promise',
    regions: ['Civitas illa Fortis'],
    skills: { 'Thieving': 20 }, prereqs: ['Children of the Sun'], points: 1, series: 'Twilight Emissaries',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Perilous Moons': {
    id: 'Perilous Moons', name: 'Perilous Moons',
    regions: ['Cam Torum'],
    skills: { 'Hunter': 20, 'Slayer': 48, 'Fishing': 20, 'Runecraft': 20, 'Construction': 10 }, prereqs: ['Twilight\'s Promise'], points: 2, series: 'Varlamore',
    difficulty: DropSource.QUEST_MASTER
  },
  'At First Light': {
    id: 'At First Light', name: 'At First Light',
    regions: ['Hunter\'s Guild'],
    skills: { 'Hunter': 46, 'Herblore': 30, 'Construction': 27 }, prereqs: ['Children of the Sun'], points: 1, series: 'Varlamore',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Ribbiting Tale of a Lily Pad Labour Dispute': {
    id: 'The Ribbiting Tale', name: 'The Ribbiting Tale of a Lily Pad Labour Dispute',
    regions: ['Aldarin'],
    skills: { 'Woodcutting': 15 }, prereqs: ['Children of the Sun'], points: 1, series: 'Varlamore',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Meat and Greet': {
    id: 'Meat and Greet', name: 'Meat and Greet',
    regions: ['The Stranglewood'],
    skills: {}, prereqs: ['Children of the Sun'], points: 1, series: 'Varlamore',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Ethically Acquired Antiquities': {
    id: 'Ethically Acquired Antiquities', name: 'Ethically Acquired Antiquities',
    regions: ['Civitas illa Fortis'],
    skills: { 'Thieving': 25 }, prereqs: ['Children of the Sun', 'Shield of Arrav'], points: 1, series: 'Varlamore',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Death on the Isle': {
    id: 'Death on the Isle', name: 'Death on the Isle',
    regions: ['Civitas illa Fortis'],
    skills: { 'Agility': 32, 'Thieving': 34 }, prereqs: ['Children of the Sun'], points: 2, series: 'Varlamore',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'The Heart of Darkness': {
    id: 'The Heart of Darkness', name: 'The Heart of Darkness',
    regions: ['Cam Torum'],
    skills: { 'Mining': 55, 'Thieving': 48, 'Slayer': 48, 'Agility': 46 }, prereqs: ['Twilight\'s Promise', 'Meat and Greet'], points: 2, series: 'Twilight Emissaries',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'The Final Dawn': {
    id: 'The Final Dawn', name: 'The Final Dawn',
    regions: ['Varlamore'],
    skills: { 'Thieving': 66, 'Runecraft': 52, 'Fletching': 52 },
    prereqs: ['The Heart of Darkness', 'Perilous Moons'], points: 3, series: 'Twilight Emissaries',
    difficulty: DropSource.QUEST_MASTER
  },
  'Shadows of Custodia': {
    id: 'Shadows of Custodia', name: 'Shadows of Custodia',
    regions: ['Varlamore'],
    skills: { 'Slayer': 54, 'Fishing': 45, 'Construction': 41, 'Hunter': 36 }, prereqs: ['Children of the Sun'], points: 2,
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Scrambled!': {
    id: 'Scrambled!', name: 'Scrambled!',
    regions: ['Misthalin'],
    skills: { 'Cooking': 36, 'Smithing': 35, 'Construction': 38 }, prereqs: ['Children of the Sun'], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Pandemonium': {
    id: 'Pandemonium', name: 'Pandemonium',
    regions: ['The Open Seas'],
    skills: {}, prereqs: [], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Prying Times': {
    id: 'Prying Times', name: 'Prying Times',
    regions: ['Misthalin'],
    skills: { 'Sailing': 12, 'Smithing': 30 }, prereqs: ['Pandemonium', 'The Knight\'s Sword'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Current Affairs': {
    id: 'Current Affairs', name: 'Current Affairs',
    regions: ['The Open Seas'],
    skills: { 'Fishing': 10, 'Sailing': 22 }, prereqs: ['Pandemonium'], points: 1,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Troubled Tortugans': {
    id: 'Troubled Tortugans', name: 'Troubled Tortugans',
    regions: ['The Open Seas'],
    skills: { 'Slayer': 51, 'Construction': 48, 'Sailing': 45, 'Hunter': 45, 'Woodcutting': 40, 'Crafting': 34 }, prereqs: ['Pandemonium'], points: 1, series: 'Tortugan',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Beneath Cursed Sands': {
    id: 'Beneath Cursed Sands', name: 'Beneath Cursed Sands',
    regions: ['Kharidian Desert'],
    skills: { 'Agility': 62, 'Crafting': 55, 'Firemaking': 55 }, prereqs: ['Contact!'], points: 2, series: 'Kharidian',
    difficulty: DropSource.QUEST_MASTER
  },
  'Bone Voyage': {
    id: 'Bone Voyage', name: 'Bone Voyage',
    regions: ['Misthalin', 'Islands & Others'],
    skills: {}, prereqs: ['The Dig Site'], points: 1,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Shades of Mort\'ton': {
    id: 'Shades of Mort\'ton', name: 'Shades of Mort\'ton',
    regions: ['Morytania'],
    skills: { 'Crafting': 20, 'Herblore': 15, 'Firemaking': 5 }, prereqs: ['Priest in Peril'], points: 3,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Lunar Diplomacy': {
    id: 'Lunar Diplomacy', name: 'Lunar Diplomacy',
    regions: ['Fremennik'],
    skills: { 'Crafting': 61, 'Defence': 40, 'Firemaking': 49, 'Magic': 65, 'Mining': 60, 'Woodcutting': 55 }, prereqs: ['The Fremennik Trials', 'Lost City', 'Rune Mysteries', 'Shilo Village'], points: 2, series: 'Fremennik',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'The Curse of Arrav': {
    id: 'The Curse of Arrav', name: 'The Curse of Arrav',
    regions: ['Varrock', 'Morytania', 'Trollheim'],
    skills: { 'Mining': 64, 'Ranged': 62, 'Thieving': 62, 'Agility': 61, 'Strength': 58, 'Attack': 50, 'Slayer': 37 },
    prereqs: ['Defender of Varrock', 'Troll Romance', 'The General\'s Shadow'],
    points: 2, series: 'Mahjarrat',
    difficulty: DropSource.QUEST_MASTER
  },
  'Defender of Varrock': {
    id: 'Defender of Varrock', name: 'Defender of Varrock',
    regions: ['Varrock', 'Wilderness'], skills: { 'Smithing': 55, 'Hunter': 52, 'Mining': 50 }, prereqs: ['Romeo & Juliet', 'Demon Slayer', 'Shield of Arrav', 'Temple of Ikov', 'Below Ice Mountain', 'Family Crest', 'Garden of Tranquillity', 'What Lies Below'], points: 2, series: 'Mahjarrat',
    difficulty: DropSource.QUEST_EXPERIENCED
  },
  'Land of the Goblins': {
    id: 'Land of the Goblins', name: 'Land of the Goblins',
    regions: ['Hemester', 'Dorgesh-Kaan'], skills: { 'Agility': 38, 'Fishing': 40, 'Thieving': 45, 'Herblore': 48 }, prereqs: ['Another Slice of H.A.M.', 'Fishing Contest'], points: 2, series: 'Dorgeshuun',
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  // ============================================================================
  // MINIQUESTS
  // ============================================================================
  'Enter the Abyss': {
    id: 'Enter the Abyss', name: 'Enter the Abyss',
    regions: ['Varrock', 'Wilderness'], skills: {}, prereqs: ['Rune Mysteries'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Alfred Grimhand\'s Barcrawl': {
    id: 'Barcrawl', name: 'Alfred Grimhand\'s Barcrawl',
    regions: ['Barbarian Outpost'], skills: {}, prereqs: [], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Bear Your Soul': {
    id: 'Bear Your Soul', name: 'Bear Your Soul',
    regions: ['Arceuus'], skills: {}, prereqs: [], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Curse of the Empty Lord': {
    id: 'Curse of the Empty Lord', name: 'Curse of the Empty Lord',
    regions: ['Wilderness'], skills: {}, prereqs: ['Desert Treasure I'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Daddy\'s Home': {
    id: 'Daddy\'s Home', name: 'Daddy\'s Home',
    regions: ['Varrock'], skills: {}, prereqs: [], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Enchanted Key': {
    id: 'Enchanted Key', name: 'The Enchanted Key',
    regions: ['Varrock'], skills: {}, prereqs: ['Making History'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Family Pest': {
    id: 'Family Pest', name: 'Family Pest',
    regions: ['Varrock'], skills: {}, prereqs: ['Family Crest'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Hopespear\'s Will': {
    id: 'Hopespear\'s Will', name: 'Hopespear\'s Will',
    regions: ['Rellekka'], skills: { 'Prayer': 50 }, prereqs: ['The Lost Tribe'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'In Search of Knowledge': {
    id: 'In Search of Knowledge', name: 'In Search of Knowledge',
    regions: ['Arceuus'], skills: {}, prereqs: ['Client of Kourend'], points: 0, series: 'Kourend',
    difficulty: DropSource.QUEST_NOVICE
  },
  'Into the Tombs': {
    id: 'Into the Tombs', name: 'Into the Tombs',
    regions: ['Kharidian Desert'], skills: {}, prereqs: ['Beneath Cursed Sands'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Lair of Tarn Razorlor': {
    id: 'Lair of Tarn Razorlor', name: 'Lair of Tarn Razorlor',
    regions: ['Haunted Mine'], skills: { 'Slayer': 40 }, prereqs: ['Haunted Mine'], points: 0,
    difficulty: DropSource.QUEST_INTERMEDIATE
  },
  'Mage Arena I': {
    id: 'Mage Arena I', name: 'Mage Arena I',
    regions: ['Wilderness'], skills: { 'Magic': 60 }, prereqs: [], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Mage Arena II': {
    id: 'Mage Arena II', name: 'Mage Arena II',
    regions: ['Wilderness'], skills: { 'Magic': 75 }, prereqs: ['Mage Arena I'], points: 0,
    difficulty: DropSource.QUEST_MASTER
  },
  'His Faithful Servants': {
    id: 'His Faithful Servants', name: 'His Faithful Servants',
    regions: ['Barrows'], skills: {}, prereqs: ['Priest in Peril'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Barbarian Training': {
    id: 'Barbarian Training', name: 'Barbarian Training',
    regions: ['Otto\'s Grotto'], skills: {}, prereqs: ['Tai Bwo Wannai Trio'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'The Frozen Door': {
    id: 'The Frozen Door', name: 'The Frozen Door',
    regions: ['God Wars Dungeon'], skills: { 'Agility': 70, 'Strength': 70, 'Hitpoints': 70, 'Ranged': 70 }, prereqs: ['Desert Treasure I'], points: 0,
    difficulty: DropSource.QUEST_MASTER
  },
  'Vale Totems': {
    id: 'Vale Totems', name: 'Vale Totems',
    regions: ['Varlamore'], skills: {}, prereqs: ['Children of the Sun'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'Skippy and the Mogres': {
    id: 'Skippy and the Mogres', name: 'Skippy and the Mogres',
    regions: ['Mudskipper Point'],
    skills: { 'Cooking': 20 }, prereqs: [], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  },
  'The General\'s Shadow': {
    id: 'The General\'s Shadow', name: 'The General\'s Shadow',
    regions: ['Kharidian Desert', 'East Ardougne'],
    skills: {}, prereqs: ['Curse of the Empty Lord', 'Fight Arena'], points: 0,
    difficulty: DropSource.QUEST_NOVICE
  }
};