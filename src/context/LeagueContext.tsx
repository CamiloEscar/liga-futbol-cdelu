import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { Team, Player, Match, NewsItem } from '../types';
import { teams, players, matches, news } from '../data/mockData1era';
// import { teamsF, playersF, matchesF, newsF } from '../data/mockDataFem';
// import { teams3, players3, matches3, news3 } from '../data/mockData3era';
// import { teams4, players4, matches4, news4 } from '../data/mockData4ta';


interface LeagueState {
  teams: Team[];
  players: Player[];
  matches: Match[];
  news: NewsItem[];
  loading: boolean;
  error: string | null;
}

type LeagueAction = 
  | { type: 'SET_LOADING' }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'UPDATE_MATCHES'; payload: Match[] }
  | { type: 'UPDATE_MATCH'; payload: Match }
  | { type: 'UPDATE_TEAMS'; payload: Team[] }
  | { type: 'UPDATE_PLAYERS'; payload: Player[] }
  | { type: 'UPDATE_NEWS'; payload: NewsItem[] };

const initialState: LeagueState = {
  teams,
  players,
  matches,
  news,
  loading: false,
  error: null,
};

const LeagueContext = createContext<{
  state: LeagueState;
  dispatch: React.Dispatch<LeagueAction>;
} | undefined>(undefined);

function leagueReducer(state: LeagueState, action: LeagueAction): LeagueState {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: true, error: null };
    case 'SET_ERROR':
      return { ...state, loading: false, error: action.payload };
    case 'UPDATE_MATCHES':
      return { ...state, matches: action.payload, loading: false };
    case 'UPDATE_MATCH':
      return {
        ...state,
        matches: state.matches.map(match =>
          match.id === action.payload.id ? action.payload : match
        ),
      };
    case 'UPDATE_TEAMS':
      return { ...state, teams: action.payload, loading: false };
    case 'UPDATE_PLAYERS':
      return { ...state, players: action.payload, loading: false };
    case 'UPDATE_NEWS':
      return { ...state, news: action.payload, loading: false };
    default:
      return state;
  }
}

export function LeagueProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(leagueReducer, initialState);

  // Simulate real-time updates for live matches
  useEffect(() => {
    const updateLiveMatches = () => {
      const liveMatches = state.matches.filter(match => match.status === 'live');
      liveMatches.forEach(match => {
        if (match.homeScore !== undefined && match.awayScore !== undefined) {
          const updatedMatch = {
            ...match,
            homeScore: Math.random() > 0.8 ? match.homeScore + 1 : match.homeScore,
            awayScore: Math.random() > 0.8 ? match.awayScore + 1 : match.awayScore,
          };
          dispatch({ type: 'UPDATE_MATCH', payload: updatedMatch });
        }
      });
    };

    const interval = setInterval(updateLiveMatches, 30000);
    return () => clearInterval(interval);
  }, [state.matches]);

  return (
    <LeagueContext.Provider value={{ state, dispatch }}>
      {children}
    </LeagueContext.Provider>
  );
}

export function useLeague() {
  const context = useContext(LeagueContext);
  if (context === undefined) {
    throw new Error('useLeague must be used within a LeagueProvider');
  }
  return context;
}