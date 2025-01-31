"use client"

import { useState, useEffect } from "react";
import { useToast } from "@/hooks/useToast";

export default function useTask(router) {
    const { toast } = useToast();
    const [theme, setTheme] = useState("light");
    const [tasks, setTasks] = useState([]);
    const [trashedTasks, setTrashedTasks] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [currentView, setCurrentView] = useState("home");
    const [showConfirmDialog, setShowConfirmDialog] = useState(false);
    const [taskStats, setTaskStats] = useState({
        total: 0,
        completed: 0,
        pending: 0,
    });
    const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    document.cookie =
      "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
    router.push("/auth/login");
  };

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      router.push("/auth/login");
      return;
    }

    const savedTasks = localStorage.getItem("tasks");
    const savedTrashedTasks = localStorage.getItem("trashedTasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
    if (savedTrashedTasks) setTrashedTasks(JSON.parse(savedTrashedTasks));
  }, [router]);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    localStorage.setItem("trashedTasks", JSON.stringify(trashedTasks));
  }, [tasks, trashedTasks]);

  useEffect(() => {
    setTaskStats({
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
    });
  }, [tasks]);

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

  const addTask = (task) => {
    setTasks([task, ...tasks]);
    setShowForm(false);
    toast({
      title: "Success",
      description: "Task created successfully",
      variant: "success",
    });
  };

  const toggleComplete = (taskId) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      );

      const sortedTasks = [
        ...updatedTasks.filter((task) => !task.completed), 
        ...updatedTasks.filter((task) => task.completed), 
      ];

      return sortedTasks;
    });

    toast({
      title: "Success",
      description: "Task status updated",
      variant: "success",
    });
  };

  const deleteTask = (taskId) => {
    const taskToDelete = tasks.find((task) => task.id === taskId);
    setTrashedTasks([
      { ...taskToDelete, deletedAt: new Date().toISOString() },
      ...trashedTasks,
    ]);
    setTasks(tasks.filter((task) => task.id !== taskId));
    toast({
      title: "Success",
      description: "Task moved to trash",
      variant: "success",
    });
  };

  const updateTask = (taskId, updatedTask) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, ...updatedTask } : task
      )
    );
    toast({
      title: "Success",
      description: "Task updated successfully",
      variant: "success",
    });
  };

  const restoreTask = (taskId) => {
    const taskToRestore = trashedTasks.find((task) => task.id === taskId);
    setTasks([taskToRestore, ...tasks]);
    setTrashedTasks(trashedTasks.filter((task) => task.id !== taskId));
    toast({
      title: "Success",
      description: "Task restored successfully",
      variant: "success",
    });
  };

  const permanentlyDeleteTask = (taskId) => {
    setTrashedTasks(trashedTasks.filter((task) => task.id !== taskId));
    toast({
      title: "Success",
      description: "Task permanently deleted",
      variant: "success",
    });
  };

  const emptyTrash = () => {
    setTrashedTasks([]);
    setShowConfirmDialog(false);
    toast({
      title: "Success",
      description: "Trash emptied successfully",
      variant: "success",
    });
  };

  const filteredTasks = (currentView === "home" ? tasks : trashedTasks).filter(
    (task) =>
      task.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return {
    tasks,
    setTasks,
    trashedTasks,
    setTrashedTasks,
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
  };
}
