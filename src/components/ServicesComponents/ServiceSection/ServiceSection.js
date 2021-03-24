import React from 'react';
import { useStyles } from './serviceSectionStyles';
import { Typography } from '@material-ui/core';
import facebookIcon from '../../../assets/facebook.png';
import instaIcon from '../../../assets/instagram.png';
import ascotPlaceholder from '../../../assets/ascot-placeholder.png';
import Carousel from 'react-multi-carousel';

const ServiceSection = () => {
	const classes = useStyles();

	return (
		<div className={classes.sectionContainer}>
			<div className={classes.imageAndText}>
				<div className={classes.serviceImageContainer}>
					<img className={classes.serviceImage} src={ascotPlaceholder} alt="" />
				</div>
				<div className={classes.serviceTextContainer}>
					<Typography className={classes.serviceHeader} variant="h3">
						Adams Apple Ascots
					</Typography>
					<Typography className={classes.serviceText}>
						SexesByStephanie offers an exclusive custom one-of-a-kind Tie Wear
						line called Adams Apple Ascots. Adams Apple Ascots is a custom
						one-of-a-kind handcrafted Tie brooch pin that’s very distinctive,
						original and a combination of a bow tie, necktie, scarf and a Ascot
						all in one. This creation was created from the soul and love of
						diversity, uniqueness, boldness, style, flair and elegancefor the
						non-conformist individual who are very in-tune with their own unique
						style of fashion. Adams Apple Ascots is where lifestyle meets
						“Fashion On Edge”!
					</Typography>
					<Typography className={classes.serviceText}>
						Don’t Be Ordinary Be Extraordinary Rock Adams Apple Ascots!
					</Typography>
					<Typography className={classes.serviceText}>
						Adams Apple Ascots has been worn by over 300 celebrities and has
						been featured in a few magazines, serveral advertisements, several
						commercials, several news stations and radio stations since its
						birth to the universe.
					</Typography>
					<span className={classes.serviceTextFooter}>
						<div className={classes.contactContainer}>
							<Typography className={classes.contactText}>
								email: sexes2014@gmail.com
							</Typography>
							<Typography className={classes.contactText}>
								phone: (731) 313-3603
							</Typography>
						</div>
						<div className={classes.socialIcons}>
							<a
								className={classes.socialLink}
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.facebook.com/Sexes-Custom-Brand-149443252511629"
							>
								<img
									className={classes.socialIcon}
									src={facebookIcon}
									alt="facebook"
								/>
							</a>
							<a
								className={classes.socialLink}
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.instagram.com/sexesbystephanie/"
							>
								<img
									className={classes.socialIcon}
									src={instaIcon}
									alt="instagram"
								/>
							</a>
						</div>
					</span>
				</div>
			</div>
			<Carousel
				swipeable={true}
				draggable={true}
				showDots={true}
				centerMode={true}
				responsive={responsive}
				infinite={true}
				keyBoardControl={true}
				transitionDuration={1000}
				containerClass={classes.carouselContainer}
				arrows
				removeArrowOnDeviceType={['tablet', 'mobile']}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
			>
				<div className={classes.galleryItem}>
					<img className={classes.galleryItem} src={pic} alt="facebook" />
				</div>
				<div className={classes.galleryItem}>
					<img className={classes.galleryItem} src={pic1} alt="facebook" />
				</div>
				<div className={classes.galleryItem}>
					<img className={classes.galleryItem} src={pic} alt="facebook" />
				</div>
				<div className={classes.galleryItem}>
					<img className={classes.galleryItem} src={pic1} alt="facebook" />
				</div>
				<div className={classes.galleryItem}>
					<img className={classes.galleryItem} src={pic} alt="facebook" />
				</div>
				<div className={classes.galleryItem}>
					<img className={classes.galleryItem} src={pic1} alt="facebook" />
				</div>
				<div className={classes.galleryItem}>
					<img className={classes.galleryItem} src={pic} alt="facebook" />
				</div>
			</Carousel>
		</div>
	);
};

export default ServiceSection;
