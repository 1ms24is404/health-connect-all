import { ArrowRight, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-health-indigo/10 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-in">
            <Shield className="h-4 w-4" />
            AI-Powered Healthcare for Everyone
          </div>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 text-balance animate-fade-in" style={{ animationDelay: "0.1s" }}>
            Bridging Health Gaps with{" "}
            <span className="inline-block bg-gradient-to-r from-[hsl(174,72%,40%)] via-[hsl(230,65%,55%)] to-[hsl(12,85%,60%)] bg-clip-text text-transparent">
              Intelligent Care
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl mx-auto text-balance animate-fade-in" style={{ animationDelay: "0.2s" }}>
            A unified platform combining disease awareness, mental health support, 
            and healthcare worker tools—designed to work offline and protect your privacy.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: "0.3s" }}>
            <Button variant="hero" size="xl" asChild>
              <Link to="/disease-awareness">
                Get Started
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
            <Button variant="outline-teal" size="xl" asChild>
              <Link to="/mental-health">
                Explore Features
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-16 pt-8 border-t border-border animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary">100%</p>
              <p className="text-sm text-muted-foreground mt-1">Offline Capable</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-health-indigo">12+</p>
              <p className="text-sm text-muted-foreground mt-1">Languages</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-health-success">256-bit</p>
              <p className="text-sm text-muted-foreground mt-1">Encryption</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
