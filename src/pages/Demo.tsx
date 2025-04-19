
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

export default function Demo() {
  const navigate = useNavigate();
  
  const handleGetStarted = () => {
    navigate("/login");
  };
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold mb-2 font-display">StoryShaper Demo</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Experience the magic of personalized storytelling with this sample story
          </p>
        </div>
        
        <Card className="mb-10">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle className="text-2xl">The Brave Little Rabbit</CardTitle>
                <CardDescription>A bedtime story for ages 4-6</CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="mb-4 p-4 bg-secondary rounded-lg">
              <div className="flex items-center gap-3 mb-3">
                <Button size="sm">
                  Play Narration
                </Button>
                <div className="text-sm text-muted-foreground">
                  Voice: Calm Mom
                </div>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div className="h-full bg-story-purple w-0" />
              </div>
            </div>

            <div className="story-content font-sans whitespace-pre-wrap bg-white rounded-lg p-6 border">
              <p>Once upon a time, in a magical forest filled with twinkling fireflies, there lived a little rabbit named Binky. Binky had soft gray fur and the most curious eyes that sparkled like stars.</p>
              <p>Every night, when the moon rose high in the sky, Binky would hop to the edge of the forest clearing and watch the other animals prepare for bedtime. The bears would cuddle up in their caves, the birds would nestle in their nests, and the foxes would curl up under bushes.</p>
              <p>But Binky had a problem. He was afraid of the dark, and this made it hard for him to fall asleep.</p>
              <p>"How do all the other animals sleep so easily when it gets dark?" he wondered.</p>
              <p>One evening, Binky decided to ask his friend, Wise Old Owl, for advice.</p>
              <p>"Hoot! The darkness is nothing to fear," said Wise Old Owl, blinking slowly. "It's just the world putting on its nightcap. And do you know what happens when the world sleeps? Magic!"</p>
              <p>"Magic?" asked Binky, his nose twitching with curiosity.</p>
              <p>"Yes, indeed," said the owl. "Dreams are born in the darkness. They float around like gentle clouds, waiting for sleeping children to catch them."</p>
              <p>Binky thought about this as he hopped back home. That night, instead of feeling scared, he felt excited. He snuggled into his cozy burrow and closed his eyes.</p>
              <p>As he drifted off to sleep, he felt like he was floating among the stars, having the most wonderful adventure.</p>
              <p>From that night on, Binky wasn't afraid of the dark anymore. Instead, he looked forward to bedtime and the magical dreams that would come to visit him.</p>
              <p>And as you close your eyes tonight, remember that the darkness brings dreams just for you, filled with adventures and magic waiting to be discovered.</p>
              <p>Sweet dreams, little one. Sweet dreams.</p>
            </div>
          </CardContent>
        </Card>
        
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4 font-display">Ready to create your own story?</h2>
          <p className="mb-6 text-muted-foreground">
            Sign up for free and start creating personalized stories for your child
          </p>
          <Button onClick={handleGetStarted} size="lg">
            Get Started
          </Button>
        </div>
      </div>
    </div>
  );
}
