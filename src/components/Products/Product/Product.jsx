import React from 'react';
import { Typography } from '@material-ui/core';
import { AddShoppingCart } from '@material-ui/icons';
import steph from '../../../assets/steph-1.jpg';
import steph2 from '../../../assets/steph-2.jpg';

import useStyles from './productStyles';
import './Product.scss';

const Product = ({ product, onAddToCart }) => {
	const classes = useStyles();

	return (
		<div className="product-container">
			<div className="image-container">
				<span className="quick-view-div">
					<Typography>Quick View</Typography>
				</span>
				<img className="product-image" alt="" src={steph} />
				<img className="product-image-overlay" alt="" src={steph2} />
			</div>
			<Typography className="product-name">
				<h2>Text</h2>
			</Typography>
			<Typography className="hyphen">
				<hr className="line-break" />
			</Typography>
			<Typography className="price">
				<h2>$100.00</h2>
			</Typography>
		</div>
	);
};

export default Product;
