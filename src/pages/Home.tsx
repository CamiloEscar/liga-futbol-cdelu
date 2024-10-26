import { useState } from "react";
import {
  Trophy,
  Calendar,
  Award,
  ChevronDown,
  Users,
  Table,
  Newspaper,
  MapPin,
} from "lucide-react";
import { useLeague } from "../context/LeagueContext";
import StandingsTable from "../components/StandingsTable";
import PlayerCard from "../components/PlayerCard";
import NewsCard from "../components/NewsCards";
import MatchListSection from "../components/MatchListSection";
import Navbar from "@/components/Navbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function Home() {
  const { state } = useLeague();
  const { teams, players, matches, news } = state;
  const [selectedTeam, setSelectedTeam] = useState(null);

  const topScorer = players.reduce((prev, current) =>
    prev.goals > current.goals ? prev : current
  );

  const leadingTeam = teams.reduce((prev, current) =>
    prev.points > current.points ? prev : current
  );

  const upcomingMatches = matches.filter((match) => {
    const matchDate = new Date(match.date);
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(today.getDate() + 7);
    return matchDate >= today && matchDate <= nextWeek;
  });

  const liveMatches = matches.filter((match) => match.status === "live");

  const handleTeamSelect = (team) => {
    setSelectedTeam(team);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-indigo-900 text-white">
        <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-6 animate-fade-in">
              Liga de Fútbol Local
            </h1>
            <p className="text-xl text-blue-200 mb-8">Temporada 2024</p>
            <div className="flex justify-center space-x-4">
              <button className="bg-white text-blue-900 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                Ver Partidos en Vivo
              </button>
              <button className="bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors">
                Tabla de Posiciones
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Stats Cards */}
            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Trophy className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-lg font-semibold">Equipo Líder</h3>
                    <p className="text-sm text-blue-200">Actual Campeón</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                    <img
                      src={`/logos/${leadingTeam.name}.png`}
                      alt={leadingTeam.name}
                      className="w-12 h-12 object-contain"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">{leadingTeam.name}</p>
                    <div className="flex items-center space-x-2 text-blue-200">
                      <span className="text-lg">{leadingTeam.points}</span>
                      <span>puntos</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-lg font-semibold">Máximo Goleador</h3>
                    <p className="text-sm text-blue-200">Líder de Goleo</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden">
                    <img
                      src={topScorer.image}
                      alt={topScorer.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-2xl">{topScorer.name}</p>
                    <div className="flex items-center space-x-2 text-blue-200">
                      <span className="text-lg">{topScorer.goals}</span>
                      <span>goles</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="p-6">
                <div className="flex items-center space-x-3 mb-4">
                  <Calendar className="w-8 h-8 text-yellow-400" />
                  <div>
                    <h3 className="text-lg font-semibold">Próximo Partido</h3>
                    <p className="text-sm text-blue-200">Fecha Destacada</p>
                  </div>
                </div>
                {upcomingMatches[0] && (
                  <div className="flex items-center justify-between">
                    <div className="text-center flex-1">
                      <img
                        src={`/logos/${upcomingMatches[0].homeTeam}.png`}
                        alt={upcomingMatches[0].homeTeam}
                        className="w-12 h-12 object-contain mx-auto mb-2"
                      />
                      <p className="font-bold">{upcomingMatches[0].homeTeam}</p>
                    </div>
                    <div className="mx-4">
                      <div className="text-2xl font-bold">VS</div>
                      <div className="text-sm text-blue-200 mt-1">
                        {new Date(upcomingMatches[0].date).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-center flex-1">
                      <img
                        src={`/logos/${upcomingMatches[0].awayTeam}.png`}
                        alt={upcomingMatches[0].awayTeam}
                        className="w-12 h-12 object-contain mx-auto mb-2"
                      />
                      <p className="font-bold">{upcomingMatches[0].awayTeam}</p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Live Matches Alert */}
      {liveMatches.length > 0 && (
        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-pulse">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
              <span className="font-semibold">
                {liveMatches.length}{" "}
                {liveMatches.length === 1 ? "Partido" : "Partidos"} en Vivo
              </span>
              <button className="px-6 py-2 bg-white text-red-500 rounded-full text-sm font-semibold hover:bg-red-50 transition-colors shadow-sm">
                Ver Transmisión
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Content Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid w-full grid-cols-4 rounded-xl bg-blue-50 p-1">
            <TabsTrigger value="teams" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Equipos</span>
            </TabsTrigger>
            <TabsTrigger
              value="matches"
              className="flex items-center space-x-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Partidos</span>
            </TabsTrigger>
            <TabsTrigger
              value="standings"
              className="flex items-center space-x-2"
            >
              <Table className="w-4 h-4" />
              <span>Posiciones</span>
            </TabsTrigger>
            <TabsTrigger value="news" className="flex items-center space-x-2">
              <Newspaper className="w-4 h-4" />
              <span>Noticias</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teams" className="mt-8">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
              {teams.map((team) => (
                <Card
                  key={team.id}
                  className="group hover:shadow-lg transition-all duration-200 cursor-pointer"
                  onClick={() => handleTeamSelect(team)}
                >
                  <CardContent className="p-6">
                    <div className="flex flex-col items-center">
                      <div className="w-24 h-24 rounded-full bg-gray-50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200">
                        <img
                          src={`/logos/${team.name}.png`}
                          alt={team.name}
                          className="w-20 h-20 object-contain"
                        />
                      </div>
                      <h3 className="text-center font-semibold mb-4">
                        {team.name}
                      </h3>
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <div className="text-center">
                          <p className="font-bold text-blue-600 text-xl">
                            {team.points}
                          </p>
                          <p className="text-sm text-gray-500">Puntos</p>
                        </div>
                        <div className="text-center">
                          <p className="font-bold text-green-600 text-xl">
                            {team.won}
                          </p>
                          <p className="text-sm text-gray-500">Victorias</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>


          <TabsContent value="matches" className="mt-8">
            <MatchListSection />
          </TabsContent>

          <TabsContent value="standings" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <StandingsTable teams={teams} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="news" className="mt-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {news.map((item) => (
                <NewsCard key={item.id} news={item} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

            {/* Team and Players Modal */}
      {selectedTeam && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
          <Card className="w-full max-w-6xl max-h-[90vh] overflow-y-auto m-4">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center space-x-4">
                  <img
                    src={`/logos/${selectedTeam.name}.png`}
                    alt={selectedTeam.name}
                    className="w-20 h-20 object-contain"
                  />
                  <div>
                    <h2 className="text-3xl font-bold mb-2">{selectedTeam.name}</h2>
                    <p className="text-gray-600">Información del equipo y jugadores</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTeam(null)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <ChevronDown className="w-6 h-6" />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-1">
                  <CardHeader>
                    <CardTitle>Información del Club</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Trophy className="w-4 h-4 text-yellow-500" />
                        <span className="font-semibold">Puntos:</span>
                        <span>{selectedTeam.points}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4 text-blue-500" />
                        <span className="font-semibold">Fundado:</span>
                        <span>{selectedTeam.founded}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-red-500" />
                        <span className="font-semibold">Estadio:</span>
                        <span>{selectedTeam.stadium}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="w-4 h-4 text-green-500" />
                        <span className="font-semibold">Partidos jugados:</span>
                        <span>{selectedTeam.played}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Victorias:</span>
                        <span>{selectedTeam.won}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Empates:</span>
                        <span>{selectedTeam.drawn}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Derrotas:</span>
                        <span>{selectedTeam.lost}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Goles a favor:</span>
                        <span>{selectedTeam.goalsFor}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Goles en contra:</span>
                        <span>{selectedTeam.goalsAgainst}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="lg:col-span-2">
                  <h3 className="text-2xl font-bold mb-4">Jugadores</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {players
                      .filter((player) => player.teamId === selectedTeam.id)
                      .map((player) => (
                        <PlayerCard key={player.id} player={player} />
                      ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}