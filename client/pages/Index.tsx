import { Sidebar } from "@/components/Sidebar";
import { PatientForm } from "@/components/PatientForm";

export default function Index() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden lg:ml-0">
        <div className="pt-14 lg:pt-0 flex flex-col flex-1 overflow-hidden">
          <PatientForm />
        </div>
      </main>
    </div>
  );
}
