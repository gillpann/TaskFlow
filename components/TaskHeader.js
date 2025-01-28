import { CheckSquare } from "lucide-react";

export default function TaskHeader() {
  return (
    <div className="text-center space-y-4">
      <h1 className="text-3xl font-bold text-gray-800">Task Manager</h1>
      <p className="text-gray-600">Organize your tasks efficiently</p>
      <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
        <CheckSquare size={16} />
        <span>Stay productive</span>
      </div>
    </div>
  );
}
