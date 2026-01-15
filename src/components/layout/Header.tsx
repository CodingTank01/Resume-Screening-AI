import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { FileSearch, Briefcase, Upload, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

const navItems = [
  { path: "/", label: "Home", icon: FileSearch },
  { path: "/job-description", label: "Job Description", icon: Briefcase },
  { path: "/upload", label: "Upload Resumes", icon: Upload },
  { path: "/ranking", label: "Rankings", icon: BarChart3 },
];

export function Header() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-soft transition-transform group-hover:scale-105">
            <FileSearch className="h-5 w-5" />
          </div>
          <span className="font-display text-xl font-bold text-foreground">
            ResumeAI
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link key={item.path} to={item.path}>
                <Button
                  variant="ghost"
                  className={cn(
                    "gap-2 text-muted-foreground hover:text-foreground",
                    isActive && "bg-muted text-foreground"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </Button>
              </Link>
            );
          })}
        </nav>

        <Link to="/job-description" className="hidden sm:block">
          <Button variant="default" size="sm">
            Get Started
          </Button>
        </Link>
      </div>
    </header>
  );
}
