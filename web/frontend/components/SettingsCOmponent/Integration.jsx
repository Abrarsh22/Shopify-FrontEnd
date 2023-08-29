import React, { useEffect, useState } from "react";
import { CaretDownMinor } from "@shopify/polaris-icons";
import { Button, Icon } from "@shopify/polaris";
import { useAuthenticatedFetch } from "../../hooks";
import { useSelector } from "react-redux";
import {
  handleKlaviyoIntegration,
  handleShopifyIntegration,
} from "../redux/handlers";
import FormFields from "./FormFields";
import { RFB_BASE_URL } from "../../../config";
import Custom from "./Custom";
import SFormFields from "./SFormFields";
const Integration = ({
  klaviyoIntegration,
  appSettings,
  shopifyIntegration,
}) => {
  const { klaviyoApiprivateKey, klaviyoApipublicKey } =
    appSettings.klaviyoSetting;
  const {
    createenable,
    shopifyexists,
    showError,
    msgError,
    accountOptions,
    acceptsMarketting,
    shopifyListMapping,
  } = shopifyIntegration;
  const { enable, defaultOption, klaviyoListMapping, listMethod, hiddenField } =
    klaviyoIntegration;
  const fetch = useAuthenticatedFetch();
  const { name, fields } = useSelector((state) => state.form);
  const [listNames, setListNames] = useState([]);
  const [formFieldValue, setFormFieldValue] = useState("");
  const [inputValues, setInputValues] = useState({});
  const [selected, setSelected] = useState("");
  const [subselected, setSubSelected] = useState("");

  const mapping = klaviyoListMapping[0];
  const selectedValue = mapping ? mapping.form_field : "";
  const isFieldSelected = selectedValue === `fixed-${0}`;
  const mappings = klaviyoListMapping[1];
  const selectedValues = mappings ? mappings.form_field : "";

  const [sinputValues, setsInputValues] = useState({});
  const [sselected, setSSelected] = useState("");
  const [, setsSubSelected] = useState("");
  const smapping = shopifyListMapping[0];
  const sselectedValue = smapping ? smapping.form_field : "";
  const sisFieldSelected = sselectedValue === `fixed-${0}`;
  const smappings = shopifyListMapping[1];
  const sselectedValues = smappings ? smappings.form_field : "";
  const shandleInputChange = (e) => {
    const value = e.target.value;
    const dynamicId = `fixed-${0}`;
    const fieldId = fields.id || 0;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dynamicId]: value,
    }));

    const updatedMapping = {
      shopify_field: "Email",
      form_field: dynamicId,
      is_default: false,
      is_fixed: true,
      is_input: value,
    };

    const updatedListMapping = {
      ...shopifyListMapping,
      [fieldId]: updatedMapping,
    };
    handleShopifyIntegration("shopifyListMapping", updatedListMapping);
  };

  const shandleFieldChange = (e) => {
    const selected = e.target.value;
    setSSelected(selected);
    const selectedOption = fields.find((option) => option.id === selected);
    const isFixedSelected = e.target.value === `fixed-${0}`;
    const index = 0;
    const fieldId = fields.id || 0;
    let isDefault = true;
    let isFixed = isFixedSelected;

    if (selectedOption) {
      isFixed = selectedOption.label === "Fixed value";
    }

    const formField = isFixed ? `fixed-${0}` : selected;
    const updatedMapping = {
      shopify_field: "Email",
      form_field: formField,
      is_default: isDefault,
      is_fixed: isFixed,
      is_input: inputValues[`fixed-${0}`],
    };

    const updatedListMapping = {
      ...shopifyListMapping,
      [fieldId]: updatedMapping,
    };

    handleShopifyIntegration("shopifyListMapping", updatedListMapping);
    setFormFieldValue(formField);
  };

  const shandleFieldChanges = (e) => {
    const selected = e.target.value;
    console.log(selected);
    setsSubSelected(selected);

    const selectedOption = fields.find((option) => option.id === selected);
    const isFixedSelected = e.target.value === `fixed-${1}`;
    const fieldId = fields.id || 1;
    let isDefault = true;
    let isFixed = isFixedSelected;

    if (selectedOption) {
      isFixed = selectedOption.label === "Fixed value";
    }

    const formField = isFixed ? `fixed-${1}` : selected;
    const updatedMapping = {
      shopify_field: "Subscribed",
      form_field: formField,
      is_default: isDefault,
      is_fixed: isFixed,
      is_input: inputValues[`fixed-${1}`],
    };

    const updatedListMapping = {
      ...shopifyListMapping,
      [fieldId]: updatedMapping,
    };

    handleShopifyIntegration("shopifyListMapping", updatedListMapping);
    setFormFieldValue(formField);
  };

  useEffect(() => {
    if (shopifyexists !== "returnError" && showError) {
      handleShopifyIntegration("showError", false);
      handleShopifyIntegration("msgError", "");
    }
  }, [shopifyexists, showError]);

  const nameOfFieldss = [
    { id: 2, name: "First Name" },
    { id: 3, name: "Last Name" },
    { id: 4, name: "Phone" },
  ];

  const handleInputChange = (e) => {
    const value = e.target.value;
    const dynamicId = `fixed-${0}`;
    const fieldId = fields.id || 0;
    setInputValues((prevInputValues) => ({
      ...prevInputValues,
      [dynamicId]: value,
    }));

    const updatedMapping = {
      klaviyo_field: "Email",
      form_field: dynamicId,
      is_default: false,
      is_fixed: true,
      is_input: value,
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [fieldId]: updatedMapping,
    };
    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
  };

  const handleFieldChange = (e) => {
    const selected = e.target.value;
    setSelected(selected);
    const selectedOption = fields.find((option) => option.id === selected);
    const isFixedSelected = e.target.value === `fixed-${0}`;
    const fieldId = fields.id || 0;
    let isDefault = true;
    let isFixed = isFixedSelected;

    if (selectedOption) {
      isFixed = selectedOption.label === "Fixed value";
    }

    const formField = isFixed ? `fixed-${0}` : selected;
    const updatedMapping = {
      klaviyo_field: "Email",
      form_field: formField,
      is_default: isDefault,
      is_fixed: isFixed,
      is_input: inputValues[`fixed-${0}`],
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [fieldId]: updatedMapping,
    };

    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
    setFormFieldValue(formField);
  };

  const handleFieldChanges = (e) => {
    const selected = e.target.value;
    console.log(selected);
    setSubSelected(selected);
    const selectedOption = fields.find((option) => option.id === selected);
    const isFixedSelected = e.target.value === `fixed-${1}`;
    const fieldId = fields.id || 1;
    let isDefault = true;
    let isFixed = isFixedSelected;

    if (selectedOption) {
      isFixed = selectedOption.label === "Fixed value";
    }

    const formField = isFixed ? `fixed-${1}` : selected;
    const updatedMapping = {
      klaviyo_field: "Subscribed",
      form_field: formField,
      is_default: isDefault,
      is_fixed: isFixed,
      is_input: inputValues[`fixed-${1}`],
    };

    const updatedListMapping = {
      ...klaviyoListMapping,
      [fieldId]: updatedMapping,
    };

    handleKlaviyoIntegration("klaviyoListMapping", updatedListMapping);
    setFormFieldValue(formField);
  };

  useEffect(() => {
    handleListsName();
  }, []);

  const handleListsName = async () => {
    try {
      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/klaviyo/lists?shop=${localStorage.getItem(
          "RFB_SHOPNAME"
        )}`,
        {
          method: "GET",
        }
      );
      const result = await response.json();
      setListNames(result);
    } catch (error) {
      console.error(error.message);
    }
  };
  const [dropdowns, setDropdowns] = useState([
    {
      id: "Shopify",
      open: false,
    },
    {
      id: "Klaviyo",
      open: false,
    },
  ]);

  const nameOfFields = [
    { id: 2, name: "First Name" },
    { id: 3, name: "Last Name" },
    { id: 4, name: "Title" },
    { id: 5, name: "Organization" },
    { id: 6, name: "Phone" },
    { id: 7, name: "Address1" },
    { id: 8, name: "Address2" },
    { id: 9, name: "City" },
    { id: 10, name: "Region" },
    { id: 11, name: "Postal Code" },
    { id: 12, name: "Country" },
    { id: 13, name: "Latitude" },
  ];

  const toggleDropdown = (id) => {
    const updatedDropdowns = dropdowns.map((dropdown) => {
      if (dropdown.id === id) {
        return {
          ...dropdown,
          open: !dropdown.open,
        };
      } else {
        return {
          ...dropdown,
          open: false,
        };
      }
    });
    setDropdowns(updatedDropdowns);
  };

  let element;
  for (let i = 0; i < nameOfFields.length; i++) {
    element = nameOfFields[i].id;
  }
  function filterObjectsWithPrefix(obj, prefix) {
    const filteredArr = [];

    for (let key in obj) {
      if (key.startsWith(prefix) && key !== "0") {
        const customField = {
          key: key,
          value: obj[key],
        };
        filteredArr.push(customField);
      }
    }

    return filteredArr;
  }
  const filteredObj = filterObjectsWithPrefix(klaviyoListMapping, "custom");

  const [customFields, setCustomFields] = useState(filteredObj);
  const handleAddField = () => {
    setCustomFields([...customFields, ""]);
  };

  const hasEmailField = fields.some((obj) => obj.type === "email");

  return (
    <div className="design-layout">
      {dropdowns.map((dropdown) => (
        <div key={dropdown.id} className="main-layout">
          <div
            className="layout-container"
            onClick={() => toggleDropdown(dropdown.id)}
          >
            <div className="layout-heading">{dropdown.id}</div>
            <div className="layout-icon">
              <Icon source={CaretDownMinor} color="base" />
            </div>
          </div>
          {dropdown.open && (
            <div key={dropdown.id} className="component-wrapper">
              {dropdown.id === "Shopify" && (
                <div className="drawer-layout">
                  <div className="hr-line-layout"></div>
                  {hasEmailField && (
                    <div className="klaviyo-integrate">
                      <div className="shopify enable checkbox-check-inputs">
                        <label>
                          <input
                            type="checkbox"
                            className="checkbox-input"
                            onChange={(e) => {
                              handleShopifyIntegration(
                                "createenable",
                                e.target.checked
                              );
                            }}
                            checked={createenable}
                          />
                          <span>Create Shopify Customer</span>
                        </label>
                      </div>
                      {createenable && hasEmailField && (
                        <>
                          <div className="dorpdown">
                            <div className="header">If exists</div>
                            <select
                              style={{ width: "100%", fontSize: "15px" }}
                              value={shopifyexists}
                              onChange={(e) => {
                                handleShopifyIntegration(
                                  "shopifyexists",
                                  e.target.value
                                );
                              }}
                            >
                              <option value="returnError">
                                Return error message
                              </option>
                              <option value="continueAndUpdate">
                                Continue and update customer infomation
                              </option>
                              <option value="continueAndIgnoreError">
                                Continue and ignore the error
                              </option>
                            </select>
                          </div>
                          {shopifyexists === "returnError" && (
                            <div className="checkbox-check-inputs">
                              <label>
                                <input
                                  className="checkbox-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleShopifyIntegration(
                                      "showError",
                                      e.target.checked
                                    );
                                  }}
                                  checked={showError}
                                />
                                <span>And show error message</span>
                              </label>
                            </div>
                          )}
                          {shopifyexists === "returnError" && showError && (
                            <div>
                              <input
                                style={{ width: "100%", fontSize: "15px" }}
                                type="text"
                                onChange={(e) => {
                                  handleShopifyIntegration(
                                    "msgError",
                                    e.target.value
                                  );
                                }}
                                value={msgError}
                              />
                            </div>
                          )}
                          <div>
                            <div className="header">
                              Shopify Account Options
                            </div>
                            <div id="options" className="radio-preview-input">
                              <label>
                                <input
                                  type="radio"
                                  name="accountOption"
                                  onChange={(e) =>
                                    handleShopifyIntegration(
                                      "accountOptions",
                                      e.target.value
                                    )
                                  }
                                  value="Automatically Create Customer"
                                  checked={
                                    accountOptions ===
                                    "Automatically Create Customer"
                                  }
                                />
                                <span
                                  className="rfb-fields-inputs-check"
                                  style={{ marginTop: "0.2rem" }}
                                >
                                  Automatically Create Customer
                                </span>
                              </label>
                            </div>
                            <div id="options" className="radio-preview-input">
                              <label>
                                <input
                                  type="radio"
                                  name="accountOption"
                                  onChange={(e) =>
                                    handleShopifyIntegration(
                                      "accountOptions",
                                      e.target.value
                                    )
                                  }
                                  value="Send Email Invitation"
                                  checked={
                                    accountOptions === "Send Email Invitation"
                                  }
                                />
                                <span
                                  className="rfb-fields-inputs-check"
                                  style={{ marginTop: "0.2rem" }}
                                >
                                  Send Email Invitation
                                </span>
                              </label>
                            </div>
                          </div>

                          <div>
                            <div className="checkbox-check-inputs">
                              <label>
                                <input
                                  className="checkbox-input"
                                  type="checkbox"
                                  onChange={(e) => {
                                    handleShopifyIntegration(
                                      "acceptsMarketting",
                                      e.target.checked
                                    );
                                  }}
                                  checked={acceptsMarketting}
                                />
                                <span>Accepts Marketting</span>
                              </label>
                              <footer style={{ marginLeft: "25px" }}>
                                All of customers created (updated) by this form,
                                will (not) be received marketing material via
                                email by default
                              </footer>
                            </div>
                          </div>
                          <div className="klayivo-fields">
                            <h2>
                              FILL IN FOLLOWING INPUTS BY SHOPIFY CUSTOMER
                              ATTRIBUTES
                            </h2>
                            <div className="field">
                              <div className="header">Email</div>

                              <select
                                className="select-formlist"
                                onChange={shandleFieldChange}
                                value={sselectedValue}
                              >
                                <option value={`fixed-${0}`} key={`fixed-${0}`}>
                                  Fixed value
                                </option>
                                <option id={`No-${0}`} value="">
                                  No value
                                </option>
                                {fields
                                  .filter((field) => field.type === "email")
                                  .map((option) => (
                                    <option
                                      key={option.id}
                                      value={option.id}
                                      selected={
                                        shopifyListMapping[fields.id]
                                          ?.form_field === option.id
                                      }
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                              </select>

                              {sisFieldSelected &&
                                sselectedValue === `fixed-${0}` && (
                                  <>
                                    <input
                                      type="text"
                                      value={sinputValues[`fixed-${0}`]}
                                      onChange={shandleInputChange}
                                    />
                                  </>
                                )}
                            </div>
                            <div className="field">
                              <div className="header">Subscribe</div>

                              <select
                                className="select-formlist"
                                onChange={shandleFieldChanges}
                                value={sselectedValues}
                              >
                                <option id={`No-${1}`} value="">
                                  No value
                                </option>
                                {fields
                                  .filter(
                                    (field) => field.type === "termsnconditions"
                                  )
                                  .map((option) => (
                                    <option
                                      key={option.id}
                                      value={option.id}
                                      selected={
                                        shopifyListMapping[fields.id]
                                          ?.form_field === option.id
                                      }
                                    >
                                      {option.label}
                                    </option>
                                  ))}
                              </select>

                              {sisFieldSelected &&
                                sselectedValue === `fixed-${1}` && (
                                  <>
                                    <input
                                      type="text"
                                      value={sinputValues[`fixed-${1}`]}
                                      onChange={shandleInputChange}
                                    />
                                  </>
                                )}
                            </div>
                            <>
                              {nameOfFieldss.map((field, index) => (
                                <SFormFields
                                  key={field.id}
                                  field={field}
                                  shopifyListMapping={shopifyListMapping}
                                  fields={fields}
                                />
                              ))}
                            </>
                          </div>
                        </>
                      )}
                    </div>
                  )}
                  {!hasEmailField && (
                    <div className="klaviyo enable">
                      <div>
                        Email field should be there in form to enable this
                        feature!
                      </div>
                    </div>
                  )}
                </div>
              )}
              {dropdown.id === "Klaviyo" && (
                <div>
                  <div className="hr-line-layout"></div>
                  {klaviyoApiprivateKey &&
                    klaviyoApipublicKey &&
                    hasEmailField && (
                      <div className="klaviyo-integrate">
                        <div className="enable">
                          <input
                            type="checkbox"
                            className="color-input-checkbox"
                            onChange={(e) =>
                              handleKlaviyoIntegration(
                                "enable",
                                e.target.checked
                              )
                            }
                            checked={enable}
                          />
                          <div>Enable</div>
                        </div>
                      </div>
                    )}
                  {!(
                    klaviyoApiprivateKey &&
                    klaviyoApipublicKey &&
                    hasEmailField
                  ) && (
                    <div className="klaviyo enable">
                      <div>
                        Please make sure that you have set klaviyo credentials
                        in General Settings And Email field should be there in
                        form to enable this feature!
                      </div>
                    </div>
                  )}
                  <br />
                  {enable &&
                    klaviyoApiprivateKey &&
                    klaviyoApipublicKey &&
                    hasEmailField && (
                      <>
                        <div className="dorpdown">
                          <div className="header">Select List Method</div>
                          <select
                            style={{ width: "100%", fontSize: "15px" }}
                            value={listMethod}
                            onChange={(e) => {
                              handleKlaviyoIntegration(
                                "listMethod",
                                e.target.value
                              );
                            }}
                          >
                            <option value="multilist">Multiple List</option>
                            <option value="singlelist">Single List</option>
                          </select>
                        </div>
                        <br />
                        {listMethod === "multilist" && (
                          <div className="header-label-style">
                            <h3>Select a Field to be used as Listname</h3>
                            <select
                              style={{ width: "100%", fontSize: 15 }}
                              className="select-formlists"
                              value={hiddenField}
                              onChange={(e) =>
                                handleKlaviyoIntegration(
                                  "hiddenField",
                                  e.target.value
                                )
                              }
                            >
                              <option value="" key="">
                                Select a Field
                              </option>
                              <option value={name}>{name}</option>
                              {fields.map((option) => {
                                if (option.type === "hidden") {
                                  const hiddenValues = option.value || [];
                                  return hiddenValues.map((object) => (
                                    <option
                                      value={object.value}
                                      key={object.value}
                                      selected={
                                        klaviyoListMapping[option.id]
                                          ?.form_field === object.value
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
                                        klaviyoListMapping[option.id]
                                          ?.form_field === option.id
                                      }
                                    >
                                      {option.label}
                                    </option>
                                  );
                                }
                              })}
                            </select>
                          </div>
                        )}
                        {listMethod === "singlelist" && (
                          <div className="klaviyo-select">
                            <div className="header-label-style">
                              <label>Select Klaviyo list</label>
                              <select
                                className="select-formlist"
                                value={defaultOption}
                                onChange={(e) =>
                                  handleKlaviyoIntegration(
                                    "defaultOption",
                                    e.target.value
                                  )
                                }
                              >
                                <option value="" key="">
                                  Select List
                                </option>
                                {listNames.map((item) => (
                                  <option value={`${item.id}`} key={item.id}>
                                    {item.attributes.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                        )}
                        <div className="klayivo-fields">
                          <h2>FILL IN FOLLOWING INPUTS BY KLAVIYO FIELD TAG</h2>
                          <div className="field">
                            <div className="header">Email</div>

                            <select
                              className="select-formlist"
                              onChange={handleFieldChange}
                              value={selectedValue}
                            >
                              <option value={`fixed-${0}`} key={`fixed-${0}`}>
                                Fixed value
                              </option>
                              <option id={`No-${0}`} value="">
                                No value
                              </option>
                              {fields
                                .filter((field) => field.type === "email")
                                .map((option) => (
                                  <option
                                    key={option.id}
                                    value={option.id}
                                    selected={
                                      klaviyoListMapping[fields.id]
                                        ?.form_field === option.id
                                    }
                                  >
                                    {option.label}
                                  </option>
                                ))}
                            </select>

                            {isFieldSelected &&
                              selectedValue === `fixed-${0}` && (
                                <>
                                  <input
                                    type="text"
                                    value={inputValues[`fixed-${0}`]}
                                    onChange={handleInputChange}
                                  />
                                </>
                              )}
                          </div>
                          <div className="field">
                            <div className="header">Subscribe</div>

                            <select
                              className="select-formlist"
                              onChange={handleFieldChanges}
                              value={selectedValues}
                            >
                              <option id={`No-${1}`} value="">
                                No value
                              </option>
                              {fields
                                .filter(
                                  (field) => field.type === "termsnconditions"
                                )
                                .map((option) => (
                                  <option
                                    key={option.id}
                                    value={option.id}
                                    selected={
                                      klaviyoListMapping[fields.id]
                                        ?.form_field === option.id
                                    }
                                  >
                                    {option.label}
                                  </option>
                                ))}
                            </select>

                            {isFieldSelected &&
                              selectedValue === `fixed-${1}` && (
                                <>
                                  <input
                                    type="text"
                                    value={inputValues[`fixed-${1}`]}
                                    onChange={handleInputChange}
                                  />
                                </>
                              )}
                          </div>
                          <>
                            {nameOfFields.map((field, index) => (
                              <FormFields
                                key={field.id}
                                field={field}
                                klaviyoListMapping={klaviyoListMapping}
                                shopifyListMapping={shopifyListMapping}
                                fields={fields}
                              />
                            ))}
                            {customFields.map((field, index) => (
                              <Custom
                                key={field.id}
                                index={index}
                                field={field}
                                element={element + 1}
                                klaviyoListMapping={klaviyoListMapping}
                                fields={fields}
                              />
                            ))}

                            <div>
                              <Button onClick={handleAddField}>
                                Add Custom Field
                              </Button>
                            </div>
                          </>
                        </div>
                      </>
                    )}
                </div>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Integration;
