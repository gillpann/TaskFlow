import { X, CheckSquare, FileText, StickyNote } from "lucide-react";

export default function TaskTypeDialog({ isOpen, onClose, onSelectType }) {
    if (!isOpen) return null;

    const taskTypes = [
        {
        id: "checklist",
        icon: CheckSquare,
        title: "Checklist",
        description: "Create a list of tasks with checkable sub-tasks",
        },
        {
        id: "text",
        icon: FileText,
        title: "Text",
        description: "Simple task with description and deadline",
        },
    ];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center z-50">
        <div className="bg-background text-foreground rounded-lg shadow-xl w-full max-w-md mx-4">
            <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold">SELECT TASK TYPE</h2>
            <button
                onClick={onClose}
                className="text-muted-foreground hover:text-foreground"
            >
                <X size={20} />
            </button>
            </div>
            <div className="p-6 space-y-4">
            {taskTypes.map((type) => (
                <button
                key={type.id}
                onClick={() => onSelectType(type.id)}
                className="w-full p-4 text-left bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg transition-all duration-300 group"
                >
                <div className="flex items-center gap-4">
                    <div className="p-2 bg-background rounded-lg group-hover:bg-primary-foreground/10">
                    <type.icon size={24} />
                    </div>
                    <div>
                    <h3 className="font-medium">{type.title}</h3>
                    <p className="text-sm text-muted-foreground group-hover:text-primary-foreground/80">
                        {type.description}
                    </p>
                    </div>
                </div>
                </button>
            ))}
            </div>
        </div>
        </div>
    );
}
