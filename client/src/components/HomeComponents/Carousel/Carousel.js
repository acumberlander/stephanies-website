import React from 'react';
import { Link } from 'react-router-dom';
import whiteLogo from '../../../assets/logos/logo-white.png';

import HeroSlider, { Slide, Overlay, Nav, MenuNav } from 'hero-slider';

import stephWithSmoke from '../../../assets/steph/steph-smoke.jpg';
import stephLaid from '../../../assets/steph/steph-laid.jpg';
import stephWithGlass from '../../../assets/glassware/steph-and-glassware.jpg';
import steph2 from '../../../assets/steph/steph-smile.jpg';
import './Carousel.scss';

const Carousel = () => {
	return (
		<HeroSlider
			height={"100vh"}
			autoplay
			accessibility={{
				shouldDisplayButtons: false
			}}
			
			animations="fade"
			initialSlide={1}
			controller={{
        initialSlide: 1,
        slidingDuration: 500,
        slidingDelay: 100,
        onSliding: (nextSlide) =>
          console.debug("onSliding(nextSlide): ", nextSlide),
        onBeforeSliding: (previousSlide, nextSlide) =>
          console.debug(
            "onBeforeSliding(previousSlide, nextSlide): ",
            previousSlide,
            nextSlide
          ),
        onAfterSliding: (nextSlide) =>
          console.debug("onAfterSliding(nextSlide): ", nextSlide)
      }}
		>
			<Overlay>
				<div className="carousel-container">
					<div className="carousel-text">
						<img className="home-logo" src={whiteLogo} alt="logo" />
						<h3 className="carousel-subtitle">By Stephanie</h3>
						<div className="link-container">
							<Link className="shop-link" to="/shop/all-products">
								<h3 className="link-text">Shop Now</h3>
							</Link>
						</div>
					</div>
				</div>
			</Overlay>

			<Slide
				// shouldRenderMask
				background={{
					backgroundImageSrc: stephWithSmoke,
					backgroundImageStyle: {
						objectPosition: '50% 40%',
						objectFit: 'contain'
					}
					// backgroundPosition: '50% 40%',
				}}
			/>
			{/* <Slide
				// shouldRenderMask
				background={{
					backgroundImageSrc: stephWithGlass,
					// backgroundPosition: '53% 40%',
				}}
			/>
			<Slide
				// shouldRenderMask
				background={{ 
					backgroundImageSrc: steph2,
					// backgroundImageStyle: '60% 70%'
				}}
			/>
			<Slide
				// shouldRenderMask	
				background={{
					backgroundImageSrc: stephLaid,
					// backgroundPosition: '10% 50%',
				}}
			/> */}
			<Nav position={{bottom: '1.5rem'}} />
		</HeroSlider>
	);
};

export default Carousel;
