import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
	container: {
		display: 'flex',
		alignItems: 'flex-start',
		justifyContent: 'space-between',
		padding: theme.spacing(2, 0),
		width: '100%',
		borderBottom: '1px solid',
	},
	imageAndDescription: {
		display: 'flex',
	},
	productName: {
		marginBottom: 20,
	},
	media: {
		height: 125,
		width: 75,
		marginRight: 10,
	},
	cardContent: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	cartActions: {
		justifyContent: 'space-between',
	},
	buttons: {
		display: 'flex',
		alignItems: 'center',
		border: '1px solid',
		height: 30,
	},
	priceAndRemove: {
		display: 'flex',
		alignItems: 'center',
	},
	shopLink: {
		textDecoration: 'none',
		color: 'black',
	},
}));
