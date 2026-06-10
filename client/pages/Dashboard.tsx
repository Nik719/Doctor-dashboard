import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { usePatients, PatientData } from "@/context/PatientContext";
import {
  Users,
  UserCheck,
  UserPlus,
  Calendar,
  TrendingUp,
  ArrowRight,
  Stethoscope,
  ClipboardList,
} from "lucide-react";

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

function StatCard({
  label,
  value,
  icon: Icon,
  iconClass,
  iconBgClass,
  loading,
}: {
  label: string;
  value: number;
  icon: React.ElementType;
  iconClass: string;
  iconBgClass: string;
  loading: boolean;
}) {
  return (
    <Card className="border-border">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              {label}
            </p>
            {loading ? (
              <Skeleton className="h-8 w-12 mt-1" />
            ) : (
              <p className="text-2xl font-bold text-foreground mt-1">{value}</p>
            )}
          </div>
          <div
            className={`w-9 h-9 rounded-lg flex items-center justify-center ${iconBgClass}`}
          >
            <Icon className={`w-4 h-4 ${iconClass}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function StatusBadge({ status }: { status: PatientData["status"] }) {
  switch (status) {
    case "active":
      return (
        <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 border font-medium">
          Active
        </Badge>
      );
    case "follow-up":
      return (
        <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20 border font-medium">
          Follow-up
        </Badge>
      );
    case "completed":
      return (
        <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 dark:bg-green-500/10 dark:text-green-400 dark:border-green-500/20 border font-medium">
          Completed
        </Badge>
      );
    default:
      return <Badge variant="outline">{status}</Badge>;
  }
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { patients, loading, error } = usePatients();

  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === "active").length;
  const followUpPatients = patients.filter(
    (p) => p.status === "follow-up",
  ).length;
  const thisMonth = (() => {
    const now = new Date();
    const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return patients.filter((p) => p.createdAt?.startsWith(prefix)).length;
  })();

  const recentPatients = [...patients]
    .sort((a, b) => (b.createdAt ?? "").localeCompare(a.createdAt ?? ""))
    .slice(0, 5);

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-6 pr-12">
              <h1 className="text-2xl font-bold text-foreground">
                {getGreeting()}, Dr. Admin
              </h1>
              <p className="text-muted-foreground mt-1 text-sm">
                {new Date().toLocaleDateString(undefined, {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
                {" — "}here's an overview of your patients.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-sm text-destructive text-center">
                ⚠ {error}
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <StatCard
                label="Total Patients"
                value={totalPatients}
                icon={Users}
                iconClass="text-primary"
                iconBgClass="bg-primary/10"
                loading={loading}
              />
              <StatCard
                label="Active"
                value={activePatients}
                icon={UserCheck}
                iconClass="text-green-600 dark:text-green-400"
                iconBgClass="bg-green-50 dark:bg-green-500/10"
                loading={loading}
              />
              <StatCard
                label="Follow-up"
                value={followUpPatients}
                icon={Calendar}
                iconClass="text-amber-600 dark:text-amber-400"
                iconBgClass="bg-amber-50 dark:bg-amber-500/10"
                loading={loading}
              />
              <StatCard
                label="This Month"
                value={thisMonth}
                icon={TrendingUp}
                iconClass="text-primary"
                iconBgClass="bg-secondary"
                loading={loading}
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* Recent patients */}
              <Card className="lg:col-span-2">
                <CardHeader className="pb-3 flex flex-row items-center justify-between space-y-0">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <ClipboardList className="w-4 h-4 text-primary" />
                    Recent Patients
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/patients")}
                    className="text-primary hover:text-primary"
                  >
                    View all
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </CardHeader>
                <CardContent className="p-0">
                  {loading ? (
                    <div className="px-6 pb-5 space-y-3">
                      {Array.from({ length: 4 }).map((_, i) => (
                        <div key={i} className="flex items-center gap-3">
                          <Skeleton className="h-9 w-9 rounded-full" />
                          <div className="flex-1 space-y-1.5">
                            <Skeleton className="h-3.5 w-40" />
                            <Skeleton className="h-3 w-24" />
                          </div>
                          <Skeleton className="h-5 w-16 rounded-full" />
                        </div>
                      ))}
                    </div>
                  ) : recentPatients.length === 0 ? (
                    <div className="text-center py-12 px-6">
                      <UserPlus className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                      <h3 className="font-medium text-foreground mb-1">
                        No patients yet
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Register your first patient to see them here.
                      </p>
                      <Button onClick={() => navigate("/register")}>
                        <UserPlus className="w-4 h-4 mr-2" />
                        Register Patient
                      </Button>
                    </div>
                  ) : (
                    <ul className="divide-y divide-border">
                      {recentPatients.map((p) => (
                        <li key={p.patientId}>
                          <button
                            type="button"
                            onClick={() =>
                              navigate(`/register?edit=${p.patientId}`)
                            }
                            className="w-full flex items-center gap-3 px-6 py-3 text-left hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:bg-muted/50"
                          >
                            <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="text-xs font-bold text-primary">
                                {p.patientName
                                  .split(" ")
                                  .map((w) => w[0])
                                  .slice(0, 2)
                                  .join("")
                                  .toUpperCase()}
                              </span>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium text-foreground truncate">
                                {p.patientName}
                              </p>
                              <p className="text-xs text-muted-foreground truncate">
                                {p.disease || "No diagnosis"} · {p.createdAt}
                              </p>
                            </div>
                            <StatusBadge status={p.status} />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </CardContent>
              </Card>

              {/* Quick actions */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Stethoscope className="w-4 h-4 text-primary" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button
                    className="w-full justify-start"
                    onClick={() => navigate("/register")}
                  >
                    <UserPlus className="w-4 h-4 mr-2" />
                    Register New Patient
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/patients")}
                  >
                    <Users className="w-4 h-4 mr-2" />
                    View Patient List
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    onClick={() => navigate("/calendar")}
                  >
                    <Calendar className="w-4 h-4 mr-2" />
                    Open Calendar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
