import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Heart, Droplets } from "lucide-react";

export function InvestigationCard() {
  const investigations = [
    {
      name: "Blood Pressure",
      value: "140/85",
      unit: "mmHg",
      status: "High",
      icon: Heart,
      normal: "120/80",
    },
    {
      name: "Random Blood Sugar",
      value: "130",
      unit: "mg/dL",
      status: "Normal",
      icon: Droplets,
      normal: "<140",
    },
  ];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Investigation Results
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {investigations.map((investigation, index) => {
            const Icon = investigation.icon;
            return (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg border border-border bg-muted/20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">{investigation.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Normal: {investigation.normal} {investigation.unit}
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-bold">
                      {investigation.value}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {investigation.unit}
                    </span>
                  </div>
                  <Badge
                    variant={
                      investigation.status === "High"
                        ? "destructive"
                        : investigation.status === "Normal"
                          ? "default"
                          : "secondary"
                    }
                    className="text-xs mt-1"
                  >
                    {investigation.status}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 p-4 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong>Note:</strong> Blood pressure reading indicates
            hypertension. Patient advised to continue medication and lifestyle
            modifications.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
