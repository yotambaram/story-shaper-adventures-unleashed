
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { Link } from "react-router-dom";
import { LogOut, Lollipop } from "lucide-react";

export default function DashboardHeader() {
  const { user, logout } = useAuth();
  
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
      <div>
        <div className="flex items-center gap-3">
          <Lollipop className="h-8 w-8 text-story-purple animate-bounce" />
          <h1 className="text-3xl font-bold mb-1 font-display bg-gradient-to-r from-story-purple to-story-dark-purple bg-clip-text text-transparent">
            My Stories
          </h1>
        </div>
        <p className="text-muted-foreground font-display">
          Welcome back{user?.email ? `, ${user.email.split('@')[0]}` : ''}! Let's explore your magical stories
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Button 
          asChild 
          size="lg"
          className="bg-story-purple hover:bg-story-dark-purple font-display text-white rounded-full transition-transform hover:scale-105"
        >
          <Link to="/create">Create New Story</Link>
        </Button>
        <Button 
          variant="outline" 
          size="icon" 
          onClick={logout}
          title="Logout"
          className="rounded-full border-story-purple text-story-purple hover:bg-story-light-purple"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
