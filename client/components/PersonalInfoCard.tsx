import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Phone,
  GraduationCap,
  Scale,
  Cigarette,
  Wine,
  Activity,
  Check,
  X,
} from "lucide-react";

export function PersonalInfoCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <User className="w-5 h-5 text-primary" />
          Personal Information
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
                <Phone className="w-4 h-4" />
                Mobile Number
              </span>
              <p className="font-mono text-sm">+91 98765 43210</p>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
                <GraduationCap className="w-4 h-4" />
                Education
              </span>
              <Badge variant="secondary">Primary School</Badge>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-1">
                <Scale className="w-4 h-4" />
                BMI
              </span>
              <div className="flex items-center gap-2">
                <span className="font-semibold">24.8</span>
                <Badge variant="outline" className="text-xs">
                  Normal
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-2">
                <Cigarette className="w-4 h-4" />
                Tobacco Use
              </span>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-destructive" />
                <span className="text-destructive font-medium">Yes</span>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-2">
                <Wine className="w-4 h-4" />
                Alcohol Use
              </span>
              <div className="flex items-center gap-2">
                <X className="w-4 h-4 text-accent" />
                <span className="text-accent font-medium">No</span>
              </div>
            </div>

            <div>
              <span className="text-sm font-medium text-muted-foreground flex items-center gap-1 mb-2">
                <Activity className="w-4 h-4" />
                Other Chronic Diseases
              </span>
              <Badge variant="outline">Arthritis</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
