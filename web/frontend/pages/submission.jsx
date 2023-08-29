import { Page, Button, Icon, Spinner, Frame } from "@shopify/polaris";
import { Table, Tag, Space, Input, Select, Switch } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  CircleCancelMajor,
  FormsMajor,
  CustomersMajor,
  PageMajor,
} from "@shopify/polaris-icons";
import Papa from "papaparse";
import { RFB_BASE_URL } from "../../config";

const submission = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formList, setFormList] = useState([]);
  const location = useLocation();
  const [fetchFormId, setFetchFormId] = useState();
  const [columns, setColumns] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalRecord, setModalRecord] = useState();
  const [value, setValue] = useState("");
  const [sorting, setSorting] = useState(true);
  const [pageSize, setPageSize] = useState(25);

  const fetchFormData = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      fetch(
        `${RFB_BASE_URL}/api/forms/getFormsExceptNotifyForm/${localStorage.getItem(
          "RFB_SHOPNAME"
        )}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error);
          }
          const transformedArray = data.forms.map(({ id, formtitle }) => ({
            id,
            formtitle,
          }));
          setFormList(transformedArray);
          setIsLoading(false);
          resolve(transformedArray);
        })
        .catch((error) => {
          console.log(error);
          reject(error);
        });
    });
  };

  useEffect(() => {
    fetchFormData()
      .then((transformedArray) => {
        if (location.state === null || location.state.formtitle === undefined) {
          setFetchFormId(transformedArray[0].formtitle);
        } else {
          setFetchFormId(location.state.formtitle);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    setIsLoading(true);
    if (fetchFormId !== undefined) {
      fetch(`${RFB_BASE_URL}/api/forms/getSubmissions/${fetchFormId}`)
        .then((res) => res.json())
        .then((result) => {
          setIsLoading(false);
          if (result.data.length === 0) {
            console.log(result.data);
            setDataSource([]);
            setColumns([]);
          } else {
            const submitObj = result.data;
            const firstObj = submitObj[0];
            const { formId, ...restProps } =
              firstObj;
            const cols = [];
            for (const key in restProps) {
              var render = (value) => {
                return <span>{String(value)}</span>;
              };

              const col = {
                title:
                  String(key).charAt(0).toUpperCase() + String(key).slice(1),
                dataIndex: key,
                render: render,
                ellipsis: true,
                width: 100,
              };
              cols.push(col);
            }

            cols.push({
              title: "Action",
              key: "action",
              fixed: "right",
              width: 100,
              render: (_, record) => (
                <Space size="middle">
                  <Button
                    primary
                    className="view-btn"
                    onClick={() => {
                      setModalOpen(!modalOpen);
                      setModalRecord(record);
                    }}
                  >
                    View
                  </Button>
                </Space>
              ),
            });
            setColumns(cols);
            setDataSource(submitObj);
          }
        });
    }
  }, [fetchFormId]);

  const ModalView = ({ record }) => {
    const unFilteredEntries = Object.entries(record);
    const entries = unFilteredEntries.filter(([key, value]) => key !== 'customer_ipAddress' && key !== 'customer_id' && key !== 'page_url' && key !== 'formId' && key !== 'id');
    const handleClickOutsideModal = (e) => {
      if (
        e.target.classList.contains("modal") ||
        e.target.classList.contains("header-close")
      ) {
        setModalOpen(false);
      }
    };
    useEffect(() => {
      document.addEventListener("click", handleClickOutsideModal);
      return () => {
        document.removeEventListener("click", handleClickOutsideModal);
      };
    });

    return (
      <div className="modal">
        <div className="modal-content-wrapper">
          <div className="modal-header">
            <div className="header-details">Details</div>
            <div
              className="header-close"
              onClick={() => setModalOpen(!modalOpen)}
            >
              <Icon source={CircleCancelMajor} color="base" />
            </div>
          </div>
          <div className="modal-icon-with-content">
            <div className="modal-icons">
              <div className="icon-container">
                <Icon source={FormsMajor} color="base" />
              </div>
              <div className="customer-detail">
                <div className="customer-container">
                  <b>
                    Form Name: {" "}
                  </b>
                    {fetchFormId ? fetchFormId : "--"}
                </div>
                <div className="customer-container">
                  <b>
                    Form ID: {" "}
                  </b>
                    {record?.formId ? record?.formId : "--"}
                </div>
              </div>
            </div>
            <div className="modal-icons">
              <div className="icon-container">
                <Icon source={FormsMajor} color="base" />
              </div>
              <div className="customer-detail">
                <div className="customer-container">
                  <b>
                    Submission ID: {" "}
                  </b>
                    {record?.id ? record?.id : "--"}
                </div>
              </div>
            </div>
            <div className="modal-icons">
              <div className="icon-container">
                <Icon source={CustomersMajor} color="base" />
              </div>
              <div className="customer-detail">
                <div className="customer-container">
                  <b>
                    Customer IP Address: {" "}
                  </b>
                    {record?.customer_ipAddress ? record?.customer_ipAddress : "--"}
                </div>
                <div className="customer-container">
                  <b>
                    Customer Id: {" "}
                  </b>
                    {record?.customer_id ? record?.customer_id : "--"}
                </div>
              </div>
            </div>
            <div className="modal-icons">
              <div className="icon-container">
                <Icon source={PageMajor} color="base" />
              </div>
              <div className="customer-container">
                <b>Page Url: </b>
                <a href={record?.page_url ? record?.page_url : "#"} target="_blank" rel="noopener noreferrer">
                  {record?.page_url ? record?.page_url : ""}
                </a>
              </div>
            </div>
          </div>
          <div className="modal-column-container">
            {entries.map(([key, value]) => (
              <div key={key}>
                <div className="hr-line-layout"></div>
                <div className="column-text">
                  <span>
                    <b>{key}: </b> {`${value}`}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <div className="buttons-wrapper">
            <button
              className="close-btn"
              onClick={() => setModalOpen(!modalOpen)}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  // filter by search and Sort  by ascending and descending

  const sortedDataSource = sorting
    ? [...dataSource].sort((a, b) => new Date(b.id) - new Date(a.id))
    : [...dataSource].sort((a, b) => new Date(a.id) - new Date(b.id));
  const filteredDataSource = sortedDataSource.filter((data) =>
    Object.values(data).some(
      (val) => val && val.toString().toLowerCase().includes(value.toLowerCase())
    )
  );

  const handleDownload = (dataobjects) => {
    const csvData = Papa.unparse(dataobjects);
    const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "submission.csv");
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const height = window.innerHeight - 300;

  return (
    <Page fullWidth>
      <Frame>
        <div className="submission-header">
          <h2 className="headers">Submission</h2>
          <Button primary onClick={() => handleDownload(filteredDataSource)}>
            Export all data
          </Button>
        </div>
        <div className="data-listing">
          <div className="submission-filters-with-search-with-forms">
            <div className="submission-filters-and-search">
              <Input.Search
                className="submission-search"
                placeholder="Search"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              <Select
                className="listing-selection"
                placeholder="Filter"
                onChange={(value) => setSorting(value === "new")}
              >
                <Select.Option value="new">New</Select.Option>
                <Select.Option value="old">Old</Select.Option>
              </Select>
              <Select defaultValue="25" onChange={(e) => setPageSize(e)}>
                <Select.Option value="25">25</Select.Option>
                <Select.Option value="50">50</Select.Option>
                <Select.Option value="100">100</Select.Option>
              </Select>
            </div>
            <div>
              <Select
                value={fetchFormId}
                onChange={(value) => setFetchFormId(value)}
              >
                {formList &&
                  formList.map((data, index) => (
                    <Select.Option key={index} value={data.formtitle}>
                      {data.formtitle}
                    </Select.Option>
                  ))}
              </Select>
            </div>
          </div>
          <Table
            columns={columns}
            dataSource={filteredDataSource}
            pagination={{ pageSize }}
            scroll={{
              y: height,
            }}
          />
          {modalOpen && <ModalView record={modalRecord} />}
        </div>
        {isLoading && (
          <div className="modal">
            <Spinner accessibilityLabel="Spinner example" size="large" />
          </div>
        )}
      </Frame>
    </Page>
  );
};

export default submission;
