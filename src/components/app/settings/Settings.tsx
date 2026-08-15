import { Settings as SettingsIcon, User, Bell, Shield } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";

export default function Settings() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <SettingsIcon className="h-6 w-6 text-primary" /> Settings
        </h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      <Card className="rounded-2xl border-border/70">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-1.5">
            <Label>Display name</Label>
            <Input placeholder="Your name" />
          </div>
          <div className="space-y-1.5">
            <Label>Email</Label>
            <Input type="email" placeholder="you@example.com" />
          </div>
          <Button variant="hero">Save changes</Button>
        </CardContent>
      </Card>
    </div>
  );
}