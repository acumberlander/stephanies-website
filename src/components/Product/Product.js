import React, { useState } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './productStyles';

const Product = ({ product }) => {
	const classes = useStyles();
	const [imageLoaded, setimageLoaded] = useState(false);

	const setPicture = () => {
		setimageLoaded(true);
	};

	const loadingClass =
		imageLoaded === false ? classes.loadingSpinnerContainer : classes.hidden;

	let productClass;
	let overlayImageClass;

	if (imageLoaded === false) {
		productClass = classes.hidden;
		overlayImageClass = classes.hidden;
	} else {
		productClass = !product.assets[1]
			? classes.onlyOneProductImage
			: classes.productImage;
		overlayImageClass = classes.productImageOverlay;
	}

	return (
		<div className={classes.productContainer}>
			<div>
				<Link to={`/product/${product.id}`}>
					<div className={loadingClass}>
						<CircularProgress size={80} />
					</div>
					<img
						onLoad={setPicture}
						className={productClass}
						alt=""
						src={product.assets[0].url}
					/>
					{product.assets[1] && (
						<img
							className={overlayImageClass}
							alt=""
							src={product.assets[1].url}
						/>
					)}
				</Link>
			</div>
			<Link to={`/product/${product.id}`} className={classes.cardContent}>
				<Typography variant="h6" className={classes.productName}>
					{product.name}
				</Typography>
				<div className={classes.hyphen}>
					<hr className={classes.lineBreak} />
				</div>
				<Typography variant="h6" className={classes.price}>
					{product.price.formatted_with_symbol}
				</Typography>
			</Link>
		</div>
	);
};

export default Product;
