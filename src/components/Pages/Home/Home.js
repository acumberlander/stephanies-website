import React from 'react';
import Carousel from '../../HomeComponents/Carousel/Carousel';
import { useStyles } from './homeStyles';
import { Grid, Fade, Typography, Input, Button } from '@material-ui/core';
import accessoryPic from '../../../assets/accessories/leather-necklace.jpg';
import glasswarePic from '../../../assets/glassware/steph-drinking.jpg';
import teePic from '../../../assets/tees/tee-category.png';
import steph1 from '../../../assets/steph-1.jpg';
import steph2 from '../../../assets/denim/denim-one-shot.jpg';
import tribalPic from '../../../assets/tribal-pic.png';

import MyGallery from '../../HomeComponents/MyGallery/MyGallery';
import HomeCard from '../../HomeComponents/HomeCard/HomeCard';

const Home = () => {
	const classes = useStyles();

	if (window.scrollY !== 0) {
		window.scrollTo({ left: 0, top: 0, behavior: 'auto' });
	}

	return (
		<div className={classes.container}>
			<Carousel />
			<Fade in={true} timeout={1000}>
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
						page="tees"
						image={teePic}
						category="Tees"
					/>
					<HomeCard
						page="adams-apple-ascots"
						image={steph1}
						topText="Adam's Apple"
						bottomText="Ascots"
					/>
					<HomeCard
						page="venomous-denim"
						image={steph2}
						topText="Venomous Denim"
					/>
					<HomeCard
						page="manifest-into-art"
						image={tribalPic}
						topText="Manifest into Art"
					/>
				</Grid>
			</Fade>
			<MyGallery />
			<div className={classes.discountContainer}>
				<Typography className={classes.preHeader} variant="h4">
					Become a member and receive
				</Typography>
				<Typography className={classes.discountHeader} variant="h1">
					10% OFF YOUR FIRST ORDER
				</Typography>
				<div className={classes.inputAndButton}>
					<Input
						className={classes.emailInput}
						placeholder="Enter your email here*"
						disableUnderline={true}
					/>
					<Button className={classes.joinButton} variant="text">
						Join
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Home;
