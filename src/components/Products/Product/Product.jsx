import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './productStyles';

const Product = ({ product }) => {
	const classes = useStyles();

	const productClass = !product.assets[1]
		? classes.onlyOneProductImage
		: classes.productImage;

	return (
		<div className={classes.productContainer}>
			<div>
				{/* <span className="quick-view-div">
					<Typography>Quick View</Typography>
				</span> */}
				{!product ? (
					<CircularProgress />
				) : (
					<Link to={`/product/${product.id}`}>
						<img className={productClass} alt="" src={product.assets[0].url} />
						{product.assets[1] && (
							<img
								className={classes.productImageOverlay}
								alt=""
								src={product.assets[1].url}
							/>
						)}
					</Link>
				)}
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
	// return (
	// 	<Link to={`/product/${product.id}`} className="product-container">
	// 		<div className="image-container">
	// 			<span className="quick-view-div">
	// 				<Typography>Quick View</Typography>
	// 			</span>
	// 			{!product ? (
	// 				<CircularProgress />
	// 			) : (
	// 				<>
	// 					<img className="product-image" alt="" src={product.assets[0].url} />
	// 					<img
	// 						className="product-image-overlay"
	// 						alt=""
	// 						src={product.assets[1].url}
	// 					/>
	// 				</>
	// 			)}
	// 		</div>
	// 		<div className="card-content">
	// 			<Typography variant="h6" className="product-name">
	// 				{product.name}
	// 			</Typography>
	// 			<div className="hyphen">
	// 				<hr className="line-break" />
	// 			</div>
	// 			<Typography variant="h6" className="price">
	// 				{product.price.formatted_with_symbol}
	// 			</Typography>
	// 		</div>
	// 	</Link>
	// );
};

export default Product;
