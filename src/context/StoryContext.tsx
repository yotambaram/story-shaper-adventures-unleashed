
import { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "./AuthContext";

export type Story = {
  id: string;
  userId: string;
  topic: string;
  goal: string;
  age: number;
  duration: string;
  voiceStyle: string;
  language: "en" | "he" | "es";
  storyText: string;
  audioUrl: string;
  createdAt: Date;
  title?: string;
};

type StoryContextType = {
  stories: Story[];
  currentStory: Story | null;
  isGenerating: boolean;
  generateStory: (storyParams: Omit<Story, "id" | "userId" | "storyText" | "audioUrl" | "createdAt">) => Promise<Story>;
  getStoryById: (id: string) => Story | undefined;
  isLoading: boolean;
  clearCurrentStory: () => void;
};

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
  const [stories, setStories] = useState<Story[]>([]);
  const [currentStory, setCurrentStory] = useState<Story | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();
  const { user } = useAuth();

  useEffect(() => {
    if (user) {
      // Load stories from localStorage when user logs in
      const savedStories = localStorage.getItem(`stories_${user.id}`);
      if (savedStories) {
        try {
          const parsedStories = JSON.parse(savedStories);
          // Convert ISO date strings back to Date objects
          const storiesWithDates = parsedStories.map((story: any) => ({
            ...story,
            createdAt: new Date(story.createdAt)
          }));
          setStories(storiesWithDates);
        } catch (error) {
          console.error("Failed to parse saved stories", error);
        }
      }
    } else {
      // Clear stories when user logs out
      setStories([]);
    }
    setIsLoading(false);
  }, [user]);

  // Save stories to localStorage whenever they change
  useEffect(() => {
    if (user && stories.length > 0) {
      localStorage.setItem(`stories_${user.id}`, JSON.stringify(stories));
    }
  }, [stories, user]);

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
      // Simulate API call for story generation
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // In a real app, this would call an AI service
      const sampleStory = generateSampleStory(storyParams.topic, storyParams.age, storyParams.goal);
      
      // Create a new story object
      const newStory: Story = {
        id: `story_${Date.now()}`,
        userId: user.id,
        ...storyParams,
        storyText: sampleStory,
        // In a real app, this would be a URL to an audio file
        audioUrl: "https://example.com/audio.mp3", 
        createdAt: new Date(),
        title: `Story about ${storyParams.topic}`
      };
      
      // Update state
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

// Helper function to generate a sample story for demo purposes
function generateSampleStory(topic: string, age: number, goal: string): string {
  const ageGroup = age <= 4 ? "toddler" : age <= 7 ? "young" : "older";
  let complexity = "simple";
  let length = 3;
  
  if (ageGroup === "young") {
    complexity = "moderate";
    length = 5;
  } else if (ageGroup === "older") {
    complexity = "advanced";
    length = 7;
  }
  
  const animals = ["rabbit", "fox", "bear", "owl", "squirrel", "deer"];
  const mainCharacter = animals[Math.floor(Math.random() * animals.length)];
  const secondCharacter = animals.filter(a => a !== mainCharacter)[Math.floor(Math.random() * (animals.length - 1))];
  
  let story = "";
  
  if (goal.toLowerCase().includes("bedtime")) {
    story = `Once upon a time, in a magical forest filled with twinkling stars, there lived a gentle ${mainCharacter} named Lumi. Every night, Lumi would gaze at the moon and dream of adventures.\n\n`;
    story += `One evening, Lumi met a wise old ${secondCharacter} who shared secrets about the night sky. "The stars are night lights for dreaming children," said the ${secondCharacter}.\n\n`;
    story += `Together, they collected moonbeams in special jars that glowed softly. The ${mainCharacter} learned that bedtime was a magical time when dreams begin to bloom.\n\n`;
    story += `As they walked home under the starry sky, Lumi's eyelids grew heavy. "That means your dreams are ready," whispered the ${secondCharacter}.\n\n`;
    story += `Lumi curled up in a cozy bed of soft leaves, feeling safe and warm. And as the ${mainCharacter} drifted to sleep, the stars twinkled a lullaby. Sweet dreams, little Lumi. Sweet dreams.`;
  } else if (goal.toLowerCase().includes("learning")) {
    story = `In the heart of Wisdom Woods lived a curious ${mainCharacter} named Pip who loved to learn about ${topic}.\n\n`;
    story += `One sunny morning, Pip met a knowledgeable ${secondCharacter} who offered to teach everything about ${topic}. They spent the day exploring and discovering amazing facts.\n\n`;
    story += `"Did you know," said the ${secondCharacter}, "that learning about ${topic} helps us understand our world better?"\n\n`;
    story += `Pip's eyes widened with wonder. The ${mainCharacter} asked questions and listened carefully, remembering every interesting detail.\n\n`;
    story += `By sunset, Pip had learned so much about ${topic} that the ${mainCharacter} couldn't wait to share this knowledge with friends. "Learning makes our minds grow stronger," Pip said with a smile. "Just like exercise makes our bodies strong!"`;
  } else {
    // Generic story
    story = `In the beautiful valley of Harmony Hills, there lived a friendly ${mainCharacter} named Sam who loved ${topic} more than anything.\n\n`;
    story += `One day, Sam met a ${secondCharacter} who was feeling sad. "What's wrong?" asked the ${mainCharacter} gently.\n\n`;
    story += `"I don't know how to enjoy ${topic} like everyone else," sighed the ${secondCharacter}. Sam smiled warmly and offered to help.\n\n`;
    story += `Together, they spent the day exploring ${topic}. The ${secondCharacter} learned that everyone experiences things differently, and that's what makes us special.\n\n`;
    story += `As the sun set, they sat together watching the colorful sky. "Thank you for teaching me about ${topic}," said the ${secondCharacter}. Sam replied, "That's what friends are for—to help each other grow and learn." And from that day on, they remained the best of friends.`;
  }
  
  return story;
}
