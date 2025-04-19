import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StoryCard from "@/components/story/StoryCard";
import { useStory } from "@/context/StoryContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { LogOut, Lollipop } from "lucide-react";

export default function Dashboard() {
  const { stories, isLoading } = useStory();
  const { user, logout } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGoal, setFilterGoal] = useState("all");
  
  const filteredStories = stories.filter(story => {
    const matchesTopic = story.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       (story.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGoal = filterGoal === "all" || story.goal === filterGoal;
    
    return matchesTopic && matchesGoal;
  });

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-gradient-to-b from-story-soft-blue via-white to-story-soft-pink">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <div className="flex items-center gap-3">
            <Lollipop className="h-8 w-8 text-story-purple animate-bounce" />
            <h1 className="text-3xl font-bold mb-1 font-display bg-gradient-to-r from-story-purple to-story-dark-purple bg-clip-text text-transparent">
              My Stories
            </h1>
          </div>
          <p className="text-muted-foreground font-display">
            Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! Let's explore your magical stories
          </p>
        </div>
        <div className="flex items-center gap-4">
          <Button 
            asChild 
            size="lg"
            className="bg-story-purple hover:bg-story-dark-purple font-display text-white rounded-full transition-transform hover:scale-105"
          >
            <Link to="/create">Create New Story</Link>
          </Button>
          <Button 
            variant="outline" 
            size="icon" 
            onClick={logout}
            title="Logout"
            className="rounded-full border-story-purple text-story-purple hover:bg-story-light-purple"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
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
      
      {isLoading ? (
        <div className="text-center py-12">
          <div className="inline-block animate-[spin_3s_linear_infinite] h-12 w-12 text-story-purple">
            <Lollipop className="h-full w-full" />
          </div>
          <p className="font-display mt-4 text-story-purple">Loading your magical stories...</p>
        </div>
      ) : filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStories.map(story => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : stories.length > 0 ? (
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
      ) : (
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
      )}
    </div>
  );
}
