import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	footerContainer: {
		textDecoration: 'none',
		width: 'auto',
		backgroundColor: 'lightgray',
		padding: '40px 40px 20px',
		display: 'flex',
		flexWrap: 'wrap',
		'@media (max-width: 992px)': {
			width: 'auto',
		},
	},

	socialMedia: {
		display: 'flex',
		width: '100%',
		justifyContent: 'flex-end',
		alignSelf: 'flex-end',
	},
	socialIcon: {
		width: '50px',
		height: '50px',
		margin: '10px',
		cursor: 'pointer',
		'@media (max-width: 768px)': {
			width: '30px !important',
			height: '30px !important',
			margin: '7px !important',
			cursor: 'pointer',
		},
	},
	footerLink: {
		textDecoration: 'none',
	},
}));
