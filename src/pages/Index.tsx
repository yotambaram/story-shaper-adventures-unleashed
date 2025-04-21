
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Get the base URL from Vite configuration
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    // Add console log to track this component rendering and base URL
    console.log("Index component rendered, redirecting to landing page");
    console.log("Base URL:", baseUrl);
    
    // Navigate to the landing page with the correct base path
    // Remove leading slash to avoid double slashes with baseUrl
    navigate("landing");
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p>Please wait while we redirect you to the landing page.</p>
      </div>
    </div>
  );
};

export default Index;
