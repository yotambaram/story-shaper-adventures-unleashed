
import { createContext, useState, useContext, ReactNode } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";
import { generateMockStoryText } from "../utils/storyGenerator";
import { useStoriesStorage } from "../hooks/useStoriesStorage";
import type { Story, StoryContextType } from "../types/story";

const StoryContext = createContext<StoryContextType | undefined>(undefined);

export const useStory = () => {
  const context = useContext(StoryContext);
  if (!context) {
    throw new Error("useStory must be used within a StoryProvider");
  }
  return context;
};

type StoryProviderProps = {
  children: ReactNode;
};

export const StoryProvider = ({ children }: StoryProviderProps) => {
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const { user } = useAuth();
  const { stories, setStories, isLoading } = useStoriesStorage(user?.id);
  const { toast } = useToast();

  const generateStory = async (storyParams: Omit<Story, "id" | "userId" | "storyText" | "audioUrl" | "createdAt">) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to generate a story.",
        variant: "destructive"
      });
      throw new Error("User not authenticated");
    }

    setIsGenerating(true);
    try {
      const generatedStoryText = generateMockStoryText(storyParams);
      
      const newStory: Story = {
        id: `story_${Date.now()}`,
        userId: user.id,
        ...storyParams,
        storyText: generatedStoryText,
        audioUrl: "", // Audio will be generated separately with ElevenLabs
        createdAt: new Date(),
        title: `Story about ${storyParams.topic}`
      };
      
      setStories(prevStories => [newStory, ...prevStories]);
      setCurrentStory(newStory);
      
      toast({
        title: "Story created!",
        description: "Your personalized story is ready.",
      });
      
      return newStory;
    } catch (error) {
      console.error("Story generation error:", error);
      toast({
        title: "Generation failed",
        description: "There was a problem creating your story. Please try again.",
        variant: "destructive"
      });
      throw error;
    } finally {
      setIsGenerating(false);
    }
  };

  const getStoryById = (id: string) => {
    return stories.find(story => story.id === id);
  };

  const clearCurrentStory = () => {
    setCurrentStory(null);
  };

  return (
    <StoryContext.Provider
      value={{
        stories,
        currentStory,
        isGenerating,
        generateStory,
        getStoryById,
        isLoading,
        clearCurrentStory
      }}
    >
      {children}
    </StoryContext.Provider>
  );
};
