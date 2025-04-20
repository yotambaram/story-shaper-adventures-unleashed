
import React from "react";
import { Button } from "@/components/ui/button";

interface HowItWorksSectionProps {
  onGetStarted: () => void;
}

export const HowItWorksSection = ({ onGetStarted }: HowItWorksSectionProps) => {
  return (
    <section className="py-16 px-4 bg-story-soft-blue/30">
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl font-bold text-center mb-4 font-display">
          How StoryShaper Works
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Creating the perfect story for your child is as easy as answering a few simple questions
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-story-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
            <h3 className="text-xl font-semibold mb-3">Enter Details</h3>
            <p className="text-muted-foreground">Tell us about your child's age, interests, and the purpose of the story</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-story-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
            <h3 className="text-xl font-semibold mb-3">Generate Story</h3>
            <p className="text-muted-foreground">Our AI creates a unique, age-appropriate story with professional narration</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-story-purple text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
            <h3 className="text-xl font-semibold mb-3">Enjoy Together</h3>
            <p className="text-muted-foreground">Listen, read, download, and share the story with your child</p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <Button onClick={onGetStarted} size="lg">
            Create Your First Story
          </Button>
        </div>
      </div>
    </section>
  );
};
