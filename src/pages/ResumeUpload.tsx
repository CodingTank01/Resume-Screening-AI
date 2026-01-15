import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { PageLayout } from "@/components/layout/PageLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useResumeStore, Candidate } from "@/store/useResumeStore";
import { toast } from "@/hooks/use-toast";
import { 
  Upload, 
  FileText, 
  X, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight, 
  ArrowLeft,
  Loader2,
  File
} from "lucide-react";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];

export default function ResumeUpload() {
  const navigate = useNavigate();
  const { jobDescription, candidates, addCandidate, removeCandidate } = useResumeStore();
  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});

  // Redirect if no job description
  if (!jobDescription) {
    return (
      <PageLayout>
        <div className="container py-12">
          <Card className="max-w-lg mx-auto text-center p-8">
            <AlertCircle className="h-12 w-12 text-warning mx-auto mb-4" />
            <h2 className="font-display text-xl font-semibold mb-2">No Job Description Found</h2>
            <p className="text-muted-foreground mb-6">
              Please define your job requirements first before uploading resumes.
            </p>
            <Button onClick={() => navigate("/job-description")}>
              <ArrowLeft className="h-4 w-4" />
              Go to Job Description
            </Button>
          </Card>
        </div>
      </PageLayout>
    );
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    // Validate file type
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast({
        title: "Invalid File Type",
        description: "Please upload a valid PDF or DOCX file.",
        variant: "destructive",
      });
      return;
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      toast({
        title: "File Too Large",
        description: "File size must be less than 5MB.",
        variant: "destructive",
      });
      return;
    }

    // Generate unique ID
    const id = `candidate-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // Extract name from filename
    const name = file.name.replace(/\.(pdf|docx)$/i, '').replace(/[_-]/g, ' ');

    // Create candidate entry
    const candidate: Candidate = {
      id,
      name,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date(),
      status: 'uploaded',
    };

    // Simulate upload progress
    setUploadProgress((prev) => ({ ...prev, [id]: 0 }));
    
    for (let i = 0; i <= 100; i += 20) {
      await new Promise((resolve) => setTimeout(resolve, 100));
      setUploadProgress((prev) => ({ ...prev, [id]: i }));
    }

    addCandidate(candidate);
    setUploadProgress((prev) => {
      const newProgress = { ...prev };
      delete newProgress[id];
      return newProgress;
    });

    toast({
      title: "Resume Uploaded",
      description: `${file.name} has been uploaded successfully.`,
    });
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(processFile);
  }, []);

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    files.forEach(processFile);
    e.target.value = ''; // Reset input
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const handleProceed = () => {
    if (candidates.length === 0) {
      toast({
        title: "No Resumes Uploaded",
        description: "Please upload at least one resume to proceed.",
        variant: "destructive",
      });
      return;
    }
    navigate("/ranking");
  };

  return (
    <PageLayout>
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
              <Upload className="h-8 w-8 text-primary" />
            </div>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Upload Candidate Resumes
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Upload resumes to analyze and rank candidates for: <strong className="text-foreground">{jobDescription.title}</strong>
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-2 mb-10">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-success text-success-foreground flex items-center justify-center">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <span className="text-sm text-muted-foreground">Job Details</span>
            </div>
            <div className="w-8 h-px bg-success" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold">
                2
              </div>
              <span className="text-sm font-medium text-foreground">Upload Resumes</span>
            </div>
            <div className="w-8 h-px bg-border" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-semibold">
                3
              </div>
              <span className="text-sm text-muted-foreground">View Rankings</span>
            </div>
          </div>

          {/* Upload Zone */}
          <Card className="shadow-soft border-border mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Upload Resumes
              </CardTitle>
              <CardDescription>
                Drag and drop files or click to browse. Supports PDF and DOCX files up to 5MB.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                className={cn(
                  "upload-zone flex flex-col items-center justify-center cursor-pointer",
                  isDragging && "drag-over"
                )}
              >
                <input
                  type="file"
                  id="file-upload"
                  className="hidden"
                  accept=".pdf,.docx"
                  multiple
                  onChange={handleFileInput}
                />
                <label htmlFor="file-upload" className="cursor-pointer text-center">
                  <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 mx-auto">
                    <Upload className="h-8 w-8 text-primary" />
                  </div>
                  <p className="text-foreground font-medium mb-2">
                    Drag & drop resumes here, or click to browse
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PDF, DOCX up to 5MB each
                  </p>
                </label>
              </div>

              {/* Upload Progress */}
              {Object.entries(uploadProgress).map(([id, progress]) => (
                <div key={id} className="mt-4 p-4 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3 mb-2">
                    <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    <span className="text-sm font-medium">Uploading...</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Uploaded Files List */}
          {candidates.length > 0 && (
            <Card className="shadow-soft border-border mb-8">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    Uploaded Resumes ({candidates.length})
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {candidates.map((candidate) => (
                    <div
                      key={candidate.id}
                      className="flex items-center justify-between p-4 rounded-xl bg-muted/50 border border-border"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <File className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{candidate.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {candidate.fileName} • {formatFileSize(candidate.fileSize)}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeCandidate(candidate.id)}
                        className="text-muted-foreground hover:text-destructive"
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/job-description")}
              className="flex-1"
            >
              <ArrowLeft className="h-5 w-5" />
              Back to Job Description
            </Button>
            <Button
              size="lg"
              onClick={handleProceed}
              className="flex-1"
              disabled={candidates.length === 0}
            >
              Analyze & Rank Candidates
              <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
