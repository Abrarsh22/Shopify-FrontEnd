import { Text , TextArea, Email, Radio, Checkbox, Phone, Hidden, HTML, TNC, Name, Number, Dropdown, Country, Rating } from "./FP_Fields_JSX/index"

const FpFields = ({ field }) => {
  const handleAddField = (field) => {

    switch (field.type) {
      case "text":
          return <Text field={field}/>;
      case "name":
          return <Name field={field}/>;
      case "number":
          return <Number field={field}/>;
        case "textarea":
          return <TextArea field={field}/>;
        case "checkbox":
          return <Checkbox field={field}/>;
        case "radio":
          return <Radio field={field}/>;
        case "dropdown":
          return <Dropdown field={field}/>;
        case "email":
          return <Email field={field}/>;
        case "phone":
          return <Phone field={field}/>;
        case "termsnconditions":
          return <TNC field={field}/>;
        case "hidden":
          return <Hidden field={field}/>;  
        case "html":
          return <HTML field={field}/>;  
        case "country":
          return <Country field={field}/>;  
        case "rating":
          return <Rating field={field}/>;  
        default:
          return null;
      }
  };
  
  return (
    <>
      {handleAddField(field)}
    </>
  );
};

export default FpFields;