
import { Button } from "@/components/ui/button";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";
import { Alert } from "@/components/ui/alert";

interface AudioPlayerProps {
  isPlaying: boolean;
  progress: number;
  voiceStyle: string;
  onTogglePlay: () => void;
  isAudioLoaded?: boolean;
}

export function AudioPlayer({ isPlaying, progress, voiceStyle, onTogglePlay, isAudioLoaded }: AudioPlayerProps) {
  const isDemoMode = voiceStyle === "Demo";
  
  return (
    <div className="mb-4 p-4 bg-secondary rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <Button
          size="sm"
          variant={isPlaying ? "destructive" : "default"}
          onClick={onTogglePlay}
          className="flex items-center gap-2"
          disabled={!isAudioLoaded && !isDemoMode}
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
          {isPlaying ? "Pause" : "Play"} Narration
        </Button>
        <div className="text-sm text-muted-foreground flex items-center gap-2">
          {!isAudioLoaded && !isDemoMode ? (
            <>
              <VolumeX className="h-4 w-4 text-destructive" />
              <span className="text-destructive">Audio unavailable</span>
            </>
          ) : (
            <>
              <Volume2 className="h-4 w-4" />
              <span>Voice: {voiceStyle}</span>
            </>
          )}
        </div>
      </div>
      
      {!isAudioLoaded && !isDemoMode && (
        <Alert variant="destructive" className="mb-3 py-2">
          Audio file could not be loaded. This may be due to a network issue or the file may not exist.
        </Alert>
      )}
      
      <div className="h-2 rounded-full bg-muted overflow-hidden">
        <div 
          className="h-full bg-story-purple transition-all duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
