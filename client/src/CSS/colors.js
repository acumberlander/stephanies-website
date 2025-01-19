import { createTheme } from '@mui/material/styles';

export const colors = {
	primary: '#cc34ab',
	primaryFaded: 'rgba(204,52,171, 0.65)',
	primaryHover: '#b32093',
	danger: 'red',
	black: 'black',
	white: 'white',
};


export const theme = createTheme({
  palette: {
    main: '#cc34ab',
		primaryFaded: 'rgba(204,52,171, 0.65)',
		primaryHover: '#b32093',
		danger: 'red',
		black: 'black',
		white: 'white',
  },
});