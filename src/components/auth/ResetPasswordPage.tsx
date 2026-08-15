import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { AuthFade, AuthHeading } from "./auth-shell";

export default function ResetPasswordPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <AuthFade>
          <AuthHeading
            title="Create new password"
            subtitle="Enter your new password below"
          />
          <form className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="new-password">New password</Label>
              <Input id="new-password" type="password" placeholder="••••••••" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="confirm-password">Confirm password</Label>
              <Input id="confirm-password" type="password" placeholder="••••••••" />
            </div>
            <Button type="submit" variant="hero" className="w-full">
              Reset password
            </Button>
          </form>
        </AuthFade>
      </div>
    </div>
  );
}