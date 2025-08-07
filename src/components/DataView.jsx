import { Wind, Factory, CarFront } from "lucide-react";

const DataView = ({ onSelect, selected }) => {
  const items = [
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
        {items.map((item) => {
          const isActive = selected === item.label;

          return (
            <button
              key={item.label}
              onClick={() => onSelect(item.label)}
              className={`flex flex-col items-center gap-1 focus:outline-none cursor-pointer transition-all ${
                isActive
                  ? "text-blue-600 dark:text-blue-400 font-semibold"
                  : "text-gray-700 dark:text-gray-200"
              }`}
            >
              <div>{item.icon}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DataView;
