
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAudioPlayer = (audioUrl: string | undefined) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", handleAudioEnd);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("timeupdate", updateProgress);
          audioRef.current.removeEventListener("ended", handleAudioEnd);
        }
      };
    }
  }, [audioUrl]);

  const updateProgress = () => {
    if (audioRef.current) {
      const currentProgress = 
        (audioRef.current.currentTime / audioRef.current.duration) * 100;
      setProgress(currentProgress);
    }
  };

  const handleAudioEnd = () => {
    setIsPlaying(false);
    setProgress(0);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
    }
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      if (audioUrl === "https://example.com/audio.mp3") {
        toast({
          title: "Demo Mode",
          description: "This is a demonstration. In production, real audio would play here.",
        });
      }
      
      audioRef.current.play().catch(error => {
        console.error("Audio playback error:", error);
        toast({
          title: "Playback Error",
          description: "Could not play the audio. This might be a demo or the audio file is unavailable.",
          variant: "destructive"
        });
      });
    }
    
    setIsPlaying(!isPlaying);
  };

  return {
    isPlaying,
    progress,
    toggleAudio
  };
};
