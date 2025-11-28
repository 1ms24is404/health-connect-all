import { Link } from "react-router-dom";
import { ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTASection() {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl gradient-hero p-8 md:p-12 lg:p-16">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary-foreground/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/10 rounded-full blur-3xl" />
          
          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-primary-foreground/20 backdrop-blur-sm mb-6">
              <Heart className="h-8 w-8 text-primary-foreground animate-bounce-soft" />
            </div>
            
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 text-balance">
              Ready to Transform Healthcare Access?
            </h2>
            
            <p className="text-lg text-primary-foreground/90 mb-8 max-w-xl mx-auto">
              Join thousands of users and healthcare workers already benefiting from 
              AI-powered health solutions that work anywhere, for anyone.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                variant="glass" 
                size="xl" 
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                asChild
              >
                <Link to="/disease-awareness">
                  Start Learning
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="glass" 
                size="xl"
                className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                asChild
              >
                <Link to="/asha-ehr">
                  For Healthcare Workers
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
