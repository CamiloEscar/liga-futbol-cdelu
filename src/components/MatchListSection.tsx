import React, { useState } from 'react';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Calendar, Clock, MapPin, AlertCircle, User, CheckCircle, X } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { mockData } from '../data/mockData1era';

const MatchListSection = () => {
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const upcomingMatches = mockData.matches.filter(match => match.status === 'upcoming');
  const completedMatches = mockData.matches.filter(match => match.status === 'completed');

  const handleRowClick = (match) => {
    setSelectedMatch(match);
    setIsModalOpen(true);
  };

  const MatchTable = ({ matches }) => {
    return (
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
                onClick={() => handleRowClick(match)}
              >
                <TableCell>{format(new Date(match.date), "dd/MM/yyyy")}</TableCell>
                <TableCell className="font-medium">{match.homeTeam}</TableCell>
                <TableCell className="text-center">
                  {match.status === 'completed' ? 
                    `${match.homeScore} - ${match.awayScore}` : 
                    'VS'
                  }
                </TableCell>
                <TableCell className="font-medium">{match.awayTeam}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs
                    ${match.status === 'completed' ? 
                      'bg-gray-100 text-gray-700' : 
                      'bg-blue-100 text-blue-700'
                    }`}
                  >
                    {match.status === 'completed' ? 'Finalizado' : 'Próximo'}
                  </span>
                </TableCell>
                <TableCell>{match.time} hs</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  };

  const MatchDetails = ({ match }) => {
    const isCompleted = match.status === 'completed';
    
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <h3 className="text-xl font-bold mb-2">{match.homeTeam}</h3>
            {isCompleted && <p className="text-3xl font-bold">{match.homeScore}</p>}
          </div>
          <div className="flex items-center justify-center">
            <span className="text-xl font-bold text-gray-500">VS</span>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-2">{match.awayTeam}</h3>
            {isCompleted && <p className="text-3xl font-bold">{match.awayScore}</p>}
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
                <div key={key} className="flex items-center gap-4">
                  <div className="w-12 text-right">{value[0]}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(value[0] / (value[0] + value[1])) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-24 text-center capitalize">{key}</div>
                  <div className="flex-1">
                    <div className="h-2 bg-gray-200 rounded-full">
                      <div 
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(value[1] / (value[0] + value[1])) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="w-12">{value[1]}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {!isCompleted && match.ticketPrice && (
          <button className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Comprar Entradas - {match.ticketPrice}
          </button>
        )}
      </div>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Calendario de Partidos</h2>
          <p className="text-gray-600">Todos los partidos de la Liga Amateur</p>
        </div>

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="upcoming">Próximos Partidos</TabsTrigger>
            <TabsTrigger value="completed">Últimos Partidos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="upcoming">
            <MatchTable matches={upcomingMatches} />
          </TabsContent>
          
          <TabsContent value="completed">
            <MatchTable matches={completedMatches} />
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
            <span className="text-sm">Los precios pueden variar según la ubicación</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MatchListSection;