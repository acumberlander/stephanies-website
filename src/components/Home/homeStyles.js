import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	container: {
		postion: 'relative',
		minHeight: '100vh',
		width: '100%',
	},
	carouselContainer: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		position: 'relative',
	},
	carouselText: {
		textAlign: 'center',
		position: 'absolute',
		zIndex: 100,
		color: 'white',
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
	},
	carouselSubtitle: {
		fontSize: '1.5rem',
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
}));
