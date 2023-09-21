
import React from 'react';
import { Field, ErrorMessage, useField } from "formik";
import TextField from '@material-ui/core/TextField';


const Input = ({ placeholder, type, name, numberOnly }) => {

	const [, , helpers] = useField(name);

	const updateValue = (e) => {
		if (e.target.value !== "" && numberOnly && !/^\d+$/.test(e.target.value)) {
			return;
		}
		helpers.setValue(type === "number" ? parseInt(e.target.value) : e.target.value);
	};

	return (<div className="form-group mt-3">
		<Field name={name}>
			{({field, form}) => {
				if (field.value === undefined)
					field.value = ''
				return (
					<TextField className="form-control" {...field} type={type} label={placeholder} fullWidth onChange={updateValue} variant="outlined" />
				);
			}}
		</Field>
		<ErrorMessage name={name}>
			{msg => <span className="input-feedback">{msg}</span>}
		</ErrorMessage>
	</div>);
};

Input.defaultProps = {
	numberOnly: false
}

export default Input;