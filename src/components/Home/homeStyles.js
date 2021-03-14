import { makeStyles } from '@material-ui/core';
import { colors } from '../../CSS/colors';

export const useStyles = makeStyles((theme) => ({
	container: {
		// postion: 'relative',
		minHeight: '100vh',
		width: '100%',
	},
	carouselContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
		zIndex: 1,
	},
	carouselText: {
		textAlign: 'center',
		position: 'absolute',
		zIndex: 100,
		color: colors.white,
		fontFamily: 'Philosopher, sans-serif',
		marginBottom: 200,
	},
	carouselHeader: {
		fontSize: '15rem',
		fontWeight: '15rem',
		margin: 0,
		[theme.breakpoints.down('md')]: {
			fontSize: '10rem',
			fontWeight: 'normal',
			margin: 0,
		},
		[theme.breakpoints.down('sm')]: {
			fontSize: '8rem',
			fontWeight: 'normal',
			margin: 0,
		},
	},
	carouselSubtitle: {
		fontSize: '1.5rem',
		marginTop: 0,
		marginBottom: '90px',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem',
		},
	},
	linkContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	shopLink: {
		fontSize: '1.5rem',
		color: 'white',
		cursor: 'pointer',
		[theme.breakpoints.down('md')]: {
			fontSize: '1.3rem',
		},
		[theme.breakpoints.down('xs')]: {
			fontSize: '1.1rem',
		},
	},
	linkText: {
		margin: 0,
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
		padding: '150px 0',
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
