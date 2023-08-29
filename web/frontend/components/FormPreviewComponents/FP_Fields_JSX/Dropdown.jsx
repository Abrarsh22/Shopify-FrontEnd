import React, { useEffect, useState } from "react";

const Dropdown = ({ field }) => {
  const {
    label,
    placeholder,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
  } = field;

  const [selectedOption, setSelectedOption] = useState("");

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    setSelectedOption(defaultOptionChecked);
  }, [defaultOptionChecked]);

  return (
    <div
      className="radio-previewer preview-component"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
          )}
      </label>
      <select className="radio-dropdown-inputs" value={selectedOption} onChange={handleOptionChange}>
        {placeholder && (
          <option value="">{placeholder}</option>
        )}
        {options &&
          options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))}
      </select>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Dropdown;
