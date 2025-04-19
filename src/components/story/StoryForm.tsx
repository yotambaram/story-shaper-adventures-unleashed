
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useStory } from "@/context/StoryContext";

export default function StoryForm() {
  const navigate = useNavigate();
  const { generateStory, isGenerating } = useStory();
  
  const [formData, setFormData] = useState({
    topic: "",
    goal: "bedtime", // Default values
    age: 5,
    duration: "1-2 minutes",
    voiceStyle: "Calm Mom",
    language: "en" as "en" | "he" | "es",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: name === "age" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const story = await generateStory(formData);
      navigate(`/story/${story.id}`);
    } catch (error) {
      console.error("Error generating story:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Create a Story</CardTitle>
        <CardDescription className="text-center">
          Customize your story's details to make it perfect for your child
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="topic">What would you like the story to be about?</Label>
            <Input
              id="topic"
              name="topic"
              placeholder="e.g. space adventure, magical forest, first day of school"
              required
              value={formData.topic}
              onChange={handleChange}
            />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="goal">What's the purpose of this story?</Label>
              <Select
                value={formData.goal}
                onValueChange={(value) => handleSelectChange("goal", value)}
              >
                <SelectTrigger id="goal" className="w-full">
                  <SelectValue placeholder="Select purpose" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="bedtime">Bedtime Story</SelectItem>
                  <SelectItem value="learning">Educational</SelectItem>
                  <SelectItem value="social">Social Skills</SelectItem>
                  <SelectItem value="calming">Calming/Relaxation</SelectItem>
                  <SelectItem value="fun">Just for Fun</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="age">Child's Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                min={2}
                max={10}
                required
                value={formData.age}
                onChange={handleChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="duration">Story Length</Label>
              <Select
                value={formData.duration}
                onValueChange={(value) => handleSelectChange("duration", value)}
              >
                <SelectTrigger id="duration" className="w-full">
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Under 1 minute">Under 1 minute</SelectItem>
                  <SelectItem value="1-2 minutes">1-2 minutes</SelectItem>
                  <SelectItem value="3-5 minutes">3-5 minutes</SelectItem>
                  <SelectItem value="6-10 minutes">6-10 minutes</SelectItem>
                  <SelectItem value="11-20 minutes">11-20 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="voiceStyle">Narration Voice</Label>
              <Select
                value={formData.voiceStyle}
                onValueChange={(value) => handleSelectChange("voiceStyle", value)}
              >
                <SelectTrigger id="voiceStyle" className="w-full">
                  <SelectValue placeholder="Select voice" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Calm Mom">Calm Mom</SelectItem>
                  <SelectItem value="Excited Dad">Excited Dad</SelectItem>
                  <SelectItem value="Warm Teacher">Warm Teacher</SelectItem>
                  <SelectItem value="Grandma">Grandma</SelectItem>
                  <SelectItem value="Professional Narrator">Professional Narrator</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="language">Story Language</Label>
            <Select
              value={formData.language}
              onValueChange={(value) => handleSelectChange("language", value as "en" | "he" | "es")}
            >
              <SelectTrigger id="language" className="w-full">
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="en">English</SelectItem>
                <SelectItem value="he">Hebrew</SelectItem>
                <SelectItem value="es">Spanish</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button 
            type="submit" 
            className="w-full"
            disabled={isGenerating}
          >
            {isGenerating ? "Creating Your Story..." : "Generate Story"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
