import React from 'react';
import { Player } from '../types';
import { User, Goal, Award } from 'lucide-react';

interface Props {
  player: Player;
}

export default function PlayerCard({ player }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-center space-x-4">
        <img 
          src={player.image} 
          alt={player.name} 
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h3 className="text-lg font-semibold">{player.name}</h3>
          <p className="text-gray-600">{player.position} • #{player.number}</p>
        </div>
      </div>
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <Stat icon={<Goal className="w-4 h-4" />} label="Goals" value={player.goals} />
        <Stat icon={<Award className="w-4 h-4" />} label="Assists" value={player.assists} />
      </div>

      <div className="mt-4 flex justify-between text-sm">
        <span className="text-yellow-500">🟨 {player.yellowCards}</span>
        <span className="text-red-500">🟥 {player.redCards}</span>
      </div>
    </div>
  );
}

function Stat({ icon, label, value }: { icon: React.ReactNode; label: string; value: number }) {
  return (
    <div className="flex items-center space-x-2">
      {icon}
      <span className="text-gray-600">{label}: </span>
      <span className="font-semibold">{value}</span>
    </div>
  );
}