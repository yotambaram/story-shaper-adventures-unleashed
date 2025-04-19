
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStory } from "@/context/StoryContext";
import { Story } from "@/context/StoryContext";
import StoryLoading from "./StoryLoading";

export default function StoryViewer() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getStoryById, isLoading } = useStory();
  const [story, setStory] = useState<Story | undefined>();
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (id) {
      const foundStory = getStoryById(id);
      setStory(foundStory);
    }
  }, [id, getStoryById]);

  const handleDownloadText = () => {
    if (!story) return;
    
    const element = document.createElement("a");
    const file = new Blob([story.storyText], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = `${story.title || "story"}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleDownloadPDF = () => {
    // In a real app, this would generate a PDF
    alert("PDF download would be implemented here with a PDF generation library");
  };

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
    // In a real app, this would play/pause the audio
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

  const getLanguageLabel = (code: string) => {
    const languages: Record<string, string> = {
      en: "English",
      he: "Hebrew",
      es: "Spanish"
    };
    return languages[code] || code;
  };

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-2xl">{story.title || `Story about ${story.topic}`}</CardTitle>
            <div className="flex gap-2 mt-2">
              <span className="inline-flex items-center rounded-md bg-story-soft-blue px-2 py-1 text-xs font-medium">
                {getLanguageLabel(story.language)}
              </span>
              <span className="inline-flex items-center rounded-md bg-story-soft-green px-2 py-1 text-xs font-medium">
                {story.goal}
              </span>
              <span className="inline-flex items-center rounded-md bg-story-soft-yellow px-2 py-1 text-xs font-medium">
                Age {story.age}
              </span>
              <span className="inline-flex items-center rounded-md bg-story-soft-pink px-2 py-1 text-xs font-medium">
                {story.duration}
              </span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-4 pb-6">
        <div className="mb-4 p-4 bg-secondary rounded-lg">
          <div className="flex items-center gap-3 mb-3">
            <Button
              size="sm"
              variant={isPlaying ? "destructive" : "default"}
              onClick={toggleAudio}
            >
              {isPlaying ? "Pause" : "Play"} Narration
            </Button>
            <div className="text-sm text-muted-foreground">
              Voice: {story.voiceStyle}
            </div>
          </div>
          <div className="h-2 rounded-full bg-muted overflow-hidden">
            <div 
              className={`h-full bg-story-purple transition-all duration-1000 ease-linear ${
                isPlaying ? "animate-progress" : ""
              }`}
              style={{ width: isPlaying ? "100%" : "0%" }}
            />
          </div>
        </div>

        <div className="story-content font-sans whitespace-pre-wrap bg-white rounded-lg p-6 border">
          {story.storyText}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap justify-between gap-3 border-t pt-6">
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownloadText}>
            Download as Text
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            Download as PDF
          </Button>
        </div>
        <Button onClick={handleBackToDashboard}>Back to Dashboard</Button>
      </CardFooter>
    </Card>
  );
}
