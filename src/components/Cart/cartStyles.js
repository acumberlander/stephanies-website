import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../CSS/colors';

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
		display: 'flex',
		justifyContent: 'center',
		width: '100%',
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
		backgroundColor: colors.primary,
		'&:hover': {
			backgroundColor: 'red',
		},
		[theme.breakpoints.down('xs')]: {
			marginBottom: '5px',
		},
	},
	emptyText: {
		fontFamily: 'Philosopher, sans-serif',
		fontSize: 30,
	},
	checkoutButton: {
		width: '100%',
		backgroundColor: colors.primary,
		color: 'white',
		'&:hover': {
			backgroundColor: colors.primaryHover,
		},
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
