
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // Get the base URL from Vite configuration
      const baseUrl = import.meta.env.BASE_URL || '/';
      
      console.log("Index component rendered, redirecting to landing page");
      console.log("Base URL:", baseUrl);
      
      // Navigate to the landing page without using leading slash
      // to ensure compatibility with HashRouter
      setTimeout(() => {
        navigate("landing", { replace: true });
      }, 100);
    } catch (error) {
      console.error("Navigation error:", error);
      setError("Failed to navigate: " + (error instanceof Error ? error.message : String(error)));
    } finally {
      setIsLoading(false);
    }
  }, [navigate]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center bg-white p-6 rounded shadow-lg max-w-md">
          <h1 className="text-2xl font-bold mb-4 text-red-600">Navigation Error</h1>
          <p className="text-gray-700">{error}</p>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
            onClick={() => window.location.href = "#/landing"}
          >
            Go to Landing Page
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Redirecting...</h1>
        <p>Please wait while we redirect you to the landing page.</p>
        {isLoading && (
          <div className="mt-4 flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
        <button 
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600" 
          onClick={() => window.location.href = "#/landing"}
        >
          Go to Landing Page
        </button>
      </div>
    </div>
  );
};

export default Index;
