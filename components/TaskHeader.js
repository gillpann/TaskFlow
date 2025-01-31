import { CheckSquare } from "lucide-react";

export default function TaskHeader() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-foreground">TaskFlow</h1>
      <p className="text-muted-foreground">
        Create tasks with deadlines and manage them effortlessly.
      </p>
      <div className="hidden sm:flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <CheckSquare size={16} />
        <span>Stay organized and in control.</span>
      </div>
    </div>
  );
}
