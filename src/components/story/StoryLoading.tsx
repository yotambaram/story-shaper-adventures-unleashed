
import { Card, CardContent } from "@/components/ui/card";

export default function StoryLoading() {
  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardContent className="pt-6 pb-10">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-story-light-purple animate-pulse-gentle">
            <BookIcon className="w-12 h-12 text-story-purple" />
          </div>
          
          <div className="text-center space-y-4">
            <h3 className="text-xl font-medium">Creating your special story...</h3>
            <p className="text-muted-foreground">
              Our storytellers are weaving a magical tale just for you
            </p>
          </div>
          
          <div className="w-full max-w-md space-y-2 pt-4">
            <div className="h-2 bg-story-soft-blue rounded animate-pulse-gentle"></div>
            <div className="h-2 bg-story-soft-pink rounded animate-pulse-gentle delay-150"></div>
            <div className="h-2 bg-story-soft-green rounded animate-pulse-gentle delay-300"></div>
            <div className="h-2 bg-story-soft-yellow rounded animate-pulse-gentle delay-500"></div>
          </div>
        </div>
      </CardContent>
    </Card>
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
