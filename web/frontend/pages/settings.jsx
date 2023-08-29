import React, { useEffect, useState } from "react";
import { CaretDownMinor } from "@shopify/polaris-icons";
import { Icon, Spinner } from "@shopify/polaris";
import recaptcha from "../assets/images/recaptcha.jpg";
import klayvio from "../assets/images/klayvio.jpg";
import { SettingsMajor, CircleCancelMajor } from "@shopify/polaris-icons";
import {
  handleAppSettingsChange,
  handleFormSettingsChange,
} from "../components/redux/handlers";
import { fetchAppSettingData } from "./index.jsx";
import { RFB_BASE_URL } from "../../config";
import { useSelector } from "react-redux";
const Settings = () => {
  const { appSettings } = useSelector((state) => state.form);
  const {
    smtpProvider,
    portNo,
    username,
    appPassword,
    customeFromEmail,
    customeFromName,
  } = appSettings?.smtpSetting || {};
  const {
    klaviyoApiprivateKey,
    klaviyoApipublicKey,
  } = appSettings?.klaviyoSetting || {};
  const shopname = localStorage.getItem("RFB_SHOPNAME");
  const [isLoading, setIsLoading] = useState(false);
  const [googleModal, setGoogleModal] = useState(false);

  const [customemail, setCustomemail] = useState(false);
  const [customename, setCustomename] = useState(false);

  const [klaviyo, setKlaviyo] = useState(false);


  const [dropdowns, setDropdowns] = useState([
    {
      id: "General Settings",
      open: false,
    },
    {
      id: "Third Party Integration",
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

  useEffect(() => {
    fetchAppSettingData();
    if (
      !(
        appSettings?.recaptchaSetting?.siteKey &&
        appSettings?.recaptchaSetting?.secretKey
      )
    ) {
      handleFormSettingsChange("googleRecaptcha", "enable", false);
    }
  }, []);

  const handleSmtpSave = async () => {
    setIsLoading(true)
    let bodyContent = JSON.stringify({
      smtpSetting: appSettings.smtpSetting,
      shop: shopname,
    });
    let response = await fetch(
      `${RFB_BASE_URL}/api/forms/updateSmtpSettings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyContent,
      }
    );

    let data = await response.json();
    console.log(data);
    setIsLoading(false)
  };

  const handleRecaptchaSave = async () => {
    setIsLoading(true)
    let bodyContent = JSON.stringify({
      recaptchaSetting: appSettings.recaptchaSetting,
      shop: shopname,
    });
    let response = await fetch(
      `${RFB_BASE_URL}/api/forms/updateRecaptchaSettings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyContent,
      }
    );

    let data = await response.json();
    setIsLoading(false)
    setGoogleModal(!googleModal);
  };

  const handleKlaviyoSave = async () => {
    setIsLoading(true)
    let bodyContent = JSON.stringify({
      klaviyoSetting: appSettings.klaviyoSetting,
      shop: shopname,
    });
    let response = await fetch(
      `${RFB_BASE_URL}/api/forms/updateKlaviyoSettings`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: bodyContent,
      }
    );

    let data = await response.json();
    setIsLoading(false)
    setKlaviyo(!klaviyo);
    console.log(data)
  };

  
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
              {dropdown.id === "General Settings" && (
                <div className="">
                  <div className="hr-line-layout"></div>
                  <div className="email-width">
                    <label>SMTP Provider: Google</label>
                    <input
                      type="text"
                      className="layout-input"
                      value={smtpProvider}
                      onChange={(e) =>
                        handleAppSettingsChange(
                          "smtpSetting",
                          "smtpProvider",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="email-width">
                    <label>Port</label>
                    <select
                      className="radio-dropdown-inputs"
                      value={portNo}
                      onChange={(e) =>
                        handleAppSettingsChange(
                          "smtpSetting",
                          "portNo",
                          e.target.value
                        )
                      }
                    >
                      <option value="465">465</option>
                    </select>
                  </div>
                  <div className="email-width">
                    <label>Username / Email Address</label>
                    <input
                      type="text"
                      className="layout-input"
                      value={username}
                      onChange={(e) =>
                        handleAppSettingsChange(
                          "smtpSetting",
                          "username",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div className="email-width">
                    <label>Password / App Password</label>
                    <input
                      type="password"
                      className="layout-input"
                      value={appPassword}
                      onChange={(e) =>
                        handleAppSettingsChange(
                          "smtpSetting",
                          "appPassword",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <div
                    className="email-width"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="layout-input"
                      checked={customemail}
                      onChange={() => setCustomemail((r) => !r)}
                    />
                    <label style={{ marginTop: "7px" }}>
                      Send mail from another email
                    </label>
                  </div>
                  {customemail && (
                    <div className="email-width">
                      <label>From Email</label>
                      <input
                        type="text"
                        className="layout-input"
                        value={customeFromEmail}
                        onChange={(e) =>
                          handleAppSettingsChange(
                            "smtpSetting",
                            "customeFromEmail",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  <div
                    className="email-width"
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <input
                      type="checkbox"
                      className="layout-input"
                      checked={customename}
                      onChange={() => setCustomename((r) => !r)}
                    />
                    <label style={{ marginTop: "7px" }}>
                      Send mail from another name
                    </label>
                  </div>
                  {customename && (
                    <div className="email-width">
                      <label>From Name</label>
                      <input
                        type="text"
                        className="layout-input"
                        value={customeFromName}
                        onChange={(e) =>
                          handleAppSettingsChange(
                            "smtpSetting",
                            "customeFromName",
                            e.target.value
                          )
                        }
                      />
                    </div>
                  )}
                  <button
                    className="button-smtp"
                    onClick={() => handleSmtpSave()}
                  >
                    Save
                  </button>
                </div>
              )}
              {dropdown.id === "Third Party Integration" && (
                <>
                  <div className="hr-line-layout"></div>
                  <div className="integrate-theme">
                    <div className="google-recaptcha theme-box">
                      <div className="img-wrapper-integrate">
                        <img src={recaptcha} alt="google-recaptcha" />
                      </div>
                      <div className="text-wrapper-with-button-integrate">
                        <div className="text-wrapper-integrate">
                          <h2 className="h2-theme">Google reCaptcha</h2>
                          <p className="para-theme">
                            reCaptcha offers more than just spam protection.
                          </p>
                        </div>
                        <div className="icon-btn-integrate">
                          <a href="#" className="icon-learnmore">
                            Learn more
                          </a>
                          <button
                            className="icon-setting"
                            onClick={() => setGoogleModal(!googleModal)}
                          >
                            <Icon source={SettingsMajor} color="base" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="klaviyo theme-box">
                      <div className="img-wrapper-integrate">
                        <img src={klayvio} alt="klaviyo" />
                      </div>
                      <div className="text-wrapper-with-button-integrate">
                        <div className="text-wrapper-integrate">
                          <h2 className="h2-theme">Klaviyo</h2>
                          <p className="para-theme">
                            Send dynamic content based on your customer's
                            browsing activity and preferences...
                          </p>
                        </div>
                        <div className="icon-btn-integrate">
                          <a href="#" className="icon-learnmore">
                            Learn more
                          </a>
                          <button
                            className="icon-setting"
                            onClick={() => setKlaviyo(!klaviyo)}
                          >
                            <Icon source={SettingsMajor} color="base" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  {googleModal && (
                    <>
                      <div className="modal google-recaptcha">
                        <div className="modal-content-wrapper">
                          <div className="modal-header">
                            <div className="h2-google">Google reCaptcha</div>
                            <button
                              className="button-exit-google"
                              onClick={() => setGoogleModal(!googleModal)}
                            >
                              <Icon source={CircleCancelMajor} color="base" />
                            </button>
                          </div>
                          <div className="hr-line-layout"></div>
                          <div className="modal-bodycontent">
                            <div className="captcha-type">
                              <h2 className="h2-google">reCaptcha type</h2>
                              <div className="btn-style-publish">
                                <div className="layout-container">
                                  <div
                                    className="header-width"
                                    aria-disabled="true"
                                  >
                                    v3
                                  </div>{" "}
                                </div>
                              </div>
                            </div>
                            <div className="site-key">
                              <h2 className="h2-google">Site key</h2>
                              <input
                                type="text"
                                className="input-google"
                                value={appSettings.recaptchaSetting.siteKey}
                                onChange={(e) =>
                                  handleAppSettingsChange(
                                    "recaptchaSetting",
                                    "siteKey",
                                    e.target.value
                                  )
                                }
                              />
                            </div>
                            <div className="secret-key">
                              <h2 className="h2-google">Secret key</h2>
                              <input
                                type="text"
                                className="input-google"
                                value={appSettings.recaptchaSetting.secretKey}
                                onChange={(e) =>
                                  handleAppSettingsChange(
                                    "recaptchaSetting",
                                    "secretKey",
                                    e.target.value
                                  )
                                }
                              />
                              <a href="#" className="link-google">
                                How to get google reCaptcha v3 API keys
                              </a>
                            </div>
                          </div>
                          <div className="hr-line-layout"></div>
                          <div className="modal-footer">
                            <button
                              className="button-google cancel"
                              onClick={() => setGoogleModal(!googleModal)}
                            >
                              Cancel
                            </button>
                            <button
                              className="button-google save"
                              onClick={() => handleRecaptchaSave()}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {klaviyo && (
                    <>
                      <div className="modal google-recaptcha">
                        <div className="modal-content-wrapper">
                          <div className="modal-header">
                            <div className="h2-google">Klaviyo</div>
                            <button
                              className="button-exit-google"
                              onClick={() => setKlaviyo(!klaviyo)}
                            >
                              <Icon source={CircleCancelMajor} color="base" />
                            </button>
                          </div>
                          <div className="hr-line-layout"></div>
                          <div className="modal-bodycontent">
                            <div className="secret-key">
                              <h2 className="h2-google">Klaviyo API private key</h2>
                              <input
                                type="text"
                                className="input-google"
                                value={klaviyoApiprivateKey}
                                onChange={(e) =>
                                  handleAppSettingsChange(
                                    "klaviyoSetting",
                                    "klaviyoApiprivateKey",
                                    e.target.value
                                  )
                                }
                              />
                              <a href="#" className="link-google">
                                Find or Generate Your API Key
                              </a>
                            </div>
                          </div>
                          <br/>
                          <div className="modal-bodycontent">
                            <div className="secret-key">
                              <h2 className="h2-google">Klaviyo API public key</h2>
                              <input
                                type="text"
                                className="input-google"
                                value={klaviyoApipublicKey}
                                onChange={(e) =>
                                  handleAppSettingsChange(
                                    "klaviyoSetting",
                                    "klaviyoApipublicKey",
                                    e.target.value
                                  )
                                }
                              />
                              <a href="#" className="link-google">
                                Find or Generate Your API Key
                              </a>
                            </div>
                          </div>
                          <div className="hr-line-layout"></div>
                          <div className="modal-footer">
                            <button
                              className="button-google cancel"
                              onClick={() => setKlaviyo(!klaviyo)}
                            >
                              Cancel
                            </button>
                            <button
                              className="button-google save"
                              onClick={() => handleKlaviyoSave()}
                            >
                              Save
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </div>
          )}
        </div>
      ))}
      {isLoading && (
        <div className="modal">
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      )}
    </div>
  );
};

export default Settings;