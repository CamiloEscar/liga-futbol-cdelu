// mockData.ts
import { format } from 'date-fns';
import { Team, Player, Match, News } from '../types/index';

// Utilidades
export const generateId = (prefix: string, currentItems: { id: string }[]): string => {
  const maxId = Math.max(...currentItems.map(item => parseInt(item.id)));
  return `${prefix}${(maxId + 1).toString().padStart(3, '0')}`;
};

export const calculateTeamStats = (team: Team): Team => {
  const goalDifference = team.goalsFor - team.goalsAgainst;
  return {
    ...team,
    points: (team.won * 3) + team.drawn,
    played: team.won + team.drawn + team.lost,
    goalDifference
  };
};

export const getTopScorers = (players: Player[], limit: number = 5): Player[] => {
  return [...players]
    .sort((a, b) => b.goals - a.goals)
    .slice(0, limit);
};

export const getTeamForm = (matches: Match[], teamId: string, limit: number = 5): string[] => {
  return matches
    .filter(m => m.status === 'completed' && (m.homeTeam === teamId || m.awayTeam === teamId))
    .slice(-limit)
    .map(m => {
      const isHome = m.homeTeam === teamId;
      const teamScore = isHome ? m.homeScore : m.awayScore;
      const oppositionScore = isHome ? m.awayScore : m.homeScore;
      if (teamScore === null || oppositionScore === null) return 'N';
      return teamScore > oppositionScore ? 'W' : teamScore < oppositionScore ? 'L' : 'D';
    });
};

export const teams: Team[] = [
  {
    id: '1',
    name: 'Club Gimnasia y Esgrima',
    shortName: 'GYE',
    played: 10,
    won: 7,
    drawn: 2,
    lost: 1,
    goalsFor: 22,
    goalsAgainst: 8,
    points: 23,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '2',
    name: 'Club Atlético Almagro',
    played: 10,
    won: 6,
    drawn: 3,
    lost: 1,
    goalsFor: 18,
    goalsAgainst: 7,
    points: 21,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '3',
    name: 'Club Parque Sur',
    played: 10,
    won: 6,
    drawn: 1,
    lost: 3,
    goalsFor: 15,
    goalsAgainst: 10,
    points: 19,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '4',
    name: 'Club Social y Deportivo Agrario Rocamora',
    played: 10,
    won: 5,
    drawn: 2,
    lost: 3,
    goalsFor: 17,
    goalsAgainst: 12,
    points: 17,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '5',
    name: 'Club Atlético Colonia Elia',
    played: 10,
    won: 4,
    drawn: 4,
    lost: 2,
    goalsFor: 14,
    goalsAgainst: 10,
    points: 16,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '6',
    name: 'Club Atletico Engranaje',
    played: 10,
    won: 3,
    drawn: 3,
    lost: 4,
    goalsFor: 11,
    goalsAgainst: 13,
    points: 12,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '7',
    name: 'Club Social y Deportivo Maria Auxiliadora',
    played: 10,
    won: 2,
    drawn: 2,
    lost: 6,
    goalsFor: 8,
    goalsAgainst: 20,
    points: 8,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '8',
    name: 'Club Atlético Lanús',
    played: 10,
    won: 4,
    drawn: 1,
    lost: 5,
    goalsFor: 10,
    goalsAgainst: 15,
    points: 13,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  },
  {
    id: '9',
    name: 'Club Atletico Rivadavia',
    played: 10,
    won: 1,
    drawn: 3,
    lost: 6,
    goalsFor: 7,
    goalsAgainst: 18,
    points: 6,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  }
  ,{
    id: '10',
    name: 'Club Atlético Uruguay',
    played: 10,
    won: 5,
    drawn: 3,
    lost: 2,
    goalsFor: 16,
    goalsAgainst: 12,
    points: 18,
    stadium: 'Estadio Manuel Seoane',
    founded: '1918',
    logo: '/logos/gimnasia.png',
    goalDifference: 0
  }
  ];
  
  export const matches: Match[] = [
    {
      id: '1',
      homeTeam: 'Club Gimnasia y Esgrima',
      awayTeam: 'Club Atlético Almagro',
      date: format(new Date(), 'yyyy-MM-dd'),
      time: '15:00',
      venue: 'Estadio Manuel Seoane',
      status: 'upcoming',
      competition: 'Liga Amateur - Fecha 11',
      matchday: 11,
      ticketPrice: '$500',
      referee: 'Carlos Medina',
      assistantReferee1: 'Juan López',
      assistantReferee2: 'Pedro Sánchez',
      fourthOfficial: 'Miguel Ángel Pérez',
      homeScore: null,
      awayScore: null,
      weather: 'Soleado, 24°C',
      capacity: '3000 espectadores',
      statistics: {
        possession: [55, 45],
        shots: [12, 8],
        shotsOnTarget: [5, 3],
        corners: [6, 4],
        fouls: [10, 12],
        offsides: [2, 3]
      }
    },
  ];
  
  export const players: Player[] = [
    // Club Gimnasia y Esgrima
    {
      id: '1',
    name: 'Martín González',
    teamId: '1',
    position: 'Delantero',
    number: 9,
    goals: 12,
    assists: 5,
    yellowCards: 3,
    redCards: 0,
    image: '/logos/Club Gimnasia y Esgrima.png',
    nationality: 'Argentina',
    age: 27,
    },
    {
      id: '2',
      name: 'Lucas Rodríguez',
      teamId: '1',
      position: 'Mediocampista',
      number: 8,
      goals: 4,
      assists: 8,
      yellowCards: 4,
      redCards: 0,
      image: '/players/player-2.jpg'
    },
    {
      id: '3',
      name: 'Federico Silva',
      teamId: '1',
      position: 'Defensor',
      number: 4,
      goals: 1,
      assists: 2,
      yellowCards: 5,
      redCards: 1,
      image: '/players/player-3.jpg'
    },
  
    // Club Atlético Almagro
    {
      id: '4',
      name: 'Diego Fernández',
      teamId: '2',
      position: 'Delantero',
      number: 11,
      goals: 9,
      assists: 4,
      yellowCards: 2,
      redCards: 0,
      image: '/players/player-4.jpg'
    },
    {
      id: '5',
      name: 'Juan Pérez',
      teamId: '2',
      position: 'Mediocampista',
      number: 10,
      goals: 6,
      assists: 7,
      yellowCards: 3,
      redCards: 0,
      image: '/players/player-5.jpg'
    },
  
    // Club Parque Sur
    {
      id: '6',
      name: 'Carlos Martínez',
      teamId: '3',
      position: 'Delantero',
      number: 7,
      goals: 8,
      assists: 3,
      yellowCards: 4,
      redCards: 0,
      image: '/players/player-6.jpg'
    },
    {
      id: '7',
      name: 'Roberto López',
      teamId: '3',
      position: 'Defensor',
      number: 2,
      goals: 0,
      assists: 1,
      yellowCards: 6,
      redCards: 0,
      image: '/players/player-7.jpg'
    },
  
    // Club Rocamora
    {
      id: '8',
      name: 'Alejandro Sánchez',
      teamId: '4',
      position: 'Mediocampista',
      number: 14,
      goals: 5,
      assists: 6,
      yellowCards: 3,
      redCards: 0,
      image: '/players/player-8.jpg'
    },
    {
      id: '9',
      name: 'Gabriel Torres',
      teamId: '4',
      position: 'Delantero',
      number: 19,
      goals: 7,
      assists: 2,
      yellowCards: 2,
      redCards: 0,
      image: '/players/player-9.jpg'
    },
  
    // Club Atlético Colonia Elia
    {
      id: '10',
      name: 'Nicolás Ramírez',
      teamId: '5',
      position: 'Arquero',
      number: 1,
      goals: 0,
      assists: 0,
      yellowCards: 1,
      redCards: 0,
      image: '/players/player-10.jpg'
    },
    {
      id: '11',
      name: 'Matías Castro',
      teamId: '5',
      position: 'Defensor',
      number: 3,
      goals: 2,
      assists: 1,
      yellowCards: 4,
      redCards: 1,
      image: '/players/player-11.jpg'
    },
  
    // Club Atletico Engranaje
    {
      id: '12',
      name: 'Pablo Morales',
      teamId: '6',
      position: 'Mediocampista',
      number: 5,
      goals: 3,
      assists: 5,
      yellowCards: 3,
      redCards: 0,
      image: '/players/player-12.jpg'
    },
    {
      id: '13',
      name: 'Leonardo Díaz',
      teamId: '6',
      position: 'Delantero',
      number: 21,
      goals: 4,
      assists: 2,
      yellowCards: 2,
      redCards: 0,
      image: '/players/player-13.jpg'
    },
  
    // Club Maria Auxiliadora
    {
      id: '14',
      name: 'Fernando Acosta',
      teamId: '7',
      position: 'Mediocampista',
      number: 16,
      goals: 2,
      assists: 3,
      yellowCards: 5,
      redCards: 0,
      image: '/players/player-14.jpg'
    },
    {
      id: '15',
      name: 'Javier Romero',
      teamId: '7',
      position: 'Defensor',
      number: 13,
      goals: 0,
      assists: 1,
      yellowCards: 4,
      redCards: 1,
      image: '/players/player-15.jpg'
    },
  
    // Club Atlético Lanús
    {
      id: '16',
      name: 'Sebastián Vera',
      teamId: '8',
      position: 'Delantero',
      number: 17,
      goals: 6,
      assists: 3,
      yellowCards: 2,
      redCards: 0,
      image: '/players/player-16.jpg'
    },
    {
      id: '17',
      name: 'Marcelo Ríos',
      teamId: '8',
      position: 'Mediocampista',
      number: 20,
      goals: 3,
      assists: 4,
      yellowCards: 3,
      redCards: 0,
      image: '/players/player-17.jpg'
    },
  
    // Club Atletico Rivadavia
    {
      id: '18',
      name: 'Ricardo Mendoza',
      teamId: '9',
      position: 'Delantero',
      number: 23,
      goals: 3,
      assists: 1,
      yellowCards: 3,
      redCards: 0,
      image: '/players/player-18.jpg'
    },
    {
      id: '19',
      name: 'Daniel Suárez',
      teamId: '9',
      position: 'Defensor',
      number: 6,
      goals: 1,
      assists: 0,
      yellowCards: 5,
      redCards: 1,
      image: '/players/player-19.jpg'
    },
  
    // Club Atlético Uruguay
    {
      id: '20',
      name: 'Eduardo Benítez',
      teamId: '10',
      position: 'Mediocampista',
      number: 15,
      goals: 5,
      assists: 6,
      yellowCards: 4,
      redCards: 0,
      image: '/players/player-20.jpg'
    },
    {
      id: '21',
      name: 'Miguel Ángel Peralta',
      teamId: '10',
      position: 'Delantero',
      number: 22,
      goals: 7,
      assists: 3,
      yellowCards: 2,
      redCards: 0,
      image: '/players/player-21.jpg'
    }
  ];
  
  export const news = [
    {
      id: '1',
      title: 'Gimnasia mantiene el liderato',
      content: 'Club Gimnasia y Esgrima continúa su impresionante racha...',
      date: format(new Date(), 'yyyy-MM-dd'),
      image: './logos/Liga.png',
      category: 'Resumen del Partido',
      author: 'Juan Pérez',
      tags: ['Gimnasia', 'Liga Amateur', 'Liderato']
    },
  ];

  // Funciones de utilidad para agregar nuevos datos
export const addMatch = (matchData: Partial<Match>): Match => {
  const newMatch: Match = {
    id: generateId('M', matches),
    homeTeam: '',
    awayTeam: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    time: '15:00',
    venue: '',
    status: 'upcoming',
    competition: 'Liga Amateur',
    matchday: matches.length + 1,
    ticketPrice: '$500',
    referee: '',
    assistantReferee1: '',
    assistantReferee2: '',
    fourthOfficial: '',
    homeScore: null,
    awayScore: null,
    ...matchData
  };
  
  matches.push(newMatch);
  return newMatch;
};

export const addPlayer = (playerData: Partial<Player>): Player => {
  const newPlayer: Player = {
    id: generateId('P', players),
    name: '',
    teamId: '',
    position: 'Delantero',
    number: 0,
    goals: 0,
    assists: 0,
    yellowCards: 0,
    redCards: 0,
    image: './logos/Liga.png',
    ...playerData
  };
  
  players.push(newPlayer);
  return newPlayer;
};

export const addNews = (newsData: Partial<News>): News => {
  const newNews: News = {
    id: generateId('N', news),
    title: '',
    content: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    image: './logos/Liga.png',
    category: 'General',
    ...newsData
  };
  
  news.push(newNews);
  return newNews;
};

// Exportar todo junto
export const mockData = {
  teams,
  players,
  matches,
  news,
  utils: {
    generateId,
    calculateTeamStats,
    getTopScorers,
    getTeamForm,
    addMatch,
    addPlayer,
    addNews
  }
};

export default mockData;