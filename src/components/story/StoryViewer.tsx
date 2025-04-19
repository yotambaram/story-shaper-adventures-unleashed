
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStory } from "@/context/StoryContext";
import { Story } from "@/context/StoryContext";
import StoryLoading from "./StoryLoading";
import { Download } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AudioPlayer } from "./AudioPlayer";
import { StoryContent } from "./StoryContent";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";

export default function StoryViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStoryById, isLoading } = useStory();
  const [story, setStory] = useState<Story | undefined>();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      const foundStory = getStoryById(id);
      setStory(foundStory);
    }
  }, [id, getStoryById]);

  const { isPlaying, progress, toggleAudio } = useAudioPlayer(story?.audioUrl);

  const handleDownloadAudio = () => {
    if (!story?.audioUrl) return;
    
    if (story.audioUrl === "https://example.com/audio.mp3") {
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
          <div>
            <CardTitle className="text-2xl">{story.title || `Story about ${story.topic}`}</CardTitle>
            <StoryContent story={story} />
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <AudioPlayer
          isPlaying={isPlaying}
          progress={progress}
          voiceStyle={story.voiceStyle}
          onTogglePlay={toggleAudio}
        />
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-3 border-t pt-6">
        <Button 
          variant="outline" 
          onClick={handleDownloadAudio}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          Download Audio
        </Button>
        <Button onClick={handleBackToDashboard}>Back to Dashboard</Button>
      </CardFooter>
    </Card>
  );
}
