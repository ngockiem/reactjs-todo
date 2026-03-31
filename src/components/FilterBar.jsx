import { Search } from "lucide-react";
import { useTasks } from "../context/TaskContext";

const FILTERS = [
  {
    label: "Tất cả",
    value: "all",
  },
  {
    label: "Cao",
    value: "high",
  },
  {
    label: "Vừa",
    value: "medium",
  },
  {
    label: "Thấp",
    value: "low",
  },
];

const FilterBar = () => {
  const { filter, setFilter } = useTasks();

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-surface border border-solid border-border rounded-xs py-1.75 px-3 w-55 transition-colors duration-150">
        <Search size={13} />
        <input
          type="text"
          placeholder="Tìm kiếm task..."
          value={filter.search}
          onChange={(e) => setFilter({ ...filter, search: e.target.value })}
          className="border-none bg-transparent font-flex text-[13px] text-primary outline-none w-full"
        />
      </div>
      {/* Filter chips */}
      {FILTERS.map((f) => (
        <button
          key={f.value}
          className={`btn-filter ${filter.priority === f.value ? "active" : ""}`}
          onClick={() => setFilter({ ...filter, priority: f.value })}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
};

export default FilterBar;
