import { makeStyles } from '@material-ui/core';

export const useStyles = makeStyles((theme) => ({
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
}));
