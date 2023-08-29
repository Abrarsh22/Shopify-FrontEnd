import { Card, CalloutCard, EmptyState, Layout, Page } from "@shopify/polaris";
import Dashboard from "../assets/images/dashboard.jpg"
import React, { useState, useEffect } from "react";
import "../assets/base.css";
import "../assets/style.css";
import "../assets/design.css";
import "../assets/validation.css";
import { useNavigate } from "react-router-dom";
import { useAppQuery } from "../hooks";
import { handleAppSettingsReset } from "../components/redux/handlers";
import { RFB_BASE_URL } from "../../config";
export const fetchAppSettingData = async () => {
  try {
    const shop = localStorage.getItem('RFB_SHOPNAME');
    const response = await fetch(
      `${RFB_BASE_URL}/api/forms/getShopifySession?shop=${shop}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch app settings. Status: ${response.status}`);
    }

    const data = await response.json();

    handleAppSettingsReset("smtpSetting", data[0]?.smtpSetting ? JSON.parse(data[0]?.smtpSetting) : {smtpProvider: 'smtp.gmail.com',
    portNo: '465'});
    handleAppSettingsReset("klaviyoSetting", data[0]?.klaviyoSetting ? JSON.parse(data[0]?.klaviyoSetting) : {});
    handleAppSettingsReset("recaptchaSetting", data[0]?.recaptchaSetting ? JSON.parse(data[0]?.recaptchaSetting) : {});
    handleAppSettingsReset("notifysmtpSetting", data[0]?.notifysmtpSetting ? JSON.parse(data[0]?.notifysmtpSetting) : {});
  } catch (error) {
    console.log(error);
  }
};


const form = () => {
  const navigate = useNavigate();
  const [shop, setShop] = useState("");
  

  useEffect(() => {
    fetchAppSettingData();
  }, [shop]);

  useAppQuery({
    url: "/api/shop",
    reactQueryOptions: {
      onSuccess: (res) => {
        console.log("res", res);
        setShop(res.data[0].myshopify_domain);
        localStorage.setItem("RFB_SHOPNAME", res.data[0].myshopify_domain);
      },
    },
  });

  let template = "",
    uuid = "194eab67-fca4-4f6f-b610-ffbe27269bcd",
    handle = "app-embed-script";
  const url = `https://${shop}/admin/themes/current/editor?context=apps&template=${template}&activateAppId=${uuid}/${handle}`;

  return (
    <div>
      <Page fullWidth>
        <Layout>
          <Layout.Section>
          <div className="enable-extension">
              <div className="enabled-text-wrapper">
                <h2>App Enabled</h2>
                <p>
                  The app is live and any features you've setup are visible to
                  your shop's customers!
                </p>
              </div>
              <div className="enabled-activate-button">
                <button onClick={() => window.open(url, "_blank")}>
                  Activate
                </button>
              </div>
            </div>
          </Layout.Section>
          <Layout.Section>
            <div className="first-page dr-forms-dashboard">
              <div className="title-with-content">
                <h2>Welcome to my Form Builder</h2>
                <div className="title-content-grid">
                  <div>
                    <Card sectioned>
                      <EmptyState
                        heading="Forms"
                        action={{
                          content: "Forms",
                          onAction: () => {
                            navigate(`/form`);
                          },
                        }}
                        image={Dashboard}
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna.
                        </p>
                      </EmptyState>
                    </Card>
                  </div>
                  <div>
                    <Card sectioned>
                      <EmptyState
                        heading="Submission"
                        action={{
                          content: "Submission",
                          onAction: () => {
                            navigate(`/submission`);
                          },
                        }}
                        image={Dashboard}
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna.
                        </p>
                      </EmptyState>
                    </Card>
                  </div>
                  <div>
                    <Card sectioned>
                      <EmptyState
                        heading="Settings"
                        action={{
                          content: "Settings",
                          onAction: () => {
                            navigate(`/settings`);
                          },
                        }}
                        image={Dashboard}
                      >
                        <p>
                          Lorem ipsum dolor sit amet, consectetur adipiscing
                          elit, sed do eiusmod tempor incididunt ut labore et
                          dolore magna.
                        </p>
                      </EmptyState>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </Layout.Section>
        </Layout>
      </Page>
    </div>
  );
};

export default form;
