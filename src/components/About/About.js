import React from 'react';
import { useStyles } from './aboutStyles';

const About = () => {
	const classes = useStyles();
	return (
		<div className={classes.aboutContainer}>
			<h1>About Page</h1>
		</div>
	);
};

export default About;
