import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  ClipboardList,
  Users,
  Plus,
  Search,
  Wifi,
  WifiOff,
  Mic,
  MicOff,
  RefreshCw,
  AlertCircle,
  CheckCircle2,
  Clock,
  MapPin,
  User,
  Calendar,
  Activity,
  FileText,
  Stethoscope,
  Baby,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  village: string;
  lastVisit: Date;
  status: "healthy" | "follow-up" | "urgent";
  syncStatus: "synced" | "pending" | "error";
  conditions: string[];
}

const mockPatients: Patient[] = [
  {
    id: "1",
    name: "Lakshmi Devi",
    age: 28,
    gender: "Female",
    village: "Rampur",
    lastVisit: new Date("2024-01-15"),
    status: "follow-up",
    syncStatus: "synced",
    conditions: ["Pregnancy - 7 months", "Anemia"],
  },
  {
    id: "2",
    name: "Raj Kumar",
    age: 45,
    gender: "Male",
    village: "Sundarpur",
    lastVisit: new Date("2024-01-14"),
    status: "urgent",
    syncStatus: "pending",
    conditions: ["Diabetes Type 2", "Hypertension"],
  },
  {
    id: "3",
    name: "Anita Kumari",
    age: 32,
    gender: "Female",
    village: "Rampur",
    lastVisit: new Date("2024-01-13"),
    status: "healthy",
    syncStatus: "synced",
    conditions: ["Postpartum care"],
  },
  {
    id: "4",
    name: "Suresh Yadav",
    age: 55,
    gender: "Male",
    village: "Chandpur",
    lastVisit: new Date("2024-01-12"),
    status: "follow-up",
    syncStatus: "error",
    conditions: ["Tuberculosis treatment"],
  },
];

const quickActions = [
  { icon: Baby, label: "New Birth", color: "bg-health-success-light text-health-success" },
  { icon: Heart, label: "ANC Visit", color: "bg-health-coral-light text-health-coral" },
  { icon: Stethoscope, label: "Health Check", color: "bg-health-teal-light text-health-teal" },
  { icon: Activity, label: "Immunization", color: "bg-health-indigo-light text-health-indigo" },
];

const statusConfig = {
  healthy: { label: "Healthy", color: "bg-health-success-light text-health-success", icon: CheckCircle2 },
  "follow-up": { label: "Follow-up", color: "bg-health-amber-light text-health-amber", icon: Clock },
  urgent: { label: "Urgent", color: "bg-destructive/10 text-destructive", icon: AlertCircle },
};

const syncConfig = {
  synced: { label: "Synced", color: "text-health-success" },
  pending: { label: "Pending", color: "text-health-amber" },
  error: { label: "Sync Error", color: "text-destructive" },
};

export default function AshaEHR() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isRecording, setIsRecording] = useState(false);
  const [pendingSync, setPendingSync] = useState(3);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filteredPatients = mockPatients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.village.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-health-success-light text-health-success text-sm font-medium mb-2">
                <ClipboardList className="h-4 w-4" />
                ASHA EHR Companion
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                Patient Records
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage community health records offline
              </p>
            </div>

            {/* Status Indicators */}
            <div className="flex flex-wrap gap-3">
              {/* Connection Status */}
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium",
                  isOnline
                    ? "bg-health-success-light text-health-success"
                    : "bg-health-amber-light text-health-amber"
                )}
              >
                {isOnline ? (
                  <>
                    <Wifi className="h-4 w-4" />
                    Online
                  </>
                ) : (
                  <>
                    <WifiOff className="h-4 w-4" />
                    Offline Mode
                  </>
                )}
              </div>

              {/* Sync Status */}
              {pendingSync > 0 && (
                <button className="flex items-center gap-2 px-4 py-2 rounded-full bg-health-amber-light text-health-amber text-sm font-medium hover:bg-health-amber/20 transition-colors">
                  <RefreshCw className="h-4 w-4" />
                  {pendingSync} pending sync
                </button>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {quickActions.map((action) => (
              <button
                key={action.label}
                className={cn(
                  "flex items-center gap-3 p-4 rounded-xl transition-all hover:scale-[1.02]",
                  action.color
                )}
              >
                <action.icon className="h-6 w-6" />
                <span className="font-medium">{action.label}</span>
              </button>
            ))}
          </div>

          {/* Search and Add */}
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search patients by name or village..."
                className="health-input pl-10 w-full"
              />
            </div>
            <Button
              variant={isRecording ? "destructive" : "outline"}
              size="icon"
              onClick={() => setIsRecording(!isRecording)}
              className="shrink-0"
            >
              {isRecording ? (
                <MicOff className="h-4 w-4" />
              ) : (
                <Mic className="h-4 w-4" />
              )}
            </Button>
            <Button variant="asha" className="shrink-0">
              <Plus className="h-4 w-4 mr-2" />
              Add Patient
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Patient List */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">
                Recent Patients ({filteredPatients.length})
              </h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                {mockPatients.length} total
              </div>
            </div>

            <div className="space-y-3">
              {filteredPatients.map((patient) => {
                const statusInfo = statusConfig[patient.status];
                const syncInfo = syncConfig[patient.syncStatus];

                return (
                  <div
                    key={patient.id}
                    onClick={() => setSelectedPatient(patient)}
                    className={cn(
                      "health-card p-4 cursor-pointer transition-all",
                      selectedPatient?.id === patient.id && "ring-2 ring-primary"
                    )}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-4">
                        <div className="h-12 w-12 rounded-full gradient-asha flex items-center justify-center shrink-0">
                          <User className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-foreground">
                              {patient.name}
                            </h3>
                            <span
                              className={cn(
                                "health-badge",
                                statusInfo.color
                              )}
                            >
                              <statusInfo.icon className="h-3 w-3" />
                              {statusInfo.label}
                            </span>
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                            <span>{patient.age} yrs, {patient.gender}</span>
                            <span className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {patient.village}
                            </span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-3 w-3" />
                              {patient.lastVisit.toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {patient.conditions.map((condition, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 rounded-md bg-muted text-xs text-muted-foreground"
                              >
                                {condition}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className={cn("text-xs font-medium", syncInfo.color)}>
                        {syncInfo.label}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sidebar / Patient Details */}
          <div className="space-y-6">
            {selectedPatient ? (
              <div className="health-card p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-foreground">
                    Patient Details
                  </h2>
                  <Button variant="ghost" size="sm" onClick={() => setSelectedPatient(null)}>
                    Close
                  </Button>
                </div>

                <div className="text-center mb-6">
                  <div className="h-20 w-20 rounded-full gradient-asha flex items-center justify-center mx-auto mb-3">
                    <User className="h-10 w-10 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">
                    {selectedPatient.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {selectedPatient.age} years, {selectedPatient.gender}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Village</span>
                    <span className="text-sm font-medium">{selectedPatient.village}</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Last Visit</span>
                    <span className="text-sm font-medium">
                      {selectedPatient.lastVisit.toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <span
                      className={cn(
                        "health-badge",
                        statusConfig[selectedPatient.status].color
                      )}
                    >
                      {statusConfig[selectedPatient.status].label}
                    </span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button variant="asha" className="w-full">
                    <FileText className="h-4 w-4 mr-2" />
                    View Full Record
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Activity className="h-4 w-4 mr-2" />
                    Add Visit Note
                  </Button>
                </div>
              </div>
            ) : (
              <>
                {/* Stats */}
                <div className="health-card p-6">
                  <h3 className="font-semibold text-foreground mb-4">Today's Summary</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-lg bg-health-teal-light">
                      <p className="text-2xl font-bold text-health-teal">12</p>
                      <p className="text-xs text-muted-foreground">Visits Today</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-health-coral-light">
                      <p className="text-2xl font-bold text-health-coral">3</p>
                      <p className="text-xs text-muted-foreground">Follow-ups</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-health-indigo-light">
                      <p className="text-2xl font-bold text-health-indigo">5</p>
                      <p className="text-xs text-muted-foreground">ANC Visits</p>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-health-success-light">
                      <p className="text-2xl font-bold text-health-success">2</p>
                      <p className="text-xs text-muted-foreground">Immunizations</p>
                    </div>
                  </div>
                </div>

                {/* AI Diagnostics */}
                <div className="health-card p-6 border-l-4 border-l-health-indigo">
                  <div className="flex items-center gap-2 mb-3">
                    <Stethoscope className="h-5 w-5 text-health-indigo" />
                    <h3 className="font-semibold text-foreground">AI Diagnostics</h3>
                  </div>
                  <p className="text-sm text-muted-foreground mb-4">
                    Get AI-assisted diagnostic suggestions for common conditions.
                  </p>
                  <Button variant="indigo" className="w-full">
                    Start AI Assessment
                  </Button>
                </div>

                {/* Offline Storage */}
                <div className="health-card p-6 bg-muted/50">
                  <div className="flex items-center gap-2 mb-3">
                    <WifiOff className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-semibold text-foreground">Offline Storage</h3>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Records stored</span>
                      <span className="font-medium">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Storage used</span>
                      <span className="font-medium">24.3 MB</span>
                    </div>
                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden mt-2">
                      <div className="h-full w-1/4 bg-health-teal rounded-full" />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      75% storage available
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
