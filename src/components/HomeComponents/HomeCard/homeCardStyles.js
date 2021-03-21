import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	container: {
		width: '100%',
	},
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
		width: '350px',
		height: '600px',
		objectFit: 'cover',
		objectPosition: '50% 5%',
		borderRadius: '0.3rem',
		'@media (max-width: 600px)': {
			width: '350px',
			height: '400px',
		},
	},
	overlay: {
		backgroundColor: 'black',
		width: '350px',
		height: '600px',
		position: 'absolute',
		opacity: '0.2',
		borderRadius: '0.3rem',
		'@media (max-width: 600px)': {
			width: '350px',
			height: '400px',
		},
	},
}));
