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
		'@media (max-width: 600px)': {
			width: '100%',
			height: '600px',
		},
	},
}));
