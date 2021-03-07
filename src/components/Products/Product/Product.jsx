import React from 'react';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { AddShoppingCart } from '@material-ui/icons';
import steph from '../../../assets/steph-1.jpg';
import steph2 from '../../../assets/steph-2.jpg';

import useStyles from './productStyles';
import './Product.scss';

const Product = ({ product, onAddToCart }) => {
	const classes = useStyles();

	return (
		<Link to={`/product/${product.id}`} className="product-container">
			<div className="image-container">
				<span className="quick-view-div">
					<Typography>Quick View</Typography>
				</span>
				<img className="product-image" alt="" src={product.assets[0].url} />
				<img
					className="product-image-overlay"
					alt=""
					src={product.assets[1].url}
				/>
			</div>
			<div className="card-content">
				<Typography variant="h6" className="product-name">
					{product.name}
				</Typography>
				<Typography className="hyphen">
					<hr className="line-break" />
				</Typography>
				<Typography variant="h6" className="price">
					{product.price.formatted_with_symbol}
				</Typography>
			</div>
		</Link>
	);
};

export default Product;
