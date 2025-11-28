import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, Wifi, WifiOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Disease Awareness", href: "/disease-awareness" },
  { name: "Mental Health", href: "/mental-health" },
  { name: "ASHA EHR", href: "/asha-ehr" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const location = useLocation();

  // Listen for online/offline events
  if (typeof window !== "undefined") {
    window.addEventListener("online", () => setIsOnline(true));
    window.addEventListener("offline", () => setIsOnline(false));
  }

  return (
    <header className="sticky top-0 z-50 glass">
      <nav className="container mx-auto flex items-center justify-between p-4 lg:px-8">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl gradient-primary shadow-sm group-hover:shadow-glow transition-all duration-300">
            <Heart className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Health<span className="text-primary">Bridge</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:gap-1">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                location.pathname === item.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              )}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Online/Offline Indicator */}
          <div
            className={cn(
              "hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all",
              isOnline
                ? "bg-health-success-light text-health-success"
                : "bg-health-amber-light text-health-amber"
            )}
          >
            {isOnline ? (
              <>
                <Wifi className="h-3 w-3" />
                Online
              </>
            ) : (
              <>
                <WifiOff className="h-3 w-3" />
                Offline
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card animate-slide-up">
          <div className="container mx-auto py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "block px-4 py-3 rounded-lg text-sm font-medium transition-all",
                  location.pathname === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                {item.name}
              </Link>
            ))}
            {/* Mobile Online Status */}
            <div
              className={cn(
                "flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium",
                isOnline
                  ? "bg-health-success-light text-health-success"
                  : "bg-health-amber-light text-health-amber"
              )}
            >
              {isOnline ? (
                <>
                  <Wifi className="h-4 w-4" />
                  Connected - All features available
                </>
              ) : (
                <>
                  <WifiOff className="h-4 w-4" />
                  Offline - Limited features available
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
