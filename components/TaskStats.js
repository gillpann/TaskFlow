export default function TaskStats({ stats }) {
  return (
    <div className="mt-6 grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="text-center">
        <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        <div className="text-xs text-gray-500">Total</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-green-600">
          {stats.completed}
        </div>
        <div className="text-xs text-gray-500">Done</div>
      </div>
      <div className="text-center">
        <div className="text-2xl font-bold text-orange-600">
          {stats.pending}
        </div>
        <div className="text-xs text-gray-500">Pending</div>
      </div>
    </div>
  );
}
