import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

const useStyles = makeStyles((theme) => ({
	heroCarousel: {
		position: 'relative',
		zIndex: -1,
	},
	homeLogo: {
		marginTop: 100,
		width: 500,
		height: 500,
		[theme.breakpoints.down('lg')]: {
			width: 450,
			height: 450,
		},
		[theme.breakpoints.down('md')]: {
			width: 400,
			height: 400,
		},
		[theme.breakpoints.down('sm')]: {
			marginTop: 200,
			width: 275,
			height: 275,
		},
	},
	carouselContainer: {
		display: 'flex',
		justifyContent: 'center',
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
}));

export default useStyles;
