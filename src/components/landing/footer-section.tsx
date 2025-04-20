
import React from "react";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface FooterSectionProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

export const FooterSection = ({ isAuthenticated, onLogout }: FooterSectionProps) => {
  return (
    <footer className="py-8 px-4 bg-gray-50">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-story-purple font-display">StoryShaper</div>
            <div className="text-sm text-muted-foreground">© 2025 StoryShaper. All rights reserved.</div>
          </div>
          <div className="flex gap-6 items-center">
            <a href="#" className="text-muted-foreground hover:text-story-purple">Terms</a>
            <a href="#" className="text-muted-foreground hover:text-story-purple">Privacy</a>
            <a href="#" className="text-muted-foreground hover:text-story-purple">Contact</a>
            {isAuthenticated && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onLogout} 
                className="text-destructive hover:text-destructive/90 flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" /> Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};
