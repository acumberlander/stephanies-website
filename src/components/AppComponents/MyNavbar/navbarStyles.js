import { makeStyles } from '@material-ui/core/styles';
import { colors } from '../../../CSS/colors';

export default makeStyles((theme) => ({
	navContainer: {
		position: 'relative',
		display: 'flex',
		backgroundColor: colors.primary,
		paddingRight: '10px',
		paddingLeft: '118px',
		border: '1px solid black',
		marginBottom: '50px',
		'@media (max-width: 900px)': {
			paddingLeft: 0,
		},
	},
	logo: {
		fontFamily: 'Philosopher, sans-serif',
		fontWeight: 'regular',
		fontSize: 32,
		textAlign: 'left',
		cursor: 'pointer',
	},
	logoLink: {
		textDecoration: 'none',
	},
	cartIcon: {
		color: 'white',
	},
	navButton: {
		fontFamily: 'Philosopher, sans-serif',
		fontWeight: 700,
		size: '18px',
		marginLeft: '20px',
	},
	cartButton: {
		fontFamily: 'Philosopher, sans-serif',
		fontWeight: 700,
		size: '18px',
		marginRight: 10,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	drawerContent: {
		padding: '20px 30px',
		width: 200,
	},
	myNavbar: {
		backgroundColor: colors.primary,
	},
	menuItem: {
		backgroundColor: colors.primary,
		borderRadius: '0.3rem',
		marginTop: 10,
		color: colors.white,
		display: 'flex',
		justifyContent: 'center',
		'&:hover': {
			backgroundColor: colors.primaryHover,
		},
	},
	lineBreak: {
		backgroundColor: colors.primary,
		width: 250,
		margin: '25px 0',
	},
	loginButton: {
		backgroundColor: colors.primary,
		color: colors.white,
		marginTop: 25,
		'&:hover': {
			backgroundColor: colors.primaryFaded,
		},
	},
}));
