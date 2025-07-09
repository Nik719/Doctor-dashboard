import React, { createContext, useContext, useState, ReactNode } from "react";

export interface PatientData {
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

  // Family Composition
  familyComposition: FamilyMember[];

  // Metadata
  createdAt: string;
  status: "active" | "follow-up" | "completed";
}

export interface FamilyMember {
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

interface PatientContextType {
  patients: PatientData[];
  addPatient: (patient: PatientData) => void;
  updatePatient: (patientId: string, patient: PatientData) => void;
  deletePatient: (patientId: string) => void;
  getPatient: (patientId: string) => PatientData | undefined;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: ReactNode }) {
  const [patients, setPatients] = useState<PatientData[]>([]);

  const addPatient = (patient: PatientData) => {
    setPatients((prev) => [...prev, patient]);
  };

  const updatePatient = (patientId: string, updatedPatient: PatientData) => {
    setPatients((prev) =>
      prev.map((patient) =>
        patient.patientId === patientId ? updatedPatient : patient,
      ),
    );
  };

  const deletePatient = (patientId: string) => {
    setPatients((prev) =>
      prev.filter((patient) => patient.patientId !== patientId),
    );
  };

  const getPatient = (patientId: string) => {
    return patients.find((patient) => patient.patientId === patientId);
  };

  return (
    <PatientContext.Provider
      value={{ patients, addPatient, updatePatient, deletePatient, getPatient }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatients() {
  const context = useContext(PatientContext);
  if (context === undefined) {
    throw new Error("usePatients must be used within a PatientProvider");
  }
  return context;
}
