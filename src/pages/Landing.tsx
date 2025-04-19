import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import AuthForm from "@/components/auth/AuthForm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { LogOut } from "lucide-react";

export default function Landing() {
  const navigate = useNavigate();
  const { isAuthenticated, logout } = useAuth();
  
  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/dashboard");
    } else {
      navigate("/login");
    }
  };

  const features = [
    {
      title: "Personalized Stories",
      description: "Create unique stories tailored to your child's age, interests, and learning goals",
      icon: PersonIcon,
    },
    {
      title: "Professional Narration",
      description: "Bring stories to life with various voice styles for a magical listening experience",
      icon: SpeakerIcon,
    },
    {
      title: "Educational Content",
      description: "Foster imagination and learning with age-appropriate themes and vocabulary",
      icon: BookIcon,
    },
    {
      title: "Multiple Languages",
      description: "Generate stories in English, Hebrew, Spanish and more languages",
      icon: GlobeIcon,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
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

      {/* Features Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 font-display">
            Why Parents Love <span className="text-story-purple">StoryShaper</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 bg-story-light-purple rounded-full flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-story-purple" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
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
            <Button onClick={handleGetStarted} size="lg">
              Create Your First Story
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials (placeholder) */}
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

      {/* CTA Section */}
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

      {/* Footer */}
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
                  onClick={logout} 
                  className="text-destructive hover:text-destructive/90 flex items-center gap-2"
                >
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              )}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Simple icon components
function PersonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
      <circle cx="12" cy="7" r="4"></circle>
    </svg>
  );
}

function SpeakerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
    </svg>
  );
}

function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
    </svg>
  );
}

function GlobeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="2" y1="12" x2="22" y2="12"></line>
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
    </svg>
  );
}
