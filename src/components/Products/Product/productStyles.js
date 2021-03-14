import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	root: {
		maxWidth: '100%',
	},
	productContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		textDecoration: 'none',
		color: '#cc34ab',
	},
	cardContent: {
		maxTop: '20px',
		textAlign: 'center',
		textDecoration: 'none',
		color: '#cc34ab',
	},
	productName: {
		fontFamily: 'Philosopher, sans-serif',
	},
	price: {
		fontFamily: 'Philosopher, sans-serif',
	},
	productImage: {
		width: '300px',
		height: '450px',
		position: 'absolute',
		transition: 'opacity 0.25s',
		cursor: 'pointer',
		'&:hover': {
			opacity: 0,
			transitionTimingFunction: 'ease-in',
		},
		[theme.breakpoints.down('sm')]: {
			width: '250px',
			height: '400px',
			cursor: 'pointer',
			'&:hover': {
				opacity: 0,
				transitionTimingFunction: 'ease-in',
			},
		},
	},
	onlyOneProductImage: {
		width: '300px',
		height: '450px',
		transition: 'opacity 0.25s',
		cursor: 'pointer',
		[theme.breakpoints.down('sm')]: {
			width: '250px',
			height: '400px',
			cursor: 'pointer',
		},
	},
	productImageOverlay: {
		width: '300px',
		height: '450px',
		cursor: 'pointer',
		'&:hover': {
			width: '300px',
			height: '450px',
			margin: '20px',
		},
		[theme.breakpoints.down('sm')]: {
			width: '250px',
			height: '400px',
			cursor: 'pointer',
			'&:hover': {
				width: '250px',
				height: '400px',
				margin: '20px',
			},
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
