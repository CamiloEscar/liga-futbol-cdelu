import React, { useState, useMemo } from 'react';
import { Trophy, ChevronDown, ChevronUp, Award } from 'lucide-react';
import { currentChampions, championshipHistory } from '../data/champions';
import { teams } from '../data/mockData1era';

// Definir interfaces para los tipos
interface ChampionshipCount {
  total: number;
  male: number;
  female: number;
}

interface ChampionshipCounts {
  [key: string]: ChampionshipCount;
}

interface CurrentChampion {
  category: string;
  tournament: string;
  team: string;
}

interface ChampionshipEntry {
  year: number;
  tournament: string;
  champion: string;
  category: 'male' | 'female';
}

interface Team {
  id: string;
  name: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

function ChampionsSection() {
  const [showFullHistory, setShowFullHistory] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'male' | 'female'>('all');
  
  const championshipCounts: ChampionshipCounts = useMemo(() => {
    const counts: ChampionshipCounts = {};
    
    // Initialize counts for all teams
    teams.forEach((team: Team) => {
      counts[team.name] = {
        total: 0,
        male: 0,
        female: 0
      };
    });
    
    // Count championships from history
    championshipHistory.forEach((entry: ChampionshipEntry) => {
      if (counts[entry.champion]) {
        counts[entry.champion].total += 1;
        counts[entry.champion][entry.category] += 1;
      }
    });
    
    return counts;
  }, []);

  const filteredHistory = championshipHistory.filter(entry => 
    selectedCategory === 'all' ? true : entry.category === selectedCategory
  );

  return (
    <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title and Category Filters */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Campeones</h2>
          <div className="flex justify-center space-x-4 mb-8">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'all' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Todos
            </button>
            <button
              onClick={() => setSelectedCategory('male')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'male' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Masculino
            </button>
            <button
              onClick={() => setSelectedCategory('female')}
              className={`px-4 py-2 rounded-full ${
                selectedCategory === 'female' 
                  ? 'bg-yellow-500 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Femenino
            </button>
          </div>
        </div>

        {/* Championship Counts Summary */}
        <div className="mb-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {Object.entries(championshipCounts)
            .filter(([_, counts]) => counts.total > 0)
            .sort((a, b) => b[1].total - a[1].total)
            .map(([team, counts]) => (
              <div 
                key={team}
                className="bg-white rounded-lg shadow p-4 border-l-4 border-yellow-500"
              >
                <div className="flex items-center mb-2">
                  <img 
                    src={`/logos/${team}.png`}
                    alt={team}
                    className="w-8 h-8 object-contain mr-2"
                  />
                  <h3 className="font-semibold text-sm">{team}</h3>
                </div>
                <div className="flex items-center">
                  <Award className="w-5 h-5 text-yellow-500 mr-2" />
                  <div className="text-sm">
                    <p className="font-bold">{counts.total} títulos</p>
                    <p className="text-gray-500 text-xs">
                      {counts.male} masc. | {counts.female} fem.
                    </p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Current Champions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {currentChampions.map((champion: CurrentChampion, index) => (
            <div 
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-yellow-500"
            >
              <div className="flex items-center mb-4">
                <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
                <div>
                  <h3 className="font-bold text-lg">{champion.category}</h3>
                  <p className="text-gray-600">{champion.tournament}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <img 
                    src={`/logos/${teams.find(t => t.name === champion.team)?.name}.png`}
                    alt={champion.team}
                    className="w-16 h-16 object-contain mr-4"
                  />
                  <p className="text-xl font-semibold">{champion.team}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">
                    {championshipCounts[champion.team]?.total} títulos totales
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Championship History */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div 
            className="p-4 bg-gray-50 cursor-pointer flex justify-between items-center"
            onClick={() => setShowFullHistory(!showFullHistory)}
          >
            <h3 className="text-xl font-semibold">Historial de Campeones</h3>
            {showFullHistory ? (
              <ChevronUp className="w-6 h-6 text-gray-500" />
            ) : (
              <ChevronDown className="w-6 h-6 text-gray-500" />
            )}
          </div>
          
          {showFullHistory && (
            <div className="p-4">
              <div className="overflow-x-auto">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Año
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Torneo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Campeón
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Categoría
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Títulos
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredHistory.map((entry: ChampionshipEntry, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {entry.year}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {entry.tournament}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {entry.champion}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {entry.category === 'male' ? 'Masculino' : 'Femenino'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          {championshipCounts[entry.champion]?.total}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        {/* Download Link */}
        <div className="mt-8 text-center">
          <a 
            href="/documents/historial-campeones.pdf" 
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-yellow-600 hover:bg-yellow-700"
            download
          >
            <Trophy className="w-5 h-5 mr-2" />
            Descargar Historial Completo
          </a>
        </div>
      </div>
    </section>
  );
}

export default ChampionsSection;