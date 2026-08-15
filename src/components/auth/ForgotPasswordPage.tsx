import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AuthFade, AuthHeading } from "./auth-shell";

export default function ForgotPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <AuthFade>
          <AuthHeading
            title="Reset your password"
            subtitle="We'll send you a link to create a new password"
          />
          <form className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="you@example.com" />
            </div>
            <Button type="submit" variant="hero" className="w-full">
              Send reset link
            </Button>
          </form>
          <p className="text-center text-sm text-muted-foreground">
            Remember your password?{" "}
            <Link to="/auth/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </AuthFade>
      </div>
    </div>
  );
}