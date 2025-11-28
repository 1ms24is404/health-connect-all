import { 
  WifiOff, 
  Lock, 
  Globe2, 
  Zap,
  ShieldCheck,
  Smartphone
} from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: WifiOff,
    title: "Offline-First Design",
    description: "All core features work without internet. Data syncs automatically when connectivity returns.",
    color: "text-health-amber",
    bg: "bg-health-amber-light",
  },
  {
    icon: Lock,
    title: "Privacy by Design",
    description: "Federated learning, end-to-end encryption, and local processing protect your sensitive health data.",
    color: "text-health-indigo",
    bg: "bg-health-indigo-light",
  },
  {
    icon: Globe2,
    title: "Multilingual Support",
    description: "Available in 12+ languages including regional dialects for maximum accessibility.",
    color: "text-primary",
    bg: "bg-health-teal-light",
  },
  {
    icon: Zap,
    title: "AI-Powered Insights",
    description: "Open-source AI models provide intelligent diagnostics while respecting ethical guidelines.",
    color: "text-health-coral",
    bg: "bg-health-coral-light",
  },
  {
    icon: ShieldCheck,
    title: "Regulatory Compliant",
    description: "Built to meet healthcare data regulations including HIPAA and local health authority guidelines.",
    color: "text-health-success",
    bg: "bg-health-success-light",
  },
  {
    icon: Smartphone,
    title: "Cross-Platform",
    description: "Works seamlessly on web and mobile devices with a consistent, accessible experience.",
    color: "text-health-indigo",
    bg: "bg-health-indigo-light",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Built for Real-World Impact
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Every feature addresses genuine challenges in healthcare delivery to underserved communities
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="health-card p-6 group animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div
                className={cn(
                  "inline-flex h-12 w-12 items-center justify-center rounded-xl mb-4 transition-transform group-hover:scale-110",
                  feature.bg
                )}
              >
                <feature.icon className={cn("h-6 w-6", feature.color)} />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
