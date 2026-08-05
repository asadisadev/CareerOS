import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AuthDivider, OAuthButtons } from "@/components/auth/oauth-buttons";
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

const schema = z.object({
  name: z.string().trim().min(2, { message: "Enter your full name" }).max(80),
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z
    .string()
    .min(8, { message: "Use at least 8 characters" })
    .max(128)
    .regex(/[A-Z]/, { message: "Include one uppercase letter" })
    .regex(/[0-9]/, { message: "Include one number" }),
  terms: z.literal(true, { errorMap: () => ({ message: "Please accept the terms" }) }),
});

function strengthOf(password: string) {
  let score = 0;
  if (password.length >= 8) score += 34;
  if (/[A-Z]/.test(password)) score += 22;
  if (/[0-9]/.test(password)) score += 22;
  if (/[^A-Za-z0-9]/.test(password)) score += 22;
  return Math.min(score, 100);
}

function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", password: "", terms: true },
  });

  const password = form.watch("password");
  const strength = strengthOf(password ?? "");

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    toast.success("Account created", { description: "Check your inbox to verify your email." });
    navigate({ to: "/auth/verify-email" });
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-extrabold">Create your account</h1>
        <p className="text-sm text-muted-foreground">
          Free forever plan. No credit card, no commitments.
        </p>
      </div>

      <OAuthButtons label="Sign up" />
      <AuthDivider />

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
                <FormDescription className="text-xs">
                  8+ characters with an uppercase letter and a number.
                </FormDescription>
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
            {loading ? "Creating account…" : "Create free account"}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Sign in
        </Link>
      </p>
    </div>
  );
}
