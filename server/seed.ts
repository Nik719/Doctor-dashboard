import "dotenv/config";
import mongoose from "mongoose";
import { PatientModel } from "./models/Patient";

const DOCTORS = [
  { id: "DR001", name: "Dr. Rajesh Kumar", specialty: "General Physician" },
  { id: "DR002", name: "Dr. Priya Sharma", specialty: "Cardiologist" },
  { id: "DR003", name: "Dr. Amit Singh", specialty: "Diabetologist" },
  { id: "DR004", name: "Dr. Sunita Patel", specialty: "Internal Medicine" },
  { id: "DR005", name: "Dr. Vikram Rao", specialty: "Pulmonologist" },
];

const maleNames = ["Rajesh","Suresh","Mohan","Ravi","Vinod","Arun","Deepak","Sanjay","Vijay","Ashok","Ramesh","Mukesh","Naresh","Mahesh","Harish"];
const femaleNames = ["Sunita","Geeta","Anita","Kavita","Savita","Rekha","Usha","Asha","Nisha","Meena","Reena","Neena","Sheela","Sudha","Suman"];
const surnames = ["Kumar","Singh","Sharma","Patel","Yadav","Gupta","Mishra","Tiwari","Verma","Chauhan","Joshi","Pandey","Dubey","Srivastava","Agarwal"];

const locations = [
  { state: "Bihar", district: "Patna", block: "Phulwari", village: "Rampur", panchayat: "Rampur GP", pinCode: "800001" },
  { state: "Bihar", district: "Gaya", block: "Bodhgaya", village: "Sujata Nagar", panchayat: "Sujata GP", pinCode: "823001" },
  { state: "Bihar", district: "Muzaffarpur", block: "Mushari", village: "Harpur", panchayat: "Harpur GP", pinCode: "842001" },
  { state: "Uttar Pradesh", district: "Lucknow", block: "Malihabad", village: "Kharika", panchayat: "Kharika GP", pinCode: "226001" },
  { state: "Uttar Pradesh", district: "Varanasi", block: "Pindra", village: "Gosainganj", panchayat: "Gosainganj GP", pinCode: "221001" },
  { state: "Rajasthan", district: "Jaipur", block: "Amber", village: "Kanota", panchayat: "Kanota GP", pinCode: "302001" },
  { state: "Maharashtra", district: "Nagpur", block: "Kamptee", village: "Butibori", panchayat: "Butibori GP", pinCode: "440001" },
  { state: "Madhya Pradesh", district: "Bhopal", block: "Berasia", village: "Mandideep", panchayat: "Mandideep GP", pinCode: "462001" },
];

const diseases = [
  { name: "Hypertension", symptoms: "Headache, dizziness, palpitations", medication: "Amlodipine 5mg OD, Enalapril 10mg BD" },
  { name: "Type 2 Diabetes", symptoms: "Polyuria, polydipsia, fatigue", medication: "Metformin 500mg BD, Glipizide 5mg OD" },
  { name: "Pulmonary Tuberculosis", symptoms: "Cough >2 weeks, night sweats, weight loss", medication: "HRZE daily (Isoniazid+Rifampicin+Pyrazinamide+Ethambutol)" },
  { name: "Bronchial Asthma", symptoms: "Wheezing, shortness of breath, chest tightness", medication: "Salbutamol inhaler PRN, Budesonide inhaler BD" },
  { name: "Coronary Artery Disease", symptoms: "Chest pain, exertional dyspnea, palpitations", medication: "Aspirin 75mg OD, Atorvastatin 40mg HS, Metoprolol 25mg BD" },
  { name: "Iron Deficiency Anemia", symptoms: "Fatigue, pallor, shortness of breath, dizziness", medication: "Ferrous sulphate 200mg BD, Vitamin C 500mg OD" },
  { name: "Hypothyroidism", symptoms: "Fatigue, weight gain, cold intolerance, constipation", medication: "Levothyroxine 50mcg OD before breakfast" },
  { name: "Chronic Kidney Disease", symptoms: "Fatigue, edema, reduced urine output, nausea", medication: "Amlodipine 5mg OD, Erythropoietin 4000IU weekly" },
  { name: "COPD", symptoms: "Chronic cough, sputum production, dyspnea", medication: "Tiotropium 18mcg OD, Salbutamol 100mcg PRN" },
  { name: "Epilepsy", symptoms: "Recurrent seizures, loss of consciousness, confusion", medication: "Phenytoin 200mg BD, Valproate 500mg BD" },
];

const educationLevels = ["Illiterate","Primary School","Middle School","High School","Intermediate","Graduate"];
const occupations = ["Farmer","Daily Wage Labourer","Housewife","Teacher","Small Shopkeeper","Auto Driver","Construction Worker"];
const castes = ["General","OBC","SC","ST"];
const religions = ["Hindu","Muslim","Christian","Sikh"];
const rationCards = ["BPL","APL","Antyodaya","None"];
const medSystems = ["Allopath","Ayurvedic","Homeopathic"];
const complianceOptions = ["Good","Fair","Poor"];
const familyTypes = ["Nuclear","Joint"];
const maritalStatuses = ["Married","Unmarried","Widowed","Divorced"];
const statuses = ["active","active","active","follow-up","completed"];

function pick<T>(arr: T[]): T { return arr[Math.floor(Math.random() * arr.length)]; }
function rnd(min: number, max: number) { return Math.floor(Math.random() * (max - min + 1)) + min; }
function date(daysBack: number) {
  const d = new Date("2026-06-10");
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  return d.toISOString().split("T")[0];
}

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI not set in .env");

  await mongoose.connect(uri);
  console.log("✅ Connected to MongoDB");

  // Remove existing seeded patients to avoid duplicates
  await (PatientModel as any).deleteMany({ patientId: /^SEED/ });
  console.log("🧹 Cleared previous seed patients");

  const patients = Array.from({ length: 30 }, (_, i) => {
    const isFemale = i % 3 === 0;
    const firstName = isFemale ? pick(femaleNames) : pick(maleNames);
    const lastName = pick(surnames);
    const loc = pick(locations);
    const disease = pick(diseases);
    const doctor = pick(DOCTORS);
    const height = rnd(150, 185);
    const weight = rnd(45, 95);
    const bmi = (weight / ((height / 100) ** 2)).toFixed(1);

    return {
      patientId: `SEED${String(i + 1).padStart(3, "0")}`,
      patientName: `${firstName} ${lastName}`,
      headOfFamily: `${pick(maleNames)} ${lastName}`,
      country: "India",
      state: loc.state,
      district: loc.district,
      block: loc.block,
      village: loc.village,
      location: pick(["Rural", "Urban"]),
      panchayat: loc.panchayat,
      wardNo: String(rnd(1, 20)),
      pinCode: loc.pinCode,
      mobile: `9${rnd(100000000, 999999999)}`,
      height: String(height),
      weight: String(weight),
      bmi,
      education: pick(educationLevels),
      occupation: pick(occupations),
      maritalStatus: pick(maritalStatuses),
      religion: pick(religions),
      caste: pick(castes),
      rationCardType: pick(rationCards),
      ayushmanCard: Math.random() > 0.5,
      familyMembers: String(rnd(2, 8)),
      familyIncome: String(rnd(5000, 40000)),
      familyType: pick(familyTypes),
      minorIllnessLocation: pick(["Local PHC","Private Clinic","ASHA Worker","Sub-centre"]),
      majorIllnessLocation: pick(["District Hospital","Medical College","Private Hospital"]),
      systemOfMedicine: pick(medSystems),
      disease: disease.name,
      diseaseSummary: `Patient diagnosed with ${disease.name}. Condition is ${pick(["stable","improving","requiring close follow-up"])}.`,
      symptoms: disease.symptoms,
      treatmentCompliance: pick(complianceOptions),
      currentMedication: disease.medication,
      tobacco: Math.random() > 0.65,
      alcohol: Math.random() > 0.75,
      drugAddiction: "None",
      familyHistory: pick(["Diabetes","Hypertension","Tuberculosis","None","Heart Disease"]),
      otherChronicDiseases: pick(["None","Hypertension","Diabetes","Arthritis"]),
      hospitalHistory: Math.random() > 0.5
        ? `Admitted for ${disease.name} in ${rnd(2020, 2025)}`
        : "No previous admissions",
      systolicBP: String(rnd(100, 160)),
      diastolicBP: String(rnd(65, 100)),
      bpDate: date(90),
      bloodSugarRBS: String(rnd(90, 280)),
      bloodSugarFBS: String(rnd(80, 200)),
      bloodSugarPP: String(rnd(100, 280)),
      assignedDoctor: doctor.name,
      doctorId: doctor.id,
      familyComposition: [],
      createdAt: date(180),
      status: pick(statuses),
    };
  });

  await (PatientModel as any).insertMany(patients, { ordered: false });
  console.log(`✅ Inserted 30 patients into MongoDB`);

  const total = await (PatientModel as any).countDocuments();
  console.log(`📊 Total patients in DB: ${total}`);

  await mongoose.disconnect();
  console.log("🔌 Disconnected");
}

seed().catch((err) => { console.error("❌", err.message); process.exit(1); });
