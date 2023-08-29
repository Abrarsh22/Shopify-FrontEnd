import PropTypes from "prop-types";
import { getCountries } from "react-phone-number-input/input";

const CountrySelectDropdown = ({ value, onChange, labels, placeholder, ...rest }) => (
    <select
      {...rest}
      value={value}
      onChange={(event) => onChange(event.target.value || undefined)}
    >
      <option value="">{placeholder}</option>
      {getCountries().map((country) => (
        <option key={labels[country]} value={labels[country]}>
          {labels[country]}
        </option>
      ))}
    </select>
  );
  
  CountrySelectDropdown.propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    labels: PropTypes.objectOf(PropTypes.string).isRequired,
    placeholder: PropTypes.string,
  };

  export default CountrySelectDropdown;