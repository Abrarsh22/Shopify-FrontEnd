import { useEffect } from "react";
import { handleFormSettingsChange } from "../redux/handlers";

const NotifyFormSelection = ({formSettings, appSettings}) => {
  const { enable } = formSettings.notifyForm;

  return (
    <div className="main-layout">
<div className="klaviyo enable">
        <input
          type="checkbox"
          className="color-input-checkbox"
          onChange={(e) => handleFormSettingsChange('notifyForm', 'enable', e.target.checked)}
          checked={enable}
        />
        <div>Enable</div>
      </div>
    </div>
  );
};

export default NotifyFormSelection;