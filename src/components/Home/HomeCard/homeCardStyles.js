import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	gridContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		margin: '20px 0',
	},
	optionImageContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
		borderRadius: '0.3rem',
	},
	optionHeader: {
		position: 'absolute',
		zIndex: 1,
		fontFamily: 'Philosopher, sans-serif',
	},
	optionImages: {
		width: '300px',
		height: '600px',
		objectFit: 'cover',
		borderRadius: '0.3rem',
		'@media (max-width: 600px)': {
			width: '100%',
			height: '600px',
		},
	},
	overlay: {
		backgroundColor: 'black',
		width: '300px',
		height: '600px',
		position: 'absolute',
		opacity: '0.2',
		borderRadius: '0.3rem',
		'@media (max-width: 600px)': {
			width: '100%',
			height: '600px',
		},
	},
}));
