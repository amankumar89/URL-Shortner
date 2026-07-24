import { useState, type SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoMark } from "@/components/ui/Logo";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useLogin } from "@/hooks/useAuth";

export default function LoginPage() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useLogin();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate(
      { email, password },
      { onSuccess: () => navigate("/", { replace: true }) },
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-95 animate-fade-up">
        <div className="flex items-center gap-2 justify-center mb-8">
          <div className="h-8 w-8 rounded-md bg-accent-soft flex items-center justify-center">
            <LogoMark size={18} />
          </div>
          <span className="font-display font-semibold text-lg tracking-tight">
            Linkly
          </span>
        </div>

        <div className="bg-surface-1 border border-border-soft rounded-xl p-6">
          <h1 className="font-display text-lg font-semibold mb-1">
            Welcome back
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Sign in to manage your short links.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <p className="text-xs text-danger">
                {(error as Error).message || "Something went wrong."}
              </p>
            )}

            <Button type="submit" className="w-full" loading={isPending}>
              Sign in
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-text-secondary mt-5">
          Don't have an account?{" "}
          <Link to="/register" className="text-accent hover:text-accent-hover">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
