import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Brain, 
  ClipboardList, 
  ArrowRight,
  Wifi,
  Shield,
  Globe,
  Heart,
  Users,
  Mic
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "disease-awareness",
    title: "Disease Awareness",
    description: "AI-powered chatbot providing personalized health education with multilingual support and gamified learning.",
    href: "/disease-awareness",
    icon: MessageSquare,
    gradient: "gradient-primary",
    lightBg: "bg-health-teal-light",
    features: [
      { icon: Globe, text: "12+ Languages" },
      { icon: Wifi, text: "Works Offline" },
      { icon: Shield, text: "Evidence-Based" },
    ],
  },
  {
    id: "mental-health",
    title: "Mental Health Support",
    description: "Anonymous counseling, mood tracking, and crisis support designed specifically for higher education students.",
    href: "/mental-health",
    icon: Brain,
    gradient: "gradient-mental",
    lightBg: "bg-health-indigo-light",
    features: [
      { icon: Heart, text: "Sentiment Analysis" },
      { icon: Shield, text: "100% Anonymous" },
      { icon: Users, text: "Peer Support" },
    ],
  },
  {
    id: "asha-ehr",
    title: "ASHA EHR Companion",
    description: "Mobile electronic health records for community health workers with offline sync and AI-assisted diagnostics.",
    href: "/asha-ehr",
    icon: ClipboardList,
    gradient: "gradient-asha",
    lightBg: "bg-health-success-light",
    features: [
      { icon: Wifi, text: "Offline Sync" },
      { icon: Mic, text: "Voice Input" },
      { icon: Shield, text: "Secure Storage" },
    ],
  },
];

export function ModuleCards() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Three Pillars of Health
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive healthcare solutions designed for accessibility, privacy, and impact
          </p>
        </div>

        {/* Module Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {modules.map((module, index) => (
            <article
              key={module.id}
              className="health-card overflow-hidden group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header with gradient */}
              <div className={cn("p-6", module.gradient)}>
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-card/20 backdrop-blur-sm">
                    <module.icon className="h-7 w-7 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-semibold text-primary-foreground">
                    {module.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {module.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {module.features.map((feature, i) => (
                    <span
                      key={i}
                      className={cn(
                        "health-badge gap-1.5",
                        module.lightBg,
                        "text-foreground"
                      )}
                    >
                      <feature.icon className="h-3 w-3" />
                      {feature.text}
                    </span>
                  ))}
                </div>

                {/* CTA */}
                <Button
                  variant="ghost"
                  className="w-full justify-between group-hover:bg-muted"
                  asChild
                >
                  <Link to={module.href}>
                    Explore Module
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
