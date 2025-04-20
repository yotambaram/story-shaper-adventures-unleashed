
import { useState, useEffect } from 'react';
import type { Story } from '../types/story';

export const useStoriesStorage = (userId: string | undefined) => {
  const [stories, setStories] = useState<Story[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const savedStories = localStorage.getItem(`stories_${userId}`);
      if (savedStories) {
        try {
          const parsedStories = JSON.parse(savedStories);
          const storiesWithDates = parsedStories.map((story: any) => ({
            ...story,
            createdAt: new Date(story.createdAt)
          }));
          setStories(storiesWithDates);
        } catch (error) {
          console.error("Failed to parse saved stories", error);
        }
      }
    } else {
      setStories([]);
    }
    setIsLoading(false);
  }, [userId]);

  useEffect(() => {
    if (userId && stories.length > 0) {
      localStorage.setItem(`stories_${userId}`, JSON.stringify(stories));
    }
  }, [stories, userId]);

  return { stories, setStories, isLoading };
};
