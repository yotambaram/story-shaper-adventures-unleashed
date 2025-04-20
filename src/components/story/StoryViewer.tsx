
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStory } from "@/context/StoryContext";
import { Story } from "@/types/story";
import StoryLoading from "./StoryLoading";
import { Download, Volume2, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { AudioPlayer } from "./AudioPlayer";
import { StoryContent } from "./StoryContent";
import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { generateAudio } from "@/lib/audioGenerator";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function StoryViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStoryById, isLoading, stories, setStories } = useStory() as any;
  const [story, setStory] = useState<Story | undefined>();
  const { toast } = useToast();
  const [generatingAudio, setGeneratingAudio] = useState(false);
  const [apiKeyError, setApiKeyError] = useState<string | null>(null);
  const [generationError, setGenerationError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      console.log("Fetching story with ID:", id);
      const foundStory = getStoryById(id);
      console.log("Found story:", foundStory ? "Yes" : "No");
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
    if (!story) {
      console.error("Cannot generate audio - no story available");
      return;
    }
    
    setGeneratingAudio(true);
    setApiKeyError(null);
    setGenerationError(null);
    
    try {
      console.log("Starting audio generation process for story:", story.title);
      console.log("Story text length:", story.storyText?.length || 0);
      console.log("Selected voice style:", story.voiceStyle);
      
      // Use ElevenLabs API to generate audio
      const audioUrl = await generateAudio(story.storyText, story.voiceStyle);
      
      // Update the story with the new audio URL
      if (audioUrl) {
        console.log("Audio URL generated successfully");
        
        // Create updated story with audio URL
        const updatedStory = {...story, audioUrl};
        
        // Update local state
        setStory(updatedStory);
        
        // Update stories in context
        if (setStories) {
          console.log("Updating story in context");
          setStories((prevStories: Story[]) => 
            prevStories.map((s: Story) => 
              s.id === story.id ? updatedStory : s
            )
          );
        }
        
        toast({
          title: "Audio Generated",
          description: "Your story audio has been successfully generated with ElevenLabs.",
        });
      }
    } catch (error) {
      console.error("Failed to generate audio:", error);
      let errorMessage = "We couldn't generate audio for this story. Please try again later.";
      
      // Check for specific error messages
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        
        if (error.message.includes("API key")) {
          errorMessage = "ElevenLabs API key not configured or invalid. Please check your environment settings.";
          setApiKeyError("API key missing or invalid");
        } else if (error.message.includes("Rate limit")) {
          errorMessage = "ElevenLabs API rate limit exceeded. You may have reached your usage quota or free tier limit.";
          setGenerationError("Rate limit exceeded");
        } else {
          setGenerationError(error.message);
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
    <TooltipProvider>
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
            <div className="mt-6">
              {generationError && (
                <Alert className="mb-4" variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Error: {generationError}
                  </AlertDescription>
                </Alert>
              )}
              
              {apiKeyError ? (
                <div className="mb-4">
                  <Alert className="mb-2" variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      ElevenLabs API key error. Make sure your .env.local file contains VITE_ELEVENLABS_API_KEY=your_key_here
                    </AlertDescription>
                  </Alert>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button 
                        onClick={handleGenerateAudio} 
                        disabled={generatingAudio}
                        className="flex items-center gap-2 w-full"
                      >
                        <Volume2 className="h-4 w-4" />
                        {generatingAudio ? "Generating Audio..." : "Retry with API Key"}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent className="max-w-xs">
                      <p>ElevenLabs API key error. Make sure your .env.local file contains VITE_ELEVENLABS_API_KEY=your_key_here</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              ) : (
                <div className="flex justify-center">
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
    </TooltipProvider>
  );
}
