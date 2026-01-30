import { useState } from "react";
import { BookOpen, Sparkles, GraduationCap, RefreshCw, Lightbulb, FileText, PenTool, ToggleLeft } from "lucide-react";
import { QuestionInput } from "@/components/QuestionInput";
import { ModeToggle } from "@/components/ModeToggle";
import { SubjectBadge } from "@/components/SubjectBadge";
import { AnswerDisplay } from "@/components/AnswerDisplay";
import { TypingIndicator } from "@/components/TypingIndicator";
import { useExamBuddy } from "@/hooks/useExamBuddy";
import { useToast } from "@/hooks/use-toast";

const EXAMPLE_QUESTIONS = [
  "Explain Newton's laws of motion with examples",
  "What is normalization in DBMS? Explain up to 3NF",
  "Explain the difference between stack and queue",
  "Describe the process of photosynthesis",
];

const FEATURES = [
  {
    icon: Lightbulb,
    title: "Step-by-Step Explanations",
    description: "Get clear, structured explanations for any concept across all subjects."
  },
  {
    icon: FileText,
    title: "Exam-Oriented Answers",
    description: "Answers formatted exactly how examiners expect - with proper headings and points."
  },
  {
    icon: PenTool,
    title: "Diagram Support",
    description: "ASCII diagrams and visual representations to help you understand better."
  },
  {
    icon: ToggleLeft,
    title: "Flexible Modes",
    description: "Switch between detailed exam answers and simple easy-to-understand explanations."
  }
];

export default function Index() {
  const [mode, setMode] = useState<"exam" | "simple">("exam");
  const { answer, subject, isLoading, error, askQuestion, reset } = useExamBuddy();
  const { toast } = useToast();

  const handleSubmit = (question: string) => {
    askQuestion(question, mode);
  };

  const handleExampleClick = (question: string) => {
    askQuestion(question, mode);
  };

  const handleReset = () => {
    reset();
  };

  if (error) {
    toast({
      title: "Error",
      description: error,
      variant: "destructive",
    });
  }

  return (
    <div className="min-h-screen bg-background gradient-hero">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 gradient-primary rounded-xl shadow-soft">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground">
                  Exam Buddy AI
                </h1>
                <p className="text-xs text-muted-foreground">
                  Your smart exam preparation partner
                </p>
              </div>
            </div>
            <ModeToggle mode={mode} onChange={setMode} disabled={isLoading} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-4xl mx-auto px-4 py-8">
        {/* Hero Section - Only show when no answer */}
        {!answer && !isLoading && (
          <div className="text-center mb-10 animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary rounded-full text-secondary-foreground text-sm font-medium mb-4">
              <Sparkles className="w-4 h-4" />
              Powered by Gemini 3 Pro
            </div>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-3">
              Write Perfect Exam Answers
            </h2>
            <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-8">
              Get structured, marks-oriented answers for any subject - Physics, Chemistry, Maths, Computer Science, and more.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-8">
              {FEATURES.map((feature, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border text-left"
                >
                  <div className="p-2 bg-secondary rounded-lg shrink-0">
                    <feature.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground mt-0.5">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Question Input Card */}
        <div className="bg-card rounded-2xl shadow-card border border-border p-6 mb-8 animate-slide-up">
          <div className="flex items-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-primary" />
            <h3 className="font-display font-semibold text-foreground">
              Ask Your Question
            </h3>
            {subject && (
              <SubjectBadge subject={subject} className="ml-auto" />
            )}
          </div>
          <QuestionInput
            onSubmit={handleSubmit}
            disabled={isLoading}
            placeholder="e.g., Explain binary search tree with insertion and deletion operations..."
          />
          
          {/* Example Questions */}
          {!answer && !isLoading && (
            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Try these examples:</p>
              <div className="flex flex-wrap gap-2">
                {EXAMPLE_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleExampleClick(q)}
                    className="text-xs px-3 py-1.5 bg-muted hover:bg-secondary text-muted-foreground hover:text-secondary-foreground rounded-full transition-colors"
                  >
                    {q.length > 45 ? q.slice(0, 45) + "..." : q}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Answer Section */}
        {(isLoading || answer) && (
          <div className="bg-card rounded-2xl shadow-card border border-border overflow-hidden animate-fade-in">
            {/* Answer Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold text-foreground">
                  {mode === "exam" ? "Exam Answer" : "Simple Explanation"}
                </h3>
              </div>
              {!isLoading && (
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  <RefreshCw className="w-4 h-4" />
                  New Question
                </button>
              )}
            </div>

            {/* Answer Content */}
            <div className="p-6">
              {isLoading && !answer && <TypingIndicator />}
              <AnswerDisplay content={answer} isStreaming={isLoading} />
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-auto">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <p className="text-center text-sm text-muted-foreground">
            Works for all subjects: Physics, Chemistry, Maths, Computer Science, Biology & more 🎓
          </p>
        </div>
      </footer>
    </div>
  );
}
