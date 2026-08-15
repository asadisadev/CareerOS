import { Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { AuthFade, AuthHeading } from "./auth-shell";
import { CheckCircle } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm text-center">
        <AuthFade>
          <div className="flex justify-center">
            <CheckCircle className="h-16 w-16 text-success" />
          </div>
          <AuthHeading
            title="Check your email"
            subtitle="We sent a verification link to your email address"
          />
          <p className="text-sm text-muted-foreground">
            Click the link in the email to verify your account. If you didn't receive it, check your spam folder.
          </p>
          <Button variant="outline" className="w-full">
            Resend verification email
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already verified?{" "}
            <Link to="/auth/login" className="font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </AuthFade>
      </div>
    </div>
  );
}