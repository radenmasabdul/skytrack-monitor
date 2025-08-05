const Stats = () => {
  const categories = [
    { label: "Baik", color: "bg-green-500" },
    { label: "Sedang", color: "bg-blue-500" },
    { label: "Tidak Sehat", color: "bg-yellow-400" },
    { label: "Sangat Tidak Sehat", color: "bg-red-500" },
    { label: "Berbahaya", color: "bg-black" },
  ];

  return (
    <div className="flex flex-row items-center border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-neutral-900 shadow w-fit">
      {categories.map((item, index) => (
        <div key={item.label} className="flex items-center gap-2">
          <div className={`w-4 h-4 ${item.color} rounded-sm`} />
          <span className="text-sm text-gray-800 dark:text-gray-100">
            {item.label}
          </span>
          {index !== categories.length - 1 && (
            <span className="mx-4 text-gray-400">|</span>
          )}
        </div>
      ))}
    </div>
  );
};

export default Stats;
