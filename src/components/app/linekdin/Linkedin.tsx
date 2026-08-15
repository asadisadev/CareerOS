import { Linkedin as LinkedinIcon, Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";
import { Input } from "../../../components/ui/input";

export default function Linkedin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LinkedinIcon className="h-6 w-6 text-primary" /> LinkedIn Optimizer
        </h1>
        <p className="text-muted-foreground">Enhance your LinkedIn profile for recruiters</p>
      </div>

      <Card className="rounded-2xl border-border/70">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-1.5">
            <label className="text-sm font-medium">Headline</label>
            <Input placeholder="Senior Frontend Engineer at …" />
          </div>
          <div className="space-y-1.5">
            <label className="text-sm font-medium">About</label>
            <Input placeholder="Tell your story…" />
          </div>
          <Button variant="hero" className="gap-2">
            <Sparkles className="h-4 w-4" /> Optimize with AI
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}