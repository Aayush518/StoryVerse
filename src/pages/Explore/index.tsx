import ExploreHeader from './ExploreHeader';
import UniverseGrid from './UniverseGrid';

const SAMPLE_UNIVERSES = [
  {
    id: '1',
    name: 'Ethereal Kingdoms',
    description: 'A vast fantasy realm where magic and technology collide.',
    tags: ['Fantasy', 'Magic', 'Technology'],
    rating: 4.8,
    collaborators: ['user1', 'user2', 'user3'],
    stories: ['story1', 'story2'],
    createdAt: new Date(),
  },
  {
    id: '2',
    name: 'Neon Horizons',
    description:
      'Cyberpunk dystopia where corporations rule and hackers resist.',
    tags: ['Sci-Fi', 'Cyberpunk', 'Dystopia'],
    rating: 4.6,
    collaborators: ['user4', 'user5'],
    stories: ['story3'],
    createdAt: new Date(),
  },
];

export default function Explore() {
  return (
    <div className="min-h-screen pt-24 px-4 sm:px-6 lg:px-8 bg-background">
      <div className="max-w-7xl mx-auto">
        <ExploreHeader />
        <UniverseGrid universes={SAMPLE_UNIVERSES} />
      </div>
    </div>
  );
}
