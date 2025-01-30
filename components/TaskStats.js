export default function TaskStats({ stats }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-background dark:bg-background rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-xs text-foreground dark:text-foreground">Total</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {stats.completed}
        </div>
        <div className="text-xs text-foreground dark:text-foreground">Done</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">
          {stats.pending}
        </div>
        <div className="text-xs text-foreground dark:text-foreground">Pending</div>
      </div>
    </div>
  );
}
