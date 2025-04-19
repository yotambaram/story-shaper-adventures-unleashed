
import { useParams } from "react-router-dom";
import StoryViewer from "@/components/story/StoryViewer";

export default function StoryPage() {
  const { id } = useParams<{ id: string }>();
  
  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto">
        <StoryViewer />
      </div>
    </div>
  );
}
