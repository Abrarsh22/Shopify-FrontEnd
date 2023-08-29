import React, { useEffect, useState } from "react";
import { CaretDownMinor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import { handleFormSettingsChange } from "../redux/handlers";
import { RichTextEditor } from "../FormBuilderComponents/utils/RichTextEditor";
import { useSelector } from "react-redux"

const Mail = ({ formSettings, appSettings }) => {
  const { fields } = useSelector((state) => state.form);
  const { enable, email, emailSubject, emailContent } = formSettings.adminMail;
  const { username, appPassword } = appSettings.smtpSetting;
  let { autoenable, autoemailContent, autoemailSubject, form_field } =
    formSettings.autoResponse;

  const [dropdowns, setDropdowns] = useState([
    {
      id: "Admin Mail",
      open: false,
    },
    {
      id: "User Mail Auto Response",
      open: false,
    },
  ]);

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

  const loadInitialFormField = () => {
    const initialFormField = fields.find((field) => field.type === "email");
    console.log(initialFormField)
    if (initialFormField) {
      handleFormSettingsChange("autoResponse", "form_field", initialFormField.label);
    }
  };
  useEffect(()=>{
    loadInitialFormField();
  },[])

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
              {dropdown.id === "Admin Mail" && (
                <div className="drawer-layout">
                  <div className="hr-line-layout"></div>
                  {username && appPassword && (
                    <div className="klaviyo enable">
                      <input
                        type="checkbox"
                        className="color-input-checkbox"
                        onChange={(e) =>
                          handleFormSettingsChange(
                            "adminMail",
                            "enable",
                            e.target.checked
                          )
                        }
                        checked={enable}
                      />
                      <div>Enable</div>
                    </div>
                  )}
                  {!(username && appPassword) && (
                    <div className="klaviyo enable">
                      <div>
                        Please make sure that you have set Google Smtp provider
                        username & app password in General Settings
                      </div>
                    </div>
                  )}
                  {enable && username && appPassword && (
                    <div className="mail-admin">
                      <div className="email-mail">
                        <div className="email-width">
                          <label>Email</label>
                          <input
                            type="text"
                            className="layout-input"
                            value={email}
                            onChange={(e) =>
                              handleFormSettingsChange(
                                "adminMail",
                                "email",
                                e.target.value
                              )
                            }
                          />
                          <p>
                            You can put multiple email addresses separated with
                            a comma
                          </p>
                        </div>
                      </div>
                      <div className="email-width">
                        <label>Email Subject</label>
                        <input
                          type="text"
                          className="layout-input"
                          label="Email Subject"
                          value={emailSubject}
                          onChange={(e) =>
                            handleFormSettingsChange(
                              "adminMail",
                              "emailSubject",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="email-width">
                        <label>Email Content</label>
                        <RichTextEditor
                          rte_val={emailContent}
                          section="adminMail"
                          section_key="emailContent"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
              {dropdown.id === "User Mail Auto Response" && (
                  <div>
                    
                    <div className="hr-line-layout"></div>
                    <div className="mail-admin">
                      <div className="input-mail">
                      {(username && appPassword && fields.some((field) => field.type === "email")) && (
                        <div className="enable">
                          <input
                            type="checkbox"
                            className="color-input-checkbox"
                            onChange={(e) =>
                              handleFormSettingsChange(
                                "autoResponse",
                                "autoenable",
                                e.target.checked
                              )
                            }
                            checked={autoenable}
                          />
                          <div>Send Email to Customer</div>
                        </div>
                        )}
                      </div>
                      {!(username && appPassword && fields.some((field) => field.type === "email") ) && (
                      <div className="klaviyo enable">
                        <div>
                          Please make sure that you have set Google Smtp provider
                          username & app password in General Settings.<br/>
                          And atleast one email field should be there in form.
                        </div>
                      </div>
                    )}
                    
                      {(autoenable ) && (<div className="mail-admin">
                      <div className="dynamic-value">
                        <div className="header-label-style">                          
                          <div className="header-label-style">
                            <label>Select one email field from your form</label>
                            <select
                              className="select-formlist"
                              value={form_field}
                              onChange={(e)=>
                                handleFormSettingsChange("autoResponse","form_field", e.target.value)
                            }
                            >
                              {fields
                                .filter((field) => field.type === "email")
                                .map((option) => (
                                  <option
                                    key={option.id}
                                    value={option.name}
                                  >
                                    {option.label}
                                  </option>
                                ))}
                                </select>
                          </div>
                          
                        </div>
                      </div>
                      <div className="email-width">
                        <label>Email Subject</label>
                        <input
                          type="text"
                          className="layout-input"
                          label="Email Subject"
                          value={autoemailSubject}
                          onChange={(e) =>
                            handleFormSettingsChange(
                              "autoResponse",
                              "autoemailSubject",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div className="email-width">
                        <label>Email Content</label>
                        <RichTextEditor
                          rte_val={autoemailContent}
                          section="autoResponse"
                          section_key="autoemailContent"
                        />
                      </div>
                      </div>)}
                    </div>
                  </div>
                )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default Mail;
