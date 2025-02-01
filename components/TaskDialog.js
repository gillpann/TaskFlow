"use client";

export default function TaskDialog({ isOpen, children }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-filter backdrop-blur-lg flex items-center justify-center z-50">
      <div className="bg-background text-foreground rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="px-6 pb-6">{children}</div>
      </div>
    </div>
  );
}
