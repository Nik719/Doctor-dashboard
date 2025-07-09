import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { User, MapPin, Hash } from "lucide-react";

export function PatientInfoCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Patient Information
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="space-y-2">
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Name
                </span>
                <p className="text-lg font-semibold">Mohan Ram</p>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Patient ID
                </span>
                <div className="flex items-center gap-2">
                  <Hash className="w-4 h-4 text-muted-foreground" />
                  <p className="font-mono text-sm">109590</p>
                </div>
              </div>
              <div>
                <span className="text-sm font-medium text-muted-foreground">
                  Status
                </span>
                <br />
                <Badge variant="secondary" className="mt-1">
                  Head of Family
                </Badge>
              </div>
            </div>
          </div>

          <div>
            <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-2">
              <MapPin className="w-4 h-4" />
              Address
            </span>
            <div className="text-sm space-y-1">
              <p>Gora Bazar, Danapur</p>
              <p>Patna, Bihar</p>
              <p>India - 801503</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
