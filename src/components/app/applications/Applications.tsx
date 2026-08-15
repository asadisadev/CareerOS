import { Send, CheckCircle, Clock, XCircle } from "lucide-react";
import { Badge } from "../../ui/badge";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

const applications = [
  { id: 1, role: "Senior Product Designer", company: "Vercel", status: "interview", date: "Aug 13" },
  { id: 2, role: "React Developer", company: "Linear", status: "applied", date: "Aug 10" },
  { id: 3, role: "Product Designer II", company: "Stripe", status: "rejected", date: "Aug 5" },
];

const statusMap = {
  interview: { label: "Interview", icon: CheckCircle, className: "text-success" },
  applied: { label: "Applied", icon: Clock, className: "text-warning" },
  rejected: { label: "Rejected", icon: XCircle, className: "text-destructive" },
};

export default function Applications() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Send className="h-6 w-6 text-primary" /> Applications
          </h1>
          <p className="text-muted-foreground">Track all your job applications in one place</p>
        </div>
        <Button variant="soft">Add application</Button>
      </div>

      <div className="grid gap-4">
        {applications.map((app) => {
          const { icon: Icon, label, className } = statusMap[app.status as keyof typeof statusMap];
          return (
            <Card key={app.id} className="rounded-2xl border-border/70">
              <CardContent className="p-5 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{app.role}</h3>
                  <p className="text-sm text-muted-foreground">{app.company} · {app.date}</p>
                </div>
                <Badge className={`rounded-full ${className}`}>
                  <Icon className="h-3.5 w-3.5 mr-1" /> {label}
                </Badge>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}