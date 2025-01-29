"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import Footer from "@/components/Footer";
import TaskDialog from "@/components/TaskDialog";
import TaskStats from "@/components/TaskStats";
import TaskHeader from "@/components/TaskHeader";
import TaskNavigation from "@/components/TaskNavigation";
import ConfirmDialog from "@/components/ConfirmDialog";

export default function HomePage() {
  const router = useRouter();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [currentView, setCurrentView] = useState("home");
  const [trashedTasks, setTrashedTasks] = useState([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    // Check for authentication
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    // Load tasks if authenticated
    const savedTasks = localStorage.getItem("tasks");
    const savedTrashedTasks = localStorage.getItem("trashedTasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedTrashedTasks) setTrashedTasks(JSON.parse(savedTrashedTasks));
  }, [router]);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("trashedTasks", JSON.stringify(trashedTasks));
  }, [tasks, trashedTasks]);

  // Update task statistics
  useEffect(() => {
    setTaskStats({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    });
  }, [tasks]);

  // Check for expired tasks
  useEffect(() => {
    const now = new Date();
    const updatedTasks = tasks.filter((task) => {
      if (task.type === "text" && task.dueDate) {
        const dueDate = new Date(task.dueDate);
        if (dueDate < now && !task.completed) {
          setTrashedTasks((prev) => [
            ...prev,
            { ...task, expiredAt: now.toISOString() },
          ]);
          return false;
        }
      }
      return true;
    });
    if (updatedTasks.length !== tasks.length) {
      setTasks(updatedTasks);
    }
  }, [tasks]);

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/auth/login");
  };

  const addTask = (task) => {
    setTasks([task, ...tasks]);
    setShowForm(false);
  };

  const toggleComplete = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTrashedTasks([
      { ...taskToDelete, deletedAt: new Date().toISOString() },
      ...trashedTasks,
    ]);
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
  };

  const restoreTask = (taskId) => {
    const taskToRestore = trashedTasks.find((task) => task.id === taskId);
    setTasks([taskToRestore, ...tasks]);
    setTrashedTasks(trashedTasks.filter((task) => task.id !== taskId));
  };

  const permanentlyDeleteTask = (taskId) => {
    setTrashedTasks(trashedTasks.filter((task) => task.id !== taskId));
  };

  const emptyTrash = () => {
    setTrashedTasks([]);
    setShowConfirmDialog(false);
  };

  const filteredTasks = (currentView === "home" ? tasks : trashedTasks).filter(
    (task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold">Welcome</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full">
          {/* Left Section */}
          <div className="md:col-span-1 flex items-center">
            <div className="bg-white rounded-lg shadow-md p-8 w-full">
              <TaskHeader />
              <TaskStats stats={taskStats} />
              <div className="mt-8">
                <button
                  onClick={() => setShowForm(true)}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors"
                >
                  <Plus size={20} />
                  Create Task
                </button>
              </div>
            </div>
          </div>

          {/* Right Section */}
          <div className="md:col-span-2 flex flex-col">
            <div className="bg-white rounded-lg shadow-md p-6 flex-grow mb-8">
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