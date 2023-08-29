import { Icon, Spinner } from "@shopify/polaris";
import { ArrowLeftMinor } from "@shopify/polaris-icons";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useNavigate } from "react-router-dom";
import FormBuilder from "../components/FormBuilder";
import SettingsComponent from "../components/SettingsCOmponent/SettingsComponent";
import FormPreviewer from "../components/FormPreviewer";
import { setFormName } from "../components/redux/formSlice";
import { useAuthenticatedFetch } from "../hooks";
import { handleReset } from "../components/redux/handlers.js";
import Publish from "../components/Publish";
import { RFB_BASE_URL } from "../../config";
const newPage = () => {
  const fetch = useAuthenticatedFetch();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [activeButton, setActiveButton] = useState(0);
  const {
    id,
    fields,
    constantFields,
    name,
    status,
    notifyFormStatus,
    formCSS,
    afterSubmit,
    klaviyoIntegration,
    formSettings,
    shopifyIntegration
  } = useSelector((state) => state.form);
  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    return () => {
      handleReset();
    };

  }, []);

  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState("");
  const [backModalOpen, setBackModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  function showToastMessage(message) {
    setToastMessage(message);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  }
  function showToastSuccess(message) {
    setToastSuccess(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }

  const handleFormName = (value) => {
    dispatch(setFormName(value));
  };

  const handleValidate = () => {
    const validate = fields.filter((field) => {
      return field.label === "";
    });
    const validatePhone = fields.some(
      (field) =>
      field.validateInternationalPhoneNumber === true &&
      (field.defaultCountry === "" || field.defaultCountry === undefined)
      );
      const checkUniqueLabels = (array) => {
        const uniqueLabels = new Set();
        for (let i = 0; i < array.length; i++) {
          const label = array[i].label;
          if (uniqueLabels.has(label)) {
            return false; // Duplicate label found, return false
          }
          uniqueLabels.add(label);
        }
        return true; // All labels are unique
      }
      const hasUniqueLabels = checkUniqueLabels(fields);
      const validateString = (input) => {
        const pattern = /^[a-zA-Z0-9\s]{3,64}$/;
        return pattern.test(input);
      }
      const validateFieldLabels = fields.map((field) => {
        return validateString(field.label);
      })
    if (validate.length !== 0) {
      showToastMessage("Field label cannot be empty");
      return false;
    } else if (validatePhone) {
      showToastMessage("Select default country");
      return false;
    } else if (!hasUniqueLabels) {
      showToastMessage("Each field label should be unique");
      return false;
    } else if (name === "") {
      showToastMessage("Set Form Name");
      return false;
    } else if (!validateString(name)) {
      showToastMessage("Form name length should be between 3 to 64 character & Special charcter are not allowed!");
      return false;
    } else if (validateFieldLabels.includes(false)) {
      showToastMessage("Each Field label length should be between 3 to 64 character long & Special charcter are not allowed!");
      return false;
    }else if (fields.length === 0) {
      showToastMessage("Add atleast one form field required to save form.");
      return false;
    } else if (constantFields.footer.submitBtnText === "") {
      showToastMessage("Submit Button Label is empty");
      return false;
    } else if (
      constantFields.footer.resetBtn === true &&
      constantFields.footer.resetBtnText === ""
    ) {
      showToastMessage("Reset button Label is empty");
      return false;
    } else if (
      formSettings.subUniqueIdentifier.enable &&
      formSettings.subUniqueIdentifier.IdentifierFields.length === 0
    ) {
      showToastMessage("By allowing the unique submission identifier enable, you need to select atleast one form fields for duplicate check.");
      return false;
    } else {
      const invalidFields = Object.values(fields).filter(
        (field) => field.options && field.options.length === 0 // add check for undefined or empty options
      );
      if (invalidFields.length > 0) {
        invalidFields.forEach((field) => {
          showToastMessage(`Atleast one option need to be there for the field "${field.label}"`);
        });
        return false;
      }
    }
    return true;
  };

  const handleSave = async () => {
    if (handleValidate()) {
      setIsLoading(true);
      const formId = uuidv4().toString();
      const formData = {
        id: formId,
        formtitle: name,
        shopname: localStorage.getItem("RFB_SHOPNAME"),
        shortcode: `<div id="rfb-${formId}"/>`,
        componentJSON: fields,
        headerJSON: constantFields.header,
        footerJSON: constantFields.footer,
        status: true,
        notifyFormStatus:false,
        formSettings: formSettings,
        formCSS: formCSS,
        afterSubmit: afterSubmit,
        klaviyoIntegration: klaviyoIntegration,
        shopifyIntegration:shopifyIntegration
      };
      
      console.log(formData)
      try {
        const response = await fetch(`${RFB_BASE_URL}/api/forms/createform`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const result = await response.json();
        if(result.error){
          console.log(result.error)
          throw new Error(result.error);
        }
        console.log(result);
        showToastSuccess("Form Saved Successfully");
        handleReset();
        navigate(`/form`);
      } catch (error) {
        showToastMessage(error.message)
      }
      setIsLoading(false);
    }
  };
  
  const handleUpdate = async (uuid) => {
    setUpdateModalOpen(false);
    if (handleValidate()) {
      setIsLoading(true);
      const formData = {
        formtitle: name,
        componentJSON: fields,
        headerJSON: constantFields.header,
        footerJSON: constantFields.footer,
        status: status,
        notifyFormStatus : notifyFormStatus,
        formSettings: formSettings,
        formCSS: formCSS,
        afterSubmit: afterSubmit,
        klaviyoIntegration: klaviyoIntegration,
        shopifyIntegration:shopifyIntegration
      };
      try {
        const response = await fetch(
          `${RFB_BASE_URL}/api/forms/updateform?id=${uuid}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          }
        );
        const result = await response.json();
        if(result.error){
          console.log(result.error)
          throw new Error(result.error);
        }
        setIsLoading(false);
        console.log(result);
        showToastSuccess("Form updated Successfully");
        handleReset();
        navigate(`/form`);
      } catch (error) {
        setIsLoading(false);
        showToastMessage(error.message += " \n Please make following change otherwise you'll loss all changes you've made now!")
      }
    }
  };

  return (
    <div>
      <div className="fb-header-section">
        <div>
          <button onClick={() => setBackModalOpen(true)} className="btn-back">
            <div className="btn-back-icon">
              <Icon source={ArrowLeftMinor} />
            </div>
            <div className="btn-back-text">Back to list</div>
          </button>
          {backModalOpen && (
            <div>
              <div className="modal">
                <div className="modal-content-form">
                  <h3 className="modal-heading-h3">
                    Are you sure you want to exit?
                  </h3>
                  <div className="modal-buttons">
                    <button
                      onClick={() => {
                        handleReset();
                        navigate(`/form`);
                      }}
                    >
                      Yes
                    </button>
                    <button onClick={() => setBackModalOpen(false)}>No</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="input-field">
          <input
            type="text"
            placeholder="Name Your Form"
            value={name}
            onChange={(e) => handleFormName(e.target.value)}
            required
          />
        </div>
        <div className="btn">
          <button
            className="cancel-btn"
            onClick={() => {
              handleReset();
              navigate(`/form`);
            }}
          >
            Cancel
          </button>
          {id === undefined ? (
            <button className="save-btn" onClick={() => handleSave()}>
              Save
            </button>
          ) : (
            <>
            <button className="save-btn" onClick={() => setUpdateModalOpen(true)}>
              Update
            </button>
            {updateModalOpen && (
              <div>
                <div className="modal">
                  <div className="modal-content-form">
                    <h3 className="modal-heading-h3">
                      Are you sure you want to update?
                    </h3>
                    <div className="modal-buttons">
                      <button
                        onClick={() => handleUpdate(id)}
                      >
                        Yes
                      </button>
                      <button onClick={() => setUpdateModalOpen(false)}>No</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>
          )}
        </div>
      </div>
      <div className=" fb-content-section">
        <div className="right-container-main">
          <div className="right-container">
            <div
              className={`rc-section element
                    ${activeButton === 0 ? "active" : ""}
                `}
              onClick={() => handleButtonClick(0)}
            >
              Elements
            </div>
            <div
              className={`rc-section settings
                    ${activeButton === 1 ? "active" : ""}
                `}
              onClick={() => handleButtonClick(1)}
            >
              Settings
            </div>
            <div
              className={`rc-section publish
                    ${activeButton === 2 ? "active" : ""}
                `}
              onClick={() => handleButtonClick(2)}
            >
              Publish
            </div>
          </div>
          <div>
            {activeButton === 0 && <FormBuilder />}
            {activeButton === 1 && <SettingsComponent />}
            {activeButton === 2 && <Publish />}
          </div>
        </div>
        <div className="left-container">
          <FormPreviewer
            fields={fields}
            constantFields={constantFields}
            formCSS={formCSS}
            afterSubmit={afterSubmit}
          />
        </div>
      </div>
      {showToast && <div className="toast">{toastMessage}</div>}
      {showSuccess && <div className="toast-success">{toastSuccess}</div>}
      {isLoading && (
        <div className="modal">
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      )}
    </div>
  );
};

export default newPage;
