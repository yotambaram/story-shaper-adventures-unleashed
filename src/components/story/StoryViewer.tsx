
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStory } from "@/context/StoryContext";
import { Story } from "@/context/StoryContext";
import StoryLoading from "./StoryLoading";
import { Download, Volume2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AudioPlayer } from "./AudioPlayer";
import { StoryContent } from "./StoryContent";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { generateAudio } from "@/lib/audioGenerator";

export default function StoryViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStoryById, isLoading } = useStory();
  const [story, setStory] = useState<Story | undefined>();
  const { toast } = useToast();
  const [generatingAudio, setGeneratingAudio] = useState(false);

  useEffect(() => {
    if (id) {
      const foundStory = getStoryById(id);
      setStory(foundStory);

      if (!foundStory) {
        toast({
          title: "Story Not Found",
          description: "We couldn't find the story you're looking for.",
          variant: "destructive"
        });
      }
    }
  }, [id, getStoryById, toast]);

  const isDemoStory = story?.audioUrl === "https://example.com/audio.mp3";
  const { isPlaying, progress, isAudioLoaded, toggleAudio } = useAudioPlayer(story?.audioUrl);

  const handleGenerateAudio = async () => {
    if (!story) return;
    
    setGeneratingAudio(true);
    try {
      const audioUrl = await generateAudio(story.storyText, story.voiceStyle);
      // Update the story with the new audio URL
      if (audioUrl) {
        // Here we would typically update the story in the database
        // For now, we just update it in the local state
        setStory({...story, audioUrl});
        toast({
          title: "Audio Generated",
          description: "Your story audio has been successfully generated.",
        });
      }
    } catch (error) {
      console.error("Failed to generate audio:", error);
      let errorMessage = "We couldn't generate audio for this story. Please try again later.";
      
      // Check for specific error messages
      if (error instanceof Error) {
        if (error.message.includes("API key")) {
          errorMessage = "API key not configured. Please check your environment settings.";
        } else if (error.message.includes("Rate limit")) {
          errorMessage = "API rate limit exceeded. Please try again later.";
        }
      }
      
      toast({
        title: "Audio Generation Failed",
        description: errorMessage,
        variant: "destructive"
      });
    } finally {
      setGeneratingAudio(false);
    }
  };

  const handleDownloadAudio = () => {
    if (!story?.audioUrl || story.audioUrl === "") return;
    
    if (isDemoStory) {
      toast({
        title: "Demo Mode",
        description: "This is a demonstration. In production, you would be able to download the actual audio file.",
      });
      return;
    }

    const element = document.createElement("a");
    element.href = story.audioUrl;
    element.download = `${story.title || `Story_${story.id}`}.mp3`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  if (isLoading) {
    return <StoryLoading />;
  }

  if (!story) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="pt-6">
          <div className="text-center">
            <h3 className="text-xl font-medium">Story not found</h3>
            <p className="text-muted-foreground mt-2">
              We couldn't find the story you're looking for.
            </p>
            <Button onClick={handleBackToDashboard} className="mt-4">
              Back to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl">{story.title || `Story about ${story.topic}`}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <StoryContent story={story} />
        
        {story.audioUrl ? (
          <div className="mt-6">
            <AudioPlayer
              isPlaying={isPlaying}
              progress={progress}
              voiceStyle={story.voiceStyle}
              onTogglePlay={toggleAudio}
              isAudioLoaded={isAudioLoaded || isDemoStory}
            />
          </div>
        ) : (
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={handleGenerateAudio} 
              disabled={generatingAudio}
              className="flex items-center gap-2"
            >
              <Volume2 className="h-4 w-4" />
              {generatingAudio ? "Generating Audio..." : "Generate Audio Narration"}
            </Button>
          </div>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-3 border-t pt-6">
        <Button 
          variant="outline" 
          onClick={handleDownloadAudio}
          className="flex items-center gap-2"
          disabled={!story.audioUrl || (!isDemoStory && !isAudioLoaded)}
        >
          <Download className="h-4 w-4" />
          Download Audio
        </Button>
        <Button onClick={handleBackToDashboard}>Back to Dashboard</Button>
      </CardFooter>
    </Card>
  );
}
