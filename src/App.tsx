
import React from "react";
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
import Demo from "./pages/Demo";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <StoryProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route 
                path="/" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path="/login" element={<Login />} />
              <Route path="/demo" element={<Demo />} />
              
              {/* Protected Routes */}
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
          </BrowserRouter>
        </TooltipProvider>
      </StoryProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
