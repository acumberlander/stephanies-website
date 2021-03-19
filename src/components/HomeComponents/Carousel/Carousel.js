import React from 'react';
import { Link } from 'react-router-dom';
import whiteLogo from '../../../assets/logos/logo-white.png';

import HeroSlider, { Slide, Nav, OverlayContainer } from 'hero-slider';

import stephWithSmoke from '../../../assets/steph-smoke.jpg';
import stephLaid from '../../../assets/steph-laid.jpg';
import stephWithGlass from '../../../assets/glassware/steph-and-glassware.jpg';
import steph2 from '../../../assets/steph-smile.jpg';
import useStyles from './carouselStyles';

const Carousel = () => {
	const classes = useStyles();

	return (
		<HeroSlider
			slidingAnimation="fade"
			orientation="horizontal"
			initialSlide={1}
			style={{
				backgroundColor: 'rgba(0, 0, 0, 0.33)',
			}}
			settings={{
				sliderFadeInDuration: 100,
				navbarFadeInDuration: 1000,
				navbarFadeInDelay: 500,
				shouldAutoplay: true,
				shouldDisplayButtons: false,
				autoplayDuration: 3000,
				height: '100vh',
			}}
		>
			<OverlayContainer>
				<div className={classes.carouselContainer}>
					<div className={classes.carouselText}>
						<img className={classes.homeLogo} src={whiteLogo} alt="logo" />
						<h3 className={classes.carouselSubtitle}>By Stephanie</h3>
						<div className={classes.linkContainer}>
							<Link className={classes.shopLink} to="/shop/all-products">
								<h3 className={classes.linkText}>Shop Now</h3>
							</Link>
						</div>
					</div>
				</div>
			</OverlayContainer>

			<Slide
				className={classes.stephWithSmoke}
				background={{
					backgroundImage: stephWithSmoke,
					backgroundPosition: '50% 40%',
				}}
			/>
			<Slide
				className={classes.stephWithGlass}
				background={{
					backgroundImage: stephWithGlass,
					backgroundPosition: '53% 40%',
				}}
			/>
			<Slide
				className={classes.stephSmile}
				background={{ backgroundImage: steph2, backgroundPosition: '60% 70%' }}
			/>
			<Slide
				className={classes.stephLaid}
				background={{
					backgroundImage: stephLaid,
					backgroundPosition: '10% 50%',
				}}
			/>
			<Nav />
		</HeroSlider>
	);
};

export default Carousel;
