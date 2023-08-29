import React, { useEffect, useState } from "react";
import { Rate } from "antd";
import '../FP_Fields_CSS/rating.css';

const Rating = ({ field }) => {
  const {
    label,
    description,
    count,
    defaultCount,
    allowHalf,
    hideLabel,
    required,
    displayRequiredNoteOnLabelHide,
    inputFieldWidth
  } = field;

  const [rating, setRating] = useState(parseInt(defaultCount));

  useEffect(() => {
    setRating(parseInt(defaultCount));
  }, [defaultCount]);

  const handleChange = (value) => {
    setRating(value)
  }

  return (
    <div
      className="preview-component"
      style={{ width: inputFieldWidth ? inputFieldWidth : "100%" }}
    >
      <label>
        {!hideLabel && <span className="rfb-fields-label">{label}</span>}
        {required && !hideLabel && <span style={{ color: "red" }}>*</span>}
        {displayRequiredNoteOnLabelHide && (
          <span style={{ color: "red" }}>*</span>
        )}
      </label>
      <div>
        <Rate allowHalf={allowHalf} defaultValue={parseInt(defaultCount)} count={parseInt(count)} value={rating} onChange={handleChange}/>
      </div>
      <span className="rfb-fields-desc">{description}</span>
    </div>
  );
};

export default Rating;
