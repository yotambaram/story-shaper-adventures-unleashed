
import StoryForm from "@/components/story/StoryForm";
import StoryLoading from "@/components/story/StoryLoading";
import { useStory } from "@/context/StoryContext";

export default function CreateStory() {
  const { isGenerating } = useStory();
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 font-display">Create a Story</h1>
          <p className="text-muted-foreground">
            Tell us about your child and what kind of story you're looking for
          </p>
        </div>
        
        {isGenerating ? <StoryLoading /> : <StoryForm />}
      </div>
    </div>
  );
}
