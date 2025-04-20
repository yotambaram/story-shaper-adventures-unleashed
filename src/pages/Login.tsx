
import { useNavigate } from "react-router-dom";
import AuthForm from "@/components/auth/AuthForm";

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-story-soft-blue via-white to-story-soft-pink p-4">
      <AuthForm />
    </div>
  );
}
