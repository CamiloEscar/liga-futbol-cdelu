import { useState } from 'react';
import { Match } from '../types';
import { Calendar, MapPin } from 'lucide-react';
import LiveMatchOverlay from './LiveMatchOverlay';

interface Props {
  match: Match;
}

export default function MatchCard({ match }: Props) {
  const [showLiveOverlay, setShowLiveOverlay] = useState(false);

  const getStatusColor = (status: Match['status']) => {
    switch (status) {
      case 'live':
        return 'bg-red-500';
      case 'completed':
        return 'bg-gray-500';
      default:
        return 'bg-green-500';
    }
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow"
        onClick={() => match.status === 'live' && setShowLiveOverlay(true)}
      >
        <div className="flex justify-between items-center mb-4">
          <span className={`${getStatusColor(match.status)} text-white text-sm px-2 py-1 rounded-full`}>
            {match.status.toUpperCase()}
          </span>
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-1" />
            {match.date}
          </div>
        </div>

        <div className="flex justify-between items-center mb-4">
          <div className="text-center flex-1">
            <h3 className="font-semibold">{match.homeTeam}</h3>
            {match.status !== 'upcoming' && (
              <span className="text-2xl font-bold">{match.homeScore}</span>
            )}
          </div>
          <div className="mx-4 text-gray-400">VS</div>
          <div className="text-center flex-1">
            <h3 className="font-semibold">{match.awayTeam}</h3>
            {match.status !== 'upcoming' && (
              <span className="text-2xl font-bold">{match.awayScore}</span>
            )}
          </div>
        </div>

        <div className="flex items-center text-gray-600 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          {match.venue} • {match.time}
        </div>

        {match.status === 'live' && (
          <div className="mt-2 text-center text-sm text-indigo-600">
            Click to view live match details
          </div>
        )}
      </div>

      {showLiveOverlay && (
        <LiveMatchOverlay 
          match={match} 
          onClose={() => setShowLiveOverlay(false)} 
        />
      )}
    </>
  );
}