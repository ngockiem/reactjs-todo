import { Clock, EllipsisVertical } from "lucide-react";
import PriorityLabel from "./PriorityLabel";
const TaskCard = ({ type, title, content, tags, priority }) => {
  return (
    <div data-type={type} className="task-card">
      <div className="flex items-start justify-between gap-2 mb-2">
        <h4 className="text-[13px] font-medium leading-[1.4] text-primary capitalize">
          {title}
        </h4>
        <button className="w-5.5 h-5.5 flex items-center justify-center rounded-sm text-muted cursor-pointer shrink-0 border-none bg-none hover:text-primary hover:bg-surface2">
          <EllipsisVertical size={16} className="stroke-muted" />
        </button>
      </div>
      {/* content */}
      <p className="text-[12px] text-secondary leading-normal mb-3 font-light">
        {content}
      </p>
      {/* tags */}
      <div className="flex flex-wrap gap-1.25 mb-3">
        {tags.length > 0 &&
          tags.map((tag, index) => (
            <span key={index} className="tag">
              {tag}
            </span>
          ))}
      </div>
      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 text-[11px] text-muted`}>
          <Clock size={10} className="stroke-muted" />
          <span>20/03</span>
        </div>
        <PriorityLabel priority={priority} />
      </div>
    </div>
  );
};

export default TaskCard;
