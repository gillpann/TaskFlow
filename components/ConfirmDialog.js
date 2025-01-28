import { AlertCircle } from "lucide-react";
import TaskDialog from "./TaskDialog";

export default function ConfirmDialog({ 
  showConfirmDialog, 
  setShowConfirmDialog, 
  onConfirm 
}) {
  return (
    <TaskDialog
      isOpen={showConfirmDialog}
      onClose={() => setShowConfirmDialog(false)}
    >
      <div className="text-center p-4">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">
          Empty Trash?
        </h3>
        <p className="text-sm text-gray-500 mb-6">
          This action cannot be undone. All tasks in trash will be permanently
          deleted.
        </p>
        <div className="flex justify-end gap-4">
          <button
            onClick={() => setShowConfirmDialog(false)}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Delete All
          </button>
        </div>
      </div>
    </TaskDialog>
  );
}