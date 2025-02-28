"use client";

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
  const [showTypeDialog, setShowTypeDialog] = useState(false);
  const [selectedTaskType, setSelectedTaskType] = useState(null);
  const [taskStats, setTaskStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });
  const [searchQuery, setSearchQuery] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarTasks, setCalendarTasks] = useState([]);
  const [calendarDate, setCalendarDate] = useState(() => {
    const today = new Date();
    return {
      month: today.getMonth(),
      year: today.getFullYear(),
    };
  });

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

  useEffect(() => {
    const tasksWithDueDates = tasks.filter(
      (task) => task.type === "text" && task.dueDate
    );

    const sortedTasks = tasksWithDueDates.sort((a, b) => {
      const dateA = new Date(a.dueDate);
      const dateB = new Date(b.dueDate);
      return dateA - dateB;
    });

    setCalendarTasks(sortedTasks);
  }, [tasks]);

  const goToPreviousMonth = () => {
    setCalendarDate((prev) => {
      const newMonth = prev.month === 0 ? 11 : prev.month - 1;
      const newYear = prev.month === 0 ? prev.year - 1 : prev.year;
      return { month: newMonth, year: newYear };
    });
  };

  const goToNextMonth = () => {
    setCalendarDate((prev) => {
      const newMonth = prev.month === 11 ? 0 : prev.month + 1;
      const newYear = prev.month === 11 ? prev.year + 1 : prev.year;
      return { month: newMonth, year: newYear };
    });
  };

  const goToCurrentMonth = () => {
    const today = new Date();
    setCalendarDate({
      month: today.getMonth(),
      year: today.getFullYear(),
    });
  };

  const hasTasksOnDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return calendarTasks.some((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
      return taskDate === dateStr;
    });
  };

  const getTasksForMonth = () => {
    const { month, year } = calendarDate;
    const tasksInMonth = calendarTasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate);
      return taskDate.getMonth() === month && taskDate.getFullYear() === year;
    });

    return tasksInMonth.length;
  };

  const getTasksForDate = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    return calendarTasks.filter((task) => {
      if (!task.dueDate) return false;
      const taskDate = new Date(task.dueDate).toISOString().split("T")[0];
      return taskDate === dateStr;
    });
  };

  const getMonthName = () => {
    const { month, year } = calendarDate;
    return new Date(year, month, 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  const generateCalendarDays = () => {
    const { month, year } = calendarDate;
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const currentDay = today.getDate();

    const firstDay = new Date(year, month, 1).getDay();

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const calendarDays = [];

    for (let i = 0; i < firstDay; i++) {
      calendarDays.push({ type: "empty", key: `empty-${i}` });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(year, month, i);
      const isToday =
        i === currentDay && month === currentMonth && year === currentYear;
      const hasTasks = hasTasksOnDate(date);

      calendarDays.push({
        type: "day",
        key: `day-${i}`,
        day: i,
        date: date,
        isToday: isToday,
        hasTasks: hasTasks,
      });
    }

    return calendarDays;
  };

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

  const handleSearch = () => {
    toast({
      title: "Search",
      description: searchQuery
        ? `Searching for "${searchQuery}"`
        : "Please enter a search term",
      variant: searchQuery ? "success" : "info",
    });
  };

  const addTask = (task) => {
    if (Array.isArray(task)) {
      setTasks((prevTasks) => [...task, ...prevTasks]);
    } else {
      setTasks((prevTasks) => [task, ...prevTasks]);
    }
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
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId) {
          if (task.type === "checklist") {
            return {
              ...task,
              text: updatedTask.text,
              description: updatedTask.description,
              type: "checklist",
            };
          }
          return {
            ...task,
            ...updatedTask,
            description: updatedTask.description || task.description,
            type: updatedTask.type || task.type,
          };
        }
        return task;
      })
    );
    toast({
      title: "Success",
      description: "Task updated successfully",
      variant: "success",
    });
  };

  const restoreTask = (taskId) => {
    const taskToRestore = trashedTasks.find((task) => task.id === taskId);

    if (taskToRestore.expiredAt) {
      toast({
        title: "Cannot Restore",
        description: "This task has expired and cannot be restored",
        variant: "error",
      });
      return;
    }
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

  const handleTypeSelect = (type) => {
    setSelectedTaskType(type);
    setShowTypeDialog(false);
    setShowForm(true);
  };

  const handleBackToTypeSelection = () => {
    setShowForm(false);
    setShowTypeDialog(true);
    setSelectedTaskType(null);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setSelectedTaskType(null);
  };

  const toggleChecklistItem = (taskId, itemId) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) => {
        if (task.id === taskId && task.type === "checklist") {
          const updatedItems = task.checklistItems.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
          );

          const allCompleted = updatedItems.every((item) => item.completed);

          return {
            ...task,
            checklistItems: updatedItems,
            completed: allCompleted,
          };
        }
        return task;
      })
    );
  };

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
    showTypeDialog,
    setShowTypeDialog,
    selectedTaskType,
    setSelectedTaskType,
    handleTypeSelect,
    handleBackToTypeSelection,
    handleCloseForm,
    toggleChecklistItem,
    showCalendar,
    setShowCalendar,
    calendarTasks,
    calendarDate,
    setCalendarDate,
    goToPreviousMonth,
    goToNextMonth,
    goToCurrentMonth,
    hasTasksOnDate,
    getTasksForMonth,
    getTasksForDate,
    getMonthName,
    generateCalendarDays,
    handleSearch,
  };
}
