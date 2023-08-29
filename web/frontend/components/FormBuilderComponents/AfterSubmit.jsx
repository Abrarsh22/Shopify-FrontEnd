import {RichTextEditor} from "./utils/RichTextEditor";
import { handleAfterSubmit } from "../redux/handlers";

const AfterSubmit = ({ afterSubmit }) => {
  const { defaultOption, richText } = afterSubmit;

  const items = ['Hide Form', 'Clear Form', 'Redirect to page'];

  const handleDefaultOptionSelect = (e) => {
    handleAfterSubmit('defaultOption', e.target.value)
  };

  return (
    <div className="afterSubmit-main">
      <h2>Action After user submits forms</h2>
      <div className="header-section">
        <select
          className="radio-dropdown-inputs"
          value={defaultOption}
          onChange={handleDefaultOptionSelect}
        >
          {items.map((item, index) => (
              <option value={item} key={index}>
                {item}
              </option>
            ))}
        </select>
      </div>
      <h2>Message After Successful Submission</h2>
      <div className="message-container">
        <RichTextEditor 
        rte_val={richText}
        section={'richText'}
        />
      </div>
    </div>
  );
};

export default AfterSubmit;