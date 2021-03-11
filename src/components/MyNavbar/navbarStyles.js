import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
	navContainer: {
		display: 'flex',
		backgroundColor: '#400CCC',
		paddingRight: '10px',
		paddingLeft: '118px',
		border: '1px solid black',
		marginBottom: '50px',
		'@media (max-width: 900px)': {
			paddingLeft: 0,
		},
	},
	logo: {
		fontFamily: 'Philosopher, sans-serif',
		fontWeight: 'regular',
		fontSize: 32,
		color: '#FFFEFE',
		textAlign: 'left',
		cursor: 'pointer',
	},
	logoLink: {
		textDecoration: 'none',
	},
	cartIcon: {
		color: 'white',
	},
	navButton: {
		fontFamily: 'Philosopher, sans-serif',
		fontWeight: 700,
		size: '18px',
		marginLeft: '20px',
	},
	cartButton: {
		fontFamily: 'Philosopher, sans-serif',
		fontWeight: 700,
		size: '18px',
		marginRight: 10,
	},
	toolbar: {
		display: 'flex',
		justifyContent: 'space-between',
	},
	drawerContainer: {
		padding: '20px 30px',
	},
}));
