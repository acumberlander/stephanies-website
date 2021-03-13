import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: '100px',
		padding: theme.spacing(4, 16),
	},
	productName: {
		marginBottom: '10px',
	},
	contentContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	navbar: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '50px',
	},
	productAndDetails: {
		display: 'flex',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	leftSection: {
		maxWidth: '550px',
	},
	displayContainer: {
		maxWidth: '450px',
		height: '600px',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '350px',
			height: '500px',
		},
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	productImage: {
		maxWidth: '450px',
		height: '600px',
		[theme.breakpoints.down('sm')]: {
			maxWidth: '350px',
			height: '500px',
		},
	},
	thumbnailContainer: {
		'&:hover': {
			border: '1px solid lightblue',
		},
	},
	productDetailsText: {
		maxWidth: '450px',
	},
	rightSection: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: '100%',
		maxWidth: '450px',
		[theme.breakpoints.down('md')]: {
			padding: theme.spacing(1, 0),
		},
		padding: theme.spacing(2, 6),
	},
	button: {
		backgroundColor: theme.palette.primary,
	},
	quantityHeader: {
		marginTop: 20,
	},
	sizeHeader: {
		marginTop: 20,
	},
	colorHeader: {
		marginTop: 20,
	},
	priceHeader: {
		marginTop: 20,
	},
	quantityContainer: {
		display: 'flex',
		justifyContent: 'space-around',
		alignItems: 'center',
		border: '1px solid black',
	},
	quantityButton: {
		maxWidth: 30,
		maxHeight: 30,
	},
	accordion: {
		boxShadow: 'none',
		margin: '0 !important',
	},
	accordionContainer: {
		margin: '30px 0',
	},
	socialMediaGroup: {
		display: 'flex',
	},
	socialIcon: {
		height: '20px',
		width: '20px',
		margin: '5px',
		cursor: 'pointer',
	},
}));
