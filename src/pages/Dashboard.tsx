import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import StoryCard from "@/components/story/StoryCard";
import { useStory } from "@/context/StoryContext";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function Dashboard() {
  const { stories, isLoading } = useStory();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filterGoal, setFilterGoal] = useState("all");
  const [selectedKid, setSelectedKid] = useState("all");
  
  const mockKids = [
    { id: "1", name: "Emma" },
    { id: "2", name: "Noah" },
    { id: "3", name: "Olivia" }
  ];
  
  const filteredStories = stories.filter(story => {
    const matchesTopic = story.topic.toLowerCase().includes(searchTerm.toLowerCase()) || 
                       (story.title || "").toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGoal = filterGoal === "all" || story.goal === filterGoal;
    const matchesKid = selectedKid === "all";
    
    return matchesTopic && matchesGoal && matchesKid;
  });

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <div className="flex-1 container mx-auto py-8 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-1">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! Browse your personalized stories
              </p>
            </div>
            <Button asChild size="lg">
              <Link to="/create">Create New Story</Link>
            </Button>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-grow">
              <Input
                placeholder="Search by topic or title..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full sm:w-48">
              <Select value={filterGoal} onValueChange={setFilterGoal}>
                <SelectTrigger>
                  <SelectValue placeholder="Story type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="story">Just a Story</SelectItem>
                  <SelectItem value="bedtime">Bedtime Story</SelectItem>
                  <SelectItem value="broadcast">Broadcast Story</SelectItem>
                  <SelectItem value="learning">Learning Content</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-full sm:w-48">
              <Select value={selectedKid} onValueChange={setSelectedKid}>
                <SelectTrigger>
                  <SelectValue placeholder="Select kid" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Kids</SelectItem>
                  {mockKids.map(kid => (
                    <SelectItem key={kid.id} value={kid.id}>
                      {kid.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {isLoading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin h-8 w-8 border-4 border-story-purple border-t-transparent rounded-full mb-4"></div>
              <p>Loading your stories...</p>
            </div>
          ) : filteredStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredStories.map(story => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : stories.length > 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl mb-2">No matching stories found</h3>
              <p className="text-muted-foreground mb-4">Try adjusting your search or filters</p>
              <Button 
                variant="outline" 
                onClick={() => { 
                  setSearchTerm(""); 
                  setFilterGoal("all");
                  setSelectedKid("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="text-center py-12 max-w-md mx-auto">
              <div className="bg-story-light-purple rounded-full w-16 h-16 mx-auto flex items-center justify-center mb-4">
                <BookIcon className="w-8 h-8 text-story-purple" />
              </div>
              <h3 className="text-xl mb-2">Create your first story!</h3>
              <p className="text-muted-foreground mb-6">
                You haven't created any stories yet. Start by creating a personalized story for your child.
              </p>
              <Button asChild>
                <Link to="/create">Create New Story</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
}
