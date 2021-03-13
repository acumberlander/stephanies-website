import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	carouselImage: {
		objectFit: 'cover',
	},
	crossedLegs: {
		objectFit: 'cover',
		objectPosition: '50% 25%',
	},
	stephWithSmoke: {
		objectFit: 'cover',
		objectPosition: '50% 40%',
	},
}));

export default useStyles;
