export default function TaskStats({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-2 bg-background rounded-lg p-4 shadow-sm">
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-blue-600">{stats.total}</div>
          <div className="text-xs text-muted-foreground">Total</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-green-600">{stats.completed}</div>
          <div className="text-xs text-muted-foreground">Done</div>
        </div>
        <div className="text-center">
          <div className="text-xl sm:text-2xl font-bold text-orange-600">{stats.pending}</div>
          <div className="text-xs text-muted-foreground">Pending</div>
        </div>
      </div>
  );
}
