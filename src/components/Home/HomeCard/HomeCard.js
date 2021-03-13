import React from 'react';
import steph from '../../../assets/steph-1.jpg';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useStyles } from './homeCardStyles';

const HomeCard = ({ image, category, style, page }) => {
	const classes = useStyles();

	return (
		<Grid
			className={classes.gridContainer}
			item
			xs={12}
			sm={6}
			md={6}
			lg={3}
			xl={3}
		>
			<Link className={classes.optionImageContainer} to={`/shop/${page}`}>
				<div className={classes.overlay} />
				<h1 className={classes.optionHeader}>{category}</h1>
				<img
					style={style}
					className={classes.optionImages}
					alt=""
					src={image}
				/>
			</Link>
		</Grid>
	);
};

export default HomeCard;
