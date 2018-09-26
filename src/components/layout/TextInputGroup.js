import React from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
const TextInputGroup = props => {
  const { name, type, label, placeholder, onChange, value, error } = props;
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <input
        name={name}
        type={type}
        className={classnames("form-control form-control-g", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        onChange={onChange}
        value={value}
      />
      {error ? <div className="invalid-feedback">{error}</div> : null}
    </div>
  );
};
export default TextInputGroup;
TextInputGroup.defaultProps = {
  type: "text"
};
TextInputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.string
};
