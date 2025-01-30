"use client";

import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import useTask from "@/hooks/useTask";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";
import TaskDialog from "@/components/TaskDialog";
import TaskStats from "@/components/TaskStats";
import TaskHeader from "@/components/TaskHeader";
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
    addTask,
    toggleComplete,
    deleteTask,
    updateTask,
    restoreTask,
    permanentlyDeleteTask,
    emptyTrash,
    filteredTasks,
  } = useTask(router);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/auth/login");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <header className="bg-background dark:bg-background shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Welcome Gilvan</h1>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-background dark:bg-background hover:bg-gray-200 dark:hover:bg-gray-700 transitions-color"
            >
              {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-sm text-foreground hover:text-gray-900 dark:hover:text-white transition "
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          {/* Left Section */}
          <div className="md:col-span-1 flex items-center">
            <div className="bg-background dark:bg-background rounded-lg shadow-md p-8 w-full">
              <TaskHeader />
              <TaskStats stats={taskStats} />
              <div className="mt-8">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-primary dark:bg-primary text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 dark:hover:bg-blue-800 transition-colors"
                >
                  <Plus size={20} />
                  Create Task
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:col-span-2 flex flex-col">
            <div className="bg-background dark:bg-background rounded-lg shadow-md p-6 flex-grow mb-8">
              <TaskNavigation
                currentView={currentView}
                setCurrentView={setCurrentView}
                trashedTasks={trashedTasks}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                showConfirmDialog={showConfirmDialog}
                setShowConfirmDialog={setShowConfirmDialog}
              />

              <div className="min-h-[500px]">
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
        </div>
      </main>

      <TaskDialog isOpen={showForm} onClose={() => setShowForm(false)}>
        <TaskForm onSubmit={addTask} onClose={() => setShowForm(false)} />
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