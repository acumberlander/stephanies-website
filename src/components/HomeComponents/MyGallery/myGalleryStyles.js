import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

export const useStyles = makeStyles((theme) => ({
	galleryContainer: {},
	instaTag: {
		textDecoration: 'none',
		color: colors.primary,
	},
	galleryHeader: {
		fontFamily: 'Philosopher, sans-serif',
		textAlign: 'center',
		marginBottom: 50,
		[theme.breakpoints.down('sm')]: {
			fontSize: 36,
		},
	},
}));
