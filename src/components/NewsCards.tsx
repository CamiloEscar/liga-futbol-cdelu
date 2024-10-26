import { NewsItem } from '../types';
import { Calendar } from 'lucide-react';

interface Props {
  news: NewsItem;
}

export default function NewsCard({ news }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img 
        src={news.image} 
        alt={news.title} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <span className="inline-block px-2 py-1 text-xs font-semibold text-indigo-600 bg-indigo-100 rounded-full">
          {news.category}
        </span>
        <h3 className="mt-2 text-xl font-semibold">{news.title}</h3>
        <p className="mt-2 text-gray-600 line-clamp-2">{news.content}</p>
        <div className="mt-4 flex items-center text-gray-500 text-sm">
          <Calendar className="w-4 h-4 mr-1" />
          {news.date}
        </div>
      </div>
    </div>
  );
}