
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Add console log to track this component rendering
    console.log("Index component rendered, redirecting to landing page");
    navigate("/landing");
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
