import { Search } from "lucide-react";

const FilterBar = () => {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2 bg-surface border border-solid border-border rounded-xs py-1.75 px-3 w-55 transition-colors duration-150">
        <Search size={13} />
        <input
          type="text"
          placeholder="Tìm kiếm task..."
          className="border-none bg-transparent font-flex text-[13px] text-primary outline-none w-full"
        />
      </div>
      <button className="btn-filter active">Tất cả</button>
      <button className="btn-filter">Cao</button>
      <button className="btn-filter">Hôm nay</button>
    </div>
  );
};

export default FilterBar;
