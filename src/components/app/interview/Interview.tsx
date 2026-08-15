import { Mic, PlayCircle, Clock } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export default function Interview() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Mic className="h-6 w-6 text-primary" /> Interview Prep
        </h1>
        <p className="text-muted-foreground">Practice with realistic interview questions</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Upcoming</h3>
            </div>
            <p className="text-sm text-muted-foreground">Vercel · Design Engineer loop – Aug 13, 4:00 PM</p>
            <Button variant="soft" size="sm">Prepare</Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-3">
            <div className="flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-primary" />
              <h3 className="font-semibold">Mock interview</h3>
            </div>
            <p className="text-sm text-muted-foreground">Practice with AI-driven feedback</p>
            <Button variant="hero" size="sm">Start practice</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}