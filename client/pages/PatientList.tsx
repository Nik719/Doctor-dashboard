import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePatients } from "@/context/PatientContext";
import { generateSeedPatients } from "@/lib/seedData";
import {
  Users,
  Search,
  Plus,
  Eye,
  FileText,
  UserCheck,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Edit,
  Trash2,
  UserPlus,
  TrendingUp,
  Database,
} from "lucide-react";

export default function PatientList() {
  const navigate = useNavigate();
  const { patients, loading, error, deletePatient, addPatientsBulk } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [seeding, setSeeding] = useState(false);
  const itemsPerPage = 10;

  const handleLoadDemoData = async () => {
    if (patients.length > 0 && !window.confirm("This will add 100 demo patients to the existing list. Continue?")) return;
    setSeeding(true);
    try {
      const seedPatients = generateSeedPatients();
      await addPatientsBulk(seedPatients);
    } finally {
      setSeeding(false);
    }
  };

  // Computed stats
  const totalPatients = patients.length;
  const activePatients = patients.filter((p) => p.status === "active").length;
  const followUpPatients = patients.filter((p) => p.status === "follow-up").length;
  const thisMonth = (() => {
    const now = new Date();
    const prefix = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;
    return patients.filter((p) => p.createdAt?.startsWith(prefix)).length;
  })();

  const filteredPatients = patients.filter((patient) => {
    const q = searchTerm.toLowerCase();
    return (
      patient.patientName.toLowerCase().includes(q) ||
      patient.disease.toLowerCase().includes(q) ||
      (patient.assignedDoctor ?? "").toLowerCase().includes(q) ||
      `${patient.village}, ${patient.district}, ${patient.state}`.toLowerCase().includes(q)
    );
  });

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return <Badge className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 border font-medium">{status}</Badge>;
      case "follow-up":
        return <Badge className="bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100 border font-medium">Follow-up</Badge>;
      case "completed":
        return <Badge className="bg-green-50 text-green-700 border-green-200 hover:bg-green-100 border font-medium">Completed</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleEdit = (patientId: string) => {
    navigate(`/?edit=${patientId}`);
  };

  const handleDelete = (patientId: string, patientName: string) => {
    if (window.confirm(`Are you sure you want to delete patient ${patientName}?`)) {
      deletePatient(patientId);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-7xl mx-auto">

            {/* Header */}
            <div className="mb-6">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Patient List</h1>
                  <p className="text-muted-foreground mt-1 text-sm">
                    Manage and view all registered patients
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={handleLoadDemoData} disabled={seeding}>
                    <Database className="w-4 h-4 mr-2" />
                    {seeding ? "Loading…" : "Load Demo Data"}
                  </Button>
                  <Button onClick={() => navigate("/")}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Patient
                  </Button>
                </div>
              </div>
            </div>

            {/* Loading / error banner */}
            {loading && (
              <div className="mb-4 p-3 rounded-lg bg-muted/50 text-sm text-muted-foreground text-center">
                Loading patients from database…
              </div>
            )}
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-sm text-destructive text-center">
                ⚠ {error}
              </div>
            )}

            {/* Stats row */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Total Patients</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{totalPatients}</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Active</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{activePatients}</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center">
                      <UserCheck className="w-4 h-4 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Follow-up</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{followUpPatients}</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-amber-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">This Month</p>
                      <p className="text-2xl font-bold text-foreground mt-1">{thisMonth}</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Main table card */}
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-base font-semibold">
                    <Users className="w-4 h-4 text-primary" />
                    All Patients
                    <span className="text-muted-foreground font-normal text-sm">
                      ({filteredPatients.length})
                    </span>
                  </CardTitle>
                  <div className="relative w-full sm:w-72">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search by name, disease, location..."
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setCurrentPage(1);
                      }}
                      className="pl-9"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">

                {/* Empty state */}
                {filteredPatients.length === 0 && (
                  <div className="text-center py-16 px-6">
                    {searchTerm ? (
                      <>
                        <Search className="w-10 h-10 text-muted-foreground/40 mx-auto mb-3" />
                        <h3 className="font-medium text-foreground mb-1">No results found</h3>
                        <p className="text-sm text-muted-foreground">
                          No patients match "<span className="font-medium">{searchTerm}</span>". Try a different search.
                        </p>
                        <Button variant="outline" size="sm" onClick={() => setSearchTerm("")} className="mt-4">
                          Clear search
                        </Button>
                      </>
                    ) : (
                      <>
                        <div className="w-16 h-16 rounded-2xl bg-muted/60 flex items-center justify-center mx-auto mb-4">
                          <UserPlus className="w-8 h-8 text-muted-foreground/60" />
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">No patients yet</h3>
                        <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                          Register your first patient to start managing your patient list.
                        </p>
                        <Button onClick={() => navigate("/")} className="mt-4">
                          <Plus className="w-4 h-4 mr-2" />
                          Add First Patient
                        </Button>
                      </>
                    )}
                  </div>
                )}

                {/* Desktop Table */}
                {filteredPatients.length > 0 && (
                  <div className="hidden lg:block overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-muted/30 border-y border-border">
                        <tr>
                          <th className="text-left py-3 px-6 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                            Date
                          </th>
                          <th className="text-left py-3 px-6 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                            Patient
                          </th>
                          <th className="text-left py-3 px-6 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                            Address
                          </th>
                          <th className="text-left py-3 px-6 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                            Disease
                          </th>
                          <th className="text-left py-3 px-6 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                            Doctor
                          </th>
                          <th className="text-left py-3 px-6 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                            Status
                          </th>
                          <th className="text-left py-3 px-6 font-medium text-muted-foreground text-xs uppercase tracking-wide">
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentPatients.map((patient, index) => (
                          <tr
                            key={`${patient.patientId}-${index}`}
                            className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                          >
                            <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">
                              {patient.createdAt}
                            </td>
                            <td className="py-4 px-6">
                              <div>
                                <p className="font-medium text-sm text-foreground">
                                  {patient.patientName}
                                </p>
                                <p className="text-xs text-muted-foreground mt-0.5">
                                  ID: {patient.patientId}
                                </p>
                              </div>
                            </td>
                            <td className="py-4 px-6 text-sm text-muted-foreground max-w-[200px] truncate">
                              {[patient.village, patient.district, patient.state].filter(Boolean).join(", ") || "—"}
                            </td>
                            <td className="py-4 px-6">
                              {patient.disease ? (
                                <Badge variant="outline" className="text-xs font-normal">
                                  {patient.disease}
                                </Badge>
                              ) : (
                                <span className="text-muted-foreground text-sm">—</span>
                              )}
                            </td>
                            <td className="py-4 px-6 text-sm text-muted-foreground whitespace-nowrap">
                              {patient.assignedDoctor || "—"}
                            </td>
                            <td className="py-4 px-6">
                              {getStatusBadge(patient.status)}
                            </td>
                            <td className="py-4 px-6">
                              <div className="flex items-center gap-1.5">
                                <Button
                                  variant="default"
                                  size="sm"
                                  className="h-7 px-2.5 text-xs"
                                  onClick={() => handleEdit(patient.patientId)}
                                >
                                  <Eye className="w-3 h-3 mr-1" />
                                  View
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="h-7 px-2.5 text-xs"
                                >
                                  <FileText className="w-3 h-3 mr-1" />
                                  Report
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0"
                                  onClick={() => handleEdit(patient.patientId)}
                                  title="Edit"
                                >
                                  <Edit className="w-3.5 h-3.5" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-7 w-7 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                                  onClick={() =>
                                    handleDelete(patient.patientId, patient.patientName)
                                  }
                                  title="Delete"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {/* Mobile Cards */}
                {filteredPatients.length > 0 && (
                  <div className="lg:hidden space-y-3 p-4">
                    {currentPatients.map((patient, index) => (
                      <Card
                        key={`mobile-${patient.patientId}-${index}`}
                        className="p-4"
                      >
                        <div className="space-y-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="min-w-0">
                              <h3 className="font-medium truncate">{patient.patientName}</h3>
                              <p className="text-xs text-muted-foreground mt-0.5">
                                ID: {patient.patientId} · {patient.createdAt}
                              </p>
                            </div>
                            {getStatusBadge(patient.status)}
                          </div>

                          <div className="space-y-1">
                            <p className="text-sm text-muted-foreground">
                              {[patient.village, patient.district, patient.state].filter(Boolean).join(", ") || "—"}
                            </p>
                            {patient.disease && (
                              <Badge variant="outline" className="text-xs font-normal">
                                {patient.disease}
                              </Badge>
                            )}
                            {patient.assignedDoctor && (
                              <p className="text-xs text-muted-foreground">
                                {patient.assignedDoctor}
                              </p>
                            )}
                          </div>

                          <div className="flex gap-2 pt-1">
                            <Button
                              size="sm"
                              className="flex-1 h-8 text-xs"
                              onClick={() => handleEdit(patient.patientId)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              className="flex-1 h-8 text-xs"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              Report
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => handleEdit(patient.patientId)}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                              onClick={() =>
                                handleDelete(patient.patientId, patient.patientName)
                              }
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredPatients.length)} of {filteredPatients.length}
                    </p>
                    <div className="flex items-center gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                        disabled={currentPage === 1}
                        className="h-8"
                      >
                        <ChevronLeft className="w-4 h-4 mr-1" />
                        Prev
                      </Button>
                      <div className="flex items-center gap-1">
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          const pageNum = i + 1;
                          return (
                            <Button
                              key={pageNum}
                              variant={currentPage === pageNum ? "default" : "outline"}
                              size="sm"
                              onClick={() => setCurrentPage(pageNum)}
                              className="h-8 w-8 p-0 text-xs"
                            >
                              {pageNum}
                            </Button>
                          );
                        })}
                        {totalPages > 5 && (
                          <span className="text-muted-foreground text-sm px-1">…</span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                        disabled={currentPage === totalPages}
                        className="h-8"
                      >
                        Next
                        <ChevronRight className="w-4 h-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

          </div>
        </div>
      </main>
    </div>
  );
}
