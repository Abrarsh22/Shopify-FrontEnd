import React, { useState, useEffect } from "react";
import { Icon } from "@shopify/polaris";
import { DeleteMinor, CaretUpMinor, CaretDownMinor } from "@shopify/polaris-icons";

import {
  handleLabelChange,
  handlePlaceholderChange,
  handleDescriptionChange,
  handleHideLabelChange,
  handleRequiredChange,
  handleNoteChange,
  handleDelete,
  handleInputWidthSizeChange,
  handleLimitCharacterChange,
  handleMinLengthChange,
  handleMaxLengthChange,
} from "../../redux/handlers";
import DeleteWarningModel from "../DeleteWarningModel";

const Number = ({ field }) => {
  const {
    id,
    label,
    placeholder,
    description,
    limitCharacter,
    minLength,
    maxLength,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
  } = field;
  const [open, setOpen] = useState(false);
  const [activeButton, setActiveButton] = useState(1);
  const [isDeleteField, setIsDeleteField] = useState(false);
  const handleDeleteDisplay = (value) => {
    setIsDeleteField(value);
  };
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleInputWidthSize = (id, value) => {
    handleInputWidthSizeChange(id, value)
    document.documentElement.style.setProperty("--input-width-size", value);
  };

  useEffect(() => {
    if (!required || !hideLabel) {
      handleNoteChange(id, false);
    }
  }, [id, required, hideLabel]);

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
        <button className="delete-button" onClick={() => setIsDeleteField(true)}>
            <Icon source={DeleteMinor} color="base" className="icon" />
          </button>
          {isDeleteField && (
            <DeleteWarningModel label={label} id={id} handledelete={handleDelete} handleDeleteDisplay={handleDeleteDisplay}/>
          )}
          <button className="dropdown-button">
            {open ? <Icon source={CaretUpMinor} color="base" /> : 
            <Icon source={CaretDownMinor} color="base" />
            }
          </button>
        </div>
      </div>
      {open && (
        <>
          <div className="text-container">
            <div className="hr-line-layout-fields"></div>
            <div className="text-label">
              <div className="">
                <label className="">Label</label>
              </div>
              <input
                className="text-inputs"
                type="text"
                value={label}
                onChange={(e) => handleLabelChange(id, e.target.value)}
              />
              <div className="">
                <label className="">Placeholder</label>
              </div>
              <input
                className="text-inputs"
                type="text"
                value={placeholder}
                onChange={(e) => handlePlaceholderChange(id, e.target.value)}
              />
              <div className="">
                <label className="">Description</label>
              </div>
              <input
                className="text-inputs"
                type="text"
                value={description}
                onChange={(e) => handleDescriptionChange(id, e.target.value)}
              />
              <div className="checkbox-check-inputs">
                <label>
                  <input
                    className="checkbox-input"
                    type="checkbox"
                    checked={limitCharacter}
                    onChange={(e) =>
                      handleLimitCharacterChange(id, e.target.checked)
                    }
                  />
                  <span>Limit Characters</span>
                </label>
              </div>
              {limitCharacter && (
                <div className="limit_char">
                  <div className="limit_char-innerBlock">
                    <label>Min</label>
                    <input
                      className="text-inputs"
                      type="number"
                      value={minLength}
                      onChange={(e) =>
                        handleMinLengthChange(id, e.target.value)
                      }
                    />
                  </div>
                  <div className="limit_char-innerBlock">
                    <label>Max</label>
                    <input
                      className="text-inputs"
                      type="number"
                      value={maxLength}
                      onChange={(e) =>
                        handleMaxLengthChange(id, e.target.value)
                      }
                    />
                  </div>
                </div>
              )}
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
        </>
      )}
    </div>
  );
};

export default Number;
