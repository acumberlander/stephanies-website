import React, { useEffect, useState } from 'react';
import { useStyles, responsive } from './serviceSectionStyles';
import { Fade, Typography } from '@mui/material';
import facebookIcon from '../../../assets/socialMedia/facebook.png';
import instaIcon from '../../../assets/socialMedia/instagram.png';
import Carousel from 'react-multi-carousel';
import { storageRef } from '../../../firebaseConfig';

const ServiceSection = ({
	serviceImage,
	serviceHeader,
	paragraph1,
	paragraph2,
	paragraph3,
	galleryType,
	serviceImageStyle,
	picFirst = true,
}) => {
	const [gallery, setGallery] = useState([]);

	useEffect(() => {
		storageRef
			.child(galleryType)
			.list({ maxResults: 15 })
			.then((res) => {
				res.items.forEach((item, index) => {
					item.getDownloadURL().then((res) => {
						setGallery((prev) => [...prev, { id: index, image: res }]);
					});
				});
			});
	}, [galleryType]);

	// const classes = useStyles();

	const imageFirstClass =
		picFirst === true
			? "service-image-container"
			: "service-image-hidden";

	const imageSecondClass =
		picFirst === true
			? "service-image-hidden-2"
			: "service-image-container-left";

	return (
		<div className="section-container">
			<div className="image-and-text">
				<Fade in={true} timeout={1000}>
					<div className={imageFirstClass}>
						<img className={serviceImageStyle} src={serviceImage} alt="" />
					</div>
				</Fade>
				<div className="service-text-container">
					<Typography className="service-header" variant="h3">
						{serviceHeader}
					</Typography>
					<Typography className="service-text">{paragraph1}</Typography>
					<Typography className="service-text">{paragraph2}</Typography>
					<Typography className="service-text">{paragraph3}</Typography>
					<span className="service-text-footer">
						<div className="contact-container">
							<Typography className="contact-text">
								email: sexes2014@gmail.com
							</Typography>
							<Typography className="contact-text">
								phone: (731) 313-3603
							</Typography>
						</div>
						<div className="social-icons">
							<a
								className="social-link"
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.facebook.com/Sexes-Custom-Brand-149443252511629"
							>
								<img
									className="social-icon"
									src={facebookIcon}
									alt="facebook"
								/>
							</a>
							<a
								className="social-link"
								target="_blank"
								rel="noopener noreferrer"
								href="https://www.instagram.com/sexesbystephanie/"
							>
								<img
									className="social-icon"
									src={instaIcon}
									alt="instagram"
								/>
							</a>
						</div>
					</span>
				</div>
				<div className={imageSecondClass}>
					<img className={serviceImageStyle} src={serviceImage} alt="" />
				</div>
			</div>
			{/* <Carousel
				swipeable={true}
				draggable={true}
				showDots={true}
				responsive={responsive}
				infinite={false}
				centerMode={true}
				keyBoardControl={true}
				transitionDuration={1000}
				containerClass="carouselContainer}
				arrows
				removeArrowOnDeviceType={['mobile']}
				dotListClass="custom-dot-list-style"
				itemClass="carousel-item-padding-40-px"
			>
				{gallery.map((item) => (
					<Fade in={true} timeout={1000}>
						<div key={item.id} className="galleryItem}>
							<img
								className="galleryItem}
								src={item.image}
								alt="gallery item"
							/>
						</div>
					</Fade>
				))}
			</Carousel> */}
		</div>
	);
};

export default ServiceSection;
