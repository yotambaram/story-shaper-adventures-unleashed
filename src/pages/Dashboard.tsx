
import { useState } from "react";
import { useStory } from "@/context/StoryContext";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import SearchAndFilter from "@/components/dashboard/SearchAndFilter";
import StoriesList from "@/components/dashboard/StoriesList";

export default function Dashboard() {
  const { stories, isLoading } = useStory();
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
      <DashboardHeader />
      <SearchAndFilter 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        filterGoal={filterGoal}
        setFilterGoal={setFilterGoal}
      />
      <StoriesList 
        stories={stories}
        filteredStories={filteredStories}
        isLoading={isLoading}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setFilterGoal={setFilterGoal}
      />
    </div>
  );
}
