import React from 'react';
import { CircularProgress, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './productStyles';
import './Product.scss';

const Product = ({ product }) => {
	const classes = useStyles();

	return (
		<Link to={`/product/${product.id}`} className="product-container">
			<div className="image-container">
				<span className="quick-view-div">
					<Typography>Quick View</Typography>
				</span>

				{!product ? (
					<CircularProgress />
				) : (
					<>
						<img className="product-image" alt="" src={product.assets[0].url} />
						<img
							className="product-image-overlay"
							alt=""
							src={product.assets[1].url}
						/>
					</>
				)}
			</div>
			<div className="card-content">
				<Typography variant="h6" className="product-name">
					{product.name}
				</Typography>
				<div className="hyphen">
					<hr className="line-break" />
				</div>
				<Typography variant="h6" className="price">
					{product.price.formatted_with_symbol}
				</Typography>
			</div>
		</Link>
	);
};

export default Product;
