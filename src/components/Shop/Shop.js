import React from 'react';
import { Container, Grow, Grid, Card } from '@material-ui/core';
import Product from '../Products/Product/Product.jsx';
import './Shop.scss';

const Shop = () => {
	return (
		<Container>
			<Product />
		</Container>
	);
};

export default Shop;
