import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Check, Loader2, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AuthFade, AuthHeading } from "@/components/auth/auth-shell";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/reset-password")({
  head: () => ({
    meta: [
      { title: "Set a new password — CareerOS AI" },
      { name: "description", content: "Choose a new password for your CareerOS AI account." },
      { property: "og:title", content: "Set a new password — CareerOS AI" },
      { property: "og:description", content: "Set a strong new password and get back to building." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResetPasswordPage,
});

const schema = z
  .object({
    password: z
      .string()
      .min(8, { message: "Use at least 8 characters" })
      .max(128)
      .regex(/[A-Z]/, { message: "Include one uppercase letter" })
      .regex(/[0-9]/, { message: "Include one number" }),
    confirm: z.string().min(8, { message: "Confirm your password" }).max(128),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

const rules = [
  { label: "At least 8 characters", test: (v: string) => v.length >= 8 },
  { label: "One uppercase letter", test: (v: string) => /[A-Z]/.test(v) },
  { label: "One number", test: (v: string) => /[0-9]/.test(v) },
  { label: "One symbol (recommended)", test: (v: string) => /[^A-Za-z0-9]/.test(v) },
];

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { password: "", confirm: "" },
  });

  const password = form.watch("password") ?? "";

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    setDone(true);
    toast.success("Password updated");
  }

  if (done) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 text-center"
      >
        <span className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-success/15 text-success">
          <ShieldCheck className="h-7 w-7" />
        </span>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-extrabold">Password updated</h1>
          <p className="text-sm text-muted-foreground">
            Your password has been changed. Sign in to continue building.
          </p>
        </div>
        <Button variant="hero" size="lg" className="w-full" onClick={() => navigate({ to: "/auth/login" })}>
          Back to sign in
        </Button>
      </motion.div>
    );
  }

  return (
    <AuthFade>
      <AuthHeading
        title="Set a new password"
        subtitle="Choose something strong — you'll use this to sign in from now on."
      />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>New password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <ul className="grid gap-2 rounded-2xl border border-border bg-card/60 p-4 sm:grid-cols-2">
            {rules.map((rule) => {
              const passed = rule.test(password);
              return (
                <li
                  key={rule.label}
                  className={
                    passed
                      ? "flex items-center gap-2 text-xs text-success"
                      : "flex items-center gap-2 text-xs text-muted-foreground"
                  }
                >
                  <span
                    className={
                      passed
                        ? "grid h-4 w-4 place-items-center rounded-full bg-success/15"
                        : "grid h-4 w-4 place-items-center rounded-full bg-muted"
                    }
                  >
                    <Check className="h-2.5 w-2.5" />
                  </span>
                  {rule.label}
                </li>
              );
            })}
          </ul>
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Updating…
              </>
            ) : (
              "Reset password"
            )}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </AuthFade>
  );
}
