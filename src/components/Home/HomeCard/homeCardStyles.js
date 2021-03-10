import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	optionImageContainer: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		color: 'white',
	},
	optionHeader: {
		position: 'absolute',
		zIndex: 1,
	},
	optionImages: {
		maxWidth: '350px',
		maxHeight: '650px',
		objectFit: 'contain',
	},
}));
