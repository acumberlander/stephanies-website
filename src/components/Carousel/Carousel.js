import React from 'react';
import HeroCarousel from 'react-hero-carousel';
import stephWithSmoke from '../../assets/steph-smoke.jpg';
import stephLaid from '../../assets/steph-laid.jpg';
import stephPool from '../../assets/steph-pool.jpg';
import steph1 from '../../assets/steph-1.jpg';
import stephWithGlass from '../../assets/glassware/steph-and-glassware.jpg';
import useStyles from './carouselStyles';

const Carousel = () => {
	const classes = useStyles();

	return (
		<HeroCarousel interval={3000}>
			<img
				className={classes.crossedLegs}
				src={steph1}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
			{/* <img
				className={classes.stephByPool}
				src={stephPool}
				alt="sexes pic"
				width="100%"
				height="100%"
			/> */}
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
