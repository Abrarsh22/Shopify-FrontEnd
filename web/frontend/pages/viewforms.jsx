import { Input, Table, Select } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { Button, Frame, Icon, Spinner, Toast } from "@shopify/polaris";
import { ClipboardMinor, DeleteMajor, EditMinor } from "@shopify/polaris-icons";
import { useNavigate } from "react-router-dom";
import { handleInitialize } from "../components/redux/handlers.js";
import CreateFormElements from "../components/CreateFormElements";
import { fetchAppSettingData } from "./index";
import { RFB_BASE_URL } from "../../config";

const viewforms = () => {
  const [active, setActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toggleActive = useCallback(() => setActive((active) => !active), []);
  const navigate = useNavigate();
  const [formIdToDelete, setFormIdToDelete] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState([]);
  const [value, setValue] = useState("");
  const [sorting, setSorting] = useState(true);
  const [pageSize, setPageSize] = useState(10);
  const [toastActive, setToastActive] = useState(false);
  const [toastContent, setToastContent] = useState("");
  const toastMarkup = active ? (
    <Toast content="Shortcode Copied" onDismiss={toggleActive} />
  ) : null;

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      setIsLoading(true)
      let shopname = localStorage.getItem('RFB_SHOPNAME');
      let shop = shopname ? shopname : "shop";
      const response = await fetch(`${RFB_BASE_URL}/api/forms/getforms/${shop}`);
      const data = await response.json();
      setIsLoading(false)
      setFormData(data.forms);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (uuid) => {
    fetchAppSettingData();
    setIsLoading(true)
    try {
      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/getform?id=${uuid}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      const fields = JSON.parse(data.forms.componentJSON);
      const header = JSON.parse(data.forms.headerJSON);
      const footer = JSON.parse(data.forms.footerJSON);
      const afterSubmit = JSON.parse(data.forms.afterSubmit);
      const klaviyoIntegration = JSON.parse(data.forms.klaviyoIntegration);
      const shopifyIntegration = JSON.parse(data.forms.shopifyIntegration);
      const formSettings = JSON.parse(data.forms.formSettings)
      const formCSS = JSON.parse(data.forms.formCSS);
      const { formtitle, id, status,notifyFormStatus } = data.forms;
      handleInitialize(
        formtitle,
        id,
        status,
        notifyFormStatus,
        fields,
        header,
        footer,
        formCSS,
        afterSubmit,
        formSettings,
        klaviyoIntegration,
        shopifyIntegration
      );
      navigate(`/new`);
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false)
  };

  const handleModalOpen = (id) => {
    setFormIdToDelete(id);
    setModalOpen(true);
  };

  const handleDelete = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/deleteform?id=${formIdToDelete}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.text();
      console.log(data);
      fetchFormData();
    } catch (error) {
      console.error("Error:", error);
    }
    setIsLoading(false);
    setModalOpen(false);
  };

  const handleToggle = async (id, val) => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/updateformstatus?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: val,
          }),
        }
      );
      const data = await response.json();
      console.log(data);
      fetchFormData();
    } catch (error) {
      console.log("Error>>>>>>> ", error);
    }
    setIsLoading(false)
  };
  const handleNotifyToggle = async (id, val,fields) => {
    console.log(fields)
    setIsLoading(true)
    try {
      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/updatenotifyformstatus?id=${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            notifyFormStatus: val,
            fields:fields
          }),
        }
      );
      if(!response.ok){
        const errorData = await response.json();
      console.log("Error Response: ", errorData.error);
      setToastContent(errorData.error);
      setToastActive(true);
      }else{
        const data = await response.json();
        console.log(data);
        fetchFormData();
      }
    } catch (error) {
      console.log("Error>>>>>>> ", error);
    }
    setIsLoading(false)
  };
  const handleView = (record) => {
    if (record.notifyFormStatus == 1) {
      // If notifyFormStatus is true, navigate to the notifyforms page
      navigate("/notify", { state: { formtitle: record.formtitle } });
    } else {
      // If notifyFormStatus is false, navigate to the submission page
      navigate("/submission", { state: { formtitle: record.formtitle } });
    }
  };
  
  const columns = [
    {
      title: "Form Title",
      dataIndex: "formtitle",
      key: "formTitle",
    },
    {
      title: "Form ID",
      dataIndex: "id",
      key: "formId",
    },
    {
      title: "Shortcode",
      dataIndex: "shortcode",
      key: "shortcode",
    },
    {
      title: "Copy",
      dataIndex: "shortcode",
      render: (shortcode) => (
        <button
          className="copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(shortcode);
            toggleActive();
          }}
        >
          <Icon source={ClipboardMinor} color="base" />
        </button>
      ),
    },
    {
      title: "Responses",
      dataIndex: "responses",
      render: (responses, record) => (
        <button
          className="viewforms-btn"
          onClick={() => {handleView(record)}}
        >
          view
        </button>
      ),
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      key: "createdOn",
    },
    {
      title: "Action",
      key: "action",
      render: (record) => (
        <div>
          <button className="edit-btn" onClick={() => handleEdit(record.id)}>
            <Icon source={EditMinor} color="base" />
          </button>
          <button
            className="delete-btn"
            onClick={() => handleModalOpen(record.id)}
          >
            <Icon source={DeleteMajor} color="base" />
          </button>
        </div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <label className="switch" onClick={() => handleToggle(record.id, !record.status)}>
          <input type="checkbox" checked={!record.status} onChange={() => {}} />
          <span className="slider"></span>
          <span className="label-on">On</span>
          <span className="label-off">Off</span>
        </label>
      ),
    },
    // {
    //   title: "Notify Form Status",
    //   dataIndex: "notifyFormStatus",
    //   key: "notifyFormStatus",
    //   render: (_, record) => (
    //     <label className="switch" onClick={() => handleNotifyToggle(record.id, !record.notifyFormStatus,record.componentJSON)}>
    //       <input type="checkbox" checked={!record.notifyFormStatus} onChange={() => {}} />
    //       <span className="slider"></span>
    //       <span className="label-on">On</span>
    //       <span className="label-off">Off</span>
    //     </label>
    //   ),
    // },
  ];

  const sortedDataSource = sorting
  ? [...formData].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  : [...formData].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  const filteredDataSource = sortedDataSource.filter((data) =>
    Object.values(data).some(
      (val) => val && val.toString().toLowerCase().includes(value.toLowerCase())
    )
  );
console.log(toastActive,toastContent)
  return (
    <Frame>

      {formData.length === 0 ? (
        <CreateFormElements />
      ) : (
        <div className="warppings-viewforms">
          <div className="table-header">
            <h2 className="headings">Form</h2>
            <Button
              primary
              onClick={() => {
                navigate(`/new`);
              }}
            >
              Create Form
            </Button>
          </div>
          <div className="data-listing">
            <div className="listings">
              <div className="pagination-listing">
                <span>Display</span>
                <Select defaultValue="10" onChange={(e) => setPageSize(e)}>
                  <Select.Option value="10">10</Select.Option>
                  <Select.Option value="25">25</Select.Option>
                  <Select.Option value="50">50</Select.Option>
                </Select>
                <span>records per page</span>
              </div>
              <div className="viewforms-listing">
                <Select
                  className="listing-selection"
                  placeholder="Filter"
                  onChange={(value) => setSorting(value === "new")}
                >
                  <Select.Option className="listing-selection" value="old">
                    Old
                  </Select.Option>
                  <Select.Option value="new">New</Select.Option>
                </Select>
                <Input
                  placeholder="Search"
                  value={value}
                  onChange={(event) => setValue(event.target.value)}
                />
              </div>
            </div>
            <Table
              columns={columns}
              dataSource={filteredDataSource}
              pagination={{ pageSize }}
            />
            {modalOpen && (
              <div key={formIdToDelete}>
                <div className="modal">
                  <div className="modal-content">
                    <h3>Are you sure you want to delete?</h3>
                    <div className="modal-buttons-btn">
                      <button onClick={() => handleDelete()}>
                        Yes
                      </button>
                      <button onClick={() => setModalOpen(!modalOpen)}>
                        No
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {toastMarkup}
          </div>
        </div>
      )}
      {isLoading && (
        <div className="modal">
          <Spinner accessibilityLabel="Spinner example" size="large" />
        </div>
      )}
      {toastActive && (
        <div>
          {toastContent}
          <Toast content={toastContent} onDismiss={() => setToastActive(false)} />
        </div>
      )}
    </Frame>
  );
};

export default viewforms;