
import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthForm from "@/components/auth/AuthForm";

export const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="gradient-bg py-16 md:py-24 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight font-display">
              Magical Stories <br />
              <span className="text-story-purple">Tailored for Your Child</span>
            </h1>
            <p className="text-lg mb-8 max-w-lg mx-auto lg:mx-0">
              StoryShaper creates personalized, narrated stories that inspire imagination, 
              learning, and joy—perfectly crafted for your child's age and interests.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Dialog>
                <DialogTrigger asChild>
                  <Button size="lg" className="text-lg">
                    Get Started
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-md">
                  <AuthForm />
                </DialogContent>
              </Dialog>
              <Button onClick={() => navigate("/demo")} variant="outline" size="lg" className="text-lg">
                See Demo
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="relative z-10 aspect-[4/3] rounded-lg overflow-hidden border-8 border-white shadow-xl">
              <img 
                src="https://images.unsplash.com/photo-1605714045430-b03fe539c6d5?q=80&w=2070&auto=format&fit=crop" 
                alt="Parent reading to child" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-story-soft-pink rounded-full z-0 animate-float"></div>
            <div className="absolute bottom-0 left-0 -ml-6 -mb-6 w-32 h-32 bg-story-soft-blue rounded-full z-0 animate-float delay-200"></div>
          </div>
        </div>
      </div>
    </section>
  );
};
