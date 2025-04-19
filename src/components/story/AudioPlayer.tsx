
import { Button } from "@/components/ui/button";
import { Pause, Play } from "lucide-react";

interface AudioPlayerProps {
  isPlaying: boolean;
  progress: number;
  voiceStyle: string;
  onTogglePlay: () => void;
}

export function AudioPlayer({ isPlaying, progress, voiceStyle, onTogglePlay }: AudioPlayerProps) {
  return (
    <div className="mb-4 p-4 bg-secondary rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <Button
          size="sm"
          variant={isPlaying ? "destructive" : "default"}
          onClick={onTogglePlay}
          className="flex items-center gap-2"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"} Narration
        </Button>
        <div className="text-sm text-muted-foreground">
          Voice: {voiceStyle}
        </div>
      </div>
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div 
          className="h-full bg-story-purple transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
