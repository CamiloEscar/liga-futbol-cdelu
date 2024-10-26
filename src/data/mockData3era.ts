export const teams3 = [
  {
    id: '1',
    name: 'Gimnasia y Esgrima',
    played: 10,
    won: 7,
    drawn: 2,
    lost: 1,
    goalsFor: 22,
    goalsAgainst: 8,
    points: 23
  },
  {
    id: '2',
    name: 'Almagro',
    played: 10,
    won: 6,
    drawn: 3,
    lost: 1,
    goalsFor: 18,
    goalsAgainst: 7,
    points: 21
  },
  {
    id: '3',
    name: 'Parque Sur',
    played: 10,
    won: 6,
    drawn: 1,
    lost: 3,
    goalsFor: 15,
    goalsAgainst: 10,
    points: 19
  },
  {
    id: '4',
    name: 'Agrario Rocamora',
    played: 10,
    won: 5,
    drawn: 2,
    lost: 3,
    goalsFor: 17,
    goalsAgainst: 12,
    points: 17
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
    points: 16
  },
  {
    id: '6',
    name: 'Engranaje',
    played: 10,
    won: 3,
    drawn: 3,
    lost: 4,
    goalsFor: 11,
    goalsAgainst: 13,
    points: 12
  },
  {
    id: '7',
    name: 'María Auxiliadora',
    played: 10,
    won: 2,
    drawn: 2,
    lost: 6,
    goalsFor: 8,
    goalsAgainst: 20,
    points: 8
  },
  {
    id: '8',
    name: 'Lanús',
    played: 10,
    won: 4,
    drawn: 1,
    lost: 5,
    goalsFor: 10,
    goalsAgainst: 15,
    points: 13
  },
  {
    id: '9',
    name: 'Rivadavia',
    played: 10,
    won: 1,
    drawn: 3,
    lost: 6,
    goalsFor: 7,
    goalsAgainst: 18,
    points: 6
  }
  ,{
    id: '10',
    name: 'Club Atlético Concepción',
    played: 10,
    won: 5,
    drawn: 3,
    lost: 2,
    goalsFor: 16,
    goalsAgainst: 12,
    points: 18
  }
  ];
  
  export const matches3 = [
    {
      id: '1',
      homeTeam: 'United FC',
      awayTeam: 'City Rangers',
      homeScore: 2,
      awayScore: 1,
      date: '2024-03-15',
      time: '15:00',
      venue: 'United Stadium',
      status: 'live' as const
    },
    {
      id: '2',
      homeTeam: 'Athletic Club',
      awayTeam: 'Rovers SC',
      homeScore: 0,
      awayScore: 0,
      date: '2024-03-15',
      time: '17:30',
      venue: 'Athletic Arena',
      status: 'upcoming' as const
    },
    {
      id: '3',
      homeTeam: 'Rovers SC',
      awayTeam: 'United FC',
      homeScore: 1,
      awayScore: 3,
      date: '2024-03-14',
      time: '20:00',
      venue: 'Rovers Ground',
      status: 'completed' as const
    }
  ];
  
  export const players3 = [
    {
      id: '1',
      name: 'John Smith',
      teamId: '1',
      position: 'Forward',
      number: 9,
      goals: 8,
      assists: 5,
      yellowCards: 2,
      redCards: 0,
      image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300'
    },
    {
      id: '2',
      name: 'Mike Johnson',
      teamId: '1',
      position: 'Midfielder',
      number: 8,
      goals: 4,
      assists: 7,
      yellowCards: 3,
      redCards: 0,
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300'
    }
  ];
  
  export const news3 = [
    {
      id: '1',
      title: 'United FC Maintains Top Position',
      content: 'United FC continues their impressive run with another victory...',
      date: '2024-03-15',
      image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800',
      category: 'Match Report'
    },
    {
      id: '2',
      title: 'New Transfer Window Updates',
      content: 'Several clubs looking to strengthen their squads...',
      date: '2024-03-14',
      image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?auto=format&fit=crop&w=800',
      category: 'Transfer News'
    }
  ];