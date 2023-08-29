import React, { useState, useEffect } from "react";
import "../FB_Fields_CSS/checkbox.css";
import {
  handleLabelChange,
  handleDescriptionChange,
  handleHideLabelChange,
  handleRequiredChange,
  handleNoteChange,
  handleDelete,
  handleMultiOptionChange,
  handleDefaultOptionChange,
  handleInputWidthSizeChange,
} from "../../redux/handlers";
import { Icon } from "@shopify/polaris";
import {
  DeleteMinor,
  CaretUpMinor,
  CaretDownMinor,
  DragHandleMinor,
} from "@shopify/polaris-icons";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import DeleteWarningModel from "../DeleteWarningModel";

const Checkbox = ({ field }) => {
  const {
    id,
    label,
    description,
    options,
    defaultOptionChecked,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
  } = field;
  const [open, setOpen] = useState(false);
  const [isDeleteField, setIsDeleteField] = useState(false);
  const handleDeleteDisplay = (value) => {
    setIsDeleteField(value);
  };
  const [selectedOption, setSelectedOption] = useState(defaultOptionChecked);
  const [items, setItems] = useState(options);
  const [inputValue, setInputValue] = useState("");
  const [activeButton, setActiveButton] = useState(1);
  const handleDragEnd = (e) => {
    if (!e.destination) return;
    let tempData = Array.from(items);
    let [source_data] = tempData.splice(e.source.index, 1);
    tempData.splice(e.destination.index, 0, source_data);
    setItems(tempData);
  };

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };
  const handleInputWidthSize = (id, value) => {
    handleInputWidthSizeChange(id, value);
    document.documentElement.style.setProperty("--checkbox-width-size", value);
  };

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleDeleteOption = (index) => {
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  const handleReplaceOption = (index, newValue) => {
    setItems((prevItems) => {
      const newItems = [...prevItems];
      newItems[index] = newValue;
      return newItems;
    });
  };

  useEffect(() => {
    if (items.length === 0) {
      setSelectedOption("");
    }
    handleMultiOptionChange(id, items);
    handleDefaultOptionChange(id, selectedOption);

    if (!required || !hideLabel) {
      handleNoteChange(id, false);
    }
  }, [id, items, selectedOption, required, hideLabel]);

  const handleDefaultOptionSelect = (e) => {
    setSelectedOption(e.target.value);
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
        <button className="delete-button" onClick={() => setIsDeleteField(true)}>
            <Icon source={DeleteMinor} color="base" className="icon" />
          </button>
          {isDeleteField && (
            <DeleteWarningModel label={label} id={id} handledelete={handleDelete} handleDeleteDisplay={handleDeleteDisplay}/>
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
        <div className="checkbox-container">
          <div className="hr-line-layout-fields"></div>
          <div className="checkbox-label">
            <div className="">
              <label className="">Label</label>
            </div>
            <input
              className="checkbox-inputs"
              type="text"
              value={label}
              onChange={(e) => handleLabelChange(id, e.target.value)}
            />
            <div className="">
              <label className="">Options</label>
            </div>
            <div className="add-option">
              <input
                className="add-option_input"
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                }}
              />
              <button onClick={handleAddItem} className="add-option_button">
                Add
              </button>
              <div>
                <div className="options-list">
                  <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable droppableId="droppable-1">
                      {(provider) => (
                        <div
                          ref={provider.innerRef}
                          {...provider.droppableProps}
                          style={{ position: "relative" }}
                        >
                          {items.map((item, index) => (
                            <Draggable
                              key={index}
                              draggableId={`draggable-${index}`} // Use a unique ID for each draggable
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <>
                                    <Icon
                                      source={DragHandleMinor}
                                      color="base"
                                    />
                                  </>
                                  <div className="option-item">
                                    <input
                                      type="text"
                                      value={item}
                                      onChange={(e) => {
                                        handleReplaceOption(
                                          index,
                                          e.target.value
                                        );
                                      }}
                                    />
                                  </div>
                                  <button
                                    className="delete-option"
                                    onClick={() => handleDeleteOption(index)}
                                  >
                                    <Icon
                                      source={DeleteMinor}
                                      color="base"
                                      className="icon"
                                    />
                                  </button>
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provider.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </div>
            </div>
            <div className="">
              <label>Select default Option</label>
            </div>
            <select
              className="radio-dropdown-inputs"
              value={selectedOption}
              onChange={handleDefaultOptionSelect}
            >
              {items.length > 0 && <option value="">None</option>}
              {items.length === 0 && (
                <option value="Please add an option">
                  Please add an option
                </option>
              )}
              {items &&
                items.map((item, index) => (
                  <option value={item} key={index}>
                    {item}
                  </option>
                ))}
            </select>
            <div className="">
              <label className="">Description</label>
            </div>
            <input
              className="checkbox-inputs"
              type="text"
              value={description}
              onChange={(e) => handleDescriptionChange(id, e.target.value)}
            />
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

export default Checkbox;
