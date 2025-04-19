
import { Story } from "@/context/StoryContext";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { MessageSquare } from "lucide-react";

interface StoryContentProps {
  story: Story;
}

export function StoryContent({ story }: StoryContentProps) {
  const getLanguageLabel = (code: string) => {
    const languages: Record<string, string> = {
      en: "English",
      he: "Hebrew",
      es: "Spanish"
    };
    return languages[code] || code;
  };

  return (
    <>
      <div className="flex gap-2 mb-6">
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

      <Dialog>
        <DialogTrigger asChild>
          <button className="inline-flex items-center gap-2 hover:opacity-80 transition-opacity">
            <MessageSquare className="h-5 w-5" />
            <span className="text-sm text-muted-foreground">Read Story Text</span>
          </button>
        </DialogTrigger>
        <DialogContent className="max-h-[80vh] overflow-y-auto">
          <div className="story-content font-sans whitespace-pre-wrap">
            {story.storyText}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
