import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

export const initialState = {
  name: "",
  id: undefined,
  status: false,
  notifyFormStatus : false,
  formCSS: {
    form_width: 600,
    form_background_color:'#ffffff',
    header_title_color:'#000000',
    header_desc_color:'#000000',
    footer_disc_color:'#000000',
    input_label_color:'#000000',
    input_background_color:'#ffffff',
    input_text_color:'#000000',
    input_texts_font_size: 14,
    input_placeholder_color:'#000000',
    input_focus_color:'#ffffff',
    button_color:'#ffffff',
    input_border_color: '#000',
    button_text_color:'#000000',
    button_border_color: '#000000',
    button_hover_background_color: '#ffffff',
    button_hover_text_color: '#000000',
    button_hover_border_color: '#000000',
    label_font_size: 14,
    button_font_size: 14,
    disclaimer_font_size: 14,
    placeholder_font_size: 12,
    desc_font_size: 12,
    input_width_size: '100%',
    input_width_textarea: '100%',
    email_width_size: '100%',
    radio_width_size: '100%',
    checkbox_width_size: '100%',
    phone_width_size: '100%',
    form_width_size: '60%'
  },
  fields: [
    {
      id: uuidv4(),
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
    },
    {
      id: uuidv4(),
      type: "textarea",
      label: "Textarea",
      datatype: "VARCHAR(255)",
      placeholder: "",
      description: "",
      limitCharacter: false,
      minLength: 0,
      maxLength: 120,
      hideLabel: false,
      required: false,
      displayRequiredNoteOnLabelHide: false,
    },
  ],
  constantFields: {
    header: {
      title: "Contact Us",
      description: "Get inspiration, new arrivals and the latest offers to your inbox",
    },
    footer: {
      footerDisclaimer: "By submitting your email, you agree to receive marketing emails.",
      submitBtnText: "Submit",
      resetBtn: false,
      resetBtnText: "Reset",
    },
  },
  afterSubmit: {
    defaultOption: 'Hide Form',
    richText: 'Thank you for submitting the form!'
  },
  appSettings: {
    smtpSetting: {
      smtpProvider: 'smtp.gmail.com',
      portNo: '465',
      username: '',
      appPassword: '',
      customeFromEmail: '',
      customeFromName: ''
    },
    recaptchaSetting: {
      siteKey: '',
      secretKey: ''
    },
    klaviyoSetting: {
      klaviyoApiprivateKey: '',
      klaviyoApipublicKey:''
    },
    notifysmtpSetting: {
      smtpProvider: 'smtp.gmail.com',
      portNo: '465',
      username: '',
      appPassword: '',
    },
      notifythankyouemailResponse: {
        thankyouemailContent: '<body><div> Will let u know soon {product.name} {product.image} {product.link}</div></body>',
        thankyouemail:'',
        thankyouemailSubject:'Thank you for your interest in our product {product.name} but currently not available☹️'
      },
      notifyInstockemailResponse: {
        InstockemailContent: '<body><div> The product is available {product.name} {product.image} Go and buy {product.link}</div></body>',
        Instockemail:'',
        InstockemailSubject:'HURRAY!!!!! Product {product.name} is available 😊 Now'
      },
  },
  klaviyoIntegration: {
    enable: false,
    defaultOption: "",
    klaviyoListMapping: [
      {
        klaviyo_field: "",
        form_field: "",
        is_default: true,
        is_fixed: false,
        is_input: ""
      },
    ],
    listMethod: "multilist",
  },
  formSettings: {
    adminMail: {
      enable: false,
      email: '',
      emailSubject: 'You have new submission',
      emailContent: '',
    },
    googleRecaptcha: {
      enable: false,
    },
    notifyForm:{
      enable: false,
    },
    autoResponse: {
      autoenable: false,
      autoemailContent: '<body><div> Your data: </br> {{data}}</div></body>',
      autoemail:'',
      autoemailSubject:"Thank you for your response",
      form_field:''
    },
    subUniqueIdentifier: {
      enable: false,
      IdentifierFields: [],
      IdentifierCriteria: 'AND'
    },
    languageErrors: {
      formFetchError: "Unable to fetch form right now, Please try again later!",
      formSubmissionError: "Unable to submit form right now, Please try again later!",
      textFieldError: "Please enter a valid text!",
      textareaFieldError: "Please enter a valid text!",
      emailFieldError: "Please enter a valid email!",
      phoneFieldError: "Please enter a valid phone number!",
      numberFieldError: "Please enter a valid phone number!",
      fullnameFieldError: "Special charachters are not allowed!",
      fnlnameFieldError: "Spaces & Special charachters are not allowed!",
      selectionFieldError: "Atleast one option need to be checked!"
    }
  },
  shopifyIntegration: {
    createenable:false,
    inviteenable: false,
    shopifyexists:'returnError',
    showError: false,
    msgError:'',
    accountOptions:'Automatically Create Customer',
    sendInvite:false,
    acceptsMarketting:false,
    shopifyListMapping: [
      {
        shopify_field: "",
        form_field: "",
        is_default: true,
        is_fixed: false,
        is_input: ""
      },
    ],
  },
};

const updateField = (state, action) => {
  const { id, values } = action.payload;
  const index = state.fields.findIndex(field => field.id === id);

  if (index !== -1) {
    state.fields[index] = { ...state.fields[index], ...values };
  }
};

const updateKlaviyoListMapping = (state, action) => {
  const { index, values } = action.payload;
  state.klaviyoIntegration.klaviyoListMapping[index] = {
    ...state.klaviyoIntegration.klaviyoListMapping[index],
    ...values,
  };
};

const updateConstantField = (state, action) => {
  const { section, key, value } = action.payload;
  state.constantFields[section][key] = value;
};


const updateShopifyListMapping = (state, action) => {
  const { index, values } = action.payload;
  state.shopifyIntegration.shopifyListMapping[index] = {
    ...state.shopifyIntegration.shopifyListMapping[index],
    ...values,
  };
};

const formSlice = createSlice({
  name: "formBuilder",
  initialState,
  reducers: {
    setFormName: (state, action) => {
      state.name = action.payload;
    },
    setFormStatus: (state, action) => {
      state.status = action.payload;
    },
    setNotifyFormStatus: (state,action) =>{
      state.notifyFormStatus = action.payload;
    },
    setFormId: (state, action) => {
      state.id = action.payload;
    },
    setFields: (state, action) => {
      state.fields = action.payload;
    },
    setMetaFields: (state, action) => {
      state.constantFields = action.payload;
    },
    setUpdateField: updateField,
    setConstantField: updateConstantField,
    deleteField: (state, action) => {
      const { id } = action.payload;
      state.fields = state.fields.filter(field => field.id !== id);
    },
    setFormCSS: (state, action) => {
      const { values } = action.payload;
      state.formCSS = { ...state.formCSS, ...values };
    },
    resetFormCSS: (state, action) => {
      state.formCSS = action.payload;
    },
    setAfterSubmit: (state, action) => {
      const { key, value } = action.payload;
      state.afterSubmit[key] = value;
    },
    resetAfterSubmit: (state, action) => {
      state.afterSubmit = action.payload;
    },
    updateKlaviyoListMapping,
    setKlaviyoIntegration: (state, action) => {
      const { key, value } = action.payload;
      state.klaviyoIntegration[key] = value;
    },
    resetKlaviyoIntegration: (state, action) => {
      state.klaviyoIntegration = action.payload;
    },
    setFormSettings: (state, action) => {
      const { section, key, value } = action.payload;
      state.formSettings[section][key] = value;
    },
    setAppSettings: (state, action) => {
      const { section, key, value } = action.payload;
      state.appSettings[section][key] = value;
    },
    resetAppSettings: (state, action) => {
      const { key, value } = action.payload;
      state.appSettings[key] = value;
    },
    resetFormSettings: (state, action) => {
      state.formSettings = action.payload;
    },
    updateShopifyListMapping,
    setShopifyIntegration: (state, action) => {
      const { key, value } = action.payload;
      state.shopifyIntegration[key] = value;
    },
    resetShopifyIntegration: (state, action) => {
      state.shopifyIntegration = action.payload;
    },
  },
});

export const {
  setFields,
  setFormId,
  setFormName,
  setUpdateField,
  deleteField,
  setConstantField,
  setMetaFields,
  setFormStatus,
  setNotifyFormStatus,
  setFormCSS,
  resetFormCSS,
  setAfterSubmit,
  resetAfterSubmit,
  setKlaviyoIntegration,
  resetKlaviyoIntegration,
  setFormSettings,
  setAppSettings,
  resetAppSettings,
  resetFormSettings,
  setShopifyIntegration,
  resetShopifyIntegration,
} = formSlice.actions;

export default formSlice.reducer;