import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

export const useStyles = makeStyles((theme) => ({
	footerContainer: {
		textDecoration: 'none',
		width: 'auto',
		backgroundColor: 'black',
		padding: '40px 40px 20px',
		display: 'flex',
		justifyContent: 'center',
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
		alignItems: 'center',
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
	logo: {
		marginTop: '40px',
		height: 400,
		width: 400,
		[theme.breakpoints.down('sm')]: {
			height: 400,
			width: 400,
		},
		[theme.breakpoints.down('xs')]: {
			height: 250,
			width: 250,
			margin: '20px 0',
		},
	},
	trademark: {
		height: 15,
		width: 15,
		[theme.breakpoints.down('xs')]: {
			height: 10,
			width: 10,
			marginBottom: 30,
		},
	},
	hidden: {
		display: 'none',
	},
	backToTop: {
		backgroundColor: colors.primary,
		color: 'white',
		height: 50,
		width: 50,
		margin: '10px 10px 15px',
		borderRadius: '50%',
		cursor: 'pointer',
		position: 'fixed',
		bottom: 100,
		border: '1px solid white',
		[theme.breakpoints.down('sm')]: {
			display: 'none',
		},
	},
	arrow: {
		fontSize: 50,
	},
}));
