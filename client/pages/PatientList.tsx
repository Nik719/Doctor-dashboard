import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { usePatients } from "@/context/PatientContext";
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
} from "lucide-react";

export default function PatientList() {
  const navigate = useNavigate();
  const { patients, deletePatient } = usePatients();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredPatients = patients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.disease.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `${patient.village}, ${patient.district}, ${patient.state}`
        .toLowerCase()
        .includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredPatients.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentPatients = filteredPatients.slice(
    startIndex,
    startIndex + itemsPerPage,
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-blue-100 text-blue-800 hover:bg-blue-200";
      case "follow-up":
        return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";
      case "completed":
        return "bg-green-100 text-green-800 hover:bg-green-200";
      default:
        return "bg-gray-100 text-gray-800 hover:bg-gray-200";
    }
  };

  const handleEdit = (patientId: string) => {
    // Navigate to form with patient ID for editing
    navigate(`/?edit=${patientId}`);
  };

  const handleDelete = (patientId: string, patientName: string) => {
    if (
      window.confirm(`Are you sure you want to delete patient ${patientName}?`)
    ) {
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
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-foreground">
                    Patient List
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Manage and view all registered patients
                  </p>
                </div>
                <Button className="lg:w-auto w-full">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Patient
                </Button>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary" />
                    All Patients ({filteredPatients.length})
                  </CardTitle>
                  <div className="relative w-full sm:w-80">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input
                      placeholder="Search patients..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {/* Desktop Table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          DATE
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          PATIENT NAME
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          ADDRESS
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          DISEASE
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          PATIENT DETAILS
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          REPORTS
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          FOLLOW
                        </th>
                        <th className="text-left py-4 px-6 font-medium text-muted-foreground text-sm">
                          ACTIONS
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentPatients.map((patient, index) => (
                        <tr
                          key={`${patient.patientId}-${index}`}
                          className="border-b border-border hover:bg-muted/20 transition-colors"
                        >
                          <td className="py-4 px-6 text-sm text-muted-foreground">
                            {patient.createdAt}
                          </td>
                          <td className="py-4 px-6">
                            <div>
                              <p className="font-medium text-sm">
                                {patient.patientName}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                ID: {patient.patientId}
                              </p>
                            </div>
                          </td>
                          <td className="py-4 px-6 text-sm text-muted-foreground max-w-xs">
                            {patient.village}, {patient.district},{" "}
                            {patient.state}
                          </td>
                          <td className="py-4 px-6">
                            <Badge variant="outline" className="text-xs">
                              {patient.disease}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <Button
                              variant="default"
                              size="sm"
                              className="h-8 px-3 text-xs"
                              onClick={() => handleEdit(patient.patientId)}
                            >
                              <Eye className="w-3 h-3 mr-1" />
                              View
                            </Button>
                          </td>
                          <td className="py-4 px-6">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 px-3 text-xs"
                            >
                              <FileText className="w-3 h-3 mr-1" />
                              View Report
                            </Button>
                          </td>
                          <td className="py-4 px-6">
                            <Badge className={getStatusColor(patient.status)}>
                              {patient.status === "follow-up"
                                ? "Follow"
                                : patient.status}
                            </Badge>
                          </td>
                          <td className="py-4 px-6">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0"
                                onClick={() => handleEdit(patient.patientId)}
                                title="Edit Patient"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                                onClick={() =>
                                  handleDelete(
                                    patient.patientId,
                                    patient.patientName,
                                  )
                                }
                                title="Delete Patient"
                              >
                                <Trash2 className="w-3 h-3" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="lg:hidden space-y-4 p-4">
                  {currentPatients.map((patient, index) => (
                    <Card
                      key={`mobile-${patient.patientId}-${index}`}
                      className="p-4"
                    >
                      <div className="space-y-3">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-medium">
                              {patient.patientName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              ID: {patient.patientId} • {patient.createdAt}
                            </p>
                          </div>
                          <Badge className={getStatusColor(patient.status)}>
                            {patient.status}
                          </Badge>
                        </div>

                        <div className="space-y-2">
                          <p className="text-sm text-muted-foreground">
                            {patient.village}, {patient.district},{" "}
                            {patient.state}
                          </p>
                          <Badge variant="outline" className="text-xs">
                            {patient.disease}
                          </Badge>
                        </div>

                        <div className="flex gap-2 pt-2">
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
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0"
                            onClick={() => handleEdit(patient.patientId)}
                            title="Edit"
                          >
                            <Edit className="w-3 h-3" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                            onClick={() =>
                              handleDelete(
                                patient.patientId,
                                patient.patientName,
                              )
                            }
                            title="Delete"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between px-6 py-4 border-t border-border">
                    <p className="text-sm text-muted-foreground">
                      Showing {startIndex + 1} of {filteredPatients.length}{" "}
                      Patients
                    </p>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="h-8"
                      >
                        <ChevronLeft className="w-4 h-4" />
                        Previous
                      </Button>

                      <div className="flex items-center gap-1">
                        {Array.from(
                          { length: Math.min(5, totalPages) },
                          (_, i) => {
                            const pageNum = i + 1;
                            return (
                              <Button
                                key={pageNum}
                                variant={
                                  currentPage === pageNum
                                    ? "default"
                                    : "outline"
                                }
                                size="sm"
                                onClick={() => setCurrentPage(pageNum)}
                                className="h-8 w-8 p-0"
                              >
                                {pageNum}
                              </Button>
                            );
                          },
                        )}
                        {totalPages > 5 && (
                          <span className="text-muted-foreground">...</span>
                        )}
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages),
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="h-8"
                      >
                        Next
                        <ChevronRight className="w-4 h-4" />
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
