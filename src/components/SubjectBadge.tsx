import { cn } from "@/lib/utils";

type Subject = "Data Structures" | "C/C++" | "DBMS" | "Operating Systems" | "Discrete Mathematics" | "General";

interface SubjectBadgeProps {
  subject: Subject | string;
  className?: string;
}

const subjectConfig: Record<string, { badge: string; icon: string }> = {
  "Data Structures": { badge: "badge-ds", icon: "🌳" },
  "C/C++": { badge: "badge-cpp", icon: "💻" },
  "DBMS": { badge: "badge-dbms", icon: "🗃️" },
  "Operating Systems": { badge: "badge-os", icon: "⚙️" },
  "Discrete Mathematics": { badge: "badge-maths", icon: "📐" },
  "General": { badge: "bg-muted text-muted-foreground border-border", icon: "📚" },
};

export function SubjectBadge({ subject, className }: SubjectBadgeProps) {
  const config = subjectConfig[subject] || subjectConfig["General"];
  
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium border transition-all",
        config.badge,
        className
      )}
    >
      <span>{config.icon}</span>
      <span>{subject}</span>
    </span>
  );
}
