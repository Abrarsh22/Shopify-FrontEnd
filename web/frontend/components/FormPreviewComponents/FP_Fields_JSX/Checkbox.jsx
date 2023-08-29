import React, { useEffect, useState } from "react";
import "../FP_Fields_CSS/checkbox.css";
import "../../../assets/formbuilder-design.css";

const Checkbox = ({ field }) => {
  const {
    label,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth,
  } = field;

  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (e) => {
    const option = e.target.value;
    const isChecked = e.target.checked;

    setSelectedOptions((prevSelectedOptions) => {
      if (isChecked) {
        // add the option to the selected options array
        return [...prevSelectedOptions, option];
      } else {
        // remove the option from the selected options array
        return prevSelectedOptions.filter(
          (selectedOption) => selectedOption !== option
        );
      }
    });
  };

  useEffect(() => {
    setSelectedOptions(defaultOptionChecked);
  }, [defaultOptionChecked]);

  return (
    <div
      className="checkbox-previewer preview-component"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <div id="options" className="checkbox-preview-input">
        {options &&
          options.map((option, index) => (
            <label
              key={index}
              style={{
                display: "flex",
                gap: "5px",
                alignItems: "center",
                marginBottom: "2px",
              }}
            >
              <input
                type="checkbox"
                value={option}
                checked={selectedOptions?.includes(option)}
                onChange={handleOptionChange}
              />
              <span className="rfb-fields-inputs-check">{option}</span>
            </label>
          ))}
        {options.length === 0 && (
          <label style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <input type="checkbox" />
            <span className="rfb-fields-inputs-check">No options</span>
          </label>
        )}
      </div>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Checkbox;
