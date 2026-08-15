import { LifeBuoy, MessageCircle, FileText } from "lucide-react";
import { Card, CardContent } from "../../ui/card";
import { Button } from "../../ui/button";

export default function Help() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <LifeBuoy className="h-6 w-6 text-primary" /> Help Center
        </h1>
        <p className="text-muted-foreground">Find answers and support</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-3 text-center">
            <FileText className="mx-auto h-8 w-8 text-primary" />
            <h3 className="font-semibold">Documentation</h3>
            <p className="text-sm text-muted-foreground">Detailed guides and API references</p>
            <Button variant="outline" size="sm">Browse</Button>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-3 text-center">
            <MessageCircle className="mx-auto h-8 w-8 text-primary" />
            <h3 className="font-semibold">Community</h3>
            <p className="text-sm text-muted-foreground">Join the discussion</p>
            <Button variant="outline" size="sm">Join</Button>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border-border/70">
          <CardContent className="p-5 space-y-3 text-center">
            <LifeBuoy className="mx-auto h-8 w-8 text-primary" />
            <h3 className="font-semibold">Support ticket</h3>
            <p className="text-sm text-muted-foreground">Get help from our team</p>
            <Button variant="hero" size="sm">Contact</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}