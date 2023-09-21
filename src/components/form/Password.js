import React, { useState } from "react";
import { Field, ErrorMessage, useField } from "formik";
import { TextField, InputAdornment, IconButton } from "@material-ui/core";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";

const Password = ({ placeholder, name, numberOnly }) => {
  const [, , helpers] = useField(name);

  const updateValue = (e) => {
    helpers.setValue(e.target.value);
  };

  const [showPassword, setShowPassword] = useState(false);
  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="form-group mt-3">
      <Field name={name}>
        {({ field, form }) => {
          if (field.value === undefined) field.value = "";
          return (
            <TextField
              className="form-control"
              {...field}
              type={showPassword ? "text" : "password"}
              label={placeholder}
              fullWidth
              onChange={updateValue}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={toggleShowPassword}
                      onMouseDown={toggleShowPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name}>
        {(msg) => <span className="input-feedback">{msg}</span>}
      </ErrorMessage>
    </div>
  );
};

export default Password;
