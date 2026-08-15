import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { useState } from "react";

export default function OnboardingInterview() {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <Card className="max-w-lg w-full rounded-3xl border-border/70 shadow-soft">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-2xl font-bold">Tell us about your dream role</h1>
          <p className="text-muted-foreground">What position are you targeting? This helps us tailor your resume and job matches.</p>
          <div className="space-y-1.5">
            <Label>Target role</Label>
            <Input
              placeholder="e.g., Senior Frontend Engineer"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <Button variant="hero" className="w-full" onClick={() => navigate("/app")}>
            Continue to dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}