import React from 'react';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Grid2'
import { useFormContext, Controller } from 'react-hook-form';

const FormInput = ({ name, label, required }) => {
	const { control } = useFormContext();

	return (
		<Grid item xs={12} sm={6}>
			<Controller
				as={TextField}
				defaultValue=""
				control={control}
				fullWidth
				name={name}
				label={label}
				required={required}
			/>
		</Grid>
	);
};

export default FormInput;