
import AuthForm from "@/components/auth/AuthForm";

export default function Login() {
  return (
    <div className="min-h-screen gradient-bg py-16 px-4 flex flex-col justify-center">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2 font-display">Welcome to StoryShaper</h1>
        <p className="text-muted-foreground">Sign in to access your personalized stories</p>
      </div>
      
      <div className="max-w-md w-full mx-auto">
        <AuthForm />
      </div>
    </div>
  );
}
