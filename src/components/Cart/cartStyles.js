import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	toolbar: theme.mixins.toolbar,
	cartContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 475,
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
			justifyContent: 'center',
		},
	},
	emptyCartContainer: {
		marginTop: 200,
		marginBottom: 36,
	},
	cartItemsContainer: {
		width: '75%',
		marginRight: 50,
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
	},
	orderSummaryContainer: {
		width: '25%',
		[theme.breakpoints.down('md')]: {
			width: '100%',
		},
	},
	emptyButton: {
		minWidth: '25%',
		backgroundColor: '#cc34ab',
		[theme.breakpoints.down('xs')]: {
			marginBottom: '5px',
		},
	},
	checkoutButton: {
		width: '100%',
		backgroundColor: '#cc34ab',
		color: 'white',
		[theme.breakpoints.down('md')]: {
			width: '25%',
			minWidth: 150,
		},
	},
	link: {
		textDecoration: 'none',
	},
	emptyButtonContainer: {
		display: 'flex',
		marginTop: '10%',
		width: '100%',
		justifyContent: 'center',
	},
	checkoutButtonContainer: {
		display: 'flex',
		marginTop: '10%',
		width: '100%',
		justifyContent: 'center',
	},
	subtotalContainer: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	totalContainer: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: 20,
	},
	divider: {
		backgroundColor: 'black',
		marginBottom: 10,
	},
}));
