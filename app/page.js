"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import useTask from "@/hooks/useTask";
import TaskForm from "@/components/TaskForm";
import ChecklistForm from "@/components/ChecklistForm";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";
import TaskDialog from "@/components/TaskDialog";
import TaskStats from "@/components/TaskStats";
import TaskHeader from "@/components/TaskHeader";
import TaskTypeDialog from "@/components/TaskTypeDialog";
import TaskNavigation from "@/components/TaskNavigation";
import ConfirmDialog from "@/components/ConfirmDialog";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export default function HomePage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  
  const {
    tasks,
    trashedTasks,
    showForm,
    setShowForm,
    currentView,
    setCurrentView,
    showConfirmDialog,
    setShowConfirmDialog,
    taskStats,
    searchQuery,
    setSearchQuery,
    handleLogout,
    addTask,
    toggleComplete,
    deleteTask,
    updateTask,
    restoreTask,
    permanentlyDeleteTask,
    emptyTrash,
    filteredTasks,
    toggleTheme,
    showTypeDialog,
    setShowTypeDialog,
    selectedTaskType,
    setSelectedTaskType,
    handleTypeSelect,
    handleBackToTypeSelection,
    handleCloseForm,
  } = useTask(router);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-background shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-lg sm:text-xl font-bold text-primary">
            Welcome Gilvan
          </h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-background hover:bg-gray-200 dark:hover:bg-gray-700 transitions-color"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-primary-foreground bg-primary hover:bg-secondary  transition-colors rounded-md"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Mobile Stats Only */}
        <div className="block md:hidden mb-6">
          <TaskStats stats={taskStats} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          {/* Left Section - Sama seperti sebelumnya untuk desktop */}
          <div className="hidden md:block md:col-span-1">
            <div className="bg-background rounded-lg shadow-md p-8 w-full">
              <TaskHeader />
              <TaskStats stats={taskStats} />
              <div className="mt-8">
                <button
                  onClick={() => setShowTypeDialog(true)}
                  className="w-full bg-primary text-primary-foreground px-4 py-3 rounded-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_8px_15px_rgba(0,0,0,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 hover:brightness-90 hover:scale-105 active:scale-95"
                >
                  <Plus
                    size={20}
                    className="transition-transform duration-300 hover:rotate-90"
                  />
                  <span className="font-semibold">Create Task</span>
                </button>
              </div>
            </div>
          </div>

          {/* Right Section - Task List */}
          <div className="md:col-span-2 flex flex-col">
            <div className="bg-background rounded-lg shadow-md p-6 flex-grow">
              <TaskNavigation
                currentView={currentView}
                setCurrentView={setCurrentView}
                trashedTasks={trashedTasks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showConfirmDialog={showConfirmDialog}
                setShowConfirmDialog={setShowConfirmDialog}
              />
              <TaskList
                tasks={filteredTasks}
                onToggleComplete={toggleComplete}
                onDelete={
                  currentView === "home" ? deleteTask : permanentlyDeleteTask
                }
                onUpdate={updateTask}
                onRestore={restoreTask}
                isTrash={currentView === "trash"}
                emptyMessage={
                  searchQuery
                    ? `No tasks found${
                        currentView === "trash" ? " in trash" : ""
                      }`
                    : currentView === "trash"
                    ? "Trash is empty"
                    : "Your tasks will show up here."
                }
              />
            </div>
          </div>
        </div>

        {/* Mobile Floating Action Button */}
        <button
          className="flex md:hidden fixed right-6 bottom-6 w-14 h-14 bg-primary text-primary-foreground rounded-full shadow-lg items-center justify-center transition-transform hover:scale-110 active:scale-95"
          onClick={() => setShowTypeDialog(true)}
        >
          <Plus size={24} />
        </button>
      </main>

      <TaskTypeDialog
        isOpen={showTypeDialog}
        onClose={() => setShowTypeDialog(false)}
        onSelectType={handleTypeSelect}
      />

      <TaskDialog isOpen={showForm}>
        {selectedTaskType === "text" ? (
          <TaskForm
            onSubmit={addTask}
            onClose={handleCloseForm}
            onBack={handleBackToTypeSelection}
            initialTaskType={selectedTaskType}
          />
        ) : (
          <ChecklistForm
            onSubmit={addTask}
            onClose={handleCloseForm}
            onBack={handleBackToTypeSelection}
          />
        )}
      </TaskDialog>

      <ConfirmDialog
        showConfirmDialog={showConfirmDialog}
        setShowConfirmDialog={setShowConfirmDialog}
        onConfirm={emptyTrash}
      />

      <Footer />
    </div>
  );
}