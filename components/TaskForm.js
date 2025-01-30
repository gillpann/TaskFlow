"use client";

import { useState } from "react";

export default function TaskForm({ onSubmit, onClose, initialData }) {
  const [taskType, setTaskType] = useState(initialData?.type || "text");
  const [text, setText] = useState(initialData?.text || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );
  const [dueDate, setDueDate] = useState(initialData?.dueDate || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length === 0) return;
    if (text.split(" ").length > 100) return;

    const task = {
      id: initialData?.id || Date.now().toString(),
      type: taskType,
      text: text.trim(),
      description: taskType === "text" ? description.trim() : "",
      dueDate: taskType === "text" ? dueDate : null,
      completed: initialData?.completed || false,
      createdAt: initialData?.createdAt || new Date().toISOString(),
    };

    onSubmit(task);
    if (!initialData) {
      setText("");
      setDescription("");
      setDueDate("");
    }
  };

  return (
    <div className="bg-background rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-foreground">
          {initialData ? "Edit Task" : "Create New Task"}
        </h2>
        {onClose && (
          <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          ></button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="taskType"
              value="checklist"
              checked={taskType === "checklist"}
              onChange={(e) => setTaskType(e.target.value)}
              className="text-primary"
            />
            Checklist
          </label>
          <label className="flex items-center gap-2">
            <input
              type="radio"
              name="taskType"
              value="text"
              checked={taskType === "text"}
              onChange={(e) => setTaskType(e.target.value)}
              className="text-primary"
            />
            Text
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-muted-foreground mb-1">
            Title
          </label>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter task title"
            className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground"
          />
          {text.split(" ").length > 100 && (
            <p className="text-destructive text-sm mt-1">
              Task exceeds 100 words limit
            </p>
          )}
        </div>

        {taskType === "text" && (
          <>
            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter task description"
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground"
                rows="3"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-muted-foreground mb-1">
                Due Date
              </label>
              <input
                type="datetime-local"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-card text-foreground"
                required
              />
            </div>
          </>
        )}

        <button
          type="submit"
          className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
        >
          {initialData ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}
