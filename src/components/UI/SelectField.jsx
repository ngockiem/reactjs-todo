import { forwardRef } from "react";

const SelectField = forwardRef(
  ({ label, options, error, className, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {/* label */}
        {label && (
          <label className="text-[12px] font-medium text-secondary block mb-1.5">
            {label}
          </label>
        )}
        <select ref={ref} {...props} className={`input ${className}`}>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {error && (
          <p className="text-[11px] text-red-600 py-1.25 px-3 rounded-xs border border-solid border-red-400 bg-red-100 font-medium block mt-1.5">
            {error}
          </p>
        )}
      </div>
    );
  },
);

export default SelectField;
