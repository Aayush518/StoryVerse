import UniverseCard from './UniverseCard';
import { Universe } from '../../types';

interface UniverseGridProps {
  universes: Universe[];
}

export default function UniverseGrid({ universes }: UniverseGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {universes.map((universe) => (
        <UniverseCard key={universe.id} universe={universe} />
      ))}
    </div>
  );
}
