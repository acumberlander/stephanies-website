import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
	header: {
		fontFamily: 'Philosopher, sans-serif',
	},
	icon: {
		marginRight: theme.spacing(2),
	},
	shopHeader: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(8, 3, 0),
	},
	heroButtons: {
		marginTop: theme.spacing(4),
	},
	cardGrid: {
		paddingTop: theme.spacing(8),
		paddingBottom: theme.spacing(8),
	},
	gridItem: {
		// margin: '5px',
	},
	card: {
		display: 'flex',
		flexDirection: 'column',
	},
	cardMedia: {
		paddingTop: '56.25%', // 16:9
	},
	cardContent: {
		flexGrow: 1,
	},
	footer: {
		backgroundColor: theme.palette.background.paper,
		padding: theme.spacing(6),
	},
}));
