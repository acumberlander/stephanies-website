import React from 'react';
import { Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import { useStyles } from './homeCardStyles';

const HomeCard = ({ image, category, style, page, topText, bottomText }) => {
	const classes = useStyles();

	return (
		<Grid
			className={classes.gridContainer}
			item
			xs={12}
			sm={12}
			md={6}
			lg={3}
			xl={3}
		>
			<Link className={classes.optionImageContainer} to={`/shop/${page}`}>
				<div className={classes.overlay} />
				{category ? (
					<h1 className={classes.optionHeader}>{category}</h1>
				) : (
					<div style={{ position: 'absolute', textAlign: 'center' }}>
						<h1
							style={{ position: 'relative' }}
							className={classes.optionHeader}
						>
							{topText}
						</h1>
						<h1
							style={{ position: 'relative' }}
							className={classes.optionHeader}
						>
							{bottomText}
						</h1>
					</div>
				)}
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
