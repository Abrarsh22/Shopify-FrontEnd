import React, { useEffect, useState } from "react";
import en from "react-phone-number-input/locale/en";
import CountrySelectDropdown from '../../FormBuilderComponents/utils/CountrySelectDropdown'

const Country = ({ field }) => {
  const {
    label,
    placeholder,
    description,
    defaultCountry,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth
  } = field;

  const [country, setCountry] = useState('');

  useEffect(() => {
    setCountry(country);
  }, [country]);
  
  useEffect(() => {
    setCountry(defaultCountry);
  }, [defaultCountry]);

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
      <CountrySelectDropdown
        labels={en}
        value={country}
        onChange={setCountry}
        placeholder={placeholder}
        className="radio-dropdown-inputs"
      />
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Country;
