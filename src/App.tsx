
import React, { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { StoryProvider } from "./context/StoryContext";
import ProtectedRoute from "./components/auth/ProtectedRoute";

// Pages
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import CreateStory from "./pages/CreateStory";
import StoryPage from "./pages/StoryPage";
import NotFound from "./pages/NotFound";
import Landing from "./pages/Landing";
import Index from "./pages/Index";

// Error boundary component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Application error:", error);
    console.error("Component stack:", errorInfo.componentStack);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Something went wrong</h2>
            <p className="mb-4 text-gray-600">
              The application encountered an error. Please try refreshing the page.
            </p>
            <pre className="bg-gray-100 p-4 rounded text-sm overflow-auto text-left">
              {this.state.error && this.state.error.toString()}
            </pre>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Refresh Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Get the base URL from Vite configuration
const baseUrl = import.meta.env.BASE_URL || '/';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <ErrorBoundary>
    <BrowserRouter basename={baseUrl}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <StoryProvider>
            <TooltipProvider>
              <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading...</div>}>
                <Toaster />
                <Sonner />
                <Routes>
                  <Route path="/" element={<Landing />} />
                  <Route path="/index" element={<Index />} />
                  <Route path="/landing" element={<Landing />} />
                  <Route path="/login" element={<Login />} />
                  
                  {/* Protected Routes */}
                  <Route 
                    path="/dashboard" 
                    element={
                      <ProtectedRoute>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/create" 
                    element={
                      <ProtectedRoute>
                        <CreateStory />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/story/:id" 
                    element={
                      <ProtectedRoute>
                        <StoryPage />
                      </ProtectedRoute>
                    } 
                  />
                  
                  {/* Catch-all route */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Suspense>
            </TooltipProvider>
          </StoryProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </ErrorBoundary>
);

export default App;
