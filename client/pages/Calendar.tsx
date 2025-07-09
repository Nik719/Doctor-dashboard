import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Clock,
  User,
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { cn } from "@/lib/utils";

type ViewType = "year" | "month" | "day";

interface Appointment {
  id: string;
  patientName: string;
  patientId: string;
  time: string;
  duration: number; // in minutes
  type: "consultation" | "follow-up" | "emergency";
  status: "scheduled" | "confirmed" | "completed" | "cancelled";
  phone: string;
  address: string;
  notes?: string;
}

// Sample appointment data
const appointments: Record<string, Appointment[]> = {
  "2024-01-15": [
    {
      id: "1",
      patientName: "Mohan Ram",
      patientId: "109590",
      time: "09:00",
      duration: 30,
      type: "follow-up",
      status: "confirmed",
      phone: "+91 98765 43210",
      address: "Gora Bazar, Danapur, Patna",
      notes: "HTN follow-up, check BP levels",
    },
    {
      id: "2",
      patientName: "Sunita Devi",
      patientId: "109591",
      time: "10:30",
      duration: 45,
      type: "consultation",
      status: "scheduled",
      phone: "+91 98765 43211",
      address: "Gora Bazar, Danapur, Patna",
    },
    {
      id: "3",
      patientName: "Rajesh Kumar",
      patientId: "109592",
      time: "14:00",
      duration: 30,
      type: "follow-up",
      status: "confirmed",
      phone: "+91 98765 43212",
      address: "Gora Bazar, Danapur, Patna",
    },
  ],
  "2024-01-16": [
    {
      id: "4",
      patientName: "Priya Kumari",
      patientId: "109593",
      time: "09:30",
      duration: 30,
      type: "consultation",
      status: "scheduled",
      phone: "+91 98765 43213",
      address: "Gora Bazar, Danapur, Patna",
    },
  ],
  "2024-01-22": [
    {
      id: "5",
      patientName: "Amit Kumar",
      patientId: "109594",
      time: "11:00",
      duration: 30,
      type: "emergency",
      status: "confirmed",
      phone: "+91 98765 43214",
      address: "Gora Bazar, Danapur, Patna",
    },
  ],
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function Calendar() {
  const [currentView, setCurrentView] = useState<ViewType>("month");
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const formatDateKey = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getAppointmentsForDate = (date: Date) => {
    const dateKey = formatDateKey(date);
    return appointments[dateKey] || [];
  };

  const getTotalAppointmentsInMonth = (year: number, month: number) => {
    let total = 0;
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      total += getAppointmentsForDate(date).length;
    }
    return total;
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-green-100 text-green-800";
      case "scheduled":
        return "bg-blue-100 text-blue-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "emergency":
        return "bg-red-500";
      case "consultation":
        return "bg-blue-500";
      case "follow-up":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + (direction === "next" ? 1 : -1),
        1,
      ),
    );
  };

  const navigateYear = (direction: "prev" | "next") => {
    setCurrentDate(
      new Date(
        currentDate.getFullYear() + (direction === "next" ? 1 : -1),
        currentDate.getMonth(),
        1,
      ),
    );
  };

  const renderYearView = () => {
    const year = currentDate.getFullYear();
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {months.map((month, index) => {
          const appointmentCount = getTotalAppointmentsInMonth(year, index);
          return (
            <Card
              key={month}
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => {
                setCurrentDate(new Date(year, index, 1));
                setCurrentView("month");
              }}
            >
              <CardContent className="p-4">
                <div className="text-center">
                  <h3 className="font-semibold text-lg mb-2">{month}</h3>
                  <div className="text-2xl font-bold text-primary mb-1">
                    {appointmentCount}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {appointmentCount === 1 ? "appointment" : "appointments"}
                  </p>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    );
  };

  const renderMonthView = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    const currentDateObj = new Date(startDate);

    for (let i = 0; i < 42; i++) {
      days.push(new Date(currentDateObj));
      currentDateObj.setDate(currentDateObj.getDate() + 1);
    }

    return (
      <div>
        <div className="grid grid-cols-7 gap-1 mb-4">
          {daysOfWeek.map((day) => (
            <div
              key={day}
              className="p-2 text-center text-sm font-medium text-muted-foreground"
            >
              {day}
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {days.map((day, index) => {
            const isCurrentMonth = day.getMonth() === month;
            const isToday = day.toDateString() === new Date().toDateString();
            const dayAppointments = getAppointmentsForDate(day);

            return (
              <div
                key={index}
                className={cn(
                  "min-h-[100px] p-2 border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors",
                  isCurrentMonth ? "bg-white" : "bg-muted/20",
                  isToday && "ring-2 ring-primary",
                )}
                onClick={() => {
                  setSelectedDate(day);
                  setCurrentView("day");
                }}
              >
                <div
                  className={cn(
                    "text-sm font-medium mb-1",
                    isCurrentMonth
                      ? "text-foreground"
                      : "text-muted-foreground",
                    isToday && "text-primary font-bold",
                  )}
                >
                  {day.getDate()}
                </div>
                <div className="space-y-1">
                  {dayAppointments.slice(0, 3).map((appointment) => (
                    <div
                      key={appointment.id}
                      className={cn(
                        "w-2 h-2 rounded-full",
                        getTypeColor(appointment.type),
                      )}
                      title={`${appointment.time} - ${appointment.patientName}`}
                    />
                  ))}
                  {dayAppointments.length > 3 && (
                    <div className="text-xs text-muted-foreground">
                      +{dayAppointments.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderDayView = () => {
    if (!selectedDate) return null;

    const dayAppointments = getAppointmentsForDate(selectedDate);
    const sortedAppointments = dayAppointments.sort((a, b) =>
      a.time.localeCompare(b.time),
    );

    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold">
            {selectedDate.toLocaleDateString("en-US", {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          <Button size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Appointment
          </Button>
        </div>

        {sortedAppointments.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <CalendarIcon className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                No appointments scheduled for this day
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sortedAppointments.map((appointment) => (
              <Card key={appointment.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <div
                          className={cn(
                            "w-3 h-3 rounded-full",
                            getTypeColor(appointment.type),
                          )}
                        />
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground" />
                          <span className="font-semibold">
                            {appointment.time}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            ({appointment.duration} min)
                          </span>
                        </div>
                        <Badge className={getStatusColor(appointment.status)}>
                          {appointment.status}
                        </Badge>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium">
                            {appointment.patientName}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            (ID: {appointment.patientId})
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="w-4 h-4" />
                          {appointment.phone}
                        </div>

                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4" />
                          {appointment.address}
                        </div>

                        {appointment.notes && (
                          <div className="flex items-start gap-2 text-sm">
                            <AlertCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                            <span className="text-muted-foreground">
                              {appointment.notes}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        Reschedule
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    );
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
                    Calendar & Appointments
                  </h1>
                  <p className="text-muted-foreground mt-2">
                    Manage patient appointments and schedule
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant={currentView === "year" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentView("year")}
                  >
                    Year
                  </Button>
                  <Button
                    variant={currentView === "month" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentView("month")}
                  >
                    Month
                  </Button>
                  {selectedDate && (
                    <Button
                      variant={currentView === "day" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCurrentView("day")}
                    >
                      Day
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <Card>
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CalendarIcon className="w-5 h-5 text-primary" />
                    {currentView === "year" && currentDate.getFullYear()}
                    {currentView === "month" &&
                      `${months[currentDate.getMonth()]} ${currentDate.getFullYear()}`}
                    {currentView === "day" &&
                      selectedDate?.toLocaleDateString("en-US", {
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                  </CardTitle>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        currentView === "year"
                          ? navigateYear("prev")
                          : navigateMonth("prev")
                      }
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentDate(new Date())}
                    >
                      Today
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        currentView === "year"
                          ? navigateYear("next")
                          : navigateMonth("next")
                      }
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {currentView === "year" && renderYearView()}
                {currentView === "month" && renderMonthView()}
                {currentView === "day" && renderDayView()}
              </CardContent>
            </Card>

            {/* Legend */}
            {currentView === "month" && (
              <Card className="mt-6">
                <CardContent className="p-4">
                  <h4 className="font-medium mb-3">Appointment Types</h4>
                  <div className="flex flex-wrap gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-sm">Consultation</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-green-500" />
                      <span className="text-sm">Follow-up</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-sm">Emergency</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
