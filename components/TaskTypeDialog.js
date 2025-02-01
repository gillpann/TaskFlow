import { X } from "lucide-react";

export default function TaskTypeDialog({ isOpen, onClose, onSelectType }) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center z-50">
        <div className="bg-background text-foreground rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">ADD NEW TASK</h2>
            <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
            >
                <X size={20} />
            </button>
            </div>
            <div className="p-6 space-y-4">
            <button
                onClick={() => onSelectType("checklist")}
                className="w-full p-4 text-center bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
            >
                Checklist
            </button>
            <button
                onClick={() => onSelectType("text")}
                className="w-full p-4 text-center bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-colors"
            >
                Text
            </button>
            </div>
        </div>
        </div>
    );
}
