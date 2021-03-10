import { useStyles } from './myGalleryStyles';
import Gallery from 'react-photo-gallery';
import { photos } from './photos';
import { Typography } from '@material-ui/core';

const MyGallery = () => {
	const classes = useStyles();

	return (
		<div className={classes.galleryContainer}>
			<Typography className={classes.galleryHeader} variant="h3">
				Follow Us @sexesbystephanie{' '}
			</Typography>
			<Gallery photos={photos} />
		</div>
	);
};

export default MyGallery;
