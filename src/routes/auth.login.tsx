import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { AuthError, AuthFade, AuthHeading } from "@/components/auth/auth-shell";
import { AuthDivider, OAuthButtons } from "@/components/auth/oauth-buttons";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/login")({
  head: () => ({
    meta: [
      { title: "Sign in — CareerOS AI" },
      { name: "description", content: "Sign in to your CareerOS AI workspace." },
      { property: "og:title", content: "Sign in — CareerOS AI" },
      { property: "og:description", content: "Access your resumes, portfolio and job pipeline." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

const DEMO_EMAIL = "ayesha.malik@careeros.ai";
const DEMO_PASSWORD = "careeros2026";

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
  password: z.string().min(8, { message: "Password must be at least 8 characters" }).max(128),
  remember: z.boolean().optional(),
});

function LoginPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: DEMO_EMAIL, password: DEMO_PASSWORD, remember: true },
  });

  async function onSubmit(values: z.infer<typeof schema>) {
    setError(null);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    if (values.email !== DEMO_EMAIL || values.password !== DEMO_PASSWORD) {
      setError("Those credentials don't match our demo account. Try the prefilled details.");
      return;
    }

    toast.success("Welcome back, Ayesha");
    navigate({ to: "/app" });
  }

  return (
    <AuthFade>
      <AuthHeading
        title="Sign in to CareerOS AI"
        subtitle="Pick up where you left off — your ATS score is waiting."
      />

      <OAuthButtons label="Sign in" />
      <AuthDivider />

      <AuthError message={error} />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
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
                <div className="flex items-center justify-between">
                  <FormLabel>Password</FormLabel>
                  <Link
                    to="/auth/forgot-password"
                    className="text-xs font-medium text-primary hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <FormControl>
                  <Input type="password" autoComplete="current-password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="remember"
            render={({ field }) => (
              <FormItem className="flex items-center gap-2.5">
                <FormControl>
                  <Checkbox
                    checked={field.value ?? false}
                    onCheckedChange={(v) => field.onChange(Boolean(v))}
                    id="remember"
                  />
                </FormControl>
                <FormLabel htmlFor="remember" className="text-sm font-normal text-muted-foreground">
                  Remember me for 30 days
                </FormLabel>
              </FormItem>
            )}
          />
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="animate-spin" /> Signing in…
              </>
            ) : (
              "Sign in"
            )}
          </Button>
        </form>
      </Form>

      <p className="text-center text-sm text-muted-foreground">
        New to CareerOS AI?{" "}
        <Link to="/auth/register" className="font-semibold text-primary hover:underline">
          Create a free account
        </Link>
      </p>
    </AuthFade>
  );
}
