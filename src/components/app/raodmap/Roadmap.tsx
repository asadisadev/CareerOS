import { GraduationCap, CheckCircle2, Circle } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

const modules = [
  { title: "Frontend", progress: 82, next: "Advanced React patterns" },
  { title: "Backend", progress: 46, next: "Node + Postgres APIs" },
  { title: "AI", progress: 38, next: "LLM app fundamentals" },
];

export default function Roadmap() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <GraduationCap className="h-6 w-6 text-primary" /> Learning Roadmap
        </h1>
        <p className="text-muted-foreground">Your personalized learning path to career growth</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((mod) => (
          <Card key={mod.title} className="rounded-2xl border-border/70">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">{mod.title}</h3>
                <span className="text-sm text-muted-foreground">{mod.progress}%</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div className="h-full rounded-full bg-primary" style={{ width: `${mod.progress}%` }} />
              </div>
              <p className="text-xs text-muted-foreground">Next: {mod.next}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}