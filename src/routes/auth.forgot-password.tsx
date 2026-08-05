import { Link, createFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { MailCheck } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/auth/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset your password — CareerOS AI" },
      { name: "description", content: "Request a secure password reset link for CareerOS AI." },
      { property: "og:title", content: "Reset your password — CareerOS AI" },
      { property: "og:description", content: "We'll email you a reset link that expires in 30 minutes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ForgotPasswordPage,
});

const schema = z.object({
  email: z.string().trim().email({ message: "Enter a valid email address" }).max(255),
});

function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { email: "" },
  });

  async function onSubmit() {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
    toast.success("Reset link sent");
  }

  if (sent) {
    return (
      <div className="space-y-6 text-center">
        <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-success/15 text-success">
          <MailCheck className="h-6 w-6" />
        </span>
        <div className="space-y-2">
          <h1 className="font-display text-2xl font-extrabold">Check your inbox</h1>
          <p className="text-sm text-muted-foreground">
            We sent a reset link to <strong>{form.getValues("email")}</strong>. It expires in 30
            minutes.
          </p>
        </div>
        <Button asChild variant="hero" size="lg" className="w-full">
          <Link to="/auth/reset-password">Open reset form</Link>
        </Button>
        <Button variant="ghost" className="w-full" onClick={() => setSent(false)}>
          Use a different email
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-7">
      <div className="space-y-2">
        <h1 className="font-display text-2xl font-extrabold">Forgot your password?</h1>
        <p className="text-sm text-muted-foreground">
          Enter your account email and we'll send a secure reset link.
        </p>
      </div>
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
          <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
            {loading ? "Sending…" : "Send reset link"}
          </Button>
        </form>
      </Form>
      <p className="text-center text-sm text-muted-foreground">
        Remembered it?{" "}
        <Link to="/auth/login" className="font-semibold text-primary hover:underline">
          Back to sign in
        </Link>
      </p>
    </div>
  );
}
