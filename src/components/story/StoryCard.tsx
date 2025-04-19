
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Story } from "@/context/StoryContext";
import { Link } from "react-router-dom";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  const formattedDate = new Date(story.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const storyPreview = story.storyText.split(' ').slice(0, 20).join(' ') + '...';
  
  return (
    <Card className="h-full flex flex-col hover:scale-105 transition-transform duration-200 border-2 border-story-purple/20 hover:border-story-purple">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-display text-story-purple">
          {story.title || `Story about ${story.topic}`}
        </CardTitle>
        <div className="flex flex-wrap gap-2 mt-1">
          <span className="inline-flex items-center rounded-full bg-story-soft-blue px-3 py-1 text-xs font-medium font-display">
            {story.goal}
          </span>
          <span className="inline-flex items-center rounded-full bg-story-soft-green px-3 py-1 text-xs font-medium font-display">
            {story.duration}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground mb-2 font-display">
          Created: {formattedDate}
        </p>
        <p className="text-sm line-clamp-3 font-display">{storyPreview}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button 
          asChild 
          className="w-full bg-story-purple hover:bg-story-dark-purple font-display text-white rounded-full transition-transform hover:scale-105"
        >
          <Link to={`/story/${story.id}`}>
            Read Story
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
