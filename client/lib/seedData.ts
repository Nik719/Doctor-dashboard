import type { PatientData } from "@/context/PatientContext";

export const DOCTORS = [
  { id: "DR001", name: "Dr. Rajesh Kumar", specialty: "General Physician" },
  { id: "DR002", name: "Dr. Priya Sharma", specialty: "Cardiologist" },
  { id: "DR003", name: "Dr. Amit Singh", specialty: "Diabetologist" },
  { id: "DR004", name: "Dr. Sunita Patel", specialty: "Internal Medicine" },
  { id: "DR005", name: "Dr. Vikram Rao", specialty: "Pulmonologist" },
];

const maleNames = [
  "Rajesh", "Suresh", "Mohan", "Ravi", "Vinod", "Arun", "Deepak", "Sanjay",
  "Vijay", "Ashok", "Ramesh", "Mukesh", "Naresh", "Mahesh", "Harish",
  "Girish", "Dinesh", "Umesh", "Kamlesh", "Yogesh", "Rakesh", "Pankaj",
  "Alok", "Shyam", "Gopal", "Santosh", "Ganesh", "Sunil", "Anil", "Kapil",
  "Pramod", "Vivek", "Rohit", "Manoj", "Ajay", "Vikas", "Saurabh", "Abhishek",
  "Ankit", "Rahul",
];

const femaleNames = [
  "Sunita", "Geeta", "Anita", "Kavita", "Savita", "Rekha", "Usha", "Asha",
  "Nisha", "Meena", "Reena", "Neena", "Sheela", "Sudha", "Suman", "Pushpa",
  "Meenakshi", "Sushila", "Shanti", "Kiran", "Mala", "Kamla", "Radha",
  "Meera", "Priya", "Pooja", "Rani", "Lata", "Seema", "Ritu",
];

const surnames = [
  "Kumar", "Singh", "Sharma", "Patel", "Yadav", "Gupta", "Mishra", "Tiwari",
  "Verma", "Chauhan", "Joshi", "Pandey", "Dubey", "Srivastava", "Agarwal",
  "Rawat", "Negi", "Rao", "Reddy", "Patil", "Shah", "Nair", "Pillai",
  "Iyer", "Bhat",
];

const locationData = [
  { state: "Bihar", district: "Patna", block: "Phulwari", village: "Rampur", panchayat: "Rampur GP", pinCode: "800001" },
  { state: "Bihar", district: "Gaya", block: "Bodhgaya", village: "Sujata Nagar", panchayat: "Sujata GP", pinCode: "823001" },
  { state: "Bihar", district: "Muzaffarpur", block: "Mushari", village: "Harpur", panchayat: "Harpur GP", pinCode: "842001" },
  { state: "Bihar", district: "Bhagalpur", block: "Nathnagar", village: "Champa Nagar", panchayat: "Champa GP", pinCode: "812001" },
  { state: "Uttar Pradesh", district: "Lucknow", block: "Malihabad", village: "Kharika", panchayat: "Kharika GP", pinCode: "226001" },
  { state: "Uttar Pradesh", district: "Varanasi", block: "Pindra", village: "Gosainganj", panchayat: "Gosainganj GP", pinCode: "221001" },
  { state: "Uttar Pradesh", district: "Agra", block: "Etmadpur", village: "Shahpur", panchayat: "Shahpur GP", pinCode: "282001" },
  { state: "Uttar Pradesh", district: "Kanpur", block: "Ghatampur", village: "Maitha", panchayat: "Maitha GP", pinCode: "208001" },
  { state: "Rajasthan", district: "Jaipur", block: "Amber", village: "Kanota", panchayat: "Kanota GP", pinCode: "302001" },
  { state: "Rajasthan", district: "Jodhpur", block: "Osian", village: "Balesar", panchayat: "Balesar GP", pinCode: "342001" },
  { state: "Rajasthan", district: "Udaipur", block: "Gogunda", village: "Kerwada", panchayat: "Kerwada GP", pinCode: "313001" },
  { state: "Maharashtra", district: "Nagpur", block: "Kamptee", village: "Butibori", panchayat: "Butibori GP", pinCode: "440001" },
  { state: "Maharashtra", district: "Nashik", block: "Igatpuri", village: "Ghoti", panchayat: "Ghoti GP", pinCode: "422001" },
  { state: "Madhya Pradesh", district: "Bhopal", block: "Berasia", village: "Mandideep", panchayat: "Mandideep GP", pinCode: "462001" },
  { state: "Madhya Pradesh", district: "Indore", block: "Mhow", village: "Hatod", panchayat: "Hatod GP", pinCode: "452001" },
];

const diseases = [
  "Hypertension", "Type 2 Diabetes", "Pulmonary Tuberculosis",
  "Bronchial Asthma", "Rheumatoid Arthritis", "Iron Deficiency Anemia",
  "COPD", "Coronary Artery Disease", "Chronic Kidney Disease",
  "Hypothyroidism", "Dengue Fever", "Malaria", "Typhoid",
  "Peptic Ulcer Disease", "Epilepsy",
];

const symptoms: Record<string, string> = {
  "Hypertension": "Headache, dizziness, palpitations, blurred vision",
  "Type 2 Diabetes": "Polyuria, polydipsia, weight loss, fatigue",
  "Pulmonary Tuberculosis": "Cough >2 weeks, hemoptysis, night sweats, weight loss",
  "Bronchial Asthma": "Wheezing, shortness of breath, chest tightness, cough",
  "Rheumatoid Arthritis": "Joint pain, morning stiffness, swelling, fatigue",
  "Iron Deficiency Anemia": "Fatigue, pallor, shortness of breath, dizziness",
  "COPD": "Chronic cough, sputum production, dyspnea, wheezing",
  "Coronary Artery Disease": "Chest pain, exertional dyspnea, palpitations",
  "Chronic Kidney Disease": "Fatigue, edema, reduced urine output, nausea",
  "Hypothyroidism": "Fatigue, weight gain, cold intolerance, constipation",
  "Dengue Fever": "High fever, severe headache, rash, joint pain",
  "Malaria": "Cyclic fever, chills, sweating, headache",
  "Typhoid": "Sustained fever, abdominal pain, rash, constipation",
  "Peptic Ulcer Disease": "Epigastric pain, nausea, bloating, heartburn",
  "Epilepsy": "Recurrent seizures, loss of consciousness, confusion",
};

const medications: Record<string, string> = {
  "Hypertension": "Amlodipine 5mg OD, Enalapril 10mg BD",
  "Type 2 Diabetes": "Metformin 500mg BD, Glipizide 5mg OD",
  "Pulmonary Tuberculosis": "HRZE (Isoniazid + Rifampicin + Pyrazinamide + Ethambutol) daily",
  "Bronchial Asthma": "Salbutamol inhaler PRN, Budesonide inhaler BD",
  "Rheumatoid Arthritis": "Methotrexate 15mg weekly, Folic acid 5mg weekly",
  "Iron Deficiency Anemia": "Ferrous sulphate 200mg BD, Vitamin C 500mg OD",
  "COPD": "Tiotropium 18mcg OD, Salbutamol 100mcg PRN",
  "Coronary Artery Disease": "Aspirin 75mg OD, Atorvastatin 40mg HS, Metoprolol 25mg BD",
  "Chronic Kidney Disease": "Amlodipine 5mg OD, Erythropoietin 4000IU weekly",
  "Hypothyroidism": "Levothyroxine 50mcg OD before breakfast",
  "Dengue Fever": "Paracetamol 650mg TDS, ORS, IV fluids",
  "Malaria": "Artemether-Lumefantrine (AL) 80/480mg BD for 3 days",
  "Typhoid": "Azithromycin 500mg OD for 7 days",
  "Peptic Ulcer Disease": "Omeprazole 20mg BD, Amoxicillin 1g BD, Clarithromycin 500mg BD",
  "Epilepsy": "Phenytoin 200mg BD, Valproate 500mg BD",
};

const educationLevels = ["Illiterate", "Primary School", "Middle School", "High School", "Intermediate", "Graduate"];
const occupations = ["Farmer", "Daily Wage Labourer", "Housewife", "Teacher", "Small Shopkeeper", "Auto Driver", "Construction Worker", "Weaver", "Fisherman", "Government Employee"];
const castes = ["General", "OBC", "SC", "ST"];
const religions = ["Hindu", "Muslim", "Christian", "Sikh"];
const rationCards = ["BPL", "APL", "Antyodaya", "None"];
const medSystems = ["Allopath", "Ayurvedic", "Homeopathic"];
const treatmentCompliance = ["Good", "Fair", "Poor"];
const familyTypes = ["Nuclear", "Joint"];
const maritalStatuses = ["Married", "Unmarried", "Widowed", "Divorced"];

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function rnd(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateDate(daysBack: number): string {
  const d = new Date();
  d.setDate(d.getDate() - Math.floor(Math.random() * daysBack));
  return d.toISOString().split("T")[0];
}

export function generateSeedPatients(): PatientData[] {
  const patients: PatientData[] = [];

  for (let i = 0; i < 100; i++) {
    const isFemale = i % 3 === 0;
    const firstName = isFemale ? pick(femaleNames) : pick(maleNames);
    const lastName = pick(surnames);
    const patientName = `${firstName} ${lastName}`;
    const headOfFamily = `${pick(maleNames)} ${lastName}`;
    const loc = pick(locationData);
    const disease = pick(diseases);
    const doctor = pick(DOCTORS);
    const height = rnd(150, 185);
    const weight = rnd(45, 95);
    const bmi = (weight / ((height / 100) * (height / 100))).toFixed(1);
    const systolic = rnd(100, 160);
    const diastolic = rnd(65, 100);
    const bloodSugarRBS = rnd(90, 280);
    const status: PatientData["status"] = pick(["active", "active", "follow-up", "completed"]);
    const wardNo = String(rnd(1, 20));
    const familyIncome = String(rnd(5000, 40000));
    const familyMembersCount = String(rnd(2, 8));

    patients.push({
      patientId: `PT${String(i + 1).padStart(3, "0")}`,
      patientName,
      headOfFamily,
      country: "India",
      state: loc.state,
      district: loc.district,
      block: loc.block,
      village: loc.village,
      location: pick(["Rural", "Urban"]),
      panchayat: loc.panchayat,
      wardNo,
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
      familyMembers: familyMembersCount,
      familyIncome,
      familyType: pick(familyTypes),
      minorIllnessLocation: pick(["Local PHC", "Private Clinic", "ASHA Worker", "Sub-centre"]),
      majorIllnessLocation: pick(["District Hospital", "Medical College", "Private Hospital", "AIIMS"]),
      systemOfMedicine: pick(medSystems),
      disease,
      diseaseSummary: `Patient diagnosed with ${disease}. Currently on treatment and under regular monitoring. Condition is ${pick(["stable", "improving", "requiring close follow-up"])}.`,
      symptoms: symptoms[disease] || "Fever, fatigue, general weakness",
      treatmentCompliance: pick(treatmentCompliance),
      currentMedication: medications[disease] || "Tab. Paracetamol 500mg SOS",
      tobacco: Math.random() > 0.65,
      alcohol: Math.random() > 0.75,
      drugAddiction: Math.random() > 0.9 ? "None" : "None",
      familyHistory: pick(["Diabetes", "Hypertension", "Tuberculosis", "None", "Heart Disease", "None", "None"]),
      otherChronicDiseases: Math.random() > 0.6 ? pick(["Hypertension", "Diabetes", "Arthritis", "None"]) : "None",
      hospitalHistory: Math.random() > 0.6 ? `Admitted for ${disease} management in ${rnd(2018, 2024)}` : "No previous admissions",
      systolicBP: String(systolic),
      diastolicBP: String(diastolic),
      bpDate: generateDate(90),
      bloodSugarRBS: String(bloodSugarRBS),
      bloodSugarFBS: String(rnd(80, 200)),
      bloodSugarPP: String(rnd(100, 280)),
      assignedDoctor: doctor.name,
      doctorId: doctor.id,
      familyComposition: [],
      createdAt: generateDate(180),
      status,
    });
  }

  return patients;
}
