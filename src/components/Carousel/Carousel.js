import React from 'react';
import HeroCarousel from 'react-hero-carousel';
import stephWithSmoke from '../../assets/steph-smoke.jpg';
import stephLaid from '../../assets/steph-laid.jpg';
import stephWithGlass from '../../assets/glassware/steph-and-glassware.jpg';
import steph2 from '../../assets/steph-smile.jpg';
import demo from '../../assets/demo-1.jpg';
import useStyles from './carouselStyles';

const Carousel = () => {
	const classes = useStyles();

	return (
		<HeroCarousel className={classes.heroCarousel} interval={3000}>
			<img
				className={classes.stephSmile}
				src={steph2}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
			<img
				className={classes.carouselImage}
				src={stephWithGlass}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
			<img
				className={classes.carouselImage}
				src={stephLaid}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
			<img
				className={classes.stephWithSmoke}
				src={stephWithSmoke}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
		</HeroCarousel>
	);
};

export default Carousel;
