import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Rocket } from "lucide-react";

export default function OnboardingWelcome() {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-lg w-full rounded-3xl border-border/70 shadow-soft">
        <CardContent className="p-8 text-center space-y-6">
          <Rocket className="mx-auto h-16 w-16 text-primary" />
          <h1 className="text-2xl font-bold">Welcome to CareerOS AI</h1>
          <p className="text-muted-foreground">Let’s get you set up for success. We’ll guide you through creating your profile and first resume.</p>
          <Button variant="hero" className="w-full" onClick={() => navigate("/onboarding/interview")}>
            Get started
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}