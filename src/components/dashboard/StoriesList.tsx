
import { Button } from "@/components/ui/button";
import StoryCard from "@/components/story/StoryCard";
import { Story } from "@/context/StoryContext";
import { Lollipop } from "lucide-react";
import { Link } from "react-router-dom";

interface StoriesListProps {
  stories: Story[];
  filteredStories: Story[];
  isLoading: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  setFilterGoal: (goal: string) => void;
}

export default function StoriesList({ 
  stories, 
  filteredStories, 
  isLoading,
  searchTerm,
  setSearchTerm,
  setFilterGoal
}: StoriesListProps) {
  if (isLoading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-[spin_3s_linear_infinite] h-12 w-12 text-story-purple">
          <Lollipop className="h-full w-full" />
        </div>
        <p className="font-display mt-4 text-story-purple">Loading your magical stories...</p>
      </div>
    );
  }

  if (filteredStories.length > 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStories.map(story => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    );
  }

  if (stories.length > 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-xl mb-2 font-display text-story-purple">No matching stories found</h3>
        <p className="text-muted-foreground mb-4 font-display">Try adjusting your search or filters</p>
        <Button 
          variant="outline" 
          onClick={() => { 
            setSearchTerm(""); 
            setFilterGoal("all");
          }}
          className="rounded-full border-story-purple text-story-purple hover:bg-story-light-purple font-display"
        >
          Clear filters
        </Button>
      </div>
    );
  }

  return (
    <div className="text-center py-12 max-w-md mx-auto">
      <div className="bg-story-light-purple rounded-full w-24 h-24 mx-auto flex items-center justify-center mb-4">
        <Lollipop className="w-12 h-12 text-story-purple animate-bounce" />
      </div>
      <h3 className="text-xl mb-2 font-display text-story-purple">Create your first story!</h3>
      <p className="text-muted-foreground mb-6 font-display">
        You haven't created any stories yet. Let's create something magical for your child!
      </p>
      <Button 
        asChild
        className="bg-story-purple hover:bg-story-dark-purple font-display text-white rounded-full transition-transform hover:scale-105"
      >
        <Link to="/create">Create New Story</Link>
      </Button>
    </div>
  );
}
