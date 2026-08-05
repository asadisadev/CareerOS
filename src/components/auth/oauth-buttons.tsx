import { Github, Chrome, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function OAuthButtons({ label = "Continue" }: { label?: string }) {
  const notify = (provider: string) =>
    toast.info(`${provider} sign-in is not wired up yet`, {
      description: "OAuth placeholders are ready for your provider keys.",
    });

  return (
    <div className="space-y-2">
      <Button variant="outline" size="lg" className="w-full" onClick={() => notify("Google")}>
        <Chrome /> {label} with Google
      </Button>
      <div className="grid grid-cols-2 gap-2">
        <Button variant="outline" onClick={() => notify("LinkedIn")}>
          <Linkedin /> LinkedIn
        </Button>
        <Button variant="outline" onClick={() => notify("GitHub")}>
          <Github /> GitHub
        </Button>
      </div>
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
