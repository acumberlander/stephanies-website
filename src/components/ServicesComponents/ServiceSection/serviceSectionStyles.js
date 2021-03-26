import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

export const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: 60,
		minHeight: '100vh',
	},
	sectionContainer: {
		marginBottom: 150,
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	imageAndText: {
		display: 'flex',
		justifyContent: 'center',
		flexWrap: 'wrap',
		marginBottom: 50,
	},
	serviceImageContainer: {
		height: 450,
		width: 450,
		overflow: 'hidden',
		borderRadius: '1rem',
		boxShadow: '3px 4px 9px 0px',
		[theme.breakpoints.down('sm')]: {
			height: 300,
			width: 300,
		},
	},
	serviceImageContainerLeft: {
		height: 450,
		width: 450,
		overflow: 'hidden',
		borderRadius: '1rem',
		boxShadow: '3px 4px 9px 0px',
		[theme.breakpoints.down('md')]: {
			display: 'none',
		},
	},
	serviceImageHidden: {
		display: 'none',
		[theme.breakpoints.down('md')]: {
			display: 'block',
			height: 450,
			width: 450,
			overflow: 'hidden',
			borderRadius: '1rem',
			boxShadow: '3px 4px 9px 0px',
			[theme.breakpoints.down('sm')]: {
				height: 300,
				width: 300,
			},
		},
	},
	serviceImageHidden2: {
		display: 'none',
	},
	serviceTextContainer: {
		maxWidth: 700,
		padding: '0 60px',
		[theme.breakpoints.down('md')]: {
			marginTop: 60,
		},
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
		[theme.breakpoints.down('sm')]: {
			width: 40,
			height: 40,
		},
	},
	carouselContainer: {
		width: 1200,
		[theme.breakpoints.down('md')]: {
			width: 800,
		},
		[theme.breakpoints.down('sm')]: {
			width: 500,
		},
		[theme.breakpoints.down('xs')]: {
			width: 350,
		},
	},
	galleryItem: {
		height: 175,
		width: 175,
		[theme.breakpoints.down('md')]: {
			height: 125,
			width: 125,
		},
		[theme.breakpoints.down('sm')]: {
			height: 150,
			width: 150,
		},
	},
}));

export const responsive = {
	desktop: {
		breakpoint: { max: 3000, min: 1024 },
		items: 5,
		slidesToSlide: 4,
	},
	tablet: {
		breakpoint: { max: 1024, min: 600 },
		items: 2,
		slidesToSlide: 4,
	},
	mobile: {
		breakpoint: { max: 600, min: 0 },
		items: 1,
		slidesToSlide: 4,
	},
};
