import { useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  usePatients,
  type PatientData,
  type FamilyMember,
} from "@/context/PatientContext";
import {
  Users,
  MapPin,
  Heart,
  User,
  Activity,
  FileText,
  Plus,
  Trash2,
  Save,
  Printer,
  Upload,
  Stethoscope,
  FlaskConical,
} from "lucide-react";
import { DOCTORS } from "@/lib/seedData";

// Reusable section header icon badge
function SectionIcon({ icon: Icon }: { icon: React.ElementType }) {
  return (
    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
      <Icon className="w-4 h-4 text-primary" />
    </div>
  );
}

export function PatientForm() {
  const navigate = useNavigate();
  const {
    addPatient,
    updatePatient,
    getPatient,
    loading: patientsLoading,
  } = usePatients();
  const { toast } = useToast();

  const [formData, setFormData] = useState<
    Omit<PatientData, "familyComposition" | "createdAt" | "status">
  >({
    headOfFamily: "",
    patientName: "",
    patientId: "",
    country: "",
    state: "",
    district: "",
    block: "",
    village: "",
    location: "",
    panchayat: "",
    wardNo: "",
    pinCode: "",
    minorIllnessLocation: "",
    majorIllnessLocation: "",
    systemOfMedicine: "",
    familyMembers: "",
    familyIncome: "",
    familyType: "",
    religion: "",
    caste: "",
    rationCardType: "",
    ayushmanCard: false,
    disease: "",
    diseaseSummary: "",
    symptoms: "",
    treatmentCompliance: "",
    currentMedication: "",
    mobile: "",
    height: "",
    weight: "",
    bmi: "",
    education: "",
    occupation: "",
    maritalStatus: "",
    tobacco: false,
    alcohol: false,
    drugAddiction: "",
    familyHistory: "",
    otherChronicDiseases: "",
    hospitalHistory: "",
    systolicBP: "",
    diastolicBP: "",
    bpDate: "",
    bloodSugarRBS: "",
    bloodSugarFBS: "",
    bloodSugarPP: "",
    assignedDoctor: "",
    doctorId: "",
  });

  const [familyComposition, setFamilyComposition] = useState<FamilyMember[]>(
    [],
  );

  // ---- Edit mode: /register?edit=<patientId> prefills the form ----
  const [searchParams] = useSearchParams();
  const editId = searchParams.get("edit");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [originalMeta, setOriginalMeta] = useState<
    Pick<PatientData, "createdAt" | "status"> | null
  >(null);
  const editLoaded = useRef(false);

  useEffect(() => {
    if (!editId || editLoaded.current || patientsLoading) return;
    const patient = getPatient(editId);
    if (!patient) {
      toast({
        title: "Patient not found",
        description: `No patient with ID ${editId} exists.`,
        variant: "destructive",
      });
      return;
    }
    const { familyComposition: fc, createdAt, status, ...rest } = patient;
    setFormData(rest);
    setFamilyComposition(fc ?? []);
    setOriginalMeta({ createdAt, status });
    setEditingId(editId);
    editLoaded.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editId, patientsLoading]);

  // ---- Inline validation ----
  const [errors, setErrors] = useState<{ patientName?: string }>({});
  const patientNameRef = useRef<HTMLInputElement>(null);

  const updateFormData = (
    field: keyof typeof formData,
    value: string | boolean,
  ) => {
    setFormData((prev) => {
      const next = { ...prev, [field]: value };
      if (field === "height" || field === "weight") {
        const h = parseFloat(field === "height" ? (value as string) : prev.height);
        const w = parseFloat(field === "weight" ? (value as string) : prev.weight);
        if (h > 0 && w > 0) {
          next.bmi = (w / ((h / 100) * (h / 100))).toFixed(1);
        } else {
          next.bmi = "";
        }
      }
      return next;
    });
  };

  const addFamilyMember = () => {
    const newMember: FamilyMember = {
      id: Date.now().toString(),
      type: "",
      name: "",
      age: "",
      sex: "",
      relation: "",
      maritalStatus: "",
      occupation: "",
      income: "",
      chronicDisease: "",
      treatmentCompliance: "",
    };
    setFamilyComposition([...familyComposition, newMember]);
  };

  const updateFamilyMember = (
    id: string,
    field: keyof FamilyMember,
    value: string,
  ) => {
    setFamilyComposition((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, [field]: value } : member,
      ),
    );
  };

  const removeFamilyMember = (id: string) => {
    setFamilyComposition((prev) => prev.filter((member) => member.id !== id));
  };

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (saving) return;

    if (!formData.patientName.trim()) {
      setErrors({ patientName: "Patient name is required." });
      patientNameRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      patientNameRef.current?.focus({ preventScroll: true });
      return;
    }

    const uniquePatientId = !formData.patientId
      ? `PT${Date.now()}`
      : formData.patientId;

    const patientData: PatientData = {
      ...formData,
      patientId: uniquePatientId,
      familyComposition,
      createdAt: originalMeta?.createdAt ?? new Date().toISOString().split("T")[0],
      status: originalMeta?.status ?? "active",
    };

    setSaving(true);
    try {
      if (editingId) {
        await updatePatient(editingId, patientData);
        toast({
          title: "Patient updated",
          description: `${patientData.patientName}'s record has been updated.`,
        });
      } else {
        await addPatient(patientData);
        toast({
          title: "Patient saved",
          description: `${patientData.patientName} has been registered successfully.`,
        });
      }
      navigate("/patients");
    } catch (err: any) {
      toast({
        title: "Save failed",
        description: err.message ?? "Could not save patient.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    const esc = (v: unknown) =>
      String(v ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");
    const val = (v?: string) => (v && v.trim() ? esc(v) : "—");
    const yesNo = (b: boolean) => (b ? "Yes" : "No");

    const field = (label: string, value: string, span = false) => `
      <div class="field${span ? " span-all" : ""}">
        <div class="label">${label}</div>
        <div class="value">${value}</div>
      </div>`;

    const section = (title: string, body: string, cols = 3) => `
      <div class="card">
        <div class="card-header">${title}</div>
        <div class="grid cols-${cols}">${body}</div>
      </div>`;

    const familyRows = familyComposition
      .map(
        (m) => `
        <tr>
          <td>${val(m.name)}</td><td>${val(m.relation)}</td><td>${val(m.age)}</td>
          <td>${val(m.sex)}</td><td>${val(m.occupation)}</td>
          <td>${val(m.chronicDisease)}</td><td>${val(m.treatmentCompliance)}</td>
        </tr>`,
      )
      .join("");

    const familySection = familyComposition.length
      ? `
      <div class="card">
        <div class="card-header">Family Composition</div>
        <div class="table-wrap">
          <table>
            <thead><tr>
              <th>Name</th><th>Relation</th><th>Age</th><th>Sex</th>
              <th>Occupation</th><th>Chronic Disease</th><th>Compliance</th>
            </tr></thead>
            <tbody>${familyRows}</tbody>
          </table>
        </div>
      </div>`
      : "";

    const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8" />
<title>Patient Information - ${esc(formData.patientName)}</title>
<style>
  :root {
    --primary: hsl(197 71% 52%);
    --fg: hsl(213 27% 23%);
    --muted: hsl(210 23% 97%);
    --muted-fg: hsl(213 19% 46%);
    --border: hsl(213 20% 90%);
  }
  * { box-sizing: border-box; }
  body {
    font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
    color: var(--fg); background: hsl(249 100% 99%); margin: 0; padding: 28px;
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
  }
  .brand-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding-bottom: 16px; margin-bottom: 20px; border-bottom: 2px solid var(--primary);
  }
  .brand { display: flex; align-items: center; gap: 10px; }
  .brand-logo {
    width: 34px; height: 34px; border-radius: 9999px; background: var(--primary);
    color: #fff; display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 15px;
  }
  .brand-name { font-size: 17px; font-weight: 700; }
  .brand-sub { font-size: 11px; color: var(--muted-fg); }
  .meta { text-align: right; font-size: 12px; color: var(--muted-fg); }
  .meta .patient { font-size: 14px; font-weight: 600; color: var(--fg); }
  .card {
    background: #fff; border: 1px solid var(--border); border-radius: 12px;
    margin-bottom: 14px; overflow: hidden; break-inside: avoid;
  }
  .card-header {
    background: var(--muted); border-bottom: 1px solid var(--border);
    padding: 9px 16px; font-weight: 600; font-size: 13.5px;
    display: flex; align-items: center; gap: 8px;
  }
  .card-header::before {
    content: ""; width: 9px; height: 9px; border-radius: 9999px; background: var(--primary);
  }
  .grid { display: grid; gap: 12px 24px; padding: 14px 16px; }
  .cols-2 { grid-template-columns: repeat(2, 1fr); }
  .cols-3 { grid-template-columns: repeat(3, 1fr); }
  .span-all { grid-column: 1 / -1; }
  .label { font-size: 10.5px; color: var(--muted-fg); margin-bottom: 2px; }
  .value {
    font-size: 13px; font-weight: 500; min-height: 18px;
    border-bottom: 1px solid hsl(213 20% 93%); padding-bottom: 3px;
  }
  .table-wrap { padding: 12px 16px; }
  table { width: 100%; border-collapse: collapse; font-size: 12px; }
  th, td { border: 1px solid var(--border); padding: 6px 8px; text-align: left; }
  th { background: var(--muted); font-weight: 600; }
  .footer { margin-top: 18px; font-size: 10.5px; color: var(--muted-fg); text-align: center; }
  @media print {
    body { background: #fff; padding: 0; }
    @page { margin: 12mm; }
  }
</style>
</head>
<body>
  <div class="brand-bar">
    <div class="brand">
      <div class="brand-logo">H</div>
      <div>
        <div class="brand-name">HealthCare</div>
        <div class="brand-sub">Doctor Dashboard — Patient Information</div>
      </div>
    </div>
    <div class="meta">
      <div class="patient">${val(formData.patientName)}</div>
      <div>Patient ID: ${val(formData.patientId)}</div>
      <div>Generated on ${new Date().toLocaleDateString()}</div>
    </div>
  </div>

  ${section(
    "Family Details",
    field("Head of Family", val(formData.headOfFamily)) +
      field("Patient Name", val(formData.patientName)) +
      field("Patient ID", val(formData.patientId)) +
      field("Assigned Doctor", val(formData.assignedDoctor)),
    2,
  )}

  ${section(
    "Complete Address",
    field("Country", val(formData.country)) +
      field("State", val(formData.state)) +
      field("District / City", val(formData.district)) +
      field("Block", val(formData.block)) +
      field("Village / Municipal", val(formData.village)) +
      field("Location Type", val(formData.location)) +
      field("Panchayat", val(formData.panchayat)) +
      field("Ward No.", val(formData.wardNo)) +
      field("Pin Code", val(formData.pinCode)),
  )}

  ${section(
    "Health Seeking Behaviour",
    field("Minor Illness Location", val(formData.minorIllnessLocation)) +
      field("Major Illness Location", val(formData.majorIllnessLocation)) +
      field("System of Medicine", val(formData.systemOfMedicine)) +
      field("Family Members", val(formData.familyMembers)) +
      field("Family Income", val(formData.familyIncome)) +
      field("Family Type", val(formData.familyType)) +
      field("Religion", val(formData.religion)) +
      field("Caste", val(formData.caste)) +
      field("Ration Card Type", val(formData.rationCardType)) +
      field("Ayushman Card", yesNo(formData.ayushmanCard)),
  )}

  ${familySection}

  ${section(
    "Patient Disease Summary",
    field("Disease", val(formData.disease)) +
      field("Treatment Compliance", val(formData.treatmentCompliance)) +
      field("Symptoms", val(formData.symptoms), true) +
      field("Current Medication", val(formData.currentMedication), true) +
      field("Disease Summary", val(formData.diseaseSummary), true),
    2,
  )}

  ${section(
    "Patient Personal Info",
    field("Mobile", val(formData.mobile)) +
      field("Height (cm)", val(formData.height)) +
      field("Weight (kg)", val(formData.weight)) +
      field("BMI", val(formData.bmi)) +
      field("Education", val(formData.education)) +
      field("Occupation", val(formData.occupation)) +
      field("Marital Status", val(formData.maritalStatus)),
  )}

  ${section(
    "Lifestyle & History",
    field("Tobacco Use", yesNo(formData.tobacco)) +
      field("Alcohol Use", yesNo(formData.alcohol)) +
      field("Drug Addiction", val(formData.drugAddiction)) +
      field("Family History", val(formData.familyHistory)) +
      field("Other Chronic Diseases", val(formData.otherChronicDiseases)) +
      field("Hospital History", val(formData.hospitalHistory)),
  )}

  ${section(
    "Investigation",
    field("Systolic BP", val(formData.systolicBP)) +
      field("Diastolic BP", val(formData.diastolicBP)) +
      field("BP Date", val(formData.bpDate)) +
      field("Blood Sugar (RBS)", val(formData.bloodSugarRBS)) +
      field("Blood Sugar (FBS)", val(formData.bloodSugarFBS)) +
      field("Blood Sugar (PP)", val(formData.bloodSugarPP)),
  )}

  <div class="footer">Generated by HealthCare Doctor Dashboard</div>
  <script>window.onload = function () { window.print(); };</script>
</body>
</html>`;

    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(html);
      printWindow.document.close();
      printWindow.focus();
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Sticky action bar */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b border-border pl-6 pr-16 py-3 flex items-center justify-between no-print">
        <div>
          <h1 className="text-lg font-semibold text-foreground leading-tight">
            {editingId ? "Edit Patient" : "Patient Registration"}
          </h1>
          {formData.patientName ? (
            <p className="text-xs text-muted-foreground">
              {editingId ? "Editing: " : "Registering: "}
              <span className="font-medium text-foreground">{formData.patientName}</span>
            </p>
          ) : (
            <p className="text-xs text-muted-foreground">Fill in patient details below</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="hidden sm:flex items-center gap-1.5">
            <Printer className="w-3.5 h-3.5" />
            Print
          </Button>
          <Button variant="outline" size="sm" onClick={() => navigate("/patients")}>
            Cancel
          </Button>
          <Button size="sm" onClick={handleSave} disabled={saving} className="flex items-center gap-1.5">
            <Save className="w-3.5 h-3.5" />
            {saving ? "Saving…" : editingId ? "Update Patient" : "Save Patient"}
          </Button>
        </div>
      </div>

      {/* Form content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6 space-y-5 print-content">

          {/* Section 1 — Family Details */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={Users} />
                Family Details
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="headOfFamily">Head of Family</Label>
                  <Input
                    id="headOfFamily"
                    placeholder="Full name of head of family"
                    value={formData.headOfFamily}
                    onChange={(e) => updateFormData("headOfFamily", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="patientName">
                    Patient Name <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="patientName"
                    ref={patientNameRef}
                    placeholder="Full name of patient"
                    value={formData.patientName}
                    aria-required="true"
                    aria-invalid={!!errors.patientName}
                    className={
                      errors.patientName
                        ? "border-destructive focus-visible:ring-destructive"
                        : undefined
                    }
                    onChange={(e) => {
                      updateFormData("patientName", e.target.value);
                      if (errors.patientName) setErrors({});
                    }}
                  />
                  {errors.patientName && (
                    <p className="text-xs text-destructive font-medium" role="alert">
                      {errors.patientName}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="patientId">Patient ID</Label>
                  <Input
                    id="patientId"
                    placeholder="Auto-generated if left blank"
                    value={formData.patientId}
                    onChange={(e) => updateFormData("patientId", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="assignedDoctor">Assigned Doctor</Label>
                  <Select
                    value={formData.doctorId}
                    onValueChange={(value) => {
                      const doctor = DOCTORS.find((d) => d.id === value);
                      updateFormData("doctorId", value);
                      updateFormData("assignedDoctor", doctor?.name ?? "");
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      {DOCTORS.map((doctor) => (
                        <SelectItem key={doctor.id} value={doctor.id}>
                          {doctor.name}
                          <span className="ml-2 text-xs text-muted-foreground">
                            — {doctor.specialty}
                          </span>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 2 — Complete Address */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={MapPin} />
                Complete Address
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    placeholder="e.g. India"
                    value={formData.country}
                    onChange={(e) => updateFormData("country", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="state">State</Label>
                  <Input
                    id="state"
                    placeholder="e.g. Bihar"
                    value={formData.state}
                    onChange={(e) => updateFormData("state", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="district">District / City</Label>
                  <Input
                    id="district"
                    placeholder="e.g. Patna"
                    value={formData.district}
                    onChange={(e) => updateFormData("district", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="block">Block</Label>
                  <Input
                    id="block"
                    placeholder="Block name"
                    value={formData.block}
                    onChange={(e) => updateFormData("block", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="village">Village / Municipal</Label>
                  <Input
                    id="village"
                    placeholder="Village or ward name"
                    value={formData.village}
                    onChange={(e) => updateFormData("village", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="location">Location Type</Label>
                  <Select
                    value={formData.location}
                    onValueChange={(value) => updateFormData("location", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select location type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Urban">Urban</SelectItem>
                      <SelectItem value="Rural">Rural</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="panchayat">Panchayat</Label>
                  <Input
                    id="panchayat"
                    placeholder="Panchayat name"
                    value={formData.panchayat}
                    onChange={(e) => updateFormData("panchayat", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="wardNo">Ward No.</Label>
                  <Input
                    id="wardNo"
                    placeholder="e.g. 12"
                    value={formData.wardNo}
                    onChange={(e) => updateFormData("wardNo", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="pinCode">Pin Code</Label>
                  <Input
                    id="pinCode"
                    placeholder="6-digit pin code"
                    value={formData.pinCode}
                    onChange={(e) => updateFormData("pinCode", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 3 — Health Seeking Behaviour */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={Heart} />
                Health Seeking Behaviour
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="minorIllness">Where to go for minor illness</Label>
                  <Input
                    id="minorIllness"
                    placeholder="e.g. PHC, local clinic"
                    value={formData.minorIllnessLocation}
                    onChange={(e) =>
                      updateFormData("minorIllnessLocation", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="majorIllness">Where to go for major illness</Label>
                  <Input
                    id="majorIllness"
                    placeholder="e.g. district hospital"
                    value={formData.majorIllnessLocation}
                    onChange={(e) =>
                      updateFormData("majorIllnessLocation", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="systemOfMedicine">System of medicine preferred</Label>
                  <Select
                    value={formData.systemOfMedicine}
                    onValueChange={(value) =>
                      updateFormData("systemOfMedicine", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select system" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Allopath">Allopath</SelectItem>
                      <SelectItem value="Ayurvedic">Ayurvedic</SelectItem>
                      <SelectItem value="Homeopathic">Homeopathic</SelectItem>
                      <SelectItem value="Unani">Unani</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="familyMembers">Number of family members</Label>
                  <Input
                    id="familyMembers"
                    type="number"
                    placeholder="e.g. 4"
                    value={formData.familyMembers}
                    onChange={(e) =>
                      updateFormData("familyMembers", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="familyIncome">Total family income / month (₹)</Label>
                  <Input
                    id="familyIncome"
                    type="number"
                    placeholder="e.g. 15000"
                    value={formData.familyIncome}
                    onChange={(e) => updateFormData("familyIncome", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="familyType">Type of family</Label>
                  <Select
                    value={formData.familyType}
                    onValueChange={(value) => updateFormData("familyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select family type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Nuclear">Nuclear</SelectItem>
                      <SelectItem value="Joint">Joint</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="religion">Religion</Label>
                  <Input
                    id="religion"
                    placeholder="e.g. Hindu, Muslim, Christian"
                    value={formData.religion}
                    onChange={(e) => updateFormData("religion", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="caste">Caste</Label>
                  <Input
                    id="caste"
                    placeholder="Caste category"
                    value={formData.caste}
                    onChange={(e) => updateFormData("caste", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="rationCard">Ration Card Type</Label>
                  <Select
                    value={formData.rationCardType}
                    onValueChange={(value) =>
                      updateFormData("rationCardType", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select card type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Antyodaya">Antyodaya</SelectItem>
                      <SelectItem value="BPL">BPL</SelectItem>
                      <SelectItem value="APL">APL</SelectItem>
                      <SelectItem value="None">None</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-3 pt-1">
                  <Checkbox
                    id="ayushman"
                    checked={formData.ayushmanCard}
                    onCheckedChange={(checked) =>
                      updateFormData("ayushmanCard", checked)
                    }
                  />
                  <Label htmlFor="ayushman" className="cursor-pointer">Has Ayushman Card</Label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 4 — Family Composition */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center justify-between text-base font-semibold text-foreground">
                <div className="flex items-center gap-3">
                  <SectionIcon icon={Users} />
                  Family Composition
                  {familyComposition.length > 0 && (
                    <Badge variant="secondary" className="text-xs font-normal">
                      {familyComposition.length} {familyComposition.length === 1 ? "member" : "members"}
                    </Badge>
                  )}
                </div>
                <Button onClick={addFamilyMember} size="sm" variant="outline" className="h-8 text-xs no-print">
                  <Plus className="w-3.5 h-3.5 mr-1.5" />
                  Add Member
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              {familyComposition.length === 0 ? (
                <div className="text-center py-8 border border-dashed border-border rounded-lg">
                  <Users className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">No family members added yet</p>
                  <Button onClick={addFamilyMember} size="sm" variant="outline" className="mt-3 no-print">
                    <Plus className="w-3.5 h-3.5 mr-1.5" />
                    Add First Member
                  </Button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="bg-muted/40">
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Type</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Name</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Age</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Sex</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Relation</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Marital</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Occupation</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Income/mo</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Chronic Disease</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide">Compliance</th>
                        <th className="border border-border px-3 py-2 text-left font-medium text-muted-foreground text-xs uppercase tracking-wide no-print"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {familyComposition.map((member) => (
                        <tr key={member.id} className="hover:bg-muted/20 transition-colors">
                          <td className="border border-border px-2 py-1.5">
                            <Input
                              value={member.type}
                              onChange={(e) =>
                                updateFamilyMember(member.id, "type", e.target.value)
                              }
                              placeholder="Adult"
                              className="h-8 text-sm"
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Input
                              value={member.name}
                              onChange={(e) =>
                                updateFamilyMember(member.id, "name", e.target.value)
                              }
                              className="h-8 text-sm"
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Input
                              value={member.age}
                              onChange={(e) =>
                                updateFamilyMember(member.id, "age", e.target.value)
                              }
                              type="number"
                              className="h-8 text-sm w-16"
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Select
                              value={member.sex}
                              onValueChange={(value) =>
                                updateFamilyMember(member.id, "sex", value)
                              }
                            >
                              <SelectTrigger className="h-8 text-sm w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="M">Male</SelectItem>
                                <SelectItem value="F">Female</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Input
                              value={member.relation}
                              onChange={(e) =>
                                updateFamilyMember(member.id, "relation", e.target.value)
                              }
                              className="h-8 text-sm"
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Select
                              value={member.maritalStatus}
                              onValueChange={(value) =>
                                updateFamilyMember(member.id, "maritalStatus", value)
                              }
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Married">Married</SelectItem>
                                <SelectItem value="Unmarried">Unmarried</SelectItem>
                                <SelectItem value="Divorced">Divorced</SelectItem>
                                <SelectItem value="Widowed">Widowed</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Input
                              value={member.occupation}
                              onChange={(e) =>
                                updateFamilyMember(member.id, "occupation", e.target.value)
                              }
                              className="h-8 text-sm"
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Input
                              value={member.income}
                              onChange={(e) =>
                                updateFamilyMember(member.id, "income", e.target.value)
                              }
                              type="number"
                              className="h-8 text-sm w-24"
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Input
                              value={member.chronicDisease}
                              onChange={(e) =>
                                updateFamilyMember(member.id, "chronicDisease", e.target.value)
                              }
                              className="h-8 text-sm"
                            />
                          </td>
                          <td className="border border-border px-2 py-1.5">
                            <Select
                              value={member.treatmentCompliance}
                              onValueChange={(value) =>
                                updateFamilyMember(member.id, "treatmentCompliance", value)
                              }
                            >
                              <SelectTrigger className="h-8 text-sm">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Good">Good</SelectItem>
                                <SelectItem value="Fair">Fair</SelectItem>
                                <SelectItem value="Poor">Poor</SelectItem>
                                <SelectItem value="N/A">N/A</SelectItem>
                              </SelectContent>
                            </Select>
                          </td>
                          <td className="border border-border px-2 py-1.5 no-print">
                            <Button
                              onClick={() => removeFamilyMember(member.id)}
                              size="sm"
                              variant="ghost"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive hover:bg-destructive/10"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Section 5 — Patient Disease Summary */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={Stethoscope} />
                Patient Disease Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="disease">Disease</Label>
                  <Input
                    id="disease"
                    placeholder="Primary diagnosis"
                    value={formData.disease}
                    onChange={(e) => updateFormData("disease", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="treatmentCompliance">Treatment Compliance</Label>
                  <Select
                    value={formData.treatmentCompliance}
                    onValueChange={(value) =>
                      updateFormData("treatmentCompliance", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select compliance" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Good">Good</SelectItem>
                      <SelectItem value="Fair">Fair</SelectItem>
                      <SelectItem value="Poor">Poor</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="diseaseSummary">Disease Summary</Label>
                  <Textarea
                    id="diseaseSummary"
                    placeholder="Brief summary of the disease history and progression..."
                    value={formData.diseaseSummary}
                    onChange={(e) =>
                      updateFormData("diseaseSummary", e.target.value)
                    }
                    className="min-h-[80px]"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="symptoms">Symptoms</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="List presenting symptoms..."
                    value={formData.symptoms}
                    onChange={(e) => updateFormData("symptoms", e.target.value)}
                    className="min-h-[80px]"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="currentMedication">Current Medication with Dose</Label>
                  <Textarea
                    id="currentMedication"
                    placeholder="List all current medications with dosage..."
                    value={formData.currentMedication}
                    onChange={(e) =>
                      updateFormData("currentMedication", e.target.value)
                    }
                    className="min-h-[80px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 6 — Patient Personal Info */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={User} />
                Patient Personal Info
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="mobile">Mobile Number</Label>
                  <Input
                    id="mobile"
                    placeholder="+91 XXXXX XXXXX"
                    value={formData.mobile}
                    onChange={(e) => updateFormData("mobile", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input
                    id="height"
                    type="number"
                    placeholder="e.g. 165"
                    value={formData.height}
                    onChange={(e) => updateFormData("height", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input
                    id="weight"
                    type="number"
                    placeholder="e.g. 70"
                    value={formData.weight}
                    onChange={(e) => updateFormData("weight", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bmi">
                    BMI
                    {formData.bmi && (
                      <span className={`ml-2 text-xs font-normal ${
                        parseFloat(formData.bmi) < 18.5 ? "text-blue-600" :
                        parseFloat(formData.bmi) < 25 ? "text-green-600" :
                        parseFloat(formData.bmi) < 30 ? "text-yellow-600" :
                        "text-red-600"
                      }`}>
                        ({parseFloat(formData.bmi) < 18.5 ? "Underweight" :
                          parseFloat(formData.bmi) < 25 ? "Normal" :
                          parseFloat(formData.bmi) < 30 ? "Overweight" : "Obese"})
                      </span>
                    )}
                  </Label>
                  <Input
                    id="bmi"
                    value={formData.bmi}
                    readOnly
                    placeholder="Auto-calculated"
                    className="bg-muted/40 text-muted-foreground"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="education">Education Level</Label>
                  <Select
                    value={formData.education}
                    onValueChange={(value) => updateFormData("education", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Illiterate">Illiterate</SelectItem>
                      <SelectItem value="Primary School">Primary School</SelectItem>
                      <SelectItem value="Middle School">Middle School</SelectItem>
                      <SelectItem value="High School">High School</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Graduate">Graduate</SelectItem>
                      <SelectItem value="Post Graduate">Post Graduate</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="occupation">Occupation</Label>
                  <Input
                    id="occupation"
                    placeholder="e.g. Farmer, Teacher"
                    value={formData.occupation}
                    onChange={(e) => updateFormData("occupation", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="maritalStatus">Marital Status</Label>
                  <Select
                    value={formData.maritalStatus}
                    onValueChange={(value) =>
                      updateFormData("maritalStatus", value)
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Married">Married</SelectItem>
                      <SelectItem value="Unmarried">Unmarried</SelectItem>
                      <SelectItem value="Divorced">Divorced</SelectItem>
                      <SelectItem value="Widowed">Widowed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 7 — Lifestyle & History */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={Activity} />
                Lifestyle & History
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                  <Checkbox
                    id="tobacco"
                    checked={formData.tobacco}
                    onCheckedChange={(checked) =>
                      updateFormData("tobacco", checked)
                    }
                  />
                  <Label htmlFor="tobacco" className="cursor-pointer font-normal">
                    Tobacco use (past 1 year)
                  </Label>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg border border-border bg-muted/20">
                  <Checkbox
                    id="alcohol"
                    checked={formData.alcohol}
                    onCheckedChange={(checked) =>
                      updateFormData("alcohol", checked)
                    }
                  />
                  <Label htmlFor="alcohol" className="cursor-pointer font-normal">
                    Alcohol use (past 1 year)
                  </Label>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="drugAddiction">Other drug addiction</Label>
                  <Input
                    id="drugAddiction"
                    placeholder="Specify if any"
                    value={formData.drugAddiction}
                    onChange={(e) =>
                      updateFormData("drugAddiction", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="familyHistory">Family history of chronic disease</Label>
                  <Input
                    id="familyHistory"
                    placeholder="e.g. Diabetes, Hypertension"
                    value={formData.familyHistory}
                    onChange={(e) =>
                      updateFormData("familyHistory", e.target.value)
                    }
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="otherChronicDiseases">Other chronic diseases</Label>
                  <Textarea
                    id="otherChronicDiseases"
                    placeholder="List any other chronic conditions..."
                    value={formData.otherChronicDiseases}
                    onChange={(e) =>
                      updateFormData("otherChronicDiseases", e.target.value)
                    }
                    className="min-h-[72px]"
                  />
                </div>
                <div className="md:col-span-2 space-y-1.5">
                  <Label htmlFor="hospitalHistory">Past hospital admission history</Label>
                  <Textarea
                    id="hospitalHistory"
                    placeholder="Previous medical or surgical admissions..."
                    value={formData.hospitalHistory}
                    onChange={(e) =>
                      updateFormData("hospitalHistory", e.target.value)
                    }
                    className="min-h-[72px]"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 8 — Investigation */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={FlaskConical} />
                Investigation
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="systolicBP">Systolic BP (mmHg)</Label>
                  <Input
                    id="systolicBP"
                    type="number"
                    placeholder="e.g. 120"
                    value={formData.systolicBP}
                    onChange={(e) => updateFormData("systolicBP", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="diastolicBP">Diastolic BP (mmHg)</Label>
                  <Input
                    id="diastolicBP"
                    type="number"
                    placeholder="e.g. 80"
                    value={formData.diastolicBP}
                    onChange={(e) => updateFormData("diastolicBP", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bpDate">BP Measured Date</Label>
                  <Input
                    id="bpDate"
                    type="date"
                    value={formData.bpDate}
                    onChange={(e) => updateFormData("bpDate", e.target.value)}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bloodSugarRBS">Blood Sugar — RBS (mg/dL)</Label>
                  <Input
                    id="bloodSugarRBS"
                    type="number"
                    placeholder="e.g. 110"
                    value={formData.bloodSugarRBS}
                    onChange={(e) =>
                      updateFormData("bloodSugarRBS", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bloodSugarFBS">Blood Sugar — FBS (mg/dL)</Label>
                  <Input
                    id="bloodSugarFBS"
                    type="number"
                    placeholder="e.g. 95"
                    value={formData.bloodSugarFBS}
                    onChange={(e) =>
                      updateFormData("bloodSugarFBS", e.target.value)
                    }
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="bloodSugarPP">Blood Sugar — PP (mg/dL)</Label>
                  <Input
                    id="bloodSugarPP"
                    type="number"
                    placeholder="e.g. 140"
                    value={formData.bloodSugarPP}
                    onChange={(e) => updateFormData("bloodSugarPP", e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Section 9 — Documents */}
          <Card>
            <CardHeader className="bg-muted/40 border-b border-border py-4">
              <CardTitle className="flex items-center gap-3 text-base font-semibold text-foreground">
                <SectionIcon icon={FileText} />
                Documents
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-5">
              <div className="flex flex-col sm:flex-row gap-3 no-print">
                <Button variant="outline" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Upload Documents
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  View Files
                </Button>
                <Button onClick={handlePrint} variant="outline" className="flex items-center gap-2">
                  <Printer className="w-4 h-4" />
                  Print this page
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bottom save bar */}
          <div className="flex justify-end gap-3 pt-2 pb-6 no-print">
            <Button variant="outline" size="lg" onClick={() => navigate("/patients")}>
              Cancel
            </Button>
            <Button onClick={handleSave} size="lg" disabled={saving} className="flex items-center gap-2">
              <Save className="w-4 h-4" />
              {saving
                ? "Saving…"
                : editingId
                  ? "Update Patient Information"
                  : "Save Patient Information"}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
