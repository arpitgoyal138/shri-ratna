import React from "react";
import "./styles.scss";
import TextField from "@material-ui/core/TextField";
import CssBaseline from "@material-ui/core/CssBaseline";

const FormInput = ({ handleChange, label, ...otherProps }) => {
  return (
    <div>
      <CssBaseline />

      {/* <input className="formInput" onChange={handleChange} {...otherProps} /> */}
      <TextField
        variant="outlined"
        margin="normal"
        fullWidth
        onChange={handleChange}
        label={label}
        {...otherProps}
      />
    </div>
  );
};

export default FormInput;
