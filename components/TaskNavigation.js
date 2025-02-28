"use client";

import {
  Home,
  Trash2,
  Search,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useRef, useEffect } from "react";

export default function TaskNavigation({
  currentView,
  setCurrentView,
  trashedTasks,
  searchQuery,
  setSearchQuery,
  showConfirmDialog,
  setShowConfirmDialog,
  showCalendar,
  setShowCalendar,
  handleSearch,
  goToPreviousMonth,
  goToNextMonth,
  goToCurrentMonth,
  getMonthName,
  generateCalendarDays,
  getTasksForMonth,
}) {
  const searchInputRef = useRef(null);
  const calendarRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (calendarRef.current && !calendarRef.current.contains(event.target)) {
        setShowCalendar(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setShowCalendar]);

  const handleSearchClick = () => {
    handleSearch();
    searchInputRef.current.focus();
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentView("home")}
          className={`flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg flex-1 sm:flex-initial transition-all ${
            currentView === "home"
              ? "bg-background text-primary"
              : "text-foreground hover:text-primary dark:hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <Home size={20} className="transition-all hover:scale-110" />
          <span className="hidden sm:inline">Home</span>
        </button>
        <button
          onClick={() => setCurrentView("trash")}
          className={`flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg relative flex-1 sm:flex-initial transition-all ${
            currentView === "trash"
              ? "bg-background text-primary"
              : "text-foreground hover:text-primary dark:hover:text-primary hover:bg-gray-200 dark:hover:bg-gray-700"
          }`}
        >
          <Trash2 size={20} className="transition-all hover:scale-110" />
          <span className="hidden sm:inline">Trash</span>
          {trashedTasks.length > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 flex items-center justify-center text-xs bg-red-500 text-white rounded-full">
              {trashedTasks.length}
            </span>
          )}
        </button>

        {currentView === "trash" && trashedTasks.length > 0 && (
          <button
            onClick={() => setShowConfirmDialog(true)}
            className="flex items-center gap-1 p-2 sm:px-4 sm:py-2 text-red-600 rounded-lg hover:bg-red-100 dark:hover:bg-red-100 transition-all"
          >
            <Trash2 size={18} className="transition-all hover:scale-110" />
            <span className="hidden sm:inline">Empty</span>
          </button>
        )}
      </div>

      {/* Search Box */}
      <div className="relative flex-1">
        <input
          ref={searchInputRef}
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSearch()}
          className="w-full pl-9 pr-10 py-2 border rounded-lg focus:ring-2 focus:border-border"
        />
        <button
          onClick={handleSearchClick}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground transition-all hover:scale-110 cursor-pointer"
        >
          <Search size={16} />
        </button>

        {/* Calendar Button */}
        <button
          onClick={() => setShowCalendar(!showCalendar)}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground transition-all hover:scale-110 cursor-pointer"
        >
          <Calendar size={16} />
        </button>

        {/* Calendar Popup */}
        {showCalendar && (
          <div
            ref={calendarRef}
            className="absolute right-0 mt-2 bg-background border border-border rounded-lg shadow-lg p-4 z-10 w-72"
          >
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={goToPreviousMonth}
                className="text-foreground hover:text-primary transition-all hover:scale-110"
              >
                <ChevronLeft size={18} />
              </button>

              <h3 className="font-medium text-foreground">{getMonthName()}</h3>

              <button
                onClick={goToNextMonth}
                className="text-foreground hover:text-primary transition-all hover:scale-110"
              >
                <ChevronRight size={18} />
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center mb-2">
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
                <div
                  key={day}
                  className="text-xs font-medium text-muted-foreground"
                >
                  {day}
                </div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1">
              {generateCalendarDays().map((day) => {
                if (day.type === "empty") {
                  return <div key={day.key} className="w-8 h-8"></div>;
                }

                return (
                  <div
                    key={day.key}
                    className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer transition-colors
                      ${day.isToday ? "bg-primary text-primary-foreground" : ""}
                      ${
                        day.hasTasks && !day.isToday
                          ? "bg-primary/20 text-primary font-medium"
                          : ""
                      }
                      hover:bg-primary/30`}
                    onClick={() => {
                      // You could implement a feature to show tasks for this specific date
                      console.log(`Clicked on ${day.date.toDateString()}`);
                    }}
                  >
                    {day.day}
                  </div>
                );
              })}
            </div>

            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={goToCurrentMonth}
                className="text-xs text-primary hover:underline"
              >
                Today
              </button>

              <div className="text-xs text-muted-foreground">
                {getTasksForMonth()} task{getTasksForMonth() !== 1 ? "s" : ""}{" "}
                this month
              </div>

              <button
                onClick={() => setShowCalendar(false)}
                className="text-xs text-muted-foreground hover:text-foreground"
              >
                Close
              </button>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary/20"></div>
                <span>Has tasks</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-3 h-3 rounded-full bg-primary"></div>
                <span>Today</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
