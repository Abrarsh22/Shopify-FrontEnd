import React, { useEffect, useState, useRef } from "react";
import { handleShopifyIntegration } from "../redux/handlers";
import { useSelector } from "react-redux";
import { useAuthenticatedFetch } from "@shopify/app-bridge-react";
import { RFB_BASE_URL } from "../../../config";

const SFormFields = ({ field, shopifyListMapping, fields }) => {
  // Klaviyo Integration
  const fetch = useAuthenticatedFetch();
  const [inputValues, setInputValues] = useState({});

  const { id } = useSelector((state) => state.form);

  // Shopify Integration
  const [showShopifyToast, setShowShopifyToast] = useState(false);
  const [shopifyToastMessage, setShopifyToastMessage] = useState("");
  const [shopifyFieldValue, setShopifyFieldValue] = useState("");

  const shopifyMapping = shopifyListMapping[field.id];
  const shopifySelectedValue = shopifyMapping ? shopifyMapping.form_field : "";
  const shopifyIsDefault = shopifyMapping ? shopifyMapping.is_default : true;
  const shopifyIsFieldSelected = shopifySelectedValue === `fixed-${field.id}`;

  function showShopifyToastMessage(message) {
    setShopifyToastMessage(message);
    setShowShopifyToast(true);
    setTimeout(() => {
      setShowShopifyToast(false);
    }, 3000);
  }

  const handleShopifyInputChange = (e) => {
    const value = e.target.value;
    const dynamicId = `fixed-${field.id}`;

    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dynamicId]: value,
    }));

    const updatedMapping = {
      shopify_field: field.name,
      form_field: dynamicId,
      is_default: false,
      is_fixed: true,
      is_input: value,
    };

    const updatedListMapping = {
      ...shopifyListMapping,
      [field.id]: updatedMapping,
    };

    showShopifyToastMessage("Error!!!");
    handleShopifyIntegration("shopifyListMapping", updatedListMapping);
  };

  const handleShopifyFieldChange = (e) => {
    const selectedOption = fields.find(
      (option) => option.id === e.target.value
    );
    const isFixedSelected = e.target.value === `fixed-${field.id}`;

    const updatedMapping = {
      shopify_field: field.name,
      form_field: selectedOption ? selectedOption.id : e.target.value,
      is_default: shopifyIsDefault,
      is_fixed: isFixedSelected,
      is_input: inputValues[`fixed-${field.id}`],
    };

    const updatedListMapping = {
      ...shopifyListMapping,
      [field.id]: updatedMapping,
    };

    showShopifyToastMessage("Error!!!");
    handleShopifyIntegration("shopifyListMapping", updatedListMapping);
  };

  const dropdownRef = useRef(null);

  useEffect(() => {
    // Shopify Integration
    handleEdit(id);
    const shopifyDropdownList = dropdownRef.current.querySelector(
      ".shopify-dropdown ul"
    );

    if (shopifyDropdownList) {
      shopifyDropdownList.style.width = "200px"; // Set the desired width here
    }
  }, []);

  const handleEdit = async (uuid) => {
    try {
      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/getform?id=${uuid}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const jsonData = JSON.parse(data.forms.shopifyIntegration);
      setShopifyFieldValue(jsonData.shopifyListMapping);

      Object.values(jsonData.shopifyListMapping).forEach((item) => {
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

  return (
    <div className="field" key={field.id}>
      <div className="header">{field.name}</div>

      <div style={{ width: "100px" }}>
        <select
          value={shopifySelectedValue}
          onChange={handleShopifyFieldChange}
          ref={dropdownRef}
          className="shopify-dropdown"
          style={{ width: "100%" }}
        >
          <option value={`fixed-${field.id}`} key={`fixed-${field.id}`}>
            Fixed value
          </option>
          <option id={`No-${field.id}`} value="">
            No value
          </option>
          {fields
            .filter((obj) => {
              if(field.name === "Phone"){
                return obj.type === "phone";
              }else{
                const fieldLabel = field.name.toLowerCase().replace(" ", "_");
                return obj.type === "name" && obj.name === fieldLabel;
              }
            })
            .map((option) => (
                <option
                  key={option.id}
                  value={option.id}
                  selected={
                    shopifyListMapping[fields.id]?.form_field === option.id
                  }
                >
                  {option.label}
                </option>
             ))}
        </select>
      </div>

      {shopifyIsFieldSelected &&
        shopifySelectedValue === `fixed-${field.id}` && (
          <>
            <input
              type="text"
              value={inputValues[`fixed-${field.id}`]}
              onChange={handleShopifyInputChange}
            />
          </>
        )}
      {showShopifyToast && <div className="toast">{shopifyToastMessage}</div>}
    </div>
  );
};

export default SFormFields;
