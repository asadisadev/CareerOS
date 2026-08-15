import { CreditCard, Sparkles } from "lucide-react";
import { Button } from "../../../components/ui/button";
import { Card, CardContent } from "../../../components/ui/card";

export default function Billing() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-primary" /> Billing
        </h1>
        <p className="text-muted-foreground">Manage your subscription and payments</p>
      </div>

      <Card className="rounded-2xl border-border/70">
        <CardContent className="p-5 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">Current plan</p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-primary" /> Spark · Unlimited AI credits
              </p>
            </div>
            <Button variant="soft" size="sm">Change plan</Button>
          </div>
          <div className="border-t pt-4">
            <p className="text-sm text-muted-foreground">Next billing date: Sep 1, 2026</p>
            <Button variant="outline" size="sm" className="mt-2">View invoices</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}