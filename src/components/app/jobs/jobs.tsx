import { Briefcase, MapPin, Wallet } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Button } from "../../ui/button";
import { Card, CardContent } from "../../ui/card";

const mockJobs = [
  {
    id: 1,
    title: "Senior Product Designer",
    company: "Vercel",
    location: "Remote · US",
    salary: "$150k – $190k",
    match: 94,
    tags: ["Design systems", "Next.js"],
  },
  {
    id: 2,
    title: "React Developer",
    company: "Linear",
    location: "Remote · Global",
    salary: "$140k – $175k",
    match: 92,
    tags: ["React", "Node"],
  },
  {
    id: 3,
    title: "Product Designer II",
    company: "Stripe",
    location: "Dublin, IE",
    salary: "€95k – €120k",
    match: 87,
    tags: ["Payments", "Research"],
  },
];

export default function Jobs() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Briefcase className="h-6 w-6 text-primary" /> Job Matches
          </h1>
          <p className="text-muted-foreground">
            Personalized job recommendations based on your skills and
            preferences
          </p>
        </div>
        <Button variant="soft">Refresh matches</Button>
      </div>

      <div className="grid gap-4">
        {mockJobs.map((job) => (
          <Card key={job.id} className="rounded-2xl border-border/70">
            <CardContent className="p-5 space-y-3">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                </div>
                <Badge className="rounded-full bg-success/15 text-success">
                  {job.match}% match
                </Badge>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" /> {job.location}
                </span>
                <span className="flex items-center gap-1">
                  <Wallet className="h-4 w-4" /> {job.salary}
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {job.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="rounded-full">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-2 pt-2">
                <Button variant="hero" size="sm">
                  Apply
                </Button>
                <Button variant="outline" size="sm">
                  Save
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
