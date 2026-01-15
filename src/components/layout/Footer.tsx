import { FileSearch, Heart } from "lucide-react";
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/30 py-8 mt-auto">
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <FileSearch className="h-4 w-4" />
            </div>
            <span className="font-display font-semibold text-foreground">
              ResumeAI
            </span>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            AI-powered resume screening to help you find the best candidates faster.
          </p>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            Made with <Heart className="h-4 w-4 text-destructive fill-destructive" /> for recruiters
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            <strong>Important:</strong> This system assists recruiters in the screening process. 
            Final hiring decisions should always be made by humans with careful consideration.
          </p>
        </div>
      </div>
    </footer>
  );
}
