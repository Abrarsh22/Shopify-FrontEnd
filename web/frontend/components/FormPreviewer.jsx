import React, { useState } from "react";
import FpFields from "./FormPreviewComponents/FpFields";
import Header from "./FormPreviewComponents/Header";
import Footer from "./FormPreviewComponents/Footer";
import { handleCSSChange } from "./redux/handlers";
import AfterSubmit from './FormPreviewComponents/AfterSubmit';

const FormPreviewer = ({ fields, constantFields, formCSS, afterSubmit }) => {
  const { header, footer } = constantFields;
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const [activeButton, setActiveButton] = useState(0);

  const handleButtonClick = (buttonIndex) => {
    setActiveButton(buttonIndex);
  };

  const handleInputWidthSize = (value) => {
    handleCSSChange("form_width_size", value)
    document.documentElement.style.setProperty("--form-width-size", value);
  };

  return (
    <div className="previewer">
      <div className="previewer-tab">
        <div className="tab-heading">
          <h2 className="tab-h2">Form Preview</h2>
        </div>
        <div className="tab">
          <div
            className={`tab-element
            ${activeButton === 0 ? "active" : ""}`}
            onClick={() => {
              handleButtonClick(0);
              handleInputWidthSize("60%");
            }}
          >
            Phone
          </div>
          <div
            className={`tab-element
            ${activeButton === 1 ? "active" : ""}`}
            onClick={() => {
              handleButtonClick(1);
              handleInputWidthSize("80%");
            }}
          >
            Tablet
          </div>
          <div
            className={`tab-element
            ${activeButton === 2 ? "active" : ""}`}
            onClick={() => {
              handleButtonClick(2);
              handleInputWidthSize("100%");
            }}
          >
            Laptop
          </div>
        </div>
      </div>
      <div className="preview-content">
        <div id="rfb-formbuilder">
          <div className="preview-content-form">
          <style>
              {`
              #rfb-formbuilder, #rfb-formbuilder-after-submit {
                background: ${formCSS.form_background_color} !important;
                width: ${formCSS.form_width_size} !important;
                max-width: ${formCSS.form_width}px !important;
              }

                #rfb-formbuilder .rfb-header .rfb-header-text, #rfb-formbuilder-after-submit ,.rfb-header-text h1, .rfb-header-text h2, .rfb-header-text h3, .rfb-header-text h4, .rfb-header-text h5, .rfb-header-text h6 {
                  color: ${formCSS.header_title_color} !important;
                  line-height: 1.2;
                }

                 #rfb-formbuilder .rfb-header .rfb-header-desc {
                  color: ${formCSS.header_desc_color} !important;
                  line-height: 1.2;
                }

                #rfb-formbuilder .rfb-header 
                .rfb-header-text h1, 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-desc h1,
                #rfb-formbuilder 
                .rfb-footer 
                .rfb-footer_disclaimer h1,
                #rfb-formbuilder-after-submit h1{
                  font-size: 32px;
                } 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-text h2, 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-desc h2,
                #rfb-formbuilder 
                .rfb-footer 
                .rfb-footer_disclaimer h2,
                #rfb-formbuilder-after-submit h2{
                  font-size: 24px;
                } 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-text h3, 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-desc h3,
                #rfb-formbuilder 
                .rfb-footer 
                .rfb-footer_disclaimer h3,
                #rfb-formbuilder-after-submit h3{
                  font-size: 18px;
                } 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-text h4, 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-desc h4,
                #rfb-formbuilder 
                .rfb-footer 
                .rfb-footer_disclaimer h4,
                #rfb-formbuilder-after-submit h4{
                  font-size: 16px;
                } 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-text h5, 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-desc h5,
                #rfb-formbuilder 
                .rfb-footer 
                .rfb-footer_disclaimer h5,
                #rfb-formbuilder-after-submit h5{
                  font-size: 13px;
                } 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-text h6, 
                #rfb-formbuilder 
                .rfb-header 
                .rfb-header-desc h6,
                #rfb-formbuilder 
                .rfb-footer 
                .rfb-footer_disclaimer h6,
                #rfb-formbuilder-after-submit h6{
                  font-size: 10px;
                } 
                                
               

                #rfb-formbuilder .rfb-fields .rfb-fields-label {
                  color: ${formCSS.input_label_color} !important;
                  font-size: ${formCSS.label_font_size}px !important;
                  word-break: break-all;
                }
                
                #rfb-formbuilder .rfb-fields .rfb-fields-inputs {
                  color: ${formCSS.input_text_color} !important;
                  background: ${formCSS.input_background_color} !important;
                  border: 1px solid ${formCSS.input_border_color} !important;
                  font-size: ${formCSS.input_texts_font_size}px !important;
                  resize: none !important;
                  outline: none !important;
                }
                #rfb-formbuilder .rfb-fields .rfb-fields-inputs:focus {
                  border: 1px solid ${formCSS.input_focus_color} !important;
                }
                #rfb-formbuilder .rfb-fields .rfb-fields-inputs-check {
                  color: ${formCSS.input_label_color} !important;
                  font-size: ${formCSS.input_texts_font_size}px !important;
                  word-break: break-all;
                }
                
                #rfb-formbuilder .rfb-fields .rfb-fields-desc {
                  font-size: ${formCSS.desc_font_size}px !important;
                  color: ${formCSS.header_desc_color} !important;
                }
                
                #rfb-formbuilder .rfb-footer .preview-save-button {
                  background-color: ${formCSS.button_text_color} !important;
                  color: ${formCSS.button_color} !important;
                  border: 1px solid ${formCSS.button_border_color} !important;
                  font-size: ${formCSS.button_font_size}px !important;
                  cursor: pointer !important;
                  transition: "background-color 0.3s ease-in-out",
                }

                #rfb-formbuilder .rfb-fields .rfb-fields-inputs::placeholder {
                  font-size: ${formCSS.placeholder_font_size}px !important;
                  color:  ${formCSS.input_placeholder_color} !important !important;
                }

                #rfb-formbuilder .rfb-footer .preview-save-button:hover {
                  background-color: ${formCSS.button_hover_background_color} !important;
                  color:  ${formCSS.button_hover_text_color} !important;
                  border: 1px solid ${formCSS.button_hover_border_color} !important;
                }

                #rfb-formbuilder .rfb-footer .rfb-footer_disclaimer{
                  color: ${formCSS.footer_disc_color} !important;
                  font-size: ${formCSS.disclaimer_font_size}px !important;
                  line-height: 1.1;
                }
              `}
            </style>
            <form onSubmit={handleSubmit}>
              <Header header={header} />

              <div className="fp-fields rfb-fields">
                {fields.map((field) => (
                  <FpFields key={field.id} field={field} />
                ))}
              </div>

              <Footer footer={footer} />
            </form>
          </div>
        </div>
      </div>
      <div className="preview-content">
        <AfterSubmit afterSubmit={afterSubmit}/>
      </div>
    </div>
  );
};

export default FormPreviewer;