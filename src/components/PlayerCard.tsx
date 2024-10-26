import React from 'react';
import { Player } from '../types';
import { Goal, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Props {
  player: Player;
}

export default function PlayerCard({ player }: Props) {
  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-bold">{player.name}</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="font-semibold">{player.position}</p>
            <p className="text-xs text-gray-600">Posición</p>
          </div>
          <div className="text-center p-2 bg-gray-50 rounded">
            <p className="font-semibold">#{player.number}</p>
            <p className="text-xs text-gray-600">Número</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <Stat 
            icon={<Goal className="w-5 h-5" />} 
            label="Goles" 
            value={player.goals} 
          />
          <Stat 
            icon={<Award className="w-5 h-5" />} 
            label="Asistencias" 
            value={player.assists} 
          />
        </div>

        <div className="flex justify-center space-x-6">
          <div className="text-center">
            <span className="text-yellow-500">🟨 {player.yellowCards}</span>
            <p className="text-xs text-gray-600">Amarillas</p>
          </div>
          <div className="text-center">
            <span className="text-red-500">🟥 {player.redCards}</span>
            <p className="text-xs text-gray-600">Rojas</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded">
      {icon}
      <span className="text-gray-600">{label}:</span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}