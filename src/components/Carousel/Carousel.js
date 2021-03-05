import React from 'react';
import HeroCarousel from 'react-hero-carousel';
import stephOne from '../../assets/steph-1.jpg';

const Carousel = () => {
	return (
		<HeroCarousel interval={2000}>
			<img src={stephOne} alt="sexes pic" width="100%" height="100%" />
			{/* <img
				src="https://placem.at/places?w=1920&h=1080&seed=2&txt=2"
				alt="sexes pic"
				width="100%"
				height="100%"
			/>
			<img
				src="https://placem.at/places?w=1920&h=1080&seed=2&txt=2"
				alt="sexes pic"
				width="100%"
				height="100%"
			/> */}
		</HeroCarousel>
	);
};

export default Carousel;
