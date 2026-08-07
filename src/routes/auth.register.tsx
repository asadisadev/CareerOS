import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AuthError, AuthFade, AuthHeading } from "@/components/auth/auth-shell";
import { AuthDivider, OAuthButtons } from "@/components/auth/oauth-buttons";
import { countries } from "@/data/onboarding";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const Route = createFileRoute("/auth/register")({
  head: () => ({
    meta: [
      { title: "Create your free account — CareerOS AI" },
      {
        name: "description",
        content: "Create a free CareerOS AI account and build your resume and portfolio today.",
      },
      { property: "og:title", content: "Create your free account — CareerOS AI" },
      {
        property: "og:description",
        content: "Free forever plan: one portfolio, one resume, ATS analysis and AI assistance.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RegisterPage,
});

const schema = z
  .object({
    name: z.string().trim().min(2, { message: "Enter your full name" }).max(80),
    email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
    password: z
      .string()
      .min(8, { message: "Use at least 8 characters" })
      .max(128)
      .regex(/[A-Z]/, { message: "Include one uppercase letter" })
      .regex(/[0-9]/, { message: "Include one number" }),
    confirm: z.string().min(8, { message: "Confirm your password" }).max(128),
    country: z.string().min(1, { message: "Select your country" }),
    terms: z.literal(true, { errorMap: () => ({ message: "Please accept the terms" }) }),
  })
  .refine((v) => v.password === v.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

function strengthOf(password: string) {
  let score = 0;
  if (password.length >= 8) score += 34;
  if (/[A-Z]/.test(password)) score += 22;
  if (/[0-9]/.test(password)) score += 22;
  if (/[^A-Za-z0-9]/.test(password)) score += 22;
  return Math.min(score, 100);
}

function strengthLabel(score: number) {
  if (score < 40) return "Weak";
  if (score < 70) return "Fair";
  if (score < 100) return "Strong";
  return "Excellent";
}

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", confirm: "", country: "", terms: true },
  });

  const password = form.watch("password");
  const strength = strengthOf(password ?? "");

  async function onSubmit(values: z.infer<typeof schema>) {
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);

    if (values.email.endsWith("@taken.com")) {
      setError("An account with this email already exists. Try signing in instead.");
      return;
    }

    setSuccess(true);
    toast.success("Account created", { description: "Check your inbox to verify your email." });
    setTimeout(() => navigate({ to: "/auth/verify-email" }), 1400);
  }

  if (success) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-6 text-center"
      >
        <motion.span
          initial={{ scale: 0.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 220, damping: 16 }}
          className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-success/15 text-success"
        >
          <Check className="h-7 w-7" />
        </motion.span>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-extrabold">Account created</h1>
          <p className="text-sm text-muted-foreground">
            Taking you to email verification…
          </p>
        </div>
        <Progress value={100} className="h-1.5" />
      </motion.div>
    );
  }

  return (
    <AuthFade>
      <AuthHeading
        title="Create your account"
        subtitle="Free forever plan. No credit card, no commitments."
      />

      <OAuthButtons label="Sign up" />
      <AuthDivider />

      <AuthError message={error} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full name</FormLabel>
                <FormControl>
                  <Input autoComplete="name" placeholder="Ayesha Malik" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Work or personal email</FormLabel>
                <FormControl>
                  <Input type="email" autoComplete="email" placeholder="you@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" autoComplete="new-password" placeholder="••••••••" {...field} />
                </FormControl>
                <Progress value={strength} className="h-1.5" />
                <FormDescription className="flex items-center justify-between text-xs">
                  <span>8+ characters with an uppercase letter and a number.</span>
                  {password ? <span className="font-medium">{strengthLabel(strength)}</span> : null}
                </FormDescription>
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
          <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((c) => (
                      <SelectItem key={c} value={c}>
                        {c}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="terms"
            render={({ field }) => (
              <FormItem className="space-y-2">
                <div className="flex items-start gap-2.5">
                  <FormControl>
                    <Checkbox
                      id="terms"
                      checked={field.value ?? false}
                      onCheckedChange={(v) => field.onChange(v === true)}
                    />
                  </FormControl>
                  <FormLabel htmlFor="terms" className="text-sm font-normal text-muted-foreground">
                    I agree to the Terms of Service and Privacy Policy.
                  </FormLabel>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Creating account…
              </>
            ) : (
              "Create free account"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </AuthFade>
  );
}
