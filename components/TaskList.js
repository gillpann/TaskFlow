"use client";

import { useState } from 'react';
import { Check, Clock, Pencil, Trash2, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import TaskForm from './TaskForm';

export default function TaskList({ 
  tasks, 
  onToggleComplete, 
  onDelete, 
  onUpdate, 
  onRestore,
  isTrash, 
  emptyMessage 
}) {
  const [editingTask, setEditingTask] = useState(null);
  const [expandedTasks, setExpandedTasks] = useState(new Set());

  const toggleExpand = (taskId) => {
    const newExpanded = new Set(expandedTasks);
    if (newExpanded.has(taskId)) {
      newExpanded.delete(taskId);
    } else {
      newExpanded.add(taskId);
    }
    setExpandedTasks(newExpanded);
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (tasks.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {editingTask && (
        <TaskForm
          initialData={editingTask}
          onSubmit={(updatedTask) => {
            onUpdate(editingTask.id, updatedTask);
            setEditingTask(null);
          }}
          onClose={() => setEditingTask(null)}
        />
      )}

      {tasks.map((task) => (
        <div
          key={task.id}
          className={`bg-white border rounded-lg p-4 ${
            task.completed ? 'border-green-200 bg-green-50' : 'border-gray-200'
          } hover:shadow-md transition-shadow`}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {!isTrash && (
                  <button
                    onClick={() => onToggleComplete(task.id)}
                    className={`p-1 rounded-full ${
                      task.completed
                        ? 'bg-green-500 text-white'
                        : 'border-2 border-gray-300 text-transparent hover:border-green-500'
                    }`}
                  >
                    <Check size={16} />
                  </button>
                )}
                <span
                  className={`font-medium ${
                    task.completed ? 'text-green-800 line-through' : 'text-gray-800'
                  }`}
                >
                  {task.text}
                </span>
                {task.description && (
                  <button
                    onClick={() => toggleExpand(task.id)}
                    className="ml-2 text-gray-400 hover:text-gray-600"
                  >
                    {expandedTasks.has(task.id) ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                )}
              </div>

              {expandedTasks.has(task.id) && task.description && (
                <div className="ml-8 mt-2 text-gray-600 text-sm">
                  {task.description}
                </div>
              )}

              {task.type === 'text' && task.dueDate && (
                <div className="flex items-center gap-1 text-sm text-gray-500 ml-8">
                  <Clock size={14} />
                  <span>Due: {formatDate(task.dueDate)}</span>
                </div>
              )}
              
              {isTrash && (task.deletedAt || task.expiredAt) && (
                <div className="text-xs text-gray-500 mt-2 ml-8">
                  {task.expiredAt ? 
                    `Expired at: ${formatDate(task.expiredAt)}` : 
                    `Deleted at: ${formatDate(task.deletedAt)}`}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {isTrash ? (
                <>
                  <button
                    onClick={() => onRestore(task.id)}
                    className="p-1 text-blue-600 hover:text-blue-700"
                    title="Restore task"
                  >
                    <RotateCcw size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-1 text-red-600 hover:text-red-700"
                    title="Delete permanently"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setEditingTask(task)}
                    className="p-1 text-gray-500 hover:text-blue-600"
                    title="Edit task"
                  >
                    <Pencil size={16} />
                  </button>
                  <button
                    onClick={() => onDelete(task.id)}
                    className="p-1 text-gray-500 hover:text-red-600"
                    title="Move to trash"
                  >
                    <Trash2 size={16} />
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}