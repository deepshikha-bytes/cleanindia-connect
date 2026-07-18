function StatCard({ title, value, description }) {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-green-100 p-6">
      <p className="text-gray-500 text-sm font-medium">{title}</p>
      <h2 className="text-4xl font-bold text-green-700 mt-3">{value}</h2>
      <p className="text-gray-600 text-sm mt-3">{description}</p>
    </div>
  );
}

export default StatCard;