import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Users, Check, X } from "lucide-react";

const familyMembers = [
  {
    name: "Mohan Ram",
    age: 45,
    sex: "M",
    relation: "Self",
    occupation: "Daily Labor",
    disease: "HTN",
    compliance: true,
  },
  {
    name: "Sunita Devi",
    age: 40,
    sex: "F",
    relation: "Wife",
    occupation: "Housewife",
    disease: "-",
    compliance: null,
  },
  {
    name: "Rajesh Kumar",
    age: 22,
    sex: "M",
    relation: "Son",
    occupation: "Student",
    disease: "-",
    compliance: null,
  },
  {
    name: "Priya Kumari",
    age: 18,
    sex: "F",
    relation: "Daughter",
    occupation: "Student",
    disease: "-",
    compliance: null,
  },
  {
    name: "Amit Kumar",
    age: 15,
    sex: "M",
    relation: "Son",
    occupation: "Student",
    disease: "-",
    compliance: null,
  },
];

export function FamilyCompositionCard() {
  return (
    <Card>
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5 text-primary" />
          Family Composition
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                  Name
                </th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                  Age
                </th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                  Sex
                </th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                  Relation
                </th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                  Occupation
                </th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                  Disease
                </th>
                <th className="text-left py-3 px-2 font-medium text-muted-foreground">
                  Compliance
                </th>
              </tr>
            </thead>
            <tbody>
              {familyMembers.map((member, index) => (
                <tr
                  key={index}
                  className="border-b border-border/50 hover:bg-muted/20"
                >
                  <td className="py-3 px-2 font-medium">{member.name}</td>
                  <td className="py-3 px-2">{member.age}</td>
                  <td className="py-3 px-2">
                    <Badge
                      variant={member.sex === "M" ? "default" : "secondary"}
                      className="w-6 h-6 rounded-full text-xs p-0 flex items-center justify-center"
                    >
                      {member.sex}
                    </Badge>
                  </td>
                  <td className="py-3 px-2">{member.relation}</td>
                  <td className="py-3 px-2 text-muted-foreground">
                    {member.occupation}
                  </td>
                  <td className="py-3 px-2">
                    {member.disease === "-" ? (
                      <span className="text-muted-foreground">-</span>
                    ) : (
                      <Badge variant="destructive" className="text-xs">
                        {member.disease}
                      </Badge>
                    )}
                  </td>
                  <td className="py-3 px-2">
                    {member.compliance === null ? (
                      <span className="text-muted-foreground">-</span>
                    ) : member.compliance ? (
                      <Check className="w-4 h-4 text-accent" />
                    ) : (
                      <X className="w-4 h-4 text-destructive" />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
}
