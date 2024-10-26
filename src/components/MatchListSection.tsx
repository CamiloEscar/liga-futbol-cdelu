import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, MapPin, AlertCircle, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Match, MatchStatus } from '@/types';  // Importamos los tipos existentes
import { mockData } from '../data/mockData1era';

interface MatchTableProps {
  matches: Match[];
  onMatchSelect: (match: Match) => void;
}

interface MatchDetailsProps {
  match: Match;
}

const MatchTable: React.FC<MatchTableProps> = ({ matches, onMatchSelect }) => (
  <div className="rounded-md border">
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Fecha</TableHead>
          <TableHead>Local</TableHead>
          <TableHead className="text-center">VS</TableHead>
          <TableHead>Visitante</TableHead>
          <TableHead>Estado</TableHead>
          <TableHead>Hora</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {matches.map((match) => (
          <TableRow 
            key={match.id} 
            className="cursor-pointer hover:bg-gray-50"
            onClick={() => onMatchSelect(match)}
          >
            <TableCell>{format(new Date(match.date), "dd/MM/yyyy")}</TableCell>
            <TableCell className="font-medium">{match.homeTeam}</TableCell>
            <TableCell className="text-center">
              {match.status === 'completed' && match.homeScore !== undefined && match.awayScore !== undefined ? 
                `${match.homeScore} - ${match.awayScore}` : 
                'VS'
              }
            </TableCell>
            <TableCell className="font-medium">{match.awayTeam}</TableCell>
            <TableCell>
              <span className={`px-2 py-1 rounded-full text-xs ${
                match.status === 'completed' ? 'bg-gray-100 text-gray-700' :
                match.status === 'live' ? 'bg-red-100 text-red-700' :
                'bg-blue-100 text-blue-700'
              }`}
              >
                {match.status === 'completed' ? 'Finalizado' :
                 match.status === 'live' ? 'En Vivo' :
                 'Próximo'}
              </span>
            </TableCell>
            <TableCell>{match.time} hs</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>
);

const MatchDetails: React.FC<MatchDetailsProps> = ({ match }) => {
  const isCompleted = match.status === 'completed';
  
  const StatisticBar = ({ value1, value2, label }: { value1: number, value2: number, label: string }) => {
    const total = value1 + value2;
    const percentage1 = (value1 / total) * 100;
    const percentage2 = (value2 / total) * 100;
    
    return (
      <div className="flex items-center gap-4">
        <div className="w-12 text-right">{value1}</div>
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${percentage1}%` }}
            />
          </div>
        </div>
        <div className="w-24 text-center capitalize">{label}</div>
        <div className="flex-1">
          <div className="h-2 bg-gray-200 rounded-full">
            <div 
              className="h-full bg-blue-600 rounded-full"
              style={{ width: `${percentage2}%` }}
            />
          </div>
        </div>
        <div className="w-12">{value2}</div>
      </div>
    );
  };


  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4 text-center">
        <div>
          <h3 className="text-xl font-bold mb-2">{match.homeTeam}</h3>
          {isCompleted && match.homeScore !== undefined && (
            <p className="text-3xl font-bold">{match.homeScore}</p>
          )}
        </div>
        <div className="flex items-center justify-center">
          <span className="text-xl font-bold text-gray-500">VS</span>
        </div>
        <div>
          <h3 className="text-xl font-bold mb-2">{match.awayTeam}</h3>
          {isCompleted && match.awayScore !== undefined && (
            <p className="text-3xl font-bold">{match.awayScore}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{format(new Date(match.date), "EEEE d 'de' MMMM 'de' yyyy", { locale: es })}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{match.time} hs</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{match.venue}</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>Árbitro: {match.referee}</span>
          </div>
          <div className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span>{isCompleted ? match.attendance : match.capacity}</span>
          </div>
          {match.weather && (
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4" />
              <span>{match.weather}</span>
            </div>
          )}
        </div>
      </div>

      {isCompleted && match.statistics && (
        <div className="border-t pt-4">
          <h4 className="font-semibold mb-3">Estadísticas</h4>
          <div className="space-y-4">
            {Object.entries(match.statistics).map(([key, value]) => (
              <StatisticBar 
                key={key}
                value1={value[0]}
                value2={value[1]}
                label={key}
              />
            ))}
          </div>
        </div>
      )}

      {match.status === 'upcoming' && match.ticketPrice && (
        <button 
          className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          onClick={() => console.log('Comprar entrada para:', match)}
        >
          Comprar Entradas - {match.ticketPrice}
        </button>
      )}
    </div>
  );
};

const MatchListSection: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filterMatches = (status: MatchStatus | 'upcoming') => {
    if (status === 'upcoming') {
      return mockData.matches.filter(match => match.status !== 'completed');
    }
    return mockData.matches.filter(match => match.status === status);
  };

  const upcomingMatches = filterMatches('upcoming');
  const completedMatches = filterMatches('completed');

  const handleMatchSelect = (match: Match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calendario de Partidos</h2>
          <p className="text-gray-600">Todos los partidos de la Liga</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Próximos Partidos</TabsTrigger>
            <TabsTrigger value="completed">Últimos Partidos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <MatchTable 
              matches={upcomingMatches} 
              onMatchSelect={handleMatchSelect}
            />
          </TabsContent>
          
          <TabsContent value="completed">
            <MatchTable 
              matches={completedMatches} 
              onMatchSelect={handleMatchSelect}
            />
          </TabsContent>
        </Tabs>

        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Detalles del Partido</DialogTitle>
            </DialogHeader>
            {selectedMatch && <MatchDetails match={selectedMatch} />}
          </DialogContent>
        </Dialog>

        <div className="mt-12 text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-yellow-50 text-yellow-800 rounded-lg">
            <AlertCircle className="w-4 h-4" />
            <span className="text-sm">Los precios pueden variar según el club</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchListSection;