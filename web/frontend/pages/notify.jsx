import { Page, Frame, Tabs, Modal, Button,Toast,Spinner } from "@shopify/polaris";
import { useEffect, useState } from "react";
import { Table , Input,DatePicker, Select} from "antd";
import { useDispatch, useSelector } from "react-redux";
import "../assets/style.css";
import "../assets/base.css";
import "../assets/formbuilder-design.css";
import "../assets/design.css"
import { CaretDownMinor,CircleDownMajor,CircleUpMajor } from "@shopify/polaris-icons";
import { Icon } from "@shopify/polaris";
import { RFB_BASE_URL } from "../../config";
import { handleAppSettingsChange,handleAppSettingsReset,handleInitialize } from "../components/redux/handlers";
import { RichTextEditor } from "../components/FormBuilderComponents/utils/RichTextEditor";
import Papa from "papaparse";
// import 'react-toastify/dist/ReactToastify.css';
import { setNotifyFormStatus } from "../components/redux/formSlice";

const notify = () => {
  const [customerData, setCustomerData] = useState([]);
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [productDetails,setProductDetails] = useState([]);
  
  const [productList,setProductList] = useState([]);
  
const [selectedProduct, setSelectedProduct] = useState(null);
const [customerList, setCustomerList] = useState([]);
  //for searching customer in table
  const [searchValue, setSearchValue] = useState('');
  let [filteredData, setFilteredData] = useState([]);
  const [selectedDateRange, setSelectedDateRange] = useState(null);

  //for searching product in table
  const [searchProductValue, setSearchProductValue] = useState('');
  let [filteredProductData, setFilteredProductData] = useState([]);

const [isImportModalOpen,setIsImportModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastSuccess, setToastSuccess] = useState("");
  useEffect(() => {
    fetchCustomers();
    fetchProducts();
  }, []);
  
  // filteredData = customerData.filter((customer) => {
  //   return Object.values(customer).some((val) => {
  //     if (val && val.toString) {
  //       return val.toString().toLowerCase().includes(searchValue.toLowerCase());
  //     }
  //     return false;
  //   });
  // });
  // console.log(filteredData)
  const handleProductSearch = (value) => {
    setSearchProductValue(value)

    // Filter the customer data based on the search value
    const filtered = productList.filter((product) => {
      return Object.values(product).some((val) => {
        if (val && val.toString) {
          return val.toString().toLowerCase().includes(searchProductValue.toLowerCase());
        }
        return false;
      });
    });

    setFilteredProductData(filtered);
  };
  
  const fetchCustomers = async () => {
    try {
      let shopname = localStorage.getItem('RFB_SHOPNAME');
      // let shop = shopname ? shopname : "shop";

      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/getNotifyCustomers/${shopname}`
      );
      const data = await response.json();

      // Parse the productId string into an array of objects
      const customersWithParsedProductId = data.map((customer) => ({
        ...customer,
        productId: JSON.parse(customer.productId),
      }));
console.log(customersWithParsedProductId)
      setCustomerData(customersWithParsedProductId);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };
  const fetchProducts = async () => {
    try {
      let shopname = localStorage.getItem('RFB_SHOPNAME');

      const response = await fetch(
        `${RFB_BASE_URL}/api/forms/getNotifyProducts/${shopname}`
      );
      const data = await response.json();
      console.log(data)
        setProductList(data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };
  useEffect(() => {
    applyFilters(searchValue, selectedDateRange);
  }, [customerData, searchValue, selectedDateRange]);
  
  const handleSearch = (value) => {
    setSearchValue(value);
    applyFilters(value, selectedDateRange);
  };

  const handleDateRangeChange = (dates) => {
    setSelectedDateRange(dates);
    applyFilters(searchValue, dates);
  };

  const applyFilters = (searchValue, dateRange) => {
    let filtered = customerData;
  
    if (searchValue) {
      filtered = filtered.filter((customer) => {
        return Object.values(customer).some((val) => {
          if (val && val.toString) {
            return val.toString().toLowerCase().includes(searchValue.toLowerCase());
          }
          return false;
        });
      });
    }
  
    if (dateRange && dateRange.length === 2) {
      const [startDate, endDate] = dateRange;
      filtered = filtered.filter((customer) => {
        const createdAt = new Date(customer.createdAt);
        return createdAt >= startDate && createdAt <= endDate;
      });
    }
  
    setFilteredData(filtered);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
    const handleAllCustomerDownload = (dataObjects) => {
    const dataToExport = filteredData.length > 0 ? filteredData : customerData;
  
    const csvRows = [];
  
    dataToExport.forEach((data) => {
      const products = data.productId.map((product) => ({
        id: product.id,
        productAvailable: product.productAvailable,
        thankyouemailresponsestatus: product.thankyouemailresponsestatus,
        instockresponsestatus: product.instockresponsestatus
      }));
  
      products.forEach((product) => {
        const csvRow = {
          shopname : data.shopname,
          formid : data.formid,
          productId: product.id,
          productAvailable: product.productAvailable,
          thankyouemailresponsestatus: product.thankyouemailresponsestatus,
          instockresponsestatus: product.instockresponsestatus,
          email: data.email,
          createdAt: new Date(data.createdat).toISOString(), // Use ISO format
          updatedAt: new Date(data.updatedat).toISOString(), // Use ISO format
        };
        csvRows.push(csvRow);
      });
    });
  
    const csvData = Papa.unparse(csvRows);
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'allNotifyCustomers.csv');
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleTabChange = (selectedTabIndex) => {
    setSelectedTab(selectedTabIndex);
  };

  const handleViewDetails = async (customer) => {
    console.log('176', customer);
    setSelectedCustomer(customer);
    setIsModalOpen(true);
    try {
      let shopname = localStorage.getItem('RFB_SHOPNAME');
      console.log(customer.email);
      const response = await fetch(`${RFB_BASE_URL}/api/forms/getCustomersByEmail/${customer.email}?shopname=${shopname}`);
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        setProductDetails(data.product);
  
        // Extract and process dynamic fields
        const dynamicFields = Object.keys(data)
          .filter((key) => !["id", "formid", "productId", "createdat", "updatedat", "email"].includes(key))
          .map((key) => ({ name: key, value: data[key] }));
  
        console.log("Dynamic Fields:", dynamicFields);
        // Here, you have an array of objects representing the dynamic fields with their names and values.
        // You can further process or display them as needed.
      } else {
        // Handle the error response
      }
    } catch (error) {
      console.error("Error fetching product details:", error);
      // Handle the error
    }
  };
  
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
  };

  const handleProductDownload = () => {
    const fileName = `${selectedCustomer.email}_products.csv`;
  
    const customerColumns = Object.keys(selectedCustomer).filter((key) => key !== 'productId' && key !== 'shopname' && key !== 'formid' && key !== 'createdat' && key !== 'updatedat');
  
    const csvData = Papa.unparse({
      fields: [...customerColumns, 'product_id', 'product_name', 'createdAt', 'productAvailable'],
      data: productDetails.map((product) => ({
        customer_email: selectedCustomer.email,
        ...selectedCustomer,
        createdAt: getProductCreatedAt(product, customerData),
        product_id: product.id,
        product_name: product.title,
        productAvailable: product.variants.some((variant) => variant.inventory_quantity > 0) ? 'true' : 'false',
      })),
    });
  
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getProductCreatedAt = (product, customerData) => {
    const customer = customerData.find((c) => c.email == selectedCustomer.email);
    const productData = customer?.productId.find((p) => p.id == product.id);
    return productData ? productData.createdAt : '-';
  };
  const renderModalContent = () => {
    console.log(selectedCustomer);
    console.log(customerData);
    if (selectedCustomer && customerData) {
      const customer = customerData.find((c) => c.email === selectedCustomer.email);
      if (customer) {
        const columns = [
          { title: 'Product ID', dataIndex: 'id' },
          { title: 'Product Title', dataIndex: 'title' },
          {
            title: 'Created At',
            dataIndex: 'id',
            render: (productId) => getProductCreatedAt({ id: productId }, customerData),
          },
          {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (image) => (
              <img src={image?.src} alt={image?.alt} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
            ),
          },
          {
            title: 'Product Available',
            dataIndex: 'variants',
            render: (variants) => {
              console.log(variants);
              return variants.map((variant) => {
                console.log(variant.inventory_quantity);
                const quantity = variant.inventory_quantity <= 0 ? 'false' : 'true';
                console.log('quantity', quantity);
                return quantity ? quantity : 'true';
              });
            }
          },
        ];
  
        return (
          <div>
            <p>ID: {selectedCustomer.id}</p>
            <p>Name: {selectedCustomer.name}</p>
            <p>Email: {selectedCustomer.email}</p>
            <p>Product Count: {customer.productId.length}</p>
            <p>Product Details:</p>
            <div className="submission-header">
          <h2 className="headers"></h2>
          <Button primary onClick={handleProductDownload}>
            Export all data
          </Button>
        </div>
            <Table columns={columns} dataSource={productDetails} />
          </div>
        );
      }
    }
  
    return null;
  };
  
const handleProductViewDetails = async (record)=>{
  setIsCustomerModalOpen(true);
  console.log("RECORD",record)
  setSelectedProduct(record);
  try {
    let shopname = localStorage.getItem('RFB_SHOPNAME');
    const response = await fetch(`${RFB_BASE_URL}/api/forms/getCustomersByProductId/${record.id}?shopname=${shopname}`);
    const data = await response.json();
    if (response.ok) {
      const customersWithParsedProductId = data.map((customer) => ({
        ...customer,
        productId: JSON.parse(customer.productId),
      }));
  
      setCustomerList(customersWithParsedProductId);
    } else {
      // Handle the error response
    }
  } catch (error) {
    console.error("Error fetching customers:", error);
    // Handle the error
  }
}

const fetchCustomerEmails = async (productId) => {
  try {
    let shopname = localStorage.getItem('RFB_SHOPNAME');
    const response = await fetch(`${RFB_BASE_URL}/api/forms/getCustomersByProductId/${productId}?shopname=${shopname}`);
    const data = await response.json();
    console.log(data)
    if (response.ok) {
      return data;
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching customer emails:", error);
    return [];
  }
};

const handleAllProductDownload = async () => {
  const dataToExport = filteredProductData.length > 0 ? filteredProductData : productList;

  // Fetch customer email data for all products
  const customerEmailData = await Promise.all(
    dataToExport.map(async (product) => {
      const customerEmailsData = await fetchCustomerEmails(product.id);
      return customerEmailsData.map((customer) => {
        const customerFields = Object.keys(customer)
          .filter(
            (key) =>
              key !== "id" &&
              key !== "shopname" &&
              key !== "formid" &&
              key !== "productId" &&
              key !== "createdat" &&
              key !== "updatedat"
          )
          .reduce((acc, key) => {
            acc[key] = customer[key];
            return acc;
          }, {});
        return customerFields;
      });
    })
  );

  // Prepare the CSV data
  const csvData = customerEmailData.flatMap((customers, index) => {
    const product = dataToExport[index];
    return customers.map((customer) => ({
      product_id: product.id,
      title: product.title,
      vendor: product.vendor,
      createdAt: new Date(product.created_at).toLocaleDateString("en-US", {
        month: "numeric",
        day: "numeric",
        year: "numeric",
      }),
      status: product.status,
      ...customer,
    }));
  });

  // Get all the unique keys across all customer data
  const allKeys = Array.from(new Set(csvData.flatMap((row) => Object.keys(row))));

  // Generate the CSV column headers
  const csvColumns = allKeys.filter((key) => key !== "id" && key !== "shopname" && key !== "formid");

  // Create the CSV content
  const csvContent = Papa.unparse({
    fields: ["product_id", "title", "vendor", "createdAt", "status", ...csvColumns],
    data: csvData,
  });

  // Create and trigger the CSV download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", "allNotifyProducts.csv");
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const handleCustomerCloseModal = () => {
  setIsCustomerModalOpen(false)
  setSelectedProduct(null);
};
const renderCustomerModalContent = () => {
  // console.log("CUSTOMER LIST",customerList,selectedProduct)
    const customers = customerData.filter((customer) => {
      return customer.productId.some((product) => product.id == selectedProduct.id);
    });
    console.log(customers)
  const getStatusColor = (status) => {
    if (status === 'pending') {
      return 'skyblue';
    } else if (status === 'Sent') {
      return 'lightgreen';
    } else {
      return 'red';
    }
  };
    const columns = [
      { title: 'ID', dataIndex: 'id' },
      { title: 'Email', dataIndex: 'email' },
	 {
        title: 'ThankYou Email Status',
        render: (customer) => {
          const selectedProductData = customer.productId.find(
            (product) => product.id == selectedProduct.id
          );
            console.log("410",selectedProductData)
          return (
            <p
              style={{
                backgroundColor: getStatusColor(
                  selectedProductData.thankyouemailresponsestatus
                ),
                textAlign: 'center',
                borderRadius: '5px',
                padding: '1px',
              }}
            >
              {selectedProductData.thankyouemailresponsestatus === 'pending'
                ? 'Pending'
                : selectedProductData.thankyouemailresponsestatus}
            </p>
          );
        },
      },
      {
        title: 'In Stock Email Status',
        render: (customer) => {
          const selectedProductData = customer.productId.find(
            (product) => product.id == selectedProduct.id
          );
  
          return (
            <p
              style={{
                backgroundColor: getStatusColor(
                  selectedProductData.instockresponsestatus
                ),
                textAlign: 'center',
                borderRadius: '5px',
                padding: '1px',
              }}
            >
              {selectedProductData.instockresponsestatus === 'pending'
                ? 'Pending'
                : selectedProductData.instockresponsestatus}
            </p>
          );
        },
      },      
    ];
     const handleCustomerDownload = (dataObjects) => {
      const fileName = `${selectedProduct.title}_customers.csv`;
      const dynamicFields = Object.keys(dataObjects[0]).filter(
        (key) => key!== "id" && key !== "shopname" && key !== "formid" && key !== "productId"
      );
    
      const csvData = Papa.unparse({
        fields: ["id", ...dynamicFields, "productId", "productName"],
        data: dataObjects.map((customer) => ({
          ...customer,
          id: customer.id,
          productId: `'${selectedProduct.id}`,
          productName: `${selectedProduct.title}`,
        })),
      });
    
      const blob = new Blob([csvData], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", fileName);
      link.style.display = "none";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };    
    
    return (
      <div>
        <div style={{textAlign:'center',padding:'10px',fontSize:'17px',margin:'10px'}}>
        <p>Product ID: {selectedProduct.id}</p>
        <p>Product Title: {selectedProduct.title}</p>
        {selectedProduct.variants.map((variant, index) => (
        <p key={index}>
          Product Available: {variant.inventory_quantity <= 0 ? 'False' : 'True'}
        </p>
      ))}
      </div>
      <div className="submission-header">
          <h2 className="headers"></h2>
          <Button primary onClick={() => handleCustomerDownload(customers)}>
            Export all data
          </Button>
        </div>
        <Table columns={columns} dataSource={customers} />
      </div>
    );
};

  const columns = [
    { title: "ID", dataIndex: "id" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Product Count",
      render: (record) => record.productId.length,
    },
    {
      title: "Action",
      render: (record) => (
        <Button primary onClick={() => handleViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];
  const productColumns = [
    { title: "Product ID", dataIndex: "id" },
    { title: "Product Title", dataIndex: "title" },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (image) => (
        <img src={image?.src} alt={image?.alt} style={{ width: '80px', height: '80px', objectFit: 'cover' }} />
      ),
    },
    {
      title: 'Product Available',
      dataIndex: 'variants',
      render: (variants) => {
        console.log(variants);
        return variants.map((variant) => {
          console.log(variant.inventory_quantity);
          const quantity = variant.inventory_quantity <= 0 ? 'false' : 'true';
          console.log('quantity', quantity);
          return quantity ? quantity : 'true';
        });
      }
    },
    {
      title: "Action",
      render: (record) => (
        <Button primary onClick={() => handleProductViewDetails(record)}>
          View Details
        </Button>
      ),
    },
  ];

  const handleImport = ()=>{
    console.log("HELLO")
    console.log(isImportModalOpen)
    setIsImportModalOpen(true);
  }
  const handleImportCloseModal = () => {
    setIsImportModalOpen(false);
    setSelectedFile(null);
  };
  
 
  const handleFileSelection = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    } else {
      setSelectedFile(null);
    }
  };
  function showToastMessage(message, error) {
    const errorMessage = error ? `${message} ${error}` : message;
    setToastMessage(errorMessage);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  }

  function showToastSuccess(message) {
    setToastSuccess(message);
    setShowSuccess(true);
    setTimeout(() => {
      setShowSuccess(false);
    }, 3000);
  }

  const handleFileUpload = async () => {
    console.log(selectedFile)
    setIsImportModalOpen(false)
    setIsLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append('csvFile', selectedFile);
      for (const pair of formData.entries()) {
        console.log(pair[0], pair[1]);
      }
      try {
        let response = await fetch(
          `${RFB_BASE_URL}/api/forms/pushDatainDB`,
          {
            method: "POST",
            body: formData
          }
        );
        const result = await response.json();
        if(result.error){
          console.log(result.error)
          throw new Error(result.error);
        }
        setIsLoading(false);
        console.log(result);
        showToastSuccess("Data Imported Successfully");
      } catch (error) {
       console.log(error.message,error.error,error)
        setIsImportModalOpen(false)
        setIsLoading(false)
        setShowToast(true)
        console.error('Error uploading CSV file:', error.message);
        showToastMessage("",error.message);
      }
      handleImportCloseModal();
    }
  };
  
  const handleDownloadSample = () => {
    const sampleCSV = [
      ['shopname', 'formid', 'productId','productAvailable', 'thankyouemailresponsestatus', 'instockresponsestatus', 'email', 'createdAt', 'updatedAt'],
      ['thespiritsembassy-stagging.myshopify.com', '074058c6-8254-4b06-bde6-32b24be78619', '39507946668067','FALSE','pending', 'pending', 'vaibhav@digitalrangers.in', '2023-01-09T13:02:48.000Z', '2023-01-05T05:37:30.000Z'],
      ['thespiritsembassy-stagging.myshopify.com', '074058c6-8254-4b06-bde6-32b24be78619', '39573006876707','TRUE', 'pending', 'Sent', 'nrajkumar2511@gmail.com', '2023-01-09T13:02:48.000Z', '2023-01-05T05:37:30.000Z'],
      ['thespiritsembassy-stagging.myshopify.com', '074058c6-8254-4b06-bde6-32b24be78619', '395079466680343','FALSE','pending', 'pending', 'vaibhav@digitalrangers.in', '2023-01-09T13:02:48.000Z', '2023-01-05T05:37:30.000Z'],
    ];
    
    const csvContent = sampleCSV.map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample.csv';
    a.click();
    URL.revokeObjectURL(url);
    
  };


  const SettingsTabContent = () => {
    const {appSettings} = useSelector((state) => state.form);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const shopname = localStorage.getItem("RFB_SHOPNAME")
    console.log(appSettings);
    const [showNotification, setShowNotification] = useState(false);
    // const [showInstockNotification, setInStockShowNotification] = useState(false);

  const [initialFormTitle, setInitialFormTitle] = useState(null);
  const [formList, setFormList] = useState([]);
  const [fetchFormId, setFetchFormId] = useState(initialFormTitle);
const [notifyFormStatus,setNotifyFormStatus] = useState();

const [toastActive, setToastActive] = useState(false);
const [toastContent, setToastContent] = useState("");
  const fetchFormData = () => {
    return new Promise((resolve, reject) => {
      setIsLoading(true);
      fetch(
        `${RFB_BASE_URL}/api/forms/getforms/${localStorage.getItem("RFB_SHOPNAME"
        )}`
        )
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          if (data.error) {
            throw new Error(data.error);
          }
          const transformedArray = data.forms.map(({ id, formtitle,notifyFormStatus }) => ({
            id,
            formtitle,
            notifyFormStatus
          }));
          console.log("ARRAY",transformedArray)
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
        if (transformedArray.length > 0) {
          const formWithNotifyStatusActive = transformedArray.find(form => form.notifyFormStatus == 1);
          console.log(formWithNotifyStatusActive)
        if (formWithNotifyStatusActive) {
          // Set the ID of the form with notifyFormStatus as true to fetchFormId
          setFetchFormId(formWithNotifyStatusActive.formtitle);
        }
          // setFetchFormId(transformedArray[0].formtitle);
        } else {
          setFetchFormId(location.state.formtitle);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
    const {
      smtpProvider,
      portNo,
      username,
      appPassword,
    } = appSettings.notifysmtpSetting;
    const { 
      thankyouemailSubject,
      thankyouemailContent
     } = appSettings.notifythankyouemailResponse;
     const { 
      InstockemailSubject,
      InstockemailContent
     } = appSettings.notifyInstockemailResponse;
// const {notifyId} = appSettings.notifyFormId

    const [dropdowns, setDropdowns] = useState([
      {
        id: "Select Form as Notify Form",
        open:false,
      },
      {
        id: "Mail Settings",
        open: false,
      },
      {
        id: "Thankyou Mail Response Template",
        open: false,
      },
      {
        id: "In Stock Mail Response Template",
        open: false,
      }
      
    ]);
    useEffect(() => {
      const fetchNotifySmtpSetting = async () => {
        try {
          let response = await fetch(
            `${RFB_BASE_URL}/api/forms/getShopifySession?shop=${shopname}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
            );
            
            let data = await response.json();
            console.log(data)
            
          if(!(data[0].notifysmtpSetting === null)){
            handleAppSettingsReset("notifysmtpSetting", data[0]?.notifysmtpSetting ? JSON.parse(data[0]?.notifysmtpSetting) : {});
          }
          if(!(data[0].notifythankyouemailResponse === null)){
            handleAppSettingsReset("notifythankyouemailResponse", data[0]?.notifythankyouemailResponse ? JSON.parse(data[0]?.notifythankyouemailResponse) : {});
          }
        } catch (error) {
          console.error("Error fetching notifySmtpSetting:", error);
        }
      };
    
      fetchNotifySmtpSetting();
    }, []);
    const saveThankyouEmailSettings = async () => {
      const formData = {
        thankyouemailSubject,
        thankyouemailContent,
      };
    
      console.log(thankyouemailSubject, thankyouemailContent);
      setIsLoading(true)
      let bodyContent = JSON.stringify({
        notifythankyouemailResponse: appSettings.notifythankyouemailResponse,
        shop: shopname,
      });
      let response = await fetch(
        `${RFB_BASE_URL}/api/forms/updateNotifyEmailSettings`,
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
      setShowNotification(true);

    setTimeout(() => {
      setShowNotification(false);
    }, 2000); 
    };
    const saveInStockEmailSettings = async () => {
      const formData = {
        InstockemailSubject,
        InstockemailContent
      };
    
      setIsLoading(true)
      let bodyContent = JSON.stringify({
        notifyInstockemailResponse: appSettings.notifyInstockemailResponse,
        shop: shopname,
      });
      let response = await fetch(
        `${RFB_BASE_URL}/api/forms/updateNotifyInStockEmailSettings`,
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
      setInStockShowNotification(true);

    setTimeout(() => {
  setInStockShowNotification(false);
    }, 2000); 
    };
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

    const handleNotifySmtpSave = async () => {
      setIsLoading(true)
      let bodyContent = JSON.stringify({
        notifysmtpSetting: appSettings.notifysmtpSetting,
        shop: shopname,
      });
      let response = await fetch(
        `${RFB_BASE_URL}/api/forms/updateNotifySmtpSettings`,
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
    
const handleFormIdChange=async (e)=>{
  dispatch(setNotifyFormStatus(true));
  console.log(e)
  handleAppSettingsChange(
    "notifyFormId",
    "id",
    e
  )
  await updateId(e);
}
const updateId = async (e) => {
  try {
    let bodyContent = JSON.stringify({
      notifyFormId: appSettings.notifyFormId,
      shop: shopname,
    });

    let response = await fetch(`${RFB_BASE_URL}/api/forms/updateNotifyFormId`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: bodyContent,
    });

    if (!response.ok) {
      // Handle the API error, log the error, or show a user notification.
      console.error("API call failed:", response.status, response.statusText);
      return;
    }

    let data = await response.json();
    console.log("API response:", data);

    // Only update the database with the new notifyFormId if the API call was successful.
    // Update the database here...
    // Example: db.updateFormId(data.notifyFormId);

    setIsLoading(false);
  } catch (error) {
    console.error("Error occurred during API call:", error);
    // Handle the error, log it, or show a user notification.
    setIsLoading(false);
  }
};
const [updateModalOpen, setUpdateModalOpen] = useState(false);
const [modalData, setModalData] = useState({ id: null, status: null,formTitle : null });

const handleModalOpen=(id,status,formTitle)=>{
  setModalData({ id, status,formTitle })
  setUpdateModalOpen(true);
}

const handleNotifyToggle = async () => {
const { id, status } = modalData;
  console.log(id, status);
  try {
    // Retrieve the existing form data for the given `id`
    let shopname = localStorage.getItem('RFB_SHOPNAME');
    const response = await fetch(`${RFB_BASE_URL}/api/forms/getform?id=${id}`, {
      method: "GET",
    });
    const data = await response.json();

    // Parse the `componentJSON` from the existing form data
    const fields = JSON.parse(data.forms.componentJSON);
    const emailField = fields.find((field) => field.type === 'email');
    console.log(emailField)
    // If there's an email field, update the `notifyFormStatus`
    if (emailField) {
      const { notifyFormStatus } = data.forms;
      setNotifyFormStatus(notifyFormStatus);
      setFetchFormId(id)
    }

    // Update the `notifyFormStatus` in the fields object
    // Save the updated fields object to the server
    const updateResponse = await fetch(
      `${RFB_BASE_URL}/api/forms/updatenotifyformstatus?id=${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          notifyFormStatus: status,
          fields: JSON.stringify(fields), // Convert the updated fields object back to JSON string
        }),
      }
    );

    if (!updateResponse.ok) {
      const errorData = await updateResponse.json();
      console.log("Error Response: ", errorData.error);
      // alert(errorData.error)
      setToastContent(errorData.error);
      setToastActive(true);
    } else {
      const data = await updateResponse.json();
      console.log(data);
      fetchFormData();
    }
  } catch (error) {
    console.log("Error>>>>>>> ", error);
  }
setUpdateModalOpen(false)
};


    return (
      <div className="design-layout" style={{ width: '100%' }}>
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
                
                {dropdown.id === "Select Form as Notify Form" && (
                  <div>
                    <div className="custom-select-container" style={{textAlign:'center',}}>
                    <Select
                value={fetchFormId}
                 onChange={(value,formtitle) =>{console.log(formtitle.children);handleModalOpen(value,!notifyFormStatus,formtitle.children)}}              >
                {formList &&
                  formList.map((data, index) => (
                    <Select.Option key={index} value={data.id}>
                      {data.formtitle}
                    </Select.Option>
                  ))}
              </Select>
            </div>
            </div>
            )}
                {dropdown.id === "Mail Settings" && (
                  <div className="drawer-layout">
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
                          "notifysmtpSetting",
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
                          "notifysmtpSetting",
                          "portNo",
                          e.target.value
                        )
                      }
                    >
                      <option value="465">465</option>
                      <option value="587">587</option>
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
                          "notifysmtpSetting",
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
                          "notifysmtpSetting",
                          "appPassword",
                          e.target.value
                        )
                      }
                    />
                  </div>
                  <button
                    className="button-smtp"
                    onClick={() => handleNotifySmtpSave()}
                  >
                    Save
                  </button>
                </div>
                  </div>
                )}
                {dropdown.id === "Thankyou Mail Response Template" && (
                  <div className="drawer-layout">
                    <div className="mail-admin">
                      <div className="email-width">
                        <label>Email Subject</label>
                        <input
                          type="text"
                          className="layout-input"
                          label="Email Subject"
                          value={thankyouemailSubject}
                          onChange={(e)=>
                            handleAppSettingsChange(
                              "notifythankyouemailResponse",
                              "thankyouemailSubject",
                              e.target.value
                            )
                          }
                          
                        />
                      </div>
                      <div className="email-width">
                        <label>Email Content</label>
                        <RichTextEditor 
                            rte_val={thankyouemailContent}
                            section="notifythankyouemailResponse"
                            section_key="thankyouemailContent"
                            handleContentChange = {(e)=>{
                              handleAppSettingsChange(
                                "notifythankyouemailResponse",
                                "thankyouemailContent",
                                e.target.value
                              )
                            }}
                        />
                        
                      </div>
                      {showNotification && (
                        <div className="notification show"> Thank You Mail Response Updated SUCCESSFULLY</div>
                      )}
                      <button
                    className="button-smtp"
                    onClick={saveThankyouEmailSettings}
                  >
                    Save
                  </button>
                      </div>
                  </div>
                )}
                {dropdown.id === "In Stock Mail Response Template" && (
                  <div className="drawer-layout">
                  <div className="mail-admin">
                    <div className="email-width">
                      <label>Email Subject</label>
                      <input
                        type="text"
                        className="layout-input"
                        label="Email Subject"
                        value={InstockemailSubject}
                        onChange={(e)=>
                          handleAppSettingsChange(
                            "notifyInstockemailResponse",
                            "InstockemailSubject",
                            e.target.value
                          )
                        }
                        
                      />
                    </div>
                    <div className="email-width">
                      <label>Email Content</label>
                      <RichTextEditor 
                          rte_val={InstockemailContent}
                          section="notifyInstockemailResponse"
                          section_key="InstockemailContent"
                          handleContentChange = {(e)=>{
                            handleAppSettingsChange(
                              "notifyInstockemailResponse",
                              "InstockemailContent",
                              e.target.value
                            )
                          }}
                      />
                      
                    </div>
                    {showNotification && (
                      <div className="notification show">In Stock Mail Response Updated SUCCESSFULLY</div>
                    )}
                    <button
                  className="button-smtp"
                  onClick={saveInStockEmailSettings}
                >
                  Save
                </button>
                    </div>
                </div>
                )}
              </div>
            )}
          </div>
        ))}
      {toastActive && (
        <div>
          <Toast content={toastContent} onDismiss={() => setToastActive(false)} />
        </div>
      )}
 {updateModalOpen && (
              <div>
                <div className="modal">
                  <div className="modal-content-form">
                    <h3 className="modal-heading-h3">
                       Are you sure you want to update {modalData.formTitle} as Notify Form
                    </h3>
                    <div className="modal-buttons">
                      <button
                        onClick={handleNotifyToggle}
                      >
                        Yes
                      </button>
                      <button onClick={() => setUpdateModalOpen(false)}>No</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>
    );
  };
  
  return (
    <div>
      <Page>
        <Frame>
          <div style={{ padding: "20px" }}>
            <Tabs
              tabs={[
                { id: 0, content: "Subscrbers List" },
                { id: 1, content: "Products List" },
                { id: 3, content: "Settings" },
              ]}
              selected={selectedTab}
              onSelect={handleTabChange}
              fitted
            >
              <div
                style={{
                  
                  marginTop: "20px",
                }}
              >
                {selectedTab === 0 && (
                  <>
                <div className="data-listing">
                  <div className="submission-filters-with-search-with-forms">
                    <div className="submission-filters-and-search">
                      <Input.Search
                        className="submission-search"
                        placeholder="Search"
                        onChange={(e) => handleSearch(e.target.value)}
                        value={searchValue}
                        />
                    <DatePicker.RangePicker  onChange={handleDateRangeChange} />
                      </div>
                       <Button primary onClick={handleImport} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Icon source={CircleDownMajor} color="base" style={{ padding: '10px' }} />
    <span style={{ marginLeft: '5px' }}>
      Import Data
    </span>
  </div>
</Button>
      <Button primary onClick={handleAllCustomerDownload} style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center' }}>
    <Icon source={CircleUpMajor} color="base" style={{ padding: '10px' }} />
    <span style={{ marginLeft: '5px' }}>
      {searchValue || (selectedDateRange && selectedDateRange.length > 0) ? 'Export Filtered Data' : 'Export All Data'}
    </span>
  </div>
</Button>
                      </div>
                      </div>
                      <div>
                        {console.log(filteredData)}
                  <Table
                    dataSource={filteredData}
                    columns={columns}
                    style={{ width: "100%" }}
                  />
                      </div>
                </>
                )}
                {selectedTab === 1 && (
                  <>
                   <div className="data-listing">
                  <div className="submission-filters-with-search-with-forms">
                    <div className="submission-filters-and-search">
                      <Input.Search
                        className="submission-search"
                        placeholder="Search"
                        onChange={(e) => handleProductSearch(e.target.value)}
                        value={searchProductValue}
                        />
                      </div>
                      <Button primary onClick={handleAllProductDownload}>
        {searchProductValue ? 'Export Filtered Data' : 'Export All Data'}
      </Button>
                      </div>
                      </div>
                      <div></div>
                  <Table
                    dataSource={filteredProductData.length > 0 ? filteredProductData : productList}
                    columns={productColumns}
                    style={{ width: "100%" }}
                  />
                  </>
                )}
                {selectedTab === 2 && <SettingsTabContent />}
              </div>
            </Tabs>
          </div>
        </Frame>
      </Page>
 {isImportModalOpen && (
         <Modal
         open={isImportModalOpen}
         onClose={handleImportCloseModal}
         title="Upload CSV File"
         primaryAction={{
           content: 'Upload',
           onAction: handleFileUpload,
           disabled: selectedFile == null,
         }}
         secondaryActions={[
           {
             content: 'Download Sample CSV',
             onAction: handleDownloadSample,
           },
         ]}
       >
         <Modal.Section>
         <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            onChange={handleFileSelection}
          />
         </Modal.Section>
       </Modal>
      )}  
      {selectedCustomer && (
        <Modal
          open={isModalOpen}
          onClose={handleCloseModal}
          title="Customer Details"
          primaryAction={{
            content: "Close",
            onAction: handleCloseModal,
          }}
        >
          {renderModalContent()}
        </Modal>
      )}
      {isCustomerModalOpen && (
        <Modal
          open={isCustomerModalOpen}
          onClose={handleCustomerCloseModal}
          title="Customer Details"
          primaryAction={{
            content: "Close",
            onAction: handleCustomerCloseModal,
          }}
        >
          {renderCustomerModalContent()}
        </Modal>
      )}
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

export default notify;
