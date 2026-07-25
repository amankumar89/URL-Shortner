import { useState } from "react";
import type { SubmitEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogoMark } from "@/components/ui/Logo";
import { Input, Label } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useRegister } from "@/hooks/useAuth";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useRegister();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    mutate(form, { onSuccess: () => navigate("/", { replace: true }) });
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
            Create your account
          </h1>
          <p className="text-sm text-text-secondary mb-6">
            Start shortening and tracking links in minutes.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>First name</Label>
                <Input
                  placeholder="Murli"
                  value={form.firstName}
                  onChange={(e) => update("firstName", e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div>
                <Label>Last name</Label>
                <Input
                  placeholder="Kumar"
                  value={form.lastName}
                  onChange={(e) => update("lastName", e.target.value)}
                  required
                />
              </div>
            </div>
            <div>
              <Label>Email</Label>
              <Input
                type="email"
                placeholder="you@company.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                required
              />
            </div>
            <div>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                required
                minLength={4}
              />
            </div>

            {error && (
              <p className="text-xs text-danger">
                {(error as Error).message || "Something went wrong."}
              </p>
            )}

            <Button type="submit" className="w-full" loading={isPending}>
              Create account
            </Button>
          </form>
        </div>

        <p className="text-center text-sm text-text-secondary mt-5">
          Already have an account?{" "}
          <Link to="/login" className="text-accent hover:text-accent-hover">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
