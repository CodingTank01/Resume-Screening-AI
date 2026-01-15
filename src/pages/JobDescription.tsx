import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useResumeStore } from "@/store/useResumeStore";
import { toast } from "@/hooks/use-toast";
import { Briefcase, MapPin, Clock, ArrowRight, FileText, Lightbulb } from "lucide-react";

export default function JobDescription() {
  const navigate = useNavigate();
  const { setJobDescription } = useResumeStore();
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    experience: "",
    location: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.title.trim()) {
      newErrors.title = "Job title is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Job description is required";
    } else if (formData.description.trim().length < 50) {
      newErrors.description = "Please provide a more detailed job description (at least 50 characters)";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setJobDescription({
      title: formData.title,
      description: formData.description,
      experience: formData.experience || undefined,
      location: formData.location || undefined,
    });

    toast({
      title: "Job Requirements Saved",
      description: "Now let's upload some resumes to analyze",
    });

    navigate("/upload");
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Briefcase className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Define Your Job Requirements
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Provide the job details so our AI can match candidates based on relevant skills and experience.
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                1
              </div>
              <span className="text-sm font-medium text-foreground">Job Details</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm text-muted-foreground">Upload Resumes</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm text-muted-foreground">View Rankings</span>
            </div>
          </div>

          {/* Form Card */}
          <Card className="shadow-soft border-border">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Job Information
              </CardTitle>
              <CardDescription>
                Fill in the details about the position you're hiring for
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Job Title */}
                <div className="space-y-2">
                  <Label htmlFor="title" className="flex items-center gap-2">
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    Job Title <span className="text-destructive">*</span>
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Senior Frontend Developer"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    className={errors.title ? "border-destructive" : ""}
                  />
                  {errors.title && (
                    <p className="text-sm text-destructive">{errors.title}</p>
                  )}
                </div>

                {/* Job Description */}
                <div className="space-y-2">
                  <Label htmlFor="description" className="flex items-center gap-2">
                    <FileText className="h-4 w-4 text-muted-foreground" />
                    Job Description <span className="text-destructive">*</span>
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the role, responsibilities, and required skills..."
                    rows={8}
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    className={errors.description ? "border-destructive" : ""}
                  />
                  {errors.description && (
                    <p className="text-sm text-destructive">{errors.description}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    Include key skills, qualifications, and responsibilities for better matching
                  </p>
                </div>

                {/* Optional Fields */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Required Experience
                    </Label>
                    <Input
                      id="experience"
                      placeholder="e.g., 3-5 years"
                      value={formData.experience}
                      onChange={(e) => handleInputChange("experience", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location" className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Location
                    </Label>
                    <Input
                      id="location"
                      placeholder="e.g., Remote, New York, NY"
                      value={formData.location}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                    />
                  </div>
                </div>

                {/* Tips Card */}
                <div className="p-4 rounded-xl bg-accent/10 border border-accent/20">
                  <div className="flex gap-3">
                    <Lightbulb className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Pro Tip</h4>
                      <p className="text-sm text-muted-foreground">
                        Include specific technical skills, tools, and technologies in your job description. 
                        The more detailed, the better the AI can match candidates.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <Button type="submit" size="lg" className="w-full">
                  Save Job Requirements
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
}
