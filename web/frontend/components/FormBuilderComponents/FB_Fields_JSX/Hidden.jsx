import React, { useEffect, useState } from "react";
import "../FB_Fields_CSS/hidden.css";
import {
  // handleLabelChange,
  handleHiddenInputChange,
  handleDelete,
} from "../../redux/handlers";
import { Icon } from "@shopify/polaris";
import {
  DeleteMinor,
  CaretUpMinor,
  CaretDownMinor,
} from "@shopify/polaris-icons";
import DeleteWarningModel from "../DeleteWarningModel";

// const hiddenObjects = [
//   "product.id",
//   "product.title",
//   "product.vendor",
//   "product.type",
//   "product.price",
//   "product.available",
//   "product.tags",
//   "product.collections",
//   "customer.accepts_marketing",
//   "customer.has_account",
//   "customer.email",
//   "customer.phone",
//   "customer.id",
//   "customer.ipAddress",
//   "customer.name",
//   "customer.first_name",
//   "customer.last_name",
//   "customer.orders",
//   "customer.orders_count",
//   "customer.total_spent",
//   "order.customer",
//   "order.name",
//   "order.email",
//   "collection.title",
//   "collection.products",
//   "collection.tags",
//   "collection.url",
//   "collection.all_products_count",
//   "page.url",
//   "page.title",
//   "page.handle",
//   "page.id",
//   "shop.url",
//   "shop.currency",
// ];

const hiddenObjects = [
  {
    label: "product_id",
    value: "product.id",
    datatype: "VARCHAR(20)"
  },
  {
    label: "product_title",
    value: "product.title",
    datatype: "VARCHAR(255)"
  },
  {
    label: "product_vendor",
    value: "product.vendor",
    datatype: "VARCHAR(255)"
  },
  {
    label: "product_type",
    value: "product.type",
    datatype: "VARCHAR(255)"
  },
  {
    label: "product_price",
    value: "product.price",
    datatype: "VARCHAR(20)"
  },
  {
    label: "product_available",
    value: "product.available",
    datatype: "VARCHAR(10)"
  },
  {
    label: "product_tags",
    value: "product.tags",
    datatype: "VARCHAR(1024)"
  },
  {
    label: "product_collections",
    value: "product.collections",
    datatype: "VARCHAR(1024)"
  },
  {
    label: "customer_accepts_marketing",
    value: "customer.accepts_marketing",
    datatype: "VARCHAR(10)"
  },
  {
    label: "customer_has_account",
    value: "customer.has_account",
    datatype: "VARCHAR(10)"
  },
  {
    label: "customer_email",
    value: "customer.email",
    datatype: "VARCHAR(50)"
  },
  {
    label: "customer_phone",
    value: "customer.phone",
    datatype: "VARCHAR(20)"
  },
  {
    label: "customer_id",
    value: "customer.id",
    datatype: "VARCHAR(20)"
  },
  {
    label: "customer_ipAddress",
    value: "customer.ipAddress",
    datatype: "VARCHAR(20)"
  },
  {
    label: "customer_name",
    value: "customer.name",
    datatype: "VARCHAR(50)"
  },
  {
    label: "customer_first_name",
    value: "customer.first_name",
    datatype: "VARCHAR(25)"
  },
  {
    label: "customer_last_name",
    value: "customer.last_name",
    datatype: "VARCHAR(25)"
  },
  {
    label: "customer_orders",
    value: "customer.orders",
    datatype: "VARCHAR(1024)"
  },
  {
    label: "customer_orders_count",
    value: "customer.orders_count",
    datatype: "VARCHAR(255)"
  },
  {
    label: "customer_total_spent",
    value: "customer.total_spent",
    datatype: "VARCHAR(255)"
  },
  {
    label: "order_customer",
    value: "order.customer",
    datatype: "VARCHAR(255)"
  },
  {
    label: "order_name",
    value: "order.name",
    datatype: "VARCHAR(50)"
  },
  {
    label: "order_email",
    value: "order.email",
    datatype: "VARCHAR(50)"
  },
  {
    label: "collection_title",
    value: "collection.title",
    datatype: "VARCHAR(255)"
  },
  {
    label: "collection_products",
    value: "collection.products",
    datatype: "VARCHAR(1024)"
  },
  {
    label: "collection_tags",
    value: "collection.tags",
    datatype: "VARCHAR(1024)"
  },
  {
    label: "collection_url",
    value: "collection.url",
    datatype: "VARCHAR(255)"
  },
  {
    label: "collection_all_products_count",
    value: "collection.all_products_count",
    datatype: "VARCHAR(255)"
  },
  {
    label: "page_url",
    value: "page.url",
    datatype: "VARCHAR(255)"
  },
  {
    label: "page_title",
    value: "page.title",
    datatype: "VARCHAR(255)"
  },
  {
    label: "page_handle",
    value: "page.handle",
    datatype: "VARCHAR(255)"
  },
  {
    label: "page_id",
    value: "page.id",
    datatype: "VARCHAR(20)"
  },
  {
    label: "shop_url",
    value: "shop.url",
    datatype: "VARCHAR(255)"
  },
  {
    label: "shop_currency",
    value: "shop.currency",
    datatype: "VARCHAR(10)"
  },
];

const Hidden = ({ field }) => {
  const { id, label, value } = field;
  const [open, setOpen] = useState(false);
  const [hiddenValues, setHiddenValues] = useState(value);
  const [isDeleteField, setIsDeleteField] = useState(false);
  const [errorDisplay, setErrorDisplay] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const handleDeleteDisplay = (value) => {
    setIsDeleteField(value);
  };

  const handleHiddenValueDelete = (value) => {
    setHiddenValues((prevItems) => prevItems.filter((object) => object.value !== value));
  };

  useEffect(() => {
    handleHiddenInputChange(id, hiddenValues);
  }, [hiddenValues]);

  const [searchTerm, setSearchTerm] = useState("");

  // Filter the labels based on the search term
  const filteredLabels = hiddenObjects.filter(
    (object) =>
      object.value.toLowerCase().includes(searchTerm.toLowerCase()) &&
      searchTerm.length > 2
  );

  const handleLabelSelect = (object) => {
    // Check if the selected label object is already in the hiddenValues array
    const labelExists = hiddenValues.find((obj) => obj.value === object.value);
    if (!labelExists) {
      setHiddenValues((prevSelected) => [...prevSelected, object]);
      setSearchTerm("");
    } else {
      setErrorDisplay(true);
      setErrorMessage(`${object.label} has already been selected!`);
      setTimeout(() => {
        setErrorDisplay(false);
      }, 1500);
    }
  };

  return (
    <div className="header-section">
      <div
        className="section-component-btn fields"
        onClick={() => setOpen(!open)}
      >
        <div className="btn-icon">
          <h2 className="section-button">{label}</h2>
        </div>
        <div className="btn-wrapper">
          <button
            className="delete-button"
            onClick={() => setIsDeleteField(true)}
          >
            <Icon source={DeleteMinor} color="base" className="icon" />
          </button>
          {isDeleteField && (
            <DeleteWarningModel
              label={label}
              id={id}
              handledelete={handleDelete}
              handleDeleteDisplay={handleDeleteDisplay}
            />
          )}
          <button className="dropdown-button">
            {open ? (
              <Icon source={CaretUpMinor} color="base" />
            ) : (
              <Icon source={CaretDownMinor} color="base" />
            )}
          </button>
        </div>
      </div>
      {open && (
        <div className="hidden-container">
          <div className="hr-line-layout-fields"></div>
          <div className="hidden-label">
            <div className="">
              <label className="">Selected values</label>
              <div className="selected_hidden_label_div">
                {hiddenValues &&
                  hiddenValues.map((object) => (
                    <li className="selected_hidden_label" key={object.value}>
                      {object.value}
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={() => handleHiddenValueDelete(object.value)}
                      >
                        {" "}
                        &#215;
                      </span>
                    </li>
                  ))}
              </div>
              {errorDisplay && (
                <span style={{ color: "red" }}>{errorMessage}</span>
              )}
            </div>
          </div>
          <div className="header-section-after-submit">
            <div className="dynamic-value-submission">
              <div>
                <input
                className="hidden-inputs"
                  type="text"
                  placeholder="Search hidden objects..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm.length > 2 && filteredLabels.length > 0 && (
                  <ul>
                    {filteredLabels.map((object) => (
                      <li
                        className="filtered_hidden_label"
                        key={object.value}
                        onClick={() => handleLabelSelect(object)}
                      >
                        {object.value}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {!searchTerm && (<div className="grid-container">
                {hiddenObjects.slice(0, 24).map((item) => (
                  <div key={item.value} className="all_hidden_label" onClick={() => handleLabelSelect(item)}>
                    {item.value}
                  </div>
                ))}
              </div>)}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Hidden;
