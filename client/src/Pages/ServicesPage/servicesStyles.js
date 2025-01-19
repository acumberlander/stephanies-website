// import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

// export const useStyles = makeStyles((theme) => ({
// 	container: {
// 		marginTop: 60,
// 		minHeight: '100vh',
// 	},
// 	hairAndEventsStyle: {
// 		width: '660px',
// 		position: 'relative',
// 		right: '40%',
// 		[theme.breakpoints.down('sm')]: {
// 			width: '450px',
// 			position: 'relative',
// 			right: '40%',
// 		},
// 	},
// 	ascotsStyle: {
// 		width: '490px',
// 		position: 'relative',
// 		bottom: '15%',
// 		[theme.breakpoints.down('sm')]: {
// 			width: '370px',
// 			position: 'relative',
// 			bottom: '15%',
// 			right: '4%',
// 		},
// 	},
// 	pageHeader: {
// 		color: colors.primary,
// 		fontFamily: 'Philosopher, sans-serif',
// 		textAlign: 'center',
// 		margin: '100px 0',
// 	},
// }));

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
