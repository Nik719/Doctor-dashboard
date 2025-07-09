import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertTriangle, Pill } from "lucide-react";

export function DiseaseSummaryCard() {
  const symptoms = ["Weakness", "Vertigo"];
  const medications = ["Telmisartan", "Amlodipine"];

  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Activity className="w-5 h-5 text-primary" />
          Disease Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <span className="text-sm font-medium text-muted-foreground mb-2 block">
            Primary Diagnosis
          </span>
          <Badge variant="destructive" className="text-sm px-3 py-1">
            HTN (Hypertension)
          </Badge>
        </div>

        <div>
          <span className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <AlertTriangle className="w-4 h-4" />
            Symptoms
          </span>
          <div className="flex flex-wrap gap-2">
            {symptoms.map((symptom, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {symptom}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <span className="text-sm font-medium text-muted-foreground mb-2 flex items-center gap-1">
            <Pill className="w-4 h-4" />
            Current Medications
          </span>
          <div className="space-y-2">
            {medications.map((medication, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm font-medium">{medication}</span>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
