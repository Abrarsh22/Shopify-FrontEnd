import { v4 as uuidv4 } from "uuid";
import { setFields } from "../redux/formSlice.js";
import { useDispatch, useSelector } from "react-redux";

const Toolbar = () => {
  const { fields } = useSelector((state) => state.form);
  const dispatch = useDispatch();
  const addField = (newField) => {
    dispatch(setFields([...fields, newField]));
  };

  const handleAddField = (type) => {

    //checks for the fields array whether hidden field's object is present or not
    // if present then return null (as only one hidden field is allowed per form) 
    // else return the hidden;s field object
    const hiddenObject = fields.filter(obj => obj.type === 'hidden');
    if(type === "hidden" && hiddenObject.length > 0){
      return null;
    }

    // generate a unique uuid for newfield
    const id = uuidv4();
    let newField = {};

    switch (type) {
      case "text":
        newField = {
          id,
          type: "text",
          datatype: "VARCHAR(255)",
          label: "Text",
          placeholder: "",
          description: "",
          limitCharacter: false,
          minLength: 0,
          maxLength: 12,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "number":
        newField = {
          id,
          type: "number",
          datatype: "INT",
          label: "Number",
          placeholder: "",
          description: "",
          limitCharacter: false,
          minLength: 0,
          maxLength: 100,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "name":
        newField = {
          id,
          type: "name",
          datatype: "VARCHAR(255)",
          name: "full_name",
          label: "Name",
          placeholder: "",
          description: "",
          limitCharacter: false,
          minLength: 3,
          maxLength: 20,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "textarea":
        newField = {
          id,
          datatype: "VARCHAR(255)",
          type: "textarea",
          label: "Textarea",
          placeholder: "",
          description: "",
          limitCharacter: false,
          minLength: 0,
          maxLength: 120,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "checkbox":
        newField = {
          id,
          datatype: "VARCHAR(255)",
          type: "checkbox",
          label: "CheckBox",
          description: "",
          options: ["Option 1"],
          defaultOptionChecked: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "dropdown":
        newField = {
          id,
          datatype: "VARCHAR(255)",
          type: "dropdown",
          placeholder: "Please select a option",
          label: "Dropdown",
          description: "",
          options: ["Option 1", "Option 2"],
          defaultOptionChecked: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "termsnconditions":
        newField = {
          id,
          type: "termsnconditions",
          datatype: "BOOLEAN",
          label: "Accept terms & conditions",
          description: "",
          defaultChecked: false,
          required: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "radio":
        newField = {
          id,
          type: "radio",
          datatype: "VARCHAR(255)",
          label: "Radio",
          description: "",
          options: ["Option 1", "Option 2"],
          defaultOptionChecked: "",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "email":
        newField = {
          id,
          type: "email",
          datatype: "VARCHAR(255)",
          label: "Email",
          placeholder: "",
          description: "",
          limitCharacter: false,
          minLength: 0,
          maxLength: 30,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "phone":
        newField = {
          id,
          type: "phone",
          datatype: "VARCHAR(20)",
          label: "Phone",
          placeholder: "",
          description: "",
          defaultCountry: "GB",
          validateInternationalPhoneNumber: false,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "rating":
        newField = {
          id,
          type: "rating",
          datatype: "DECIMAL(2, 1)",
          label: "Rating",
          description: "",
          count: 5,
          defaultCount: 0,
          allowHalf: true,
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "country":
        newField = {
          id,
          type: "country",
          datatype: "VARCHAR(100)",
          label: "Country",
          placeholder: "Please Select",
          description: "",
          defaultCountry: "GB",
          hideLabel: false,
          required: false,
          displayRequiredNoteOnLabelHide: false,
          inputFieldWidth: "100%",
        };
        addField(newField);
        break;
      case "hidden":
        newField = {
          id,
          datatype: "LONGTEXT",
          type: "hidden",
          label: "Hidden",
          value: [],
        };
        addField(newField);
        break;
      case "html":
        newField = {
          id,
          type: "html",
          label: "Html",
          htmlCode: "",
        };
        addField(newField);
        break;
      default:
        return null;
    }
  };

  return (
    <div className="section-component">
      <div>
        <div className="add-fields-element">
          <h2>Fields</h2>
          <div className="btn-elements">
            <div className="popup">
              <div className="popup-content">
                <div className="box-container">
                  <button
                    className="box-field"
                    onClick={() => handleAddField("text")}
                  >
                    Text Field
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("name")}
                  >
                    Name
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("number")}
                  >
                    Number
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("textarea")}
                  >
                    Textarea
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("checkbox")}
                  >
                    Checkbox
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("radio")}
                  >
                    Radio
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("dropdown")}
                  >
                    Dropdown
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("email")}
                  >
                    Email
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("phone")}
                  >
                    Phone Number
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("html")}
                  >
                    HTML
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("termsnconditions")}
                  >
                    Accept terms & conditions
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("rating")}
                  >
                    Rating
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("country")}
                  >
                    Country
                  </button>
                  <button
                    className="box-field"
                    onClick={() => handleAddField("hidden")}
                  >
                    Hidden Field <span style={{ color: 'red'}}>(Only one hidden field per form is allowed!)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Toolbar;
