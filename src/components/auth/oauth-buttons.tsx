import { Github } from "lucide-react";
import { useState } from "react";
import { Button } from "../../components/ui/button";
import { toast } from "sonner";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
      <path
        fill="currentColor"
        d="M21.35 11.1H12v3.2h5.35c-.25 1.5-1.9 4.4-5.35 4.4a6.1 6.1 0 0 1 0-12.2c1.65 0 2.9.65 3.7 1.4l2.4-2.35C16.6 3.9 14.55 3 12 3a9 9 0 1 0 0 18c5.2 0 8.65-3.65 8.65-8.8 0-.6-.1-1.1-.3-1.6Z"
      />
    </svg>
  );
}

export function OAuthButtons({ label = "Continue" }: { label?: string }) {
  const [pending, setPending] = useState<string | null>(null);

  async function connect(provider: string) {
    setPending(provider);
    await new Promise((r) => setTimeout(r, 800));
    setPending(null);
    toast.info(`${provider} sign-in is not wired up yet`, {
      description: "OAuth placeholders are ready for your provider keys.",
    });
  }

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Button
        variant="outline"
        size="lg"
        disabled={pending !== null}
        onClick={() => connect("Google")}
      >
        <GoogleIcon /> {pending === "Google" ? "Connecting…" : `${label} with Google`}
      </Button>
      <Button
        variant="outline"
        size="lg"
        disabled={pending !== null}
        onClick={() => connect("GitHub")}
      >
        <Github /> {pending === "GitHub" ? "Connecting…" : `${label} with GitHub`}
      </Button>
    </div>
  );
}

export function AuthDivider() {
  return (
    <div className="relative py-1 text-center">
      <span className="absolute inset-x-0 top-1/2 h-px bg-border" />
      <span className="relative bg-background px-3 text-xs uppercase tracking-widest text-muted-foreground">
        or
      </span>
    </div>
  );
}
