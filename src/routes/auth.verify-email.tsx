import { Link, createFileRoute } from "@tanstack/react-router";
import { MailCheck, RefreshCw } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/auth/verify-email")({
  head: () => ({
    meta: [
      { title: "Verify your email — CareerOS AI" },
      { name: "description", content: "Confirm your email address to activate your CareerOS AI workspace." },
      { property: "og:title", content: "Verify your email — CareerOS AI" },
      { property: "og:description", content: "One click to activate your workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VerifyEmailPage,
});

function VerifyEmailPage() {
  const [sending, setSending] = useState(false);

  async function resend() {
    setSending(true);
    await new Promise((r) => setTimeout(r, 600));
    setSending(false);
    toast.success("Verification email resent");
  }

  return (
    <div className="space-y-6 text-center">
      <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-primary/12 text-primary">
        <MailCheck className="h-6 w-6" />
      </span>
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-extrabold">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to your inbox. Click it to activate your workspace and unlock
          AI credits.
        </p>
      </div>
      <div className="space-y-2">
        <Button asChild variant="hero" size="lg" className="w-full">
          <Link to="/app">Continue to dashboard</Link>
        </Button>
        <Button variant="outline" className="w-full" onClick={resend} disabled={sending}>
          <RefreshCw className={sending ? "animate-spin" : undefined} />
          {sending ? "Resending…" : "Resend email"}
        </Button>
      </div>
      <p className="text-xs text-muted-foreground">
        Wrong address?{" "}
        <Link to="/auth/register" className="font-medium text-primary hover:underline">
          Sign up again
        </Link>
      </p>
    </div>
  );
}
