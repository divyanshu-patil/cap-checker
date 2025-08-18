import React, { Dispatch, SelectHTMLAttributes, SetStateAction } from "react";

interface CapSelectorProps extends SelectHTMLAttributes<HTMLSelectElement> {
  onValueChange: Dispatch<SetStateAction<number>>;
}

const CapSelector = ({ value, onValueChange, ...props }: CapSelectorProps) => {
  return (
    <section className="w-full">
      <h2 className="text-xl font-semibold mb-4">Select Cap Rounds</h2>
      <select
        name="cap-selector"
        id="cap-selector"
        value={value}
        onChange={(e) => onValueChange(parseInt(e.target.value))}
        className="w-full text-white border-2 border-neutral-700 bg-neutral-900 px-4 py-2 rounded-2xl"
        {...props}
      >
        <option value="0">All 1, 2, 3, 4 Cap round PDFs</option>
        {[1, 2, 3, 4].map((value, index) => (
          <option key={index} value={value}>
            Cap {value} PDFs
          </option>
        ))}
      </select>
    </section>
  );
};

export default CapSelector;
