import { Match } from '../types';
import { Calendar, MapPin, Video } from 'lucide-react';

interface Props {
  match: Match;
  onClose: () => void;
}

export default function LiveMatchOverlay({ match, onClose }: Props) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4">
        <div className="p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-xl font-bold">Live Match</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="text-center flex-1">
              <h3 className="text-xl font-bold mb-2">{match.homeTeam}</h3>
              <span className="text-4xl font-bold">{match.homeScore}</span>
            </div>
            <div className="mx-4 text-gray-400 text-xl">VS</div>
            <div className="text-center flex-1">
              <h3 className="text-xl font-bold mb-2">{match.awayTeam}</h3>
              <span className="text-4xl font-bold">{match.awayScore}</span>
            </div>
          </div>

          <div className="space-y-4 text-gray-600">
            <div className="flex items-center">
              <Calendar className="w-5 h-5 mr-2" />
              <span>{match.date} • {match.time}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-2" />
              <span>{match.venue}</span>
            </div>
            <div className="flex items-center text-indigo-600">
              <Video className="w-5 h-5 mr-2" />
              <a href="#" className="hover:underline">Watch Live Stream</a>
            </div>
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold mb-2">Match Statistics</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Possession</span>
                <span>55% - 45%</span>
              </div>
              <div className="flex justify-between">
                <span>Shots on Target</span>
                <span>8 - 6</span>
              </div>
              <div className="flex justify-between">
                <span>Corner Kicks</span>
                <span>5 - 3</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}