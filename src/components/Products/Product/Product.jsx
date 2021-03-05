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
			<div className="card-content">
				<Typography variant="h6" className="product-name">
					Text
				</Typography>
				<Typography className="hyphen">
					<hr className="line-break" />
				</Typography>
				<Typography variant="h6" className="price">
					$100.00
				</Typography>
			</div>
		</div>
	);
};

export default Product;
