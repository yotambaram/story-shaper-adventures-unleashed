
import React from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import AuthForm from "@/components/auth/AuthForm";

export const CTASection = () => {
  return (
    <section className="py-16 px-4 bg-story-purple text-white">
      <div className="container mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold mb-4 font-display">
          Start Creating Magical Stories Today
        </h2>
        <p className="text-lg mb-8 opacity-90">
          Join thousands of parents creating special moments with their children through personalized stories
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button size="lg" variant="secondary" className="text-story-purple">
              Get Started For Free
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <AuthForm />
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
