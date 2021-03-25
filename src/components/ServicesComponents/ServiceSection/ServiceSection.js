import React from 'react';
import { useStyles, responsive } from './serviceSectionStyles';
import { Typography } from '@material-ui/core';
import facebookIcon from '../../../assets/facebook.png';
import instaIcon from '../../../assets/instagram.png';
import Carousel from 'react-multi-carousel';

const ServiceSection = ({
	serviceImage,
	serviceHeader,
	paragraph1,
	paragraph2,
	paragraph3,
	gallery,
	picFirst = true,
}) => {
	const classes = useStyles();

	const imageFirstClass =
		picFirst === true
			? classes.serviceImageContainer
			: classes.serviceImageHidden;

	const imageSecondClass =
		picFirst === true
			? classes.serviceImageHidden
			: classes.serviceImageContainerLeft;

	return (
		<div className={classes.sectionContainer}>
			<div className={classes.imageAndText}>
				<div className={imageFirstClass}>
					<img className={classes.serviceImage} src={serviceImage} alt="" />
				</div>
				<div className={classes.serviceTextContainer}>
					<Typography className={classes.serviceHeader} variant="h3">
						{serviceHeader}
					</Typography>
					<Typography className={classes.serviceText}>{paragraph1}</Typography>
					<Typography className={classes.serviceText}>{paragraph2}</Typography>
					<Typography className={classes.serviceText}>{paragraph3}</Typography>
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
				<div className={imageSecondClass}>
					<img className={classes.serviceImage} src={serviceImage} alt="" />
				</div>
			</div>
			<Carousel
				swipeable={true}
				draggable={true}
				showDots={true}
				responsive={responsive}
				infinite={true}
				centerMode={true}
				keyBoardControl={true}
				transitionDuration={1000}
				containerClass={classes.carouselContainer}
				arrows
				removeArrowOnDeviceType={['mobile']}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
			>
				{gallery.map((image) => (
					<div className={classes.galleryItem}>
						<img className={classes.galleryItem} src={image} alt="facebook" />
					</div>
				))}
			</Carousel>
		</div>
	);
};

export default ServiceSection;
