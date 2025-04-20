
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

export type StoryContextType = {
  stories: Story[];
  currentStory: Story | null;
  isGenerating: boolean;
  generateStory: (storyParams: Omit<Story, "id" | "userId" | "storyText" | "audioUrl" | "createdAt">) => Promise<Story>;
  getStoryById: (id: string) => Story | undefined;
  isLoading: boolean;
  clearCurrentStory: () => void;
};
