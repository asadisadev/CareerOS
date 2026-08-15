import { ChartNoAxesColumn, Eye, FileText, Users } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

export default function Analytics() {
  const stats = [
    { label: "Portfolio views", value: "1,284", icon: Eye },
    { label: "Resume downloads", value: "96", icon: FileText },
    { label: "Recruiter views", value: "137", icon: Users },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <ChartNoAxesColumn className="h-6 w-6 text-primary" /> Analytics
        </h1>
        <p className="text-muted-foreground">Track your career metrics and engagement</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.label} className="rounded-2xl border-border/70">
            <CardContent className="p-5 space-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <stat.icon className="h-4 w-4" />
                <span className="text-sm">{stat.label}</span>
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}