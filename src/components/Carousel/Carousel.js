import React from 'react';
import HeroCarousel from 'react-hero-carousel';
import demo1 from '../../assets/demo-1.jpg';
import demo2 from '../../assets/demo-2.jpg';
import demo3 from '../../assets/demo-3.jpg';
import useStyles from './styles';

const Carousel = () => {
	const classes = useStyles();

	return (
		<HeroCarousel interval={3000}>
			<img
				className={classes.carouselImage}
				src={demo2}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
			<img
				className={classes.carouselImage}
				src={demo1}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
			<img
				className={classes.carouselImage}
				src={demo3}
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
		</HeroCarousel>
	);
};

export default Carousel;
