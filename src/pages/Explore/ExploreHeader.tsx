import { Search, Filter } from 'lucide-react';

export default function ExploreHeader() {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent text-transparent bg-clip-text">
          Explore Story Universes
        </h1>
        <p className="text-muted-foreground mt-2">
          Discover incredible worlds created by our community
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search universes..."
            className="pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary w-full sm:w-64"
          />
        </div>

        <div className="relative">
          <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <select className="pl-10 pr-4 py-2 bg-background/50 border border-border rounded-lg focus:ring-2 focus:ring-primary appearance-none w-full sm:w-48">
            <option value="all">All Genres</option>
            <option value="fantasy">Fantasy</option>
            <option value="scifi">Sci-Fi</option>
            <option value="mystery">Mystery</option>
          </select>
        </div>
      </div>
    </div>
  );
}
