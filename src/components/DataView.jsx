import { LayoutGrid, Wind, Factory, CarFront } from "lucide-react"; // Icon dari lucide-react

const DataView = () => {
  const items = [
    { label: "Grid", icon: <LayoutGrid size={20} /> },
    { label: "Udara", icon: <Wind size={20} /> },
    { label: "Pabrik", icon: <Factory size={20} /> },
    { label: "Kendaraan", icon: <CarFront size={20} /> },
  ];

  return (
    <div className="flex flex-col gap-2 p-4 bg-white dark:bg-neutral-900 rounded-md shadow w-fit border border-gray-300 dark:border-gray-600">
      <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100">
        Data View
      </h2>
      <div className="flex items-center gap-6">
        {items.map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <div className="text-gray-700 dark:text-gray-200">{item.icon}</div>
            <span className="text-xs text-gray-600 dark:text-gray-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DataView;
