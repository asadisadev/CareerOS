import { Bot, Sparkles } from "lucide-react";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";
import { Input } from "../../ui/input";

export default function Coach() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Bot className="h-6 w-6 text-primary" /> AI Career Coach
          </h1>
          <p className="text-muted-foreground">Get personalized career advice grounded in your resume and goals</p>
        </div>
      </div>

      <Card className="rounded-2xl border-border/70">
        <CardContent className="p-6 space-y-4">
          <div className="flex items-start gap-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Sparkles className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 space-y-2">
              <p className="text-sm text-muted-foreground">
                Your ATS score is strong at 91. Let's fix the 4 bullets missing metrics and you'll clear Vercel's filter comfortably.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Review my resume", "Improve portfolio", "Find jobs", "Practice interview", "Suggest projects"].map((prompt) => (
                  <Button key={prompt} variant="outline" size="sm" className="rounded-full">
                    {prompt}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Input placeholder="Ask me anything about your career…" className="flex-1" />
            <Button>Send</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}