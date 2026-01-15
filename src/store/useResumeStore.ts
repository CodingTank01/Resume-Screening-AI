import { create } from 'zustand';

export interface JobDescription {
  title: string;
  description: string;
  experience?: string;
  location?: string;
  extractedSkills?: string[];
}

export interface Candidate {
  id: string;
  name: string;
  email?: string;
  fileName: string;
  fileSize: number;
  uploadedAt: Date;
  resumeText?: string;
  extractedSkills?: string[];
  matchScore?: number;
  matchedSkills?: string[];
  missingSkills?: string[];
  status: 'uploaded' | 'processing' | 'analyzed' | 'error';
}

interface ResumeStore {
  jobDescription: JobDescription | null;
  candidates: Candidate[];
  isProcessing: boolean;
  
  setJobDescription: (job: JobDescription) => void;
  addCandidate: (candidate: Candidate) => void;
  updateCandidate: (id: string, updates: Partial<Candidate>) => void;
  removeCandidate: (id: string) => void;
  setIsProcessing: (processing: boolean) => void;
  clearCandidates: () => void;
  reset: () => void;
}

export const useResumeStore = create<ResumeStore>((set) => ({
  jobDescription: null,
  candidates: [],
  isProcessing: false,

  setJobDescription: (job) => set({ jobDescription: job }),
  
  addCandidate: (candidate) => 
    set((state) => ({ candidates: [...state.candidates, candidate] })),
  
  updateCandidate: (id, updates) =>
    set((state) => ({
      candidates: state.candidates.map((c) =>
        c.id === id ? { ...c, ...updates } : c
      ),
    })),
  
  removeCandidate: (id) =>
    set((state) => ({
      candidates: state.candidates.filter((c) => c.id !== id),
    })),
  
  setIsProcessing: (processing) => set({ isProcessing: processing }),
  
  clearCandidates: () => set({ candidates: [] }),
  
  reset: () => set({ jobDescription: null, candidates: [], isProcessing: false }),
}));
