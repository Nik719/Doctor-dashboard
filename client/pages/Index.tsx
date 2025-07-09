import { Sidebar } from "@/components/Sidebar";
import { PatientForm } from "@/components/PatientForm";

export default function Index() {
  return (
    <div className="flex h-screen bg-background">
      <Sidebar />
      <main className="flex-1 overflow-auto lg:ml-0">
        <div className="p-6 lg:p-8 pt-16 lg:pt-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-foreground">
                Patient Information Form
              </h1>
              <p className="text-muted-foreground mt-2">
                Complete patient health information management system
              </p>
            </div>

            <PatientForm />
          </div>
        </div>
      </main>
    </div>
  );
}
