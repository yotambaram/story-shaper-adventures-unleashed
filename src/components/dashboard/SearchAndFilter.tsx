
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterGoal: string;
  setFilterGoal: (goal: string) => void;
}

export default function SearchAndFilter({ 
  searchTerm, 
  setSearchTerm, 
  filterGoal, 
  setFilterGoal 
}: SearchAndFilterProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-grow">
        <Input
          placeholder="Search by topic or title..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full rounded-full border-story-purple font-display placeholder:text-story-purple/60"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select value={filterGoal} onValueChange={setFilterGoal}>
          <SelectTrigger className="rounded-full border-story-purple font-display">
            <SelectValue placeholder="Story type" />
          </SelectTrigger>
          <SelectContent className="font-display">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="story">Just a Story</SelectItem>
            <SelectItem value="bedtime">Bedtime Story</SelectItem>
            <SelectItem value="broadcast">Broadcast Story</SelectItem>
            <SelectItem value="learning">Learning Content</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
