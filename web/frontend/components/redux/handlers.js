import {
  setUpdateField,
  deleteField,
  setConstantField,
  setFormName,
  setFields,
  setFormStatus,
  setNotifyFormStatus,
  setFormId,
  setMetaFields,
  setFormCSS,
  resetFormCSS,
  setAfterSubmit,
  resetAfterSubmit,
  setFormSettings,
  setKlaviyoIntegration,
  resetKlaviyoIntegration,
  setAppSettings,
  resetAppSettings,
  resetFormSettings,
  setShopifyIntegration,
  resetShopifyIntegration,
} from "./formSlice";
import { store } from "./store";
import { initialState } from "./formSlice";

export const handleAfterSubmit = (key, value) => {
  store.dispatch(setAfterSubmit({ key, value }));
};

export const handleCSSChange = (key, value) => {
  store.dispatch(setFormCSS({ values: { [key]: value } }));
};

export const handleInitialize = (
  name,
  id,
  status,
  notifyFormStatus,
  fields,
  header,
  footer,
  formCSS,
  afterSubmit,
  formSettings,
  klaviyoIntegration,
  shopifyIntegration
) => {
  store.dispatch(setFormName(name));
  store.dispatch(setFormId(id));
  store.dispatch(setFormStatus(status));
  store.dispatch(setNotifyFormStatus(notifyFormStatus))
  store.dispatch(setFields(fields));
  const constantFields = {
    header: header,
    footer: footer,
  };
  store.dispatch(setMetaFields(constantFields));
  store.dispatch(resetFormCSS(formCSS));
  store.dispatch(resetAfterSubmit(afterSubmit));
  store.dispatch(resetKlaviyoIntegration(klaviyoIntegration));
  store.dispatch(resetFormSettings(formSettings));
  store.dispatch(resetShopifyIntegration(shopifyIntegration));
};

export const handleReset = () => {
  store.dispatch(setFormName(initialState.name));
  store.dispatch(setFormId(initialState.id));
  store.dispatch(setFormStatus(initialState.status));
  store.dispatch(setNotifyFormStatus(initialState.notifyFormStatus))
  store.dispatch(setFields(initialState.fields));
  store.dispatch(setMetaFields(initialState.constantFields));
  store.dispatch(resetFormCSS(initialState.formCSS));
  store.dispatch(resetAfterSubmit(initialState.afterSubmit));
  store.dispatch(resetKlaviyoIntegration(initialState.klaviyoIntegration));
  store.dispatch(resetFormSettings(initialState.formSettings));
  store.dispatch(resetShopifyIntegration(initialState.shopifyIntegration));
};

export const handleShopifyIntegration = (key, value) => {
  store.dispatch(setShopifyIntegration({ key, value }));
};

export const handleLabelChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        label: value,
      },
    })
  );
};
export const handleNameChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        name: value,
      },
    })
  );
};
export const handlePlaceholderChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        placeholder: value,
      },
    })
  );
};

export const handleInputWidthSizeChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        inputFieldWidth: value,
      },
    })
  );
};
export const handleAllowHalfChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        allowHalf: value,
      },
    })
  );
};
export const handleCountChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        count: value,
      },
    })
  );
};
export const handleDefaultCountChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        defaultCount: value,
      },
    })
  );
};

export const handleDescriptionChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        description: value,
      },
    })
  );
};
export const handleLimitCharacterChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        limitCharacter: value,
      },
    })
  );
};
export const handleMinLengthChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        minLength: parseInt(value),
      },
    })
  );
};
export const handleMaxLengthChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        maxLength: parseInt(value),
      },
    })
  );
};
export const handleDefaultChecked = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        defaultChecked: value,
      },
    })
  );
};
export const handleHideLabelChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        hideLabel: value,
      },
    })
  );
};
export const handleRequiredChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        required: value,
      },
    })
  );
};
export const handleNoteChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        displayRequiredNoteOnLabelHide: value,
      },
    })
  );
};
export const handleHiddenInputChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        value: value,
      },
    })
  );
};
export const handleHtmlInputChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        htmlCode: value,
      },
    })
  );
};

export const handleValPhoneNumber = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        validateInternationalPhoneNumber: value,
      },
    })
  );
};

export const handleDelete = (id) => {
  store.dispatch(deleteField({ id }));
};

export const handleConstantFields = (section, key, value) => {
  store.dispatch(
    setConstantField({
      section,
      key,
      value,
    })
  );
};

export const handleMultiOptionChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        options: value,
      },
    })
  );
};

export const handleDefaultOptionChange = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        defaultOptionChecked: value,
      },
    })
  );
};
export const handleDefaultCountry = (id, value) => {
  store.dispatch(
    setUpdateField({
      id,
      values: {
        defaultCountry: value,
      },
    })
  );
};

export const handleUpdateFieldsIndex = (fields) => {
  store.dispatch(setFields(fields));
};

export const handleFormSettingsChange = (section, key, value) => {
  store.dispatch(
    setFormSettings({
      section,
      key,
      value,
    })
  );
};

export const handleAppSettingsChange = (section, key, value) => {
  store.dispatch(
    setAppSettings({
      section,
      key,
      value,
    })
  );
};

export const handleAppSettingsReset = (key, value) => {
  store.dispatch(resetAppSettings({ key, value }));
};
export const handleKlaviyoIntegration = (key, value) => {
  store.dispatch(setKlaviyoIntegration({ key, value }));
};
