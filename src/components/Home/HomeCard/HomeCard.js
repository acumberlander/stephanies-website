import React from 'react';
import steph from '../../../assets/steph-1.jpg';
import { Grid } from '@material-ui/core';

import { useStyles } from './homeCardStyles';

const HomeCard = ({ spacing }) => {
	const classes = useStyles();

	return (
		<Grid spacing={spacing} item xs={12} sm={6} md={4} lg={3} xl={3}>
			<div className={classes.optionImageContainer}>
				<h2 className={classes.optionHeader}>Text</h2>
				<img className={classes.optionImages} alt="" src={steph} />
			</div>
		</Grid>
	);
};

export default HomeCard;
