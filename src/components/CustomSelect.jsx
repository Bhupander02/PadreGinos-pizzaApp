import { useState, useRef, useEffect } from "react";
import "./CustomSelectStyle.css";

export default function CustomSelect({ value, onChange, options, name, id }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="custom-select" ref={dropdownRef}>
      {/* Selected value display */}
      <div className="custom-select-trigger" onClick={() => setIsOpen(!isOpen)}>
        {selectedOption?.label || "Select..."}
        <span className={`arrow ${isOpen ? "open" : ""}`}>▼</span>
      </div>

      {/* Dropdown options */}
      {isOpen && (
        <div className="custom-select-options">
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select-option ${value === option.value ? "selected" : ""}`}
              onClick={() => {
                onChange({ target: { value: option.value, name } });
                setIsOpen(false);
              }}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
