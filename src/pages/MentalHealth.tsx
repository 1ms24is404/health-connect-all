import { useState } from "react";
import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import {
  Brain,
  MessageCircle,
  AlertTriangle,
  TrendingUp,
  Calendar,
  Shield,
  Heart,
  Smile,
  Meh,
  Frown,
  Activity,
  Phone,
  Users,
  BookOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";

type MoodLevel = "great" | "good" | "okay" | "low" | "struggling";

interface MoodEntry {
  date: Date;
  mood: MoodLevel;
  note?: string;
}

const moodOptions: { value: MoodLevel; label: string; icon: typeof Smile; color: string }[] = [
  { value: "great", label: "Great", icon: Smile, color: "text-health-success" },
  { value: "good", label: "Good", icon: Smile, color: "text-health-teal" },
  { value: "okay", label: "Okay", icon: Meh, color: "text-health-amber" },
  { value: "low", label: "Low", icon: Frown, color: "text-health-coral" },
  { value: "struggling", label: "Struggling", icon: Frown, color: "text-destructive" },
];

const resources = [
  {
    title: "Guided Meditation",
    description: "5-minute breathing exercises",
    icon: Brain,
    color: "bg-health-indigo-light text-health-indigo",
  },
  {
    title: "Peer Support",
    description: "Connect with fellow students",
    icon: Users,
    color: "bg-health-teal-light text-health-teal",
  },
  {
    title: "Self-Help Library",
    description: "Articles and coping strategies",
    icon: BookOpen,
    color: "bg-health-amber-light text-health-amber",
  },
];

const weeklyMoods: { day: string; level: number }[] = [
  { day: "Mon", level: 4 },
  { day: "Tue", level: 3 },
  { day: "Wed", level: 4 },
  { day: "Thu", level: 2 },
  { day: "Fri", level: 3 },
  { day: "Sat", level: 4 },
  { day: "Sun", level: 5 },
];

export default function MentalHealth() {
  const [selectedMood, setSelectedMood] = useState<MoodLevel | null>(null);
  const [moodNote, setMoodNote] = useState("");
  const [showCrisisHelp, setShowCrisisHelp] = useState(false);

  const handleMoodSubmit = () => {
    if (!selectedMood) return;
    // In a real app, this would save to the database
    console.log("Mood logged:", { mood: selectedMood, note: moodNote });
    setSelectedMood(null);
    setMoodNote("");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-health-indigo-light text-health-indigo text-sm font-medium mb-4">
            <Brain className="h-4 w-4" />
            Mental Health Support
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Your Wellness Journey
          </h1>
          <p className="text-muted-foreground">
            Anonymous support designed for higher education students
          </p>
        </div>

        {/* Crisis Help Banner */}
        {showCrisisHelp && (
          <div className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 animate-slide-up">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-6 w-6 text-destructive shrink-0" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  If you're in crisis
                </h3>
                <p className="text-sm text-muted-foreground mb-3">
                  You're not alone. Professional help is available 24/7.
                </p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="destructive" size="sm">
                    <Phone className="h-4 w-4 mr-1" />
                    Call Helpline
                  </Button>
                  <Button variant="outline" size="sm" onClick={() => setShowCrisisHelp(false)}>
                    Dismiss
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Mood Check-in Card */}
            <div className="health-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="h-10 w-10 rounded-xl gradient-mental flex items-center justify-center">
                  <Heart className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    How are you feeling today?
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Your responses are 100% anonymous
                  </p>
                </div>
              </div>

              {/* Mood Selector */}
              <div className="grid grid-cols-5 gap-2 mb-6">
                {moodOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setSelectedMood(option.value)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all",
                      selectedMood === option.value
                        ? "border-health-indigo bg-health-indigo-light"
                        : "border-border hover:border-health-indigo/50 hover:bg-muted"
                    )}
                  >
                    <option.icon className={cn("h-8 w-8", option.color)} />
                    <span className="text-xs font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              {/* Note Input */}
              <textarea
                value={moodNote}
                onChange={(e) => setMoodNote(e.target.value)}
                placeholder="Add a note about how you're feeling (optional)..."
                className="health-input min-h-[80px] resize-none mb-4"
              />

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  Protected by end-to-end encryption
                </div>
                <Button
                  variant="mental"
                  onClick={handleMoodSubmit}
                  disabled={!selectedMood}
                >
                  Log Mood
                </Button>
              </div>
            </div>

            {/* Weekly Mood Trend */}
            <div className="health-card p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-health-teal-light flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-health-teal" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-foreground">
                      Weekly Mood Trend
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      Your emotional journey this week
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-health-success">
                  <Activity className="h-4 w-4" />
                  +12% improvement
                </div>
              </div>

              {/* Simple Bar Chart */}
              <div className="flex items-end justify-between gap-2 h-32">
                {weeklyMoods.map((day) => (
                  <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                    <div
                      className={cn(
                        "w-full rounded-t-lg transition-all",
                        day.level >= 4
                          ? "bg-health-success"
                          : day.level >= 3
                          ? "bg-health-teal"
                          : day.level >= 2
                          ? "bg-health-amber"
                          : "bg-health-coral"
                      )}
                      style={{ height: `${day.level * 20}%` }}
                    />
                    <span className="text-xs text-muted-foreground">{day.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Anonymous Chat */}
            <div className="health-card p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-10 w-10 rounded-xl bg-health-amber-light flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-health-amber" />
                </div>
                <div>
                  <h2 className="text-lg font-semibold text-foreground">
                    Anonymous Counseling
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Chat with trained counselors anonymously
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Our counselors are available 24/7 to listen and support you. 
                Your identity remains completely private.
              </p>
              <Button variant="amber" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Start Anonymous Chat
              </Button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Crisis Help */}
            <div className="health-card p-6 border-l-4 border-l-destructive">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="h-5 w-5 text-destructive" />
                <h3 className="font-semibold text-foreground">Need Immediate Help?</h3>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                If you're experiencing a crisis, please reach out to professional support.
              </p>
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => setShowCrisisHelp(true)}
              >
                <Phone className="h-4 w-4 mr-2" />
                Crisis Helpline
              </Button>
            </div>

            {/* Quick Resources */}
            <div className="health-card p-6">
              <h3 className="font-semibold text-foreground mb-4">Quick Resources</h3>
              <div className="space-y-3">
                {resources.map((resource) => (
                  <button
                    key={resource.title}
                    className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-muted transition-colors text-left"
                  >
                    <div className={cn("h-10 w-10 rounded-lg flex items-center justify-center", resource.color)}>
                      <resource.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        {resource.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {resource.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Badge */}
            <div className="health-card p-6 bg-health-indigo-light border-health-indigo/20">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-health-indigo" />
                <h3 className="font-semibold text-foreground">Privacy First</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-health-indigo" />
                  Federated learning protects your data
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-health-indigo" />
                  No personal information stored
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-health-indigo" />
                  End-to-end encrypted conversations
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
