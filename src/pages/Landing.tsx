import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PageLayout } from "@/components/layout/PageLayout";
import { 
  FileSearch, 
  Upload, 
  Brain, 
  BarChart3, 
  ArrowRight, 
  CheckCircle2,
  Sparkles,
  Shield,
  Zap
} from "lucide-react";

const features = [
  {
    icon: Upload,
    title: "Upload Resumes",
    description: "Bulk upload candidate resumes in PDF or DOCX format",
  },
  {
    icon: Brain,
    title: "AI Analysis",
    description: "Advanced AI extracts skills and matches them to your job requirements",
  },
  {
    icon: BarChart3,
    title: "Smart Ranking",
    description: "Get instant candidate rankings based on job-skill fit scores",
  },
];

const benefits = [
  "Reduce screening time by up to 75%",
  "Eliminate unconscious bias in initial screening",
  "Never miss qualified candidates",
  "Transparent, explainable scoring",
];

export default function Landing() {
  return (
    <PageLayout showHeader={false}>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 gradient-hero opacity-95" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative container py-24 md:py-32">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-primary-foreground text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="h-4 w-4" />
              AI-Powered Resume Screening
            </div>
            
            <h1 className="font-display text-4xl md:text-6xl font-bold text-primary-foreground mb-6 animate-slide-up">
              Smart Resume Screening{" "}
              <span className="bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent font-semibold">Powered by AI</span>
            </h1>
            
            <p className="text-xl text-primary-foreground/80 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Automatically analyze resumes and rank candidates based on job-skill fit. 
              Find your perfect hire in minutes, not hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/job-description">
                <Button variant="hero" size="xl" className="w-full sm:w-auto">
                  Start Screening
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <a href="#how-it-works">
                <Button variant="heroOutline" size="xl" className="w-full sm:w-auto">
                  How It Works
                </Button>
              </a>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="hsl(var(--background))"
            />
          </svg>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-background">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              How It Works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Three simple steps to find your ideal candidates
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 stagger-children">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="relative p-8 rounded-2xl bg-card border border-border shadow-soft card-hover opacity-0"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-xl bg-primary text-primary-foreground flex items-center justify-center font-display font-bold text-lg shadow-glow">
                    {index + 1}
                  </div>
                  <div className="mt-4">
                    <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                      <Icon className="h-7 w-7 text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-muted/30">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-6">
                Why Choose AI-Powered Screening?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Traditional resume screening is time-consuming and prone to bias. 
                Our AI analyzes candidates objectively based on skills and qualifications.
              </p>
              
              <ul className="space-y-4">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-6 w-6 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <Link to="/job-description" className="inline-block mt-8">
                <Button size="lg">
                  Get Started Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <Zap className="h-10 w-10 text-warning mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">75%</h3>
                <p className="text-muted-foreground">Faster Screening</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft mt-8">
                <Shield className="h-10 w-10 text-success mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">100%</h3>
                <p className="text-muted-foreground">Objective Analysis</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft">
                <Brain className="h-10 w-10 text-primary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">AI</h3>
                <p className="text-muted-foreground">Skill Extraction</p>
              </div>
              <div className="p-6 rounded-2xl bg-card border border-border shadow-soft mt-8">
                <FileSearch className="h-10 w-10 text-secondary mb-4" />
                <h3 className="font-display text-2xl font-bold text-foreground">∞</h3>
                <p className="text-muted-foreground">Resumes Analyzed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="relative overflow-hidden rounded-3xl gradient-hero p-12 md:p-16 text-center">
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
                Ready to Transform Your Hiring?
              </h2>
              <p className="text-lg text-primary-foreground/80 mb-8">
                Start screening resumes with AI today. No credit card required.
              </p>
              <Link to="/job-description">
                <Button variant="hero" size="xl">
                  Start Screening Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
