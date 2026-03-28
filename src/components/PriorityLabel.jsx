import { ListChevronsUpDown } from "lucide-react";

const PriorityLabel = ({ priority }) => {
  return (
    <div className="flex items-center gap-0.75 text-[11px] font-medium">
      {priority === "high" && (
        <>
          <ListChevronsUpDown size={10} className="stroke-[#EF4444]" />
          <span className="text-[#EF4444]">Cao</span>
        </>
      )}
      {priority === "medium" && (
        <>
          <ListChevronsUpDown size={10} className="stroke-[#F59E0B]" />
          <span className="text-[#F59E0B]">Vừa</span>
        </>
      )}
      {priority === "low" && (
        <>
          <ListChevronsUpDown size={10} className="stroke-[#10B981]" />
          <span className="text-[#10B981]">Thấp</span>
        </>
      )}
    </div>
  );
};

export default PriorityLabel;
