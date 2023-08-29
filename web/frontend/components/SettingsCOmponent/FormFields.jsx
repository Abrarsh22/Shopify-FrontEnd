import React, { useEffect, useState } from "react";
import { handleKlaviyoIntegration } from "../redux/handlers";
import { useSelector } from "react-redux";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { RFB_BASE_URL } from "../../../config";

const FormFields = ({ field, klaviyoListMapping, fields }) => {
  const fetch = useAuthenticatedFetch();
  const [inputValues, setInputValues] = useState({});
  const [fieldValue, setFieldValue] = useState("");

  const { id } = useSelector((state) => state.form);

  const mapping = klaviyoListMapping[field.id];
  const selectedValue = mapping ? mapping.form_field : "";
  const isDefault = mapping ? mapping.is_default : true;
  const isFieldSelected = selectedValue === `fixed-${field.id}`;

  const handleEdit = async (uuid) => {
    try {
      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/getform?id=${uuid}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const jsonData = JSON.parse(data.forms.klaviyoIntegration);
      setFieldValue(jsonData.klaviyoListMapping);

      Object.values(jsonData.klaviyoListMapping).forEach((item) => {
        if (item.is_fixed === true) {
          setInputValues((prevInputValues) => ({
            ...prevInputValues,
            [item.form_field]: item.is_input,
          }));
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    handleEdit(id);
  }, []);

  const handleInputChange = (e) => {
    // Text Changing

    const value = e.target.value;
    const dynamicId = `fixed-${field.id}`;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dynamicId]: value,
    }));

    const updatedMapping = {
      klaviyo_field: field.name,
      form_field: dynamicId,
      is_default: false,
      is_fixed: true,
      is_input: value,
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [field.id]: updatedMapping,
    };
    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  const handleFieldChange = (e) => {
    const selectedOption = fields.find(
      (option) => option.id === e.target.value
    );
    const isFixedSelected = e.target.value === `fixed-${field.id}`;

    // console.log(`inputValue...${inputValues}`);

    const updatedMapping = {
      klaviyo_field: field.name,
      form_field: selectedOption ? selectedOption.id : e.target.value,
      is_default: isDefault,
      is_fixed: isFixedSelected,
      is_input: inputValues[`fixed-${field.id}`],
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [field.id]: updatedMapping,
    };
    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  return (
    <div className="field" key={field.id}>
      <div className="header">{field.name}</div>
      <select
        className="select-formlist"
        value={selectedValue}
        onChange={handleFieldChange}
      >
        <option value={`fixed-${field.id}`} key={`fixed-${field.id}`}>
          Fixed value
        </option>
        <option id={`No-${field.id}`} value="">
          No value
        </option>
        {fields.map((option) => {
          if (option.type === "hidden") {
            const hiddenValues = option.value || [];
            return hiddenValues.map((object) => (
              <option
                value={object.value}
                key={object.value}
                selected={
                  klaviyoListMapping[option.id]?.form_field === object.value
                }
              >
                {object.value}
              </option>
            ));
          } else {
            return (
              <option
                value={option.id}
                key={option.id}
                selected={
                  klaviyoListMapping[option.id]?.form_field === option.id
                }
              >
                {option.label}
              </option>
            );
          }
        })}
      </select>
      {isFieldSelected && selectedValue === `fixed-${field.id}` && (
        <>
          <input
            type="text"
            value={inputValues[`fixed-${field.id}`]}
            onChange={handleInputChange}
          />
        </>
      )}
    </div>
  );
};

export default FormFields;
