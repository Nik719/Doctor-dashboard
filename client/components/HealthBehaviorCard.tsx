import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, DollarSign, Check, X } from "lucide-react";

export function HealthBehaviorCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Heart className="w-5 h-5 text-primary" />
          Health Seeking Behaviour
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                System of Medicine
              </span>
              <p className="font-semibold">Allopath</p>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Family Income
              </span>
              <div className="flex items-center gap-1">
                <DollarSign className="w-4 h-4 text-muted-foreground" />
                <p className="font-semibold">Below Poverty Line</p>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Family Members
              </span>
              <div className="flex items-center gap-1">
                <Users className="w-4 h-4 text-muted-foreground" />
                <p className="font-semibold">7</p>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Caste
              </span>
              <Badge variant="outline">SC/ST</Badge>
            </div>
          </div>

          <div className="space-y-3">
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Ayushman Card
              </span>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-accent" />
                <span className="text-accent font-semibold">Yes</span>
              </div>
            </div>
            <div>
              <span className="text-sm font-medium text-muted-foreground">
                Ration Card
              </span>
              <Badge variant="secondary">Antyodaya</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
