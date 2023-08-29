import en from "react-phone-number-input/locale/en";
import React, { useState, useEffect } from "react";
import { Icon } from "@shopify/polaris";
import {
  DeleteMinor,
  CaretUpMinor,
  CaretDownMinor,
} from "@shopify/polaris-icons";
import {
  handleLabelChange,
  handlePlaceholderChange,
  handleDescriptionChange,
  handleDefaultCountry,
  handleHideLabelChange,
  handleRequiredChange,
  handleNoteChange,
  handleDelete,
  handleInputWidthSizeChange,
} from "../../redux/handlers";
import DeleteWarningModel from "../DeleteWarningModel";
import CountrySelectDropdown from "../utils/CountrySelectDropdown";

const Country = ({ field }) => {
  const {
    id,
    label,
    placeholder,
    description,
    defaultCountry,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
  } = field;
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(defaultCountry);
  const [isDeleteField, setIsDeleteField] = useState(false);
  const handleDeleteDisplay = (value) => {
    setIsDeleteField(value);
  };

  useEffect(() => {
    if (!required || !hideLabel) {
      handleNoteChange(id, false);
    }
  }, [required, hideLabel]);


  useEffect(() => {
    handleDefaultCountry(id, country);
  }, [country]);

  const [activeButton, setActiveButton] = useState(1);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleInputWidthSize = (id, value) => {
    handleInputWidthSizeChange(id, value);
  };

  return (
    <div className="header-section">
      <div
        className="section-component-btn fields"
        onClick={() => setOpen(!open)}
      >
        <div className="btn-icon">
          <h2 className="section-button">{label}</h2>
        </div>
        <div className="btn-wrapper">
          <button
            className="delete-button"
            onClick={() => setIsDeleteField(true)}
          >
            <Icon source={DeleteMinor} color="base" className="icon" />
          </button>
          {isDeleteField && (
            <DeleteWarningModel
              label={label}
              id={id}
              handledelete={handleDelete}
              handleDeleteDisplay={handleDeleteDisplay}
            />
          )}
          <button className="dropdown-button">
            {open ? (
              <Icon source={CaretUpMinor} color="base" />
            ) : (
              <Icon source={CaretDownMinor} color="base" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="phone-container">
          <div className="hr-line-layout-fields"></div>
          <div className="phone-label">
            <div className="">
              <label className="">Label</label>
            </div>
            <input
              className="phone-inputs"
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(id, e.target.value)}
            />
            <div className="">
              <label className="">Placeholder</label>
            </div>
            <input
              className="phone-inputs"
              type="text"
              value={placeholder}
              onChange={(e) => handlePlaceholderChange(id, e.target.value)}
            />
            <div className="">
              <label className="">Description</label>
            </div>
            <input
              className="phone-inputs"
              type="text"
              value={description}
              onChange={(e) => handleDescriptionChange(id, e.target.value)}
            />
            <div className="">
              <label>Select default Country</label>
              <CountrySelectDropdown
                labels={en}
                value={country}
                onChange={setCountry}
                placeholder={placeholder}
                className="radio-dropdown-inputs"
              />
            </div>
            <div className="checkbox-check-inputs">
              <label>
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={hideLabel}
                  onChange={(e) => handleHideLabelChange(id, e.target.checked)}
                />
                <span>Hide Label</span>
              </label>
            </div>
            <div className="checkbox-check-inputs">
              <label>
                <input
                  className="checkbox-input"
                  type="checkbox"
                  checked={required}
                  onChange={(e) => handleRequiredChange(id, e.target.checked)}
                />
                <span>Required</span>
              </label>
            </div>
            {required && hideLabel && (
              <div className="checkbox-check-inputs">
                <label>
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    checked={displayRequiredNoteOnLabelHide}
                    onChange={(e) => handleNoteChange(id, e.target.checked)}
                  />
                  <span>Show required note if hide label?</span>
                </label>
              </div>
            )}
            Width
            <div className="width-property">
              <button
                className={`half
                    ${activeButton === 0 ? "active" : ""}
                    `}
                onClick={() => {
                  handleInputWidthSize(id, "49%");
                  handleButtonClick(0);
                }}
              >
                50%
              </button>
              <button
                className={`full
                  ${activeButton === 1 ? "active" : ""}
                `}
                onClick={() => {
                  handleInputWidthSize(id, "100%");
                  handleButtonClick(1);
                }}
              >
                100%
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Country;
