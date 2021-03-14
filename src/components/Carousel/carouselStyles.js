import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	heroCarousel: {
		position: 'relative',
		zIndex: -1,
	},
	carouselImage: {
		objectFit: 'cover',
	},
	stephWithSmoke: {
		objectFit: 'cover',
		objectPosition: '50% 40%',
	},
}));

export default useStyles;
