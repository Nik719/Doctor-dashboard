import { useState } from "react";
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
} from "lucide-react";

interface FamilyMember {
  id: string;
  type: string;
  name: string;
  age: string;
  sex: string;
  relation: string;
  maritalStatus: string;
  occupation: string;
  income: string;
  chronicDisease: string;
  treatmentCompliance: string;
}

interface PatientFormData {
  // Family Details
  headOfFamily: string;
  patientName: string;
  patientId: string;

  // Complete Address
  country: string;
  state: string;
  district: string;
  block: string;
  village: string;
  location: string;
  panchayat: string;
  wardNo: string;
  pinCode: string;

  // Health Seeking Behaviour
  minorIllnessLocation: string;
  majorIllnessLocation: string;
  systemOfMedicine: string;
  familyMembers: string;
  familyIncome: string;
  familyType: string;
  religion: string;
  caste: string;
  rationCardType: string;
  ayushmanCard: boolean;

  // Patient Disease Summary
  disease: string;
  diseaseSummary: string;
  symptoms: string;
  treatmentCompliance: string;
  currentMedication: string;

  // Patient Personal Info
  mobile: string;
  height: string;
  weight: string;
  bmi: string;
  education: string;
  occupation: string;
  maritalStatus: string;

  // Lifestyle & History
  tobacco: boolean;
  alcohol: boolean;
  drugAddiction: string;
  familyHistory: string;
  otherChronicDiseases: string;
  hospitalHistory: string;

  // Investigation
  systolicBP: string;
  diastolicBP: string;
  bpDate: string;
  bloodSugarRBS: string;
  bloodSugarFBS: string;
  bloodSugarPP: string;
}

export function PatientForm() {
  const [formData, setFormData] = useState<PatientFormData>({
    headOfFamily: "Mohan Ram",
    patientName: "Mohan Ram",
    patientId: "109590",
    country: "India",
    state: "Bihar",
    district: "Patna",
    block: "Danapur",
    village: "Gora Bazar",
    location: "Urban",
    panchayat: "",
    wardNo: "12",
    pinCode: "801503",
    minorIllnessLocation: "Primary Health Center",
    majorIllnessLocation: "District Hospital",
    systemOfMedicine: "Allopath",
    familyMembers: "7",
    familyIncome: "15000",
    familyType: "Joint",
    religion: "Hindu",
    caste: "SC/ST",
    rationCardType: "Antyodaya",
    ayushmanCard: true,
    disease: "HTN",
    diseaseSummary: "Hypertension diagnosed 2 years ago",
    symptoms: "Weakness, Vertigo",
    treatmentCompliance: "Good",
    currentMedication: "Telmisartan 40mg + Amlodipine 5mg",
    mobile: "+91 98765 43210",
    height: "165",
    weight: "68",
    bmi: "24.8",
    education: "Primary School",
    occupation: "Daily Labor",
    maritalStatus: "Married",
    tobacco: true,
    alcohol: false,
    drugAddiction: "None",
    familyHistory: "Father had diabetes",
    otherChronicDiseases: "Arthritis",
    hospitalHistory: "None",
    systolicBP: "140",
    diastolicBP: "85",
    bpDate: "2024-01-15",
    bloodSugarRBS: "130",
    bloodSugarFBS: "",
    bloodSugarPP: "",
  });

  const [familyComposition, setFamilyComposition] = useState<FamilyMember[]>([
    {
      id: "1",
      type: "Adult",
      name: "Mohan Ram",
      age: "45",
      sex: "M",
      relation: "Self",
      maritalStatus: "Married",
      occupation: "Daily Labor",
      income: "8000",
      chronicDisease: "HTN",
      treatmentCompliance: "Good",
    },
    {
      id: "2",
      type: "Adult",
      name: "Sunita Devi",
      age: "40",
      sex: "F",
      relation: "Wife",
      maritalStatus: "Married",
      occupation: "Housewife",
      income: "0",
      chronicDisease: "None",
      treatmentCompliance: "N/A",
    },
    {
      id: "3",
      type: "Young Adult",
      name: "Rajesh Kumar",
      age: "22",
      sex: "M",
      relation: "Son",
      maritalStatus: "Unmarried",
      occupation: "Student",
      income: "0",
      chronicDisease: "None",
      treatmentCompliance: "N/A",
    },
  ]);

  const updateFormData = (field: keyof PatientFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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

  const handleSave = () => {
    console.log("Saving patient data:", { formData, familyComposition });
    // Here you would typically send the data to your backend
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Family Details Section */}
      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="bg-blue-50">
          <CardTitle className="flex items-center gap-2 text-blue-700">
            <Users className="w-5 h-5" />
            🟦 Family Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="headOfFamily">Head of the Family</Label>
              <Input
                id="headOfFamily"
                value={formData.headOfFamily}
                onChange={(e) => updateFormData("headOfFamily", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="patientName">Patient Name</Label>
              <Input
                id="patientName"
                value={formData.patientName}
                onChange={(e) => updateFormData("patientName", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="patientId">Patient ID</Label>
              <Input
                id="patientId"
                value={formData.patientId}
                onChange={(e) => updateFormData("patientId", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Address Section */}
      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="bg-green-50">
          <CardTitle className="flex items-center gap-2 text-green-700">
            <MapPin className="w-5 h-5" />
            🟩 Complete Address
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="country">Country</Label>
              <Input
                id="country"
                value={formData.country}
                onChange={(e) => updateFormData("country", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => updateFormData("state", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="district">District / City</Label>
              <Input
                id="district"
                value={formData.district}
                onChange={(e) => updateFormData("district", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="block">Block</Label>
              <Input
                id="block"
                value={formData.block}
                onChange={(e) => updateFormData("block", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="village">Village / Municipal</Label>
              <Input
                id="village"
                value={formData.village}
                onChange={(e) => updateFormData("village", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="location">Location</Label>
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
            <div>
              <Label htmlFor="panchayat">Panchayat</Label>
              <Input
                id="panchayat"
                value={formData.panchayat}
                onChange={(e) => updateFormData("panchayat", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="wardNo">Ward No</Label>
              <Input
                id="wardNo"
                value={formData.wardNo}
                onChange={(e) => updateFormData("wardNo", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input
                id="pinCode"
                value={formData.pinCode}
                onChange={(e) => updateFormData("pinCode", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Seeking Behaviour Section */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <Heart className="w-5 h-5" />
            🟨 Health Seeking Behaviour
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="minorIllness">
                Where do you go for minor illness
              </Label>
              <Input
                id="minorIllness"
                value={formData.minorIllnessLocation}
                onChange={(e) =>
                  updateFormData("minorIllnessLocation", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="majorIllness">
                Where do you go for major illness
              </Label>
              <Input
                id="majorIllness"
                value={formData.majorIllnessLocation}
                onChange={(e) =>
                  updateFormData("majorIllnessLocation", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="systemOfMedicine">
                System of medicine preferred
              </Label>
              <Select
                value={formData.systemOfMedicine}
                onValueChange={(value) =>
                  updateFormData("systemOfMedicine", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Allopath">Allopath</SelectItem>
                  <SelectItem value="Ayurvedic">Ayurvedic</SelectItem>
                  <SelectItem value="Homeopathic">Homeopathic</SelectItem>
                  <SelectItem value="Unani">Unani</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="familyMembers">Number of family members</Label>
              <Input
                id="familyMembers"
                type="number"
                value={formData.familyMembers}
                onChange={(e) =>
                  updateFormData("familyMembers", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="familyIncome">Total family income / month</Label>
              <Input
                id="familyIncome"
                type="number"
                value={formData.familyIncome}
                onChange={(e) => updateFormData("familyIncome", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="familyType">Type of family</Label>
              <Select
                value={formData.familyType}
                onValueChange={(value) => updateFormData("familyType", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Nuclear">Nuclear</SelectItem>
                  <SelectItem value="Joint">Joint</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="religion">Religion</Label>
              <Input
                id="religion"
                value={formData.religion}
                onChange={(e) => updateFormData("religion", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="caste">Caste</Label>
              <Input
                id="caste"
                value={formData.caste}
                onChange={(e) => updateFormData("caste", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="rationCard">Ration Card Type</Label>
              <Select
                value={formData.rationCardType}
                onValueChange={(value) =>
                  updateFormData("rationCardType", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Antyodaya">Antyodaya</SelectItem>
                  <SelectItem value="BPL">BPL</SelectItem>
                  <SelectItem value="APL">APL</SelectItem>
                  <SelectItem value="None">None</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="ayushman"
                checked={formData.ayushmanCard}
                onCheckedChange={(checked) =>
                  updateFormData("ayushmanCard", checked)
                }
              />
              <Label htmlFor="ayushman">Ayushman Card</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Family Composition Section */}
      <Card className="border-l-4 border-l-amber-600">
        <CardHeader className="bg-amber-50">
          <CardTitle className="flex items-center gap-2 justify-between text-amber-700">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              🟫 Family Composition
            </div>
            <Button onClick={addFamilyMember} size="sm">
              <Plus className="w-4 h-4 mr-2" />
              Add Member
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border p-2 text-left">Type</th>
                  <th className="border p-2 text-left">Name</th>
                  <th className="border p-2 text-left">Age</th>
                  <th className="border p-2 text-left">Sex</th>
                  <th className="border p-2 text-left">Relation</th>
                  <th className="border p-2 text-left">Marital Status</th>
                  <th className="border p-2 text-left">Occupation</th>
                  <th className="border p-2 text-left">Income/Month</th>
                  <th className="border p-2 text-left">Chronic Disease</th>
                  <th className="border p-2 text-left">Compliance</th>
                  <th className="border p-2 text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {familyComposition.map((member) => (
                  <tr key={member.id}>
                    <td className="border p-2">
                      <Input
                        value={member.type}
                        onChange={(e) =>
                          updateFamilyMember(member.id, "type", e.target.value)
                        }
                        placeholder="e.g., Adult"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        value={member.name}
                        onChange={(e) =>
                          updateFamilyMember(member.id, "name", e.target.value)
                        }
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        value={member.age}
                        onChange={(e) =>
                          updateFamilyMember(member.id, "age", e.target.value)
                        }
                        type="number"
                      />
                    </td>
                    <td className="border p-2">
                      <Select
                        value={member.sex}
                        onValueChange={(value) =>
                          updateFamilyMember(member.id, "sex", value)
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="M">Male</SelectItem>
                          <SelectItem value="F">Female</SelectItem>
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="border p-2">
                      <Input
                        value={member.relation}
                        onChange={(e) =>
                          updateFamilyMember(
                            member.id,
                            "relation",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                    <td className="border p-2">
                      <Select
                        value={member.maritalStatus}
                        onValueChange={(value) =>
                          updateFamilyMember(member.id, "maritalStatus", value)
                        }
                      >
                        <SelectTrigger>
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
                    <td className="border p-2">
                      <Input
                        value={member.occupation}
                        onChange={(e) =>
                          updateFamilyMember(
                            member.id,
                            "occupation",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        value={member.income}
                        onChange={(e) =>
                          updateFamilyMember(
                            member.id,
                            "income",
                            e.target.value,
                          )
                        }
                        type="number"
                      />
                    </td>
                    <td className="border p-2">
                      <Input
                        value={member.chronicDisease}
                        onChange={(e) =>
                          updateFamilyMember(
                            member.id,
                            "chronicDisease",
                            e.target.value,
                          )
                        }
                      />
                    </td>
                    <td className="border p-2">
                      <Select
                        value={member.treatmentCompliance}
                        onValueChange={(value) =>
                          updateFamilyMember(
                            member.id,
                            "treatmentCompliance",
                            value,
                          )
                        }
                      >
                        <SelectTrigger>
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
                    <td className="border p-2">
                      <Button
                        onClick={() => removeFamilyMember(member.id)}
                        size="sm"
                        variant="destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Patient Disease Summary */}
      <Card className="border-l-4 border-l-purple-500">
        <CardHeader className="bg-purple-50">
          <CardTitle className="flex items-center gap-2 text-purple-700">
            <Activity className="w-5 h-5" />
            🟪 Patient Disease Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="disease">Disease</Label>
              <Input
                id="disease"
                value={formData.disease}
                onChange={(e) => updateFormData("disease", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="treatmentCompliance">
                Present Treatment Compliance
              </Label>
              <Select
                value={formData.treatmentCompliance}
                onValueChange={(value) =>
                  updateFormData("treatmentCompliance", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Good">Good</SelectItem>
                  <SelectItem value="Fair">Fair</SelectItem>
                  <SelectItem value="Poor">Poor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="diseaseSummary">Disease Summary</Label>
              <Textarea
                id="diseaseSummary"
                value={formData.diseaseSummary}
                onChange={(e) =>
                  updateFormData("diseaseSummary", e.target.value)
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="symptoms">Symptom of Disease</Label>
              <Textarea
                id="symptoms"
                value={formData.symptoms}
                onChange={(e) => updateFormData("symptoms", e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="currentMedication">
                Current Medication with Dose
              </Label>
              <Textarea
                id="currentMedication"
                value={formData.currentMedication}
                onChange={(e) =>
                  updateFormData("currentMedication", e.target.value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Patient Personal Info */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="bg-red-50">
          <CardTitle className="flex items-center gap-2 text-red-700">
            <User className="w-5 h-5" />
            🟥 Patient Personal Info
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                value={formData.mobile}
                onChange={(e) => updateFormData("mobile", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="height">Height (in cm)</Label>
              <Input
                id="height"
                type="number"
                value={formData.height}
                onChange={(e) => updateFormData("height", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="weight">Weight (in kg)</Label>
              <Input
                id="weight"
                type="number"
                value={formData.weight}
                onChange={(e) => updateFormData("weight", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bmi">BMI</Label>
              <Input
                id="bmi"
                value={formData.bmi}
                onChange={(e) => updateFormData("bmi", e.target.value)}
                readOnly
              />
            </div>
            <div>
              <Label htmlFor="education">Education Level</Label>
              <Select
                value={formData.education}
                onValueChange={(value) => updateFormData("education", value)}
              >
                <SelectTrigger>
                  <SelectValue />
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
            <div>
              <Label htmlFor="occupation">Occupation</Label>
              <Input
                id="occupation"
                value={formData.occupation}
                onChange={(e) => updateFormData("occupation", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="maritalStatus">Marital Status</Label>
              <Select
                value={formData.maritalStatus}
                onValueChange={(value) =>
                  updateFormData("maritalStatus", value)
                }
              >
                <SelectTrigger>
                  <SelectValue />
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

      {/* Lifestyle & History */}
      <Card className="border-l-4 border-l-orange-500">
        <CardHeader className="bg-orange-50">
          <CardTitle className="flex items-center gap-2 text-orange-700">
            <Activity className="w-5 h-5" />
            🟧 Lifestyle & History
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="tobacco"
                checked={formData.tobacco}
                onCheckedChange={(checked) =>
                  updateFormData("tobacco", checked)
                }
              />
              <Label htmlFor="tobacco">Taking tobacco from last 1 year?</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="alcohol"
                checked={formData.alcohol}
                onCheckedChange={(checked) =>
                  updateFormData("alcohol", checked)
                }
              />
              <Label htmlFor="alcohol">Taking alcohol from last 1 year?</Label>
            </div>
            <div>
              <Label htmlFor="drugAddiction">Any other drug addiction?</Label>
              <Input
                id="drugAddiction"
                value={formData.drugAddiction}
                onChange={(e) =>
                  updateFormData("drugAddiction", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="familyHistory">
                Family History of Chronic Disease?
              </Label>
              <Input
                id="familyHistory"
                value={formData.familyHistory}
                onChange={(e) =>
                  updateFormData("familyHistory", e.target.value)
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="otherChronicDiseases">
                Any other chronic disease
              </Label>
              <Textarea
                id="otherChronicDiseases"
                value={formData.otherChronicDiseases}
                onChange={(e) =>
                  updateFormData("otherChronicDiseases", e.target.value)
                }
              />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="hospitalHistory">
                Past hospital admission (medical/surgical) history
              </Label>
              <Textarea
                id="hospitalHistory"
                value={formData.hospitalHistory}
                onChange={(e) =>
                  updateFormData("hospitalHistory", e.target.value)
                }
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investigation */}
      <Card className="border-l-4 border-l-yellow-500">
        <CardHeader className="bg-yellow-50">
          <CardTitle className="flex items-center gap-2 text-yellow-700">
            <FileText className="w-5 h-5" />
            🟨 Investigation
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="systolicBP">Systolic Blood Pressure</Label>
              <Input
                id="systolicBP"
                type="number"
                value={formData.systolicBP}
                onChange={(e) => updateFormData("systolicBP", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="diastolicBP">Diastolic Blood Pressure</Label>
              <Input
                id="diastolicBP"
                type="number"
                value={formData.diastolicBP}
                onChange={(e) => updateFormData("diastolicBP", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bpDate">BP Date</Label>
              <Input
                id="bpDate"
                type="date"
                value={formData.bpDate}
                onChange={(e) => updateFormData("bpDate", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="bloodSugarRBS">Blood Sugar (RBS)</Label>
              <Input
                id="bloodSugarRBS"
                type="number"
                value={formData.bloodSugarRBS}
                onChange={(e) =>
                  updateFormData("bloodSugarRBS", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="bloodSugarFBS">Blood Sugar (FBS)</Label>
              <Input
                id="bloodSugarFBS"
                type="number"
                value={formData.bloodSugarFBS}
                onChange={(e) =>
                  updateFormData("bloodSugarFBS", e.target.value)
                }
              />
            </div>
            <div>
              <Label htmlFor="bloodSugarPP">Blood Sugar (PP)</Label>
              <Input
                id="bloodSugarPP"
                type="number"
                value={formData.bloodSugarPP}
                onChange={(e) => updateFormData("bloodSugarPP", e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="border-l-4 border-l-gray-500">
        <CardHeader className="bg-gray-50">
          <CardTitle className="flex items-center gap-2 text-gray-700">
            <FileText className="w-5 h-5" />
            📄 Documents
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-6 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Documents
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              View Files
            </Button>
            <Button onClick={handlePrint} className="flex items-center gap-2">
              <Printer className="w-4 h-4" />
              Print this page
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Save Actions */}
      <div className="flex justify-end gap-4 pt-6">
        <Button variant="outline" size="lg">
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          size="lg"
          className="flex items-center gap-2"
        >
          <Save className="w-4 h-4" />
          Save Patient Information
        </Button>
      </div>
    </div>
  );
}
