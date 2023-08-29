import { useState, useEffect } from "react";
import { handleFormSettingsChange } from "../redux/handlers";
import { Icon } from "@shopify/polaris";
import { DeleteMinor } from "@shopify/polaris-icons";

const SubUniqueIdentifier = ({ fields, formSettings }) => {
  const { enable, IdentifierFields, IdentifierCriteria } =
    formSettings?.subUniqueIdentifier;
  const [identifierFieldsArray, setIdentifierFieldsArray] =
    useState(IdentifierFields);
    const fieldLabelArray = fields?.flatMap((obj) => {
      if (obj.type === "html") {
        return []; // Return an empty array for type "html"
      } else if (obj.type === "hidden") {
        return obj.value.map((obj) => obj.value); // Return individual values for type "hidden"
      } else {
        return obj.label; // Return obj.label for other types
      }
    });

  const remainingLabels = fieldLabelArray.filter(
    (label) => !identifierFieldsArray.includes(label)
  );
  const [labelArray, setLabelArray] = useState(remainingLabels);

  useEffect(() => {
    if (fields.length === 0) {
      handleFormSettingsChange("subUniqueIdentifier", "enable", false);
    }
  }, [fields]);

  useEffect(() => {
    handleFormSettingsChange(
      "subUniqueIdentifier",
      "IdentifierFields",
      identifierFieldsArray
    );
  }, [identifierFieldsArray]);

  const handleSelectChange = (e) => {
    const selectedOption = e.target.value;
    if (selectedOption) {
      // Add selected option to identifierFieldsArray
      setIdentifierFieldsArray((prevArray) => [...prevArray, selectedOption]);

      // Remove selected option from labelArray
      setLabelArray((prevArray) =>
        prevArray.filter((option) => option !== selectedOption)
      );
    }
  };

  const handleDeleteOption = (index, option) => {
    // Remove selected option from identifierFieldsArray
    setIdentifierFieldsArray((prevItems) =>
      prevItems.filter((item, i) => i !== index)
    );

    // Add selected option to labelArray
    setLabelArray((prevArray) => [...prevArray, option]);
  };

  return (
    <div className="main-layout">
      {fields.length !== 0 && (
        <div className="klaviyo enable">
          <input
            type="checkbox"
            className="color-input-checkbox"
            onChange={(e) =>
              handleFormSettingsChange(
                "subUniqueIdentifier",
                "enable",
                e.target.checked
              )
            }
            checked={enable}
          />
          <div>Enable</div>
        </div>
      )}
      {enable && (
        <div>
          <div
            className="identifierField_block"
            style={{ marginTop: "8px", marginBottom: "8px" }}
          >
            {identifierFieldsArray.length > 0 && (
              <div
                style={{ marginTop: "8px", marginBottom: "8px" }}
                className="option-item"
              >
                Selected Unique Identifier Fields:
              </div>
            )}
            {identifierFieldsArray.length > 0 &&
              identifierFieldsArray.map((option, index) => (
                <li
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    width: "fitContent",
                    listStyle: "none",
                    marginLeft: "3px",
                    gap: "2px",
                  }}
                >
                  <span>{option}</span>
                  <button
                    className="delete-option"
                    onClick={() => handleDeleteOption(index, option)}
                  >
                    <Icon source={DeleteMinor} color="base" className="icon" />
                  </button>
                </li>
              ))}
            {identifierFieldsArray.length === 0 && (
              <span
                style={{ marginTop: "8px", marginBottom: "8px" }}
                className="option-item"
              >
                No fields have been selected
              </span>
            )}
          </div>
          <select
            className="radio-dropdown-inputs"
            value=""
            onChange={handleSelectChange}
          >
            <option value="">Please select fields</option>
            {labelArray.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
          <div>
            <label>Identifier Criteria</label>
            <select
              className="radio-dropdown-inputs"
              value={IdentifierCriteria}
              onChange={(e) =>
                handleFormSettingsChange(
                  "subUniqueIdentifier",
                  "IdentifierCriteria",
                  e.target.value
                )
              }
            >
              <option value="AND">Combination of all the values should be unique</option>
              <option value="OR">Each one of the value should be unique</option>
            </select>
          </div>
        </div>
      )}
      {fields.length === 0 && (
        <span style={{ marginTop: "8px", marginBottom: "8px" }}>
          First add some fields in your form
        </span>
      )}
    </div>
  );
};

export default SubUniqueIdentifier;
