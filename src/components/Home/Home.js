import React from 'react';
import Carousel from '../Carousel/Carousel';
import { Link } from 'react-router-dom';
import steph from '../../assets/steph-1.jpg';

import './Home.scss';
import MyGallery from '../MyGallery/MyGallery';

const Home = () => {
	return (
		<div className="container">
			<div className="carousel-container">
				<div className="carousel-text">
					<h3 id="carousel-subtitle">Brand by Stephanie Wilburn</h3>
					<h1 className="carousel-header">SEXES</h1>
					<div className="link-container">
						<Link className="shop-link" to={'/shop'}>
							<h3>Shop Now</h3>
						</Link>
					</div>
				</div>
				<Carousel />
			</div>
			<div className="content-wrapper">
				<div className="options">
					<div className="option-image-container">
						<h2 className="option-header">Text</h2>
						<img className="option-images" alt="" src={steph} />
					</div>
					<div className="option-image-container">
						<h2 className="option-header">Text</h2>
						<img className="option-images" alt="" src={steph} />
					</div>
					<div className="option-image-container">
						<h2 className="option-header">Text</h2>
						<img className="option-images" alt="" src={steph} />
					</div>
				</div>
			</div>
			<MyGallery />
		</div>
	);
};

export default Home;
