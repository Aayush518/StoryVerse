import { Link } from 'react-router-dom';
import { Users, BookOpen, Star, ChevronRight } from 'lucide-react';
import { Universe } from '../../types';

interface UniverseCardProps {
  universe: Universe;
}

export default function UniverseCard({ universe }: UniverseCardProps) {
  return (
    <Link to={`/universe/${universe.id}`} className="group block">
      <div className="glass-card rounded-xl p-6 hover:bg-white/95 dark:hover:bg-card/95 transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text group-hover:scale-105 transition-transform duration-300">
              {universe.name}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">
              {universe.description}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:translate-x-1 transition-transform" />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {universe.tags?.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4" />
            <span>{universe.collaborators?.length || 0} collaborators</span>
          </div>
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{universe.stories?.length || 0} stories</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4" />
            <span>{universe.rating || 0} rating</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
