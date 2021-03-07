import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
	container: {
		marginTop: '100px',
		padding: theme.spacing(4, 20),
	},
	contentContainer: {
		display: 'flex',
		justifyContent: 'center',
	},
	navbar: {
		display: 'flex',
		justifyContent: 'space-between',
		marginBottom: '50px',
	},
	productAndDetails: {
		display: 'flex',
		[theme.breakpoints.down('md')]: {
			flexDirection: 'column',
		},
	},
	leftSection: {
		maxWidth: '550px',
	},
	displayContainer: {
		maxWidth: '450px',
		height: '600px',
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	productImage: {
		maxWidth: '450px',
		height: '600px',
	},
	thumbnailContainer: {
		'&:hover': {
			border: '1px solid lightblue',
		},
	},
	rightSection: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'flex-start',
		width: '100%',
		[theme.breakpoints.down('md')]: {
			padding: theme.spacing(1, 0),
		},
		padding: theme.spacing(1, 4),
		// minWidth: '400px',
	},
	button: {
		backgroundColor: theme.palette.primary,
	},
	accordion: {
		boxShadow: 'none',
		margin: '0 !important',
	},
	accordionContainer: {
		margin: '30px 0',
	},
	socialMediaGroup: {
		display: 'flex',
	},
	socialIcon: {
		height: '20px',
		width: '20px',
		margin: '5px',
		cursor: 'pointer',
	},
}));
