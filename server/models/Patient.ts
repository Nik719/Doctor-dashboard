import mongoose, { Schema, Document } from "mongoose";

const FamilyMemberSchema = new Schema(
  {
    id: String,
    type: String,
    name: String,
    age: String,
    sex: String,
    relation: String,
    maritalStatus: String,
    occupation: String,
    income: String,
    chronicDisease: String,
    treatmentCompliance: String,
  },
  { _id: false },
);

const PatientSchema = new Schema(
  {
    patientId: { type: String, required: true, unique: true },
    patientName: { type: String, required: true },
    headOfFamily: String,

    // Address
    country: String,
    state: String,
    district: String,
    block: String,
    village: String,
    location: String,
    panchayat: String,
    wardNo: String,
    pinCode: String,

    // Health behaviour
    minorIllnessLocation: String,
    majorIllnessLocation: String,
    systemOfMedicine: String,
    familyMembers: String,
    familyIncome: String,
    familyType: String,
    religion: String,
    caste: String,
    rationCardType: String,
    ayushmanCard: { type: Boolean, default: false },

    // Disease
    disease: String,
    diseaseSummary: String,
    symptoms: String,
    treatmentCompliance: String,
    currentMedication: String,

    // Personal info
    mobile: String,
    height: String,
    weight: String,
    bmi: String,
    education: String,
    occupation: String,
    maritalStatus: String,

    // Lifestyle
    tobacco: { type: Boolean, default: false },
    alcohol: { type: Boolean, default: false },
    drugAddiction: String,
    familyHistory: String,
    otherChronicDiseases: String,
    hospitalHistory: String,

    // Investigation
    systolicBP: String,
    diastolicBP: String,
    bpDate: String,
    bloodSugarRBS: String,
    bloodSugarFBS: String,
    bloodSugarPP: String,

    // Doctor assignment
    assignedDoctor: String,
    doctorId: String,

    // Family composition
    familyComposition: [FamilyMemberSchema],

    // Metadata
    createdAt: String,
    status: {
      type: String,
      enum: ["active", "follow-up", "completed"],
      default: "active",
    },
  },
  { timestamps: false },
);

export const PatientModel =
  mongoose.models.Patient || mongoose.model("Patient", PatientSchema);
