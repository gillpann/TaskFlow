import { CheckSquare } from "lucide-react";

export default function TaskHeader() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-black dark:text-white">
        Task Manager
      </h1>
      <p className="text-foreground dark:text-foreground">
        Organize your tasks efficiently
      </p>
      <div className="flex items-center justify-center gap-2 text-sm text-foreground dark:text-foreground">
        <CheckSquare size={16} />
        <span>Stay productive</span>
      </div>
    </div>
  );
}
