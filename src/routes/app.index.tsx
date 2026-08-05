import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { activity, aiSuggestions, jobs, scores } from "@/data/mock";
import { PageHeader } from "@/components/common/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export const Route = createFileRoute("/app/")({
  head: () => ({
    meta: [
      { title: "Dashboard — CareerOS AI" },
      { name: "description", content: "Your resume score, ATS health, job matches and AI suggestions at a glance." },
      { property: "og:title", content: "Dashboard — CareerOS AI" },
      { property: "og:description", content: "Track your career momentum in one workspace." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

function DashboardPage() {
  const metrics = [
    { label: "Resume score", value: scores.resume },
    { label: "ATS score", value: scores.ats },
    { label: "Portfolio views", value: scores.portfolio },
    { label: "Active matches", value: jobs.length },
  ];

  return (
    <div className="space-y-8">
      <PageHeader
        title="Welcome back, Ayesha"
        description="Here's where your job search stands today."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((m) => (
          <Card key={m.label}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{m.label}</p>
              <p className="mt-2 font-display text-3xl font-extrabold">{m.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader className="flex-row items-center justify-between">
            <CardTitle>Top job matches</CardTitle>
            <Button asChild variant="ghost" size="sm">
              <Link to="/app">
                View all <ArrowUpRight />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            {jobs.slice(0, 5).map((job) => (
              <div
                key={job.id}
                className="flex items-center justify-between gap-4 rounded-xl border border-border p-4"
              >
                <div className="min-w-0">
                  <p className="truncate font-semibold">{job.title}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {job.company} · {job.location}
                  </p>
                </div>
                <Badge variant="secondary" className="shrink-0">
                  {job.match}% match
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI suggestions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {aiSuggestions.map((s, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {typeof s === "string" ? s : JSON.stringify(s)}
                </p>
              ))}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Recent activity</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {activity.map((a, i) => (
                <p key={i} className="text-sm text-muted-foreground">
                  {typeof a === "string" ? a : JSON.stringify(a)}
                </p>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
