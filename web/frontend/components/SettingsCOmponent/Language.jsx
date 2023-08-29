import { handleFormSettingsChange } from "../redux/handlers";

const Language = ({ languageErrors }) => {
  const {
    textFieldError,
    textareaFieldError,
    emailFieldError,
    phoneFieldError,
    numberFieldError,
    fullnameFieldError,
    fnlnameFieldError,
    selectionFieldError,
  } = languageErrors || {};
  return (
    <div className="language-container">
      <div className="field_errors">
        <div className = "field_errors_wrap">
          <label>Text Field Error Message</label>
          <input
            type="text"
            value={textFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "textFieldError", e.target.value)
            }
          />
        </div>
        <div className = "field_errors_wrap">
          <label>Textarea Field Error Message</label>
          <input
            type="text"
            value={textareaFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "textareaFieldError", e.target.value)
            }
          />
        </div>
        <div className = "field_errors_wrap">
          <label>Email Field Error Message</label>
          <input
            type="text"
            value={emailFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "emailFieldError", e.target.value)
            }
          />
        </div>
        <div className = "field_errors_wrap">
          <label>Phone Number Field Error Message</label>
          <input
            type="text"
            value={phoneFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "phoneFieldError", e.target.value)
            }
          />
        </div>
        <div className = "field_errors_wrap">
          <label>Number Field Error Message</label>
          <input
            type="text"
            value={numberFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "numberFieldError", e.target.value)
            }
          />
        </div>
        <div className = "field_errors_wrap">
          <label>Name Field Error Message [Full Name Validation]</label>
          <input
            type="text"
            value={fullnameFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "fullnameFieldError", e.target.value)
            }
          />
        </div>
        <div className = "field_errors_wrap">
          <label>Name Field Error Message [First & Last Validation]</label>
          <input
            type="text"
            value={fnlnameFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "fnlnameFieldError", e.target.value)
            }
          />
        </div>
        <div className = "field_errors_wrap">
          <label>
            Selection Field Required Error Message [Checkbox, Radio]
          </label>
          <input
            type="text"
            value={selectionFieldError}
            onChange={(e) =>
              handleFormSettingsChange("languageErrors", "selectionFieldError", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Language;
