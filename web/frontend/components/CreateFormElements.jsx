import { Button } from "@shopify/polaris";
import Dashboard from "../assets/images/dashboard.jpg";
import { useNavigate } from "react-router-dom";

const CreateFormElements = () => {
  const navigate = useNavigate();
  
  return (
    <div>
      <div className="dr-create-form-card">
        <div className="content">
          <h2>You dont have any forms Yet</h2>
          <p>Your forms will appear here.</p>
          <div>
            <Button
              primary
              onClick={() => {
                navigate(`/new`);
              }}
            >
              Create Form
            </Button>
          </div>
        </div>
        <div className="image-container">
          <img
            src={Dashboard}
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default CreateFormElements;
