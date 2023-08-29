import React, { useEffect, useState } from "react";
import "../FP_Fields_CSS/checkbox.css";
import "../../../assets/formbuilder-design.css";

const TNC = ({ field }) => {
  const { label, description, defaultChecked, required, inputFieldWidth } =
    field;

  const [check, setCheck] = useState(defaultChecked);

  useEffect(() => {
    setCheck(defaultChecked);
  }, [defaultChecked]);

  return (
    <div
      className="checkbox-previewer preview-component"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label style={{ display: "flex", gap: "5px" }}>
        <input
          type="checkbox"
          value={check}
          checked={check}
          onChange={() => setCheck(!check)}
        />
        <span className="rfb-fields-inputs-check">
          {label} {required && <span style={{ color: "red" }}>*</span>}
        </span>
      </label>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default TNC;
