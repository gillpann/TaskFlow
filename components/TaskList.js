"use client";

import { useState } from "react";
import { Check, Clock, Pencil, Trash2, RotateCcw } from "lucide-react";
import TaskForm from "./TaskForm";

export default function TaskList({
  tasks,
  onToggleComplete,
  onDelete,
  onUpdate,
  onRestore,
  isTrash,
  emptyMessage,
}) {
  const [editingTask, setEditingTask] = useState(null);

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center text-foreground dark:text-foreground py-8">
        {emptyMessage || "No assignment yet"}
      </div>
    );
  }

  return (
    <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
      {editingTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-background text-foreground rounded-lg w-full max-w-md">
            <TaskForm
              initialData={editingTask}
              onSubmit={(updatedTask) => {
                onUpdate(editingTask.id, updatedTask);
                setEditingTask(null);
              }}
              onClose={() => setEditingTask(null)}
            />
          </div>
        </div>
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-background text-foreground border rounded-lg p-4 hover:shadow-md transition-shadow ${
            task.completed
              ? "border-green-200 bg-green-50 dark:bg-green-900"
              : "border-gray-200"
          }`}
        >
          <div className="space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-2">
                {!isTrash && (
                  <button
                    onClick={() => onToggleComplete(task.id)}
                    className={`p-1 rounded-full transition-colors ${
                      task.completed
                        ? "bg-green-500 text-white"
                        : "border-2 border-gray-300 text-transparent hover:border-green-500"
                    }`}
                    title={
                      task.completed
                        ? "Mark as unfinished"
                        : "Mark as completed"
                    }
                  >
                    <Check size={16} />
                  </button>
                )}
                <span
                  className={`font-medium transition-colors ${
                    task.completed
                      ? "text-green-800 dark:text-green-300 line-through"
                      : "text-foreground"
                  }`}
                >
                  {task.text}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {isTrash ? (
                  <>
                    <button
                      onClick={() => onRestore(task.id)}
                      className="p-1 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500 "
                      title="Restore task"
                    >
                      <RotateCcw size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-1 text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-500"
                      title="Delete permanently"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditingTask(task)}
                      className="p-1 text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400"
                      title="Edit task"
                    >
                      <Pencil size={16} />
                    </button>
                    <button
                      onClick={() => onDelete(task.id)}
                      className="p-1 text-muted-foreground hover:text-red-600 dark:hover:text-red-400"
                      title="Move to trash"
                    >
                      <Trash2 size={16} />
                    </button>
                  </>
                )}
              </div>
            </div>

            {task.type === "text" && (
              <div className="space-y-2">
                {task.description && (
                  <div className="text-muted-foreground text-sm bg-muted p-3 rounded-md border border-border">
                    {task.description}
                  </div>
                )}

                {task.dueDate && (
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Clock size={14} />
                    <span>Due: {formatDate(task.dueDate)}</span>
                  </div>
                )}
              </div>
            )}

            {isTrash && (task.deletedAt || task.expiredAt) && (
              <div className="text-xs text-muted-foreground">
                {task.expiredAt
                  ? `Expired at: ${formatDate(task.expiredAt)}`
                  : `Deleted at: ${formatDate(task.deletedAt)}`}
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
