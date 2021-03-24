import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

export const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: 60,
		minHeight: '100vh',
	},
	sectionContainer: {
		height: 650,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageAndText: {
		display: 'flex',
		marginBottom: 50,
	},
	serviceImageContainer: {
		height: 450,
		width: 450,
		marginRight: 60,
		overflow: 'hidden',
		borderRadius: '1rem',
	},
	serviceImage: {},

	serviceTextContainer: {
		maxWidth: 700,
	},

	pageHeader: {
		color: colors.primary,
		fontFamily: 'Philosopher, sans-serif',
		textAlign: 'center',
		margin: '100px 0',
	},

	serviceHeader: {
		color: colors.primary,
		fontFamily: 'Philosopher, sans-serif',
	},

	serviceText: {
		marginBottom: 30,
		fontFamily: 'Philosopher, sans-serif',
	},

	contactText: {
		color: colors.primary,
		fontFamily: 'Philosopher, sans-serif',
	},

	serviceTextFooter: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	socialIcons: {
		width: 115,
		display: 'flex',
		justifyContent: 'space-between',
	},
	socialIcon: {
		width: 50,
		height: 50,
	},
	carouselContainer: {
		width: 1200,
	},
	galleryItem: {
		height: 175,
		width: 175,
	},
}));

export const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 5,
	},
	tablet: {
		breakpoint: { max: 1024, min: 600 },
		items: 1,
	},
	mobile: {
		breakpoint: { max: 600, min: 0 },
		items: 1,
	},
};
