
import { useState, useEffect, useRef } from "react";
import { useToast } from "@/hooks/use-toast";

export const useAudioPlayer = (audioUrl: string | undefined) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isAudioLoaded, setIsAudioLoaded] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (audioUrl) {
      // Clean up previous audio element if it exists
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("timeupdate", updateProgress);
        audioRef.current.removeEventListener("ended", handleAudioEnd);
        audioRef.current.removeEventListener("canplaythrough", handleCanPlayThrough);
        audioRef.current.removeEventListener("error", handleAudioError);
      }
      
      // Create new audio element
      audioRef.current = new Audio(audioUrl);
      
      // Add event listeners
      audioRef.current.addEventListener("timeupdate", updateProgress);
      audioRef.current.addEventListener("ended", handleAudioEnd);
      audioRef.current.addEventListener("canplaythrough", handleCanPlayThrough);
      audioRef.current.addEventListener("error", handleAudioError);

      // Reset state
      setIsPlaying(false);
      setProgress(0);
      setIsAudioLoaded(false);
      
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener("timeupdate", updateProgress);
          audioRef.current.removeEventListener("ended", handleAudioEnd);
          audioRef.current.removeEventListener("canplaythrough", handleCanPlayThrough);
          audioRef.current.removeEventListener("error", handleAudioError);
        }
      };
    }
  }, [audioUrl]);

  const handleCanPlayThrough = () => {
    setIsAudioLoaded(true);
  };

  const handleAudioError = (e: Event) => {
    console.error("Audio error:", e);
    setIsPlaying(false);
    setIsAudioLoaded(false);
    toast({
      title: "Audio Error",
      description: "Could not load the audio file. Please try again later.",
      variant: "destructive"
    });
  };

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
    if (!audioRef.current || !audioUrl) {
      toast({
        title: "Audio Unavailable",
        description: "No audio file is available for this story.",
        variant: "destructive"
      });
      return;
    }
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      // For demo URL, show toast but still try to play
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
      
      setIsPlaying(true);
    }
  };

  return {
    isPlaying,
    progress,
    isAudioLoaded,
    toggleAudio
  };
};
