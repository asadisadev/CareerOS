import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowRight, Mail, MailCheck, PenLine, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

function EnvelopeArt() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto grid h-32 w-full max-w-[15rem] place-items-center overflow-hidden rounded-3xl border border-border bg-card"
    >
      <span className="pointer-events-none absolute inset-0 surface-glow" />
      <span className="pointer-events-none absolute inset-0 opacity-40 grid-lines [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]" />
      <motion.span
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="relative grid h-16 w-16 place-items-center rounded-2xl bg-primary/12 text-primary"
      >
        <MailCheck className="h-7 w-7" />
      </motion.span>
    </motion.div>
  );
}

function VerifyEmailPage() {
  const [sending, setSending] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [email, setEmail] = useState("ayesha.malik@careeros.ai");
  const [draftEmail, setDraftEmail] = useState(email);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setTimeout(() => setCooldown((c) => c - 1), 1000);
    return () => clearTimeout(t);
  }, [cooldown]);

  async function resend() {
    setSending(true);
    await new Promise((r) => setTimeout(r, 700));
    setSending(false);
    setCooldown(30);
    toast.success("Verification email resent", { description: `Sent to ${email}` });
  }

  function saveEmail() {
    if (!/^\S+@\S+\.\S+$/.test(draftEmail.trim())) {
      toast.error("Enter a valid email address");
      return;
    }
    setEmail(draftEmail.trim());
    setOpen(false);
    toast.success("Email updated", { description: "We sent a fresh verification link." });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6 text-center"
    >
      <EnvelopeArt />
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-extrabold">Verify your email</h1>
        <p className="text-sm text-muted-foreground">
          We sent a confirmation link to <strong className="text-foreground">{email}</strong>. Click
          it to activate your workspace and unlock AI credits.
        </p>
      </div>

      <div className="space-y-2">
        <Button asChild variant="hero" size="lg" className="w-full">
          <a href="https://mail.google.com" target="_blank" rel="noreferrer">
            <Mail /> Open email app
          </a>
        </Button>
        <div className="grid gap-2 sm:grid-cols-2">
          <Button variant="outline" onClick={resend} disabled={sending || cooldown > 0}>
            <RefreshCw className={sending ? "animate-spin" : undefined} />
            {sending ? "Resending…" : cooldown > 0 ? `Resend in ${cooldown}s` : "Resend email"}
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">
                <PenLine /> Change email
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Change your email</DialogTitle>
                <DialogDescription>
                  We'll send a new verification link to this address.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-2">
                <Label htmlFor="new-email">Email address</Label>
                <Input
                  id="new-email"
                  type="email"
                  value={draftEmail}
                  onChange={(e) => setDraftEmail(e.target.value)}
                  placeholder="you@example.com"
                />
              </div>
              <DialogFooter>
                <Button variant="ghost" onClick={() => setOpen(false)}>
                  Cancel
                </Button>
                <Button variant="hero" onClick={saveEmail}>
                  Save and resend
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <Button asChild variant="ghost" className="w-full">
          <Link to="/onboarding/welcome">
            I've verified — continue <ArrowRight />
          </Link>
        </Button>
      </div>

      <p className="text-xs text-muted-foreground">
        Need a different account?{" "}
        <Link to="/auth/register" className="font-medium text-primary hover:underline">
          Sign up again
        </Link>
      </p>
    </motion.div>
  );
}
