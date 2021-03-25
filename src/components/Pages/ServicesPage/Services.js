import React from 'react';
import { useStyles } from './servicesStyles';
import ServiceSection from '../../ServicesComponents/ServiceSection/ServiceSection';
import { Typography } from '@material-ui/core';
import {
	serviceImagesObject,
	ascotsTextObject,
	eventsTextObject,
	makeupTextObject,
} from '../../ServicesComponents/serviceImages/serviceImages';
import 'react-multi-carousel/lib/styles.css';

const {
	ascotsImage,
	eventsImage,
	hairAndMakeupImage,
	ascotsGallery,
	eventsGallery,
	hairAndMakeupGallery,
} = serviceImagesObject;

const Services = () => {
	const classes = useStyles();
	return (
		<div className={classes.container}>
			<Typography variant="h2" className={classes.pageHeader}>
				Services
			</Typography>
			<ServiceSection
				serviceImage={ascotsImage}
				serviceHeader="Adams Apple Ascots"
				paragraph1={ascotsTextObject.paragraph1}
				paragraph2={ascotsTextObject.paragraph2}
				paragraph3={ascotsTextObject.paragraph3}
				gallery={eventsGallery}
			/>
			<ServiceSection
				serviceImage={eventsImage}
				serviceHeader="Event Rentals"
				paragraph1={eventsTextObject.paragraph1}
				paragraph2={eventsTextObject.paragraph2}
				paragraph3={eventsTextObject.paragraph3}
				serviceImageStyle={{
					width: '660px',
					position: 'relative',
					right: '40%',
				}}
				gallery={eventsGallery}
				picFirst={false}
			/>
			<ServiceSection
				serviceImage={hairAndMakeupImage}
				serviceHeader="Hair and Makeup"
				paragraph1={ascotsTextObject.paragraph1}
				paragraph2={ascotsTextObject.paragraph2}
				paragraph3={ascotsTextObject.paragraph3}
				serviceImageStyle={{
					width: '660px',
					position: 'relative',
					right: '40%',
				}}
				gallery={hairAndMakeupGallery}
			/>
		</div>
	);
};

export default Services;
