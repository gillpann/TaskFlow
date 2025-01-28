import { Home, Trash2, Search } from "lucide-react";

export default function TaskNavigation({
  currentView,
  setCurrentView,
  trashedTasks,
  searchQuery,
  setSearchQuery,
  showConfirmDialog,
  setShowConfirmDialog,
}) {
  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      {/* Navigation Buttons */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentView("home")}
          className={`flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg flex-1 sm:flex-initial ${
            currentView === "home"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Home size={20} />
          <span className="hidden sm:inline">Home</span>
        </button>
        <button
          onClick={() => setCurrentView("trash")}
          className={`flex items-center justify-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg relative flex-1 sm:flex-initial ${
            currentView === "trash"
              ? "bg-blue-100 text-blue-600"
              : "text-gray-600 hover:bg-gray-100"
          }`}
        >
          <Trash2 size={20} />
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
            className="flex items-center gap-1 p-2 sm:px-4 sm:py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Empty</span>
          </button>
        )}
      </div>

      {/* Search Box */}
      <div className="relative flex-1">
        <input
          type="text"
          placeholder="Search tasks..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={16}
        />
      </div>
    </div>
  );
}
