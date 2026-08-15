import { ShieldCheck, TrendingUp, AlertCircle } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Progress } from "../../../components/ui/progress";

export default function Ats() {
  const scores = [
    { label: "Formatting", value: 96 },
    { label: "Keywords", value: 84 },
    { label: "Achievements", value: 78 },
    { label: "Skills", value: 72 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck className="h-6 w-6 text-primary" /> ATS Score
        </h1>
        <p className="text-muted-foreground">Optimize your resume for applicant tracking systems</p>
      </div>

      <Card className="rounded-2xl border-border/70">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="text-4xl font-bold text-success">91</div>
            <div className="text-sm text-muted-foreground">Overall ATS score – top 8% of designers</div>
          </div>
          <div className="mt-4 space-y-3">
            {scores.map((s) => (
              <div key={s.label} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span>{s.label}</span>
                  <span className="text-muted-foreground">{s.value}</span>
                </div>
                <Progress value={s.value} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}