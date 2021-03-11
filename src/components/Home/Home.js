import React from 'react';
import Carousel from '../Carousel/Carousel';
import { Link } from 'react-router-dom';
import { useStyles } from './homeStyles';
import { Grid } from '@material-ui/core';

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
						<Link className={classes.shopLink} to={'/shop'}>
							<h3>Shop Now</h3>
						</Link>
					</div>
				</div>
				<Carousel />
			</div>
			<div className={classes.contentWrapper}>
				<Grid container className={classes.options}>
					<HomeCard spacing={10} />
					<HomeCard spacing={10} />
					<HomeCard spacing={10} />
					<HomeCard spacing={10} />
				</Grid>
			</div>
			<MyGallery />
		</div>
	);
};

export default Home;
