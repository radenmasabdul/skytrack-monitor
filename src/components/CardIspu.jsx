import { useState } from "react";
import { Wifi, ChevronRight, ChevronLeft, Search } from "lucide-react";

const CardIspu = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [parameterFilter, setParameterFilter] = useState("All");
  const [jenisFilter, setJenisFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");

  const data = [
    {
      id: 1,
      parameter: "SO₂",
      stasiun: "Jakarta Utara",
      jenisStasiun: "Reference",
      value: 209,
    },
    {
      id: 2,
      parameter: "HC",
      stasiun: "Jakarta Timur",
      jenisStasiun: "Low Cost",
      value: 160,
    },
    {
      id: 3,
      parameter: "O₃",
      stasiun: "Jakarta Barat",
      jenisStasiun: "Fix",
      value: 110,
    },
    {
      id: 4,
      parameter: "HC",
      stasiun: "Jakarta Selatan",
      jenisStasiun: "Low Cost",
      value: 45,
    },
    {
      id: 5,
      parameter: "S0",
      stasiun: "Jakarta Pusat",
      jenisStasiun: "Fix",
      value: 90,
    },
  ];

  const getShortCode = (jenis) => {
    switch (jenis) {
      case "Reference":
        return "R";
      case "Low Cost":
        return "LC";
      case "Fix":
        return "L";
      default:
        return "";
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const filteredData = data
    .filter(
      (item) =>
        (parameterFilter === "All" || item.parameter === parameterFilter) &&
        (jenisFilter === "All" || item.jenisStasiun === jenisFilter) &&
        item.stasiun.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) =>
      sortOrder === "asc" ? a.value - b.value : b.value - a.value
    );

  const uniqueParams = [...new Set(data.map((d) => d.parameter))];
  const uniqueJenis = [...new Set(data.map((d) => d.jenisStasiun))];

  const getColorByValue = (value) => {
    if (value <= 50) return "bg-green-600";
    if (value <= 100) return "bg-blue-600";
    if (value <= 150) return "bg-yellow-500";
    if (value <= 200) return "bg-red-600";
    return "bg-black";
  };

  return (
    <div
      className={`bg-white dark:bg-neutral-900 rounded-xl shadow border border-gray-300 dark:border-neutral-700 overflow-hidden transition-all duration-500 ease-in-out ${
        isExpanded ? "w-[950px]" : "w-80"
      }`}
    >
      <div className="flex flex-col divide-y divide-gray-200 dark:divide-white/10 gap-3 p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold text-gray-900 dark:text-white">
            ISPU Rank
          </h2>
          {isExpanded ? (
            <ChevronLeft
              className="w-5 h-5 text-gray-800 dark:text-white cursor-pointer"
              onClick={toggleExpand}
            />
          ) : (
            <ChevronRight
              className="w-5 h-5 text-gray-800 dark:text-white cursor-pointer"
              onClick={toggleExpand}
            />
          )}
        </div>

        {!isExpanded ? (
          filteredData.slice(0, 3).map((item) => (
            <div key={item.id} className="flex items-center justify-between">
              <div className="flex items-center gap-5 justify-between">
                <span className="font-semibold text-gray-900 dark:text-white">
                  {item.parameter}
                </span>
                <Wifi className="w-4 h-4 text-gray-800 dark:text-white opacity-80" />
                <span className="text-sm text-gray-900 dark:text-white">
                  {item.stasiun}
                </span>
                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded-sm bg-black/5 dark:bg-white/10 text-gray-800 dark:text-white border border-gray-300 dark:border-white/20">
                  {getShortCode(item.jenisStasiun)}
                </span>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-white text-sm font-bold ${getColorByValue(
                  item.value
                )}`}
              >
                {item.value}
              </span>
            </div>
          ))
        ) : (
          <div className="text-gray-900 dark:text-white text-sm py-2">
            <div className="flex flex-row justify-between gap-4">
              <div className="flex flex-col">
                <div className="border border-gray-300 dark:border-neutral-700 rounded-md px-4 py-2 bg-white dark:bg-neutral-800 shadow w-52">
                  <label className="text-xs text-gray-800 dark:text-white mb-1 block">
                    PARAMETER
                  </label>
                  <select
                    className="w-full bg-white dark:bg-neutral-700 text-gray-800 dark:text-white rounded px-2 py-1 border border-gray-300 dark:border-white/10 text-sm"
                    value={parameterFilter}
                    onChange={(e) => setParameterFilter(e.target.value)}
                  >
                    <option value="All">Semua</option>
                    {uniqueParams.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="h-px bg-gray-600 dark:border-gray-300 my-4" />
                <div className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-neutral-900 shadow w-full">
                  <label className="text-xs text-gray-800 dark:text-white mb-1 block">
                    JENIS STASIUN
                  </label>
                  <select
                    className="w-full bg-white dark:bg-neutral-700 text-gray-800 dark:text-white rounded px-2 py-1 border border-gray-300 dark:border-white/10 text-sm"
                    value={jenisFilter}
                    onChange={(e) => setJenisFilter(e.target.value)}
                  >
                    <option value="All">Semua</option>
                    {uniqueJenis.map((j) => (
                      <option key={j} value={j}>
                        {j}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="border border-gray-300 dark:border-gray-600 rounded-md px-4 py-2 bg-white dark:bg-neutral-900 shadow w-full">
                <div className="flex flex-row item-center justify-between">
                  <div className="relative w-full">
                    <Search className="absolute left-2 top-2.5 w-4 h-4 text-gray-400 dark:text-white/50" />
                    <input
                      type="text"
                      placeholder="Cari peringkat berdasarkan stasiun"
                      className="pl-8 pr-3 py-2 w-full bg-white dark:bg-neutral-700 text-gray-800 dark:text-white rounded border border-gray-300 dark:border-white/10 text-sm"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2 ml-4">
                    <select
                      className="bg-white dark:bg-neutral-700 text-gray-800 dark:text-white rounded px-2 py-1 border border-gray-300 dark:border-white/10 text-sm"
                      value={sortOrder}
                      onChange={(e) => setSortOrder(e.target.value)}
                    >
                      <option value="desc">Terburuk</option>
                      <option value="asc">Terbaik</option>
                    </select>
                  </div>
                </div>

                <div
                  className={`${
                    filteredData.length > 5
                      ? "overflow-x-scroll overflow-y-scroll max-h-64"
                      : ""
                  }`}
                >
                  <table className="w-full text-sm text-gray-900 dark:text-white border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300 dark:border-white/10 text-left">
                        <th className="py-2">No</th>
                        <th>Parameter</th>
                        <th>Stasiun</th>
                        <th>Jenis Stasiun</th>
                        <th>Nilai ISPU</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredData.map((item, idx) => (
                        <tr
                          key={item.id}
                          className="border-b border-gray-200 dark:border-white/10"
                        >
                          <td className="py-2">{idx + 1}</td>
                          <td>{item.parameter}</td>
                          <td>{item.stasiun}</td>
                          <td>
                            <span className="text-[11px] px-2 py-0.5 bg-black/5 dark:bg-white/10 text-gray-800 dark:text-white rounded border border-gray-300 dark:border-white/20">
                              {getShortCode(item.jenisStasiun)}
                            </span>
                          </td>
                          <td>
                            <span
                              className={`px-3 py-1 rounded-full text-white font-bold ${getColorByValue(
                                item.value
                              )}`}
                            >
                              {item.value}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CardIspu;
