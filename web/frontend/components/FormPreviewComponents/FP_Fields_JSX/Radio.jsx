import React, { useEffect, useState } from "react";
import "../FP_Fields_CSS/radio.css";
import "../../../assets/formbuilder-design.css";

const Radio = ({ field }) => {
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

  const [selectedOption, setSelectedOption] = useState(defaultOptionChecked);

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
      <div id="options" className="radio-preview-input">
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
                required={required}
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              <span className="rfb-fields-inputs-check">{option}</span>
            </label>
          ))}
        {options.length === 0 && (
          <label style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <input type="radio" />
            <span className="rfb-fields-inputs-check">No options</span>
          </label>
        )}
      </div>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Radio;
