import { useState, useEffect } from "react";
import { X, ArrowLeft, Plus, Minus } from "lucide-react";

export default function ChecklistForm({
    onSubmit,
    onClose,
    onBack,
    initialData,
}) {
    const [checklistItems, setChecklistItems] = useState([
        { title: "", subtasks: [] },
    ]);

    useEffect(() => {
        if (initialData) {
        
        const subtasks = initialData.description
            ? initialData.description
                .split("\n")
                .map((task) => task.replace("• ", ""))
                .filter((task) => task.trim() !== "")
            : [];

        setChecklistItems([
            {
            title: initialData.text,
            subtasks: subtasks,
            },
        ]);
        }
    }, [initialData]);

    const handleAddItem = () => {
        if (checklistItems.length < 10) {
        setChecklistItems([...checklistItems, { title: "", subtasks: [] }]);
        }
    };

    const handleRemoveItem = (index) => {
        if (checklistItems.length > 1) {
        const newItems = checklistItems.filter((_, i) => i !== index);
        setChecklistItems(newItems);
        }
    };

    const handleTitleChange = (index, value) => {
        const newItems = [...checklistItems];
        newItems[index].title = value;
        setChecklistItems(newItems);
    };

    const handleAddSubtask = (itemIndex) => {
        const newItems = [...checklistItems];
        newItems[itemIndex].subtasks.push("");
        setChecklistItems(newItems);
    };

    const handleRemoveSubtask = (itemIndex, subtaskIndex) => {
        const newItems = [...checklistItems];
        newItems[itemIndex].subtasks = newItems[itemIndex].subtasks.filter(
        (_, i) => i !== subtaskIndex
        );
        setChecklistItems(newItems);
    };

    const handleSubtaskChange = (itemIndex, subtaskIndex, value) => {
        const newItems = [...checklistItems];
        newItems[itemIndex].subtasks[subtaskIndex] = value;
        setChecklistItems(newItems);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validItems = checklistItems.filter(
        (item) => item.title.trim() !== ""
        );
        if (validItems.length === 0) return;

        if (initialData) {
        
        onSubmit({
            text: validItems[0].title.trim(),
            description: validItems[0].subtasks
            .filter((subtask) => subtask.trim() !== "")
            .map((subtask) => `• ${subtask.trim()}`)
            .join("\n"),
            type: "checklist",
        });
        } else {
        
        const tasks = validItems.map((item) => ({
            id: Date.now().toString() + Math.random(),
            type: "checklist",
            text: item.title.trim(),
            description: item.subtasks
            .filter((subtask) => subtask.trim() !== "")
            .map((subtask) => `• ${subtask.trim()}`)
            .join("\n"),
            completed: false,
            createdAt: new Date().toISOString(),
        }));
        onSubmit(tasks);
        }
    };

    return (
        <div className="bg-background rounded-lg">
        <div className="flex justify-between items-center p-6 border-b">
            <div className="flex items-center gap-4">
            {onBack && (
                <button
                onClick={onBack}
                className="text-muted-foreground hover:text-foreground"
                >
                <ArrowLeft size={20} />
                </button>
            )}
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">
            {initialData ? "Edit Task" : "Create New Task"}
            </h2>
            </div>
            <button
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
            >
            <X size={20} />
            </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
            <div className="max-h-[60vh] overflow-y-auto space-y-6 pr-2">
            {checklistItems.map((item, itemIndex) => (
                <div key={itemIndex} className="bg-muted p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-4">
                    <input
                    type="text"
                    value={item.title}
                    onChange={(e) => handleTitleChange(itemIndex, e.target.value)}
                    placeholder={`Checklist item ${itemIndex + 1}`}
                    className="flex-1 p-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                    />
                    {!initialData && itemIndex > 0 && (
                    <button
                        type="button"
                        onClick={() => handleRemoveItem(itemIndex)}
                        className="px-3 py-1 text-sm text-destructive hover:bg-destructive/10 rounded-lg"
                    >
                        Remove
                    </button>
                    )}
                </div>

                
                <div className="pl-4 space-y-2">
                    {item.subtasks.map((subtask, subtaskIndex) => (
                    <div key={subtaskIndex} className="flex items-center gap-2">
                        <Minus size={16} className="text-muted-foreground" />
                        <input
                        type="text"
                        value={subtask}
                        onChange={(e) =>
                            handleSubtaskChange(
                            itemIndex,
                            subtaskIndex,
                            e.target.value
                            )
                        }
                        placeholder="Enter subtask"
                        className="flex-1 p-2 bg-background border rounded-lg focus:ring-2 focus:ring-primary text-foreground"
                        />
                        <button
                        type="button"
                        onClick={() =>
                            handleRemoveSubtask(itemIndex, subtaskIndex)
                        }
                        className="text-muted-foreground hover:text-destructive"
                        >
                        <X size={16} />
                        </button>
                    </div>
                    ))}
                </div>

                
                <button
                    type="button"
                    onClick={() => handleAddSubtask(itemIndex)}
                    className="mt-2 text-sm text-muted-foreground hover:text-primary flex items-center gap-1"
                >
                    <Plus size={16} />
                    Add Subtask
                </button>
                </div>
            ))}
            </div>
            
            {!initialData && (
            <button
                type="button"
                onClick={handleAddItem}
                className="mt-4 w-full flex items-center justify-center gap-2 p-3 rounded-lg bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
            >
                <Plus size={20} />
                Add New Item
            </button>
            )}

            <button
            type="submit"
            className="mt-4 w-full bg-primary text-primary-foreground p-3 rounded-lg hover:bg-primary/90 transition-colors"
            >
            {initialData ? "Update Task" : "Create Task"}
            </button>
        </form>
        </div>
    );
    }
