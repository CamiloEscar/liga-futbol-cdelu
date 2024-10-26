import { Team } from '../types';

interface Props {
  teams: Team[];
}

export default function StandingsTable({ teams }: Props) {
  const sortedTeams = [...teams].sort((a, b) => b.points - a.points);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-lg overflow-hidden">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pos</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">P</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">D</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GF</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GA</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GD</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedTeams.map((team, index) => (
            <tr key={team.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap text-sm">{index + 1}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">{team.name}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{team.played}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{team.won}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{team.drawn}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{team.lost}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{team.goalsFor}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{team.goalsAgainst}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm">{team.goalsFor - team.goalsAgainst}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-bold">{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}