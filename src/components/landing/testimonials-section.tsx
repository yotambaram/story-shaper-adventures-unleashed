
import React from "react";

export const TestimonialsSection = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 font-display">
          What Parents Are Saying
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-story-soft-green" />
              <div className="ml-3">
                <div className="font-semibold">Sarah M.</div>
                <div className="text-sm text-muted-foreground">Mother of two</div>
              </div>
            </div>
            <p className="italic text-muted-foreground">
              "My kids ask for StoryShaper stories every night now! They love hearing tales that include their favorite animals and activities."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-story-soft-yellow" />
              <div className="ml-3">
                <div className="font-semibold">Michael T.</div>
                <div className="text-sm text-muted-foreground">Father</div>
              </div>
            </div>
            <p className="italic text-muted-foreground">
              "As a busy parent, I love having fresh stories every day without having to buy new books. The narration feature is especially helpful."
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 rounded-full bg-story-soft-pink" />
              <div className="ml-3">
                <div className="font-semibold">Elena R.</div>
                <div className="text-sm text-muted-foreground">Teacher</div>
              </div>
            </div>
            <p className="italic text-muted-foreground">
              "I use StoryShaper in my classroom to create stories that teach specific social skills. The children are much more engaged with personalized content."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
