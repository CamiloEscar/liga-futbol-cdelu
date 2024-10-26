import { useState } from 'react';
import { 
  Trophy, 
  Calendar, 
  Clock, 
  MapPin, 
  Award} from 'lucide-react';
import { useLeague } from '../context/LeagueContext';
import StandingsTable from '../components/StandingsTable';
import PlayerCard from '../components/PlayerCard';
import NewsCard from '../components/NewsCards';
import MatchListSection from '../components/MatchListSection';

export default function Home() {
  const { state } = useLeague();
  const { teams, players, matches, news } = state;
  const [selectedTeamPlayers, setSelectedTeamPlayers] = useState(null);

  // Get top scorer
  const topScorer = players.reduce((prev, current) => 
    (prev.goals > current.goals) ? prev : current
  );

  // Get team with most points
  const leadingTeam = teams.reduce((prev, current) => 
    (prev.points > current.points) ? prev : current
  );

  // Filter upcoming matches
  const upcomingMatches = matches.filter(match => {
    const matchDate = new Date(match.date);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return matchDate >= today && matchDate <= nextWeek;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* <Navbar /> */}
      
      {/* Hero Section with League Stats */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-4">Liga de Fútbol Amateur</h1>
            <p className="text-xl text-blue-100">Temporada 2024</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Leading Team Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Trophy className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold">Equipo Líder</h3>
              </div>
              <div className="flex items-center space-x-4">
                <img 
                  src={`/logos/${leadingTeam.name}.png`} 
                  alt={leadingTeam.name}
                  className="w-16 h-16 object-contain"
                />
                <div>
                  <p className="font-bold text-xl">{leadingTeam.name}</p>
                  <p className="text-blue-100">{leadingTeam.points} puntos</p>
                </div>
              </div>
            </div>

            {/* Top Scorer Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold">Goleador</h3>
              </div>
              <div className="flex items-center space-x-4">
                <img 
                  src={topScorer.image} 
                  alt={topScorer.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-xl">{topScorer.name}</p>
                  <p className="text-blue-100">{topScorer.goals} goles</p>
                </div>
              </div>
            </div>

            {/* Next Match Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Calendar className="w-6 h-6 text-yellow-400" />
                <h3 className="text-lg font-semibold">Próximo Partido</h3>
              </div>
              {upcomingMatches[0] && (
                <div className="flex items-center justify-between">
                  <div className="text-center flex-1">
                    <p className="font-bold">{upcomingMatches[0].homeTeam}</p>
                  </div>
                  <div className="mx-4 text-xl font-bold">VS</div>
                  <div className="text-center flex-1">
                    <p className="font-bold">{upcomingMatches[0].awayTeam}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Live Matches Alert */}
      {matches.some(match => match.status === 'live') && (
        <div className="bg-red-500 text-white py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-2">
              <div className="animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-semibold">Partidos en Vivo</span>
              <button className="ml-4 px-4 py-1 bg-white text-red-500 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors">
                Ver Ahora
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Teams Section with Stats */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Nuestros Equipos</h2>
            <p className="text-gray-600">Conoce los equipos que compiten en nuestra liga</p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {teams.map(team => (
              <div 
                key={team.id} 
                className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6 cursor-pointer"
                onClick={() => setSelectedTeamPlayers(team.id)}
              >
                <div className="flex flex-col items-center">
                  <img 
                    src={`/logos/${team.name}.png`} 
                    alt={team.name}
                    className="w-24 h-24 object-contain mb-4 group-hover:scale-110 transition-transform duration-200"
                  />
                  <h3 className="text-center font-semibold mb-2">{team.name}</h3>
                  <div className="grid grid-cols-2 gap-2 w-full text-sm text-gray-600">
                    <div className="text-center">
                      <p className="font-semibold text-blue-600">{team.points}</p>
                      <p className="text-xs">Puntos</p>
                    </div>
                    <div className="text-center">
                      <p className="font-semibold text-green-600">{team.won}</p>
                      <p className="text-xs">Victorias</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Players Section (Conditional) */}
      {selectedTeamPlayers && (
        <section className="py-16 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h2 className="text-3xl font-bold mb-2">Jugadores</h2>
                <p className="text-gray-600">
                  {teams.find(t => t.id === selectedTeamPlayers)?.name}
                </p>
              </div>
              <button 
                onClick={() => setSelectedTeamPlayers(null)}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors"
              >
                Cerrar
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {players
                .filter(player => player.teamId === selectedTeamPlayers)
                .map(player => (
                  <PlayerCard key={player.id} player={player} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Upcoming Matches Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Próximos Partidos</h2>
            <MatchListSection />
            <p className="text-gray-600">Calendario de los próximos 7 días</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map(match => (
              <div key={match.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(match.date).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{match.time}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center mb-6">
                  <div className="text-center flex-1">
                    <img 
                      src={`/logos/${match.homeTeam}.png`}
                      alt={match.homeTeam}
                      className="w-16 h-16 object-contain mx-auto mb-2"
                    />
                    <h3 className="font-semibold">{match.homeTeam}</h3>
                  </div>
                  <div className="mx-4">
                    <div className="text-2xl font-bold text-gray-300">VS</div>
                  </div>
                  <div className="text-center flex-1">
                    <img 
                      src={`/logos/${match.awayTeam}.png`}
                      alt={match.awayTeam}
                      className="w-16 h-16 object-contain mx-auto mb-2"
                    />
                    <h3 className="font-semibold">{match.awayTeam}</h3>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2 text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{match.venue}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Latest News Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Últimas Noticias</h2>
            <p className="text-gray-600">Mantente informado sobre la liga</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {news.map(item => (
              <NewsCard key={item.id} news={item} />
            ))}
          </div>
        </div>
      </section>

      {/* Standings Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Tabla de Posiciones</h2>
            <p className="text-gray-600">Clasificación actual de la liga</p>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <StandingsTable teams={teams} />
          </div>
        </div>
      </section>
    </div>
  );
}