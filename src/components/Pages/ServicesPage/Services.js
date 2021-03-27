import React, { useState } from 'react';
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
// import { storageRef } from '../../../photoData/firebaseConfig';

const {
	ascotsImage,
	eventsImage,
	hairAndMakeupImage,
	ascotsGallery,
	eventsGallery,
	hairAndMakeupGallery,
} = serviceImagesObject;

const Services = () => {
	// const [ascotPics, setAscotPics] = useState([]);
	// const [makeupPics, setMakeupPics] = useState([]);
	// const [eventPics, setEventPics] = useState([]);

	// storageRef
	// 	.child('hair-and-makeup')
	// 	.listAll()
	// 	.then((res) => {
	// 		res.items.forEach((item) => {
	// 			item.getDownloadURL().then((res) => {
	// 				console.log(res);
	// 			});
	// 		});
	// 	});

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
				serviceImageStyle={classes.ascotsStyle}
				gallery={ascotsGallery}
			/>
			<ServiceSection
				serviceImage={eventsImage}
				serviceHeader="Event Rentals"
				paragraph1={eventsTextObject.paragraph1}
				paragraph2={eventsTextObject.paragraph2}
				paragraph3={eventsTextObject.paragraph3}
				serviceImageStyle={classes.hairAndEventsStyle}
				gallery={eventsGallery}
				picFirst={false}
			/>
			<ServiceSection
				serviceImage={hairAndMakeupImage}
				serviceHeader="Hair and Makeup"
				paragraph1={makeupTextObject.paragraph1}
				paragraph2={makeupTextObject.paragraph2}
				paragraph3={makeupTextObject.paragraph3}
				serviceImageStyle={classes.hairAndEventsStyle}
				gallery={hairAndMakeupGallery}
			/>
		</div>
	);
};

export default Services;
