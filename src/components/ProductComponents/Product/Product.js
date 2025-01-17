import React, { useState } from 'react';
import { CircularProgress, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

// import useStyles from './productStyles';

const Product = ({ product }) => {
	// const classes = useStyles();
	const [imageLoaded, setimageLoaded] = useState(false);

	const setPicture = () => {
		setimageLoaded(true);
	};

	const loadingClass =
		imageLoaded === false ? "loading-spinner-container" : "hidden";

	let productClass;
	let overlayImageClass;

	if (imageLoaded === false) {
		productClass = "hidden";
		overlayImageClass = "hidden";
	} else {
		productClass = !product.assets[1]
			? "only-one-product-image"
			: "product-image";
		overlayImageClass = "product-image-overlay";
	}

	return (
		<div className="product-container">
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
			<Link to={`/product/${product.id}`} className="card-content">
				<Typography variant="h6" className="product-name">
					{product.name}
				</Typography>
				<div className="hyphen">
					<hr className="line-break" />
				</div>
				<Typography variant="h6" className="price">
					{product.price.formatted_with_symbol}
				</Typography>
			</Link>
		</div>
	);
};

export default Product;
