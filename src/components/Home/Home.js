import React from 'react';
import Carousel from '../Carousel/Carousel';
import { Link } from 'react-router-dom';
import { useStyles } from './homeStyles';
import { Grid, Fade } from '@material-ui/core';
import accessoryPic from '../../assets/accessories/accessory-1.jpg';
import glasswarePic from '../../assets/glassware/glassware-1.jpg';
import teePic from '../../assets/tees/tee-1.jpg';

import MyGallery from '../MyGallery/MyGallery';
import HomeCard from './HomeCard/HomeCard';

const Home = () => {
	const classes = useStyles();

	return (
		<div className={classes.container}>
			<div className={classes.carouselContainer}>
				<div className={classes.carouselText}>
					<h3 className={classes.carouselSubtitle}>
						Brand by Stephanie Wilburn
					</h3>
					<h1 className={classes.carouselHeader}>SEXES</h1>
					<div className={classes.linkContainer}>
						<Link className={classes.shopLink} to={'/shop/all-products'}>
							<h3 className={classes.linkText}>Shop Now</h3>
						</Link>
					</div>
				</div>
				<Carousel />
			</div>
			{/* <div className={classes.contentWrapper}> */}
			<Fade
				in={true}
				style={{ transformOrigin: '0 0 0' }}
				{...(true ? { timeout: 1000 } : {})}
			>
				<Grid container className={classes.options}>
					<HomeCard
						page="accessories"
						image={accessoryPic}
						category="Accessories"
					/>
					<HomeCard
						page="glassware"
						image={glasswarePic}
						category="Glassware"
					/>
					<HomeCard
						style={{ objectPosition: '30%' }}
						page="t-shirts"
						image={teePic}
						category="T-Shirts"
					/>
					<HomeCard page="hoodies" image={accessoryPic} category="Hoodies" />
				</Grid>
			</Fade>
			{/* </div> */}
			<MyGallery />
		</div>
	);
};

export default Home;
