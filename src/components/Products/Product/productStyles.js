import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	root: {
		maxWidth: '100%',
	},
	productContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textDecoration: 'none',
		color: 'black',
	},
	productImage: {
		maxWidth: '298px',
		maxHeight: '450px',
		position: 'absolute',
		transition: 'opacity 0.25s',
		cursor: 'pointer',
		'&:hover': {
			opacity: 0,
			transitionTimingFunction: 'ease-in',
		},
	},
	cardContent: {
		maxTop: '20px',
		textAlign: 'center',
	},
	productName: {
		fontFamily: 'Philosopher, sans-serif',
	},
	price: {
		fontFamily: 'Philosopher, sans-serif',
	},
	productImageOverlay: {
		maxWidth: '298px',
		maxHeight: '450px',
		cursor: 'pointer',
		'&:hover': {
			maxWidth: '298px',
			maxHeight: '450px',
			margin: '20px',
		},
	},
	quickViewDiv: {
		display: 'none',
		justifyContent: 'center',
		alignItems: 'center',
		width: '100%',
		height: '0',
		maxWidth: '350px',
		backgroundColor: 'white',
		position: 'absolute',
		marginTop: '460px',
		zIndex: '10',
		marginLeft: '20px',
		overflow: 'hidden',
		transition: 'display 0.25s',
	},
	lineBreak: {
		width: '100px',
		border: '1px solid',
	},
}));
