import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

export const useStyles = makeStyles((theme) => ({
	container: {
		minHeight: '100vh',
		width: '100%',
	},
	linkContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	options: {
		flexGrow: 1,
		padding: '100px 0 200px',
	},
	contentWrapper: {
		padding: '5rem 200px',
	},
	preHeader: {
		marginBottom: 100,
		fontFamily: 'Philosopher, sans-serif',
		[theme.breakpoints.down('sm')]: {
			fontSize: 26,
		},
	},
	discountHeader: {
		marginBottom: 100,
		fontFamily: 'Philosopher, sans-serif',
		[theme.breakpoints.down('sm')]: {
			fontSize: 40,
		},
	},
	discountContainer: {
		textAlign: 'center',
		padding: '150px 20px',
		backgroundColor: colors.primary,
		color: colors.white,
	},
	inputAndButton: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	joinButton: {
		width: 150,
		color: 'white',
		fontFamily: 'Philosopher, sans-serif',
		fontSize: 20,
	},
	emailInput: {
		width: 500,
		[theme.breakpoints.down('sm')]: {
			width: 300,
		},
		marginBottom: 35,
		borderBottom: `2px solid ${colors.white}`,
		padding: '0 15px',
		color: 'white',
	},
}));
