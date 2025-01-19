import { makeStyles } from '@material-ui/core';
import { colors } from '../../../CSS/colors';

export const useStyles = makeStyles((theme) => ({
	aboutContainer: {
		display: 'flex',
		justifyContent: 'center',
		flexDirection: 'column',
		alignItems: 'center',
		height: 'auto',
		padding: '100px 50px 0',
		fontFamily: 'Philosopher, sans-serif',
	},
	imageAndTextContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		maxWidth: 600,
	},
	imageContainer: {
		margin: '50px 0',
	},
	ownerImage: {
		height: 500,
		width: 300,
		borderRadius: '10rem 10rem 0 0',
		objectFit: 'cover',
	},
	aboutText: {
		fontFamily: 'Philosopher, sans-serif',
		textAlign: 'center',
		margin: 10,
	},
	adamsSlogan: {
		fontFamily: 'Philosopher, sans-serif',
		textAlign: 'center',
		margin: 10,
		color: colors.primary,
	},
	aboutHeader: {
		color: colors.primary,
		fontFamily: 'Philosopher, sans-serif',
	},
	shopLink: {
		textDecoration: 'none',
		margin: '90px 0 100px',
		color: colors.primary,
	},
	linkText: {
		margin: 0,
	},
	textBorder: {
		border: `6px solid ${colors.primary}`,
		padding: 30,
	},
}));
