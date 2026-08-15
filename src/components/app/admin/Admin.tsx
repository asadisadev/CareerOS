import { Shield, Users, Settings as SettingsIcon } from "lucide-react";
import { Card, CardContent } from "../../../components/ui/card";

export default function Admin() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" /> Admin
        </h1>
        <p className="text-muted-foreground">System administration and user management</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-2">
            <Users className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">Users</h3>
            <p className="text-sm text-muted-foreground">Manage user accounts</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-2">
            <SettingsIcon className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">System settings</h3>
            <p className="text-sm text-muted-foreground">Configure application</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-2">
            <Shield className="h-6 w-6 text-primary" />
            <h3 className="font-semibold">Security</h3>
            <p className="text-sm text-muted-foreground">Audit logs and permissions</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}