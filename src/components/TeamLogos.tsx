import { Team } from '../types';
import { Shield } from 'lucide-react';

interface Props {
  teams: Team[];
}

export default function TeamLogos({ teams }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
      {teams.map((team) => (
        <div key={team.id} className="flex flex-col items-center group cursor-pointer">
          <div className="w-24 h-24 flex items-center justify-center bg-gray-100 rounded-full p-4 group-hover:bg-indigo-50 transition-colors">
            <Shield className="w-12 h-12 text-indigo-600" />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-center group-hover:text-indigo-600 transition-colors">
            {team.name}
          </h3>
          <p className="text-sm text-gray-500 text-center">
            {team.points} pts
          </p>
        </div>
      ))}
    </div>
  );
}