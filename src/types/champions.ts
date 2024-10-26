// types/champions.ts
export interface ChampionshipEntry {
    year: string;
    tournament: string;
    champion: string;
    category: 'male' | 'female';
  }
  
  export interface CurrentChampion {
    category: string;
    team: string;
    tournament: string;
  }