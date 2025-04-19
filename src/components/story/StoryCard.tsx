
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Story } from "@/context/StoryContext";
import { Link } from "react-router-dom";

interface StoryCardProps {
  story: Story;
}

export default function StoryCard({ story }: StoryCardProps) {
  // Format the date
  const formattedDate = new Date(story.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  // Get a sample of the story text
  const storyPreview = story.storyText.split(' ').slice(0, 20).join(' ') + '...';
  
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">
          {story.title || `Story about ${story.topic}`}
        </CardTitle>
        <div className="flex gap-2 mt-1">
          <span className="inline-flex items-center rounded-md bg-story-soft-blue px-2 py-1 text-xs font-medium">
            {story.goal}
          </span>
          <span className="inline-flex items-center rounded-md bg-story-soft-green px-2 py-1 text-xs font-medium">
            {story.duration}
          </span>
        </div>
      </CardHeader>
      <CardContent className="pb-2 flex-grow">
        <p className="text-sm text-muted-foreground mb-2">
          Created: {formattedDate}
        </p>
        <p className="text-sm line-clamp-3">{storyPreview}</p>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild className="w-full">
          <Link to={`/story/${story.id}`}>
            View Story
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
