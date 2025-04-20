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
      const savedStories = localStorage.getItem(`stories_${user.id}`);
      if (savedStories) {
        try {
          const parsedStories = JSON.parse(savedStories);
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
      setStories([]);
    }
    setIsLoading(false);
  }, [user]);

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

    const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
    
    if (!apiKey) {
      toast({
        title: "Configuration Error",
        description: "OpenAI API key is not configured. Please check your environment variables.",
        variant: "destructive"
      });
      
      const mockStory = await generateMockStory(storyParams, user.id);
      setStories(prevStories => [mockStory, ...prevStories]);
      setCurrentStory(mockStory);
      
      toast({
        title: "Demo Mode",
        description: "Using a mock story since the API key is not configured.",
      });
      
      return mockStory;
    }

    setIsGenerating(true);
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: `You are a creative storyteller for children. Create a ${storyParams.duration} story about ${storyParams.topic} suitable for a ${storyParams.age} year old child. The story should be ${storyParams.goal === "bedtime" ? "calming and suitable for bedtime" : storyParams.goal === "learning" ? "educational and engaging" : "entertaining and engaging"}. Write in ${storyParams.language === "en" ? "English" : storyParams.language === "he" ? "Hebrew" : "Spanish"}.`
            },
            {
              role: "user",
              content: `Generate a story about ${storyParams.topic}`
            }
          ]
        })
      });

      if (!response.ok) {
        throw new Error("Failed to generate story");
      }

      const data = await response.json();
      const generatedStoryText = data.choices[0].message.content;

      const newStory: Story = {
        id: `story_${Date.now()}`,
        userId: user.id,
        ...storyParams,
        storyText: generatedStoryText,
        audioUrl: "", // We'll implement audio generation separately
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

  const generateMockStory = async (
    storyParams: Omit<Story, "id" | "userId" | "storyText" | "audioUrl" | "createdAt">,
    userId: string
  ): Promise<Story> => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    let generatedStoryText = `Once upon a time, there was a story about ${storyParams.topic}. `;
    
    if (storyParams.goal === "bedtime") {
      generatedStoryText += "The stars twinkled softly in the night sky as the characters drifted into a peaceful sleep. ";
    } else if (storyParams.goal === "learning") {
      generatedStoryText += "The characters learned many interesting facts and grew wiser with each new discovery. ";
    } else {
      generatedStoryText += "The characters had an exciting adventure full of twists and turns. ";
    }
    
    generatedStoryText += `This story was created for a ${storyParams.age} year old child and is meant to last about ${storyParams.duration}.`;

    return {
      id: `story_${Date.now()}`,
      userId: userId,
      ...storyParams,
      storyText: generatedStoryText,
      audioUrl: "", // Empty string since audio hasn't been generated yet
      createdAt: new Date(),
      title: `Story about ${storyParams.topic}`
    };
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
