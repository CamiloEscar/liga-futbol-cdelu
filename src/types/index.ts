export type MatchStatus = 'upcoming' | 'live' | 'completed';
export type Position = 'Arquero' | 'Defensor' | 'Mediocampista' | 'Delantero';
export type TeamStatistic = 'points' | 'goalsFor' | 'goalsAgainst' | 'won' | 'drawn' | 'lost';

export interface Team {
  id: string;
  name: string;
  shortName?: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  goalDifference: number;
  points: number;
  stadium: string;
  founded?: string;
  logo?: string;
}

export interface Player {
  id: string;
  name: string;
  teamId: string;
  position: Position;
  number: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  image: string;
  nationality?: string;
  age?: number;
  marketValue?: string;
}

export interface Scorer {
  team: 'home' | 'away';
  player: string;
  minute: number;
  type?: 'goal' | 'penalty' | 'ownGoal';
}

export interface Match {
  id: string;
  homeTeam: string;
  awayTeam: string;
  date: string;
  time: string;
  venue: string;
  status: MatchStatus;
  competition: string;
  matchday?: number;
  ticketPrice: string | null;
  referee: string;
  assistantReferee1: string;
  assistantReferee2: string;
  fourthOfficial: string;
  homeScore: number | null;
  awayScore: number | null;
  weather?: string;
  capacity?: string;
  attendance?: string;
  scorers?: Scorer[];
  yellowCards?: string[];
  redCards?: string[];
  highlights?: string[];
  statistics?: {
    possession: [number, number];
    shots: [number, number];
    shotsOnTarget: [number, number];
    corners: [number, number];
    fouls: [number, number];
    offsides: [number, number];
  };
}

export interface News {
  id: string;
  title: string;
  content: string;
  date: string;
  image: string;
  category: string;
  author?: string;
  tags?: string[];
}