import React from 'react';
import { Container, Grow, Grid, Card, Typography } from '@material-ui/core';
import Product from '../Products/Product/Product.jsx';
import './Shop.scss';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	header: {
		textAlign: 'center',
		margin: '70px 0',
	},
}));

const Shop = () => {
	const { header } = useStyles();

	return (
		<Container>
			<Typography className={header}>
				<h1>All Products</h1>
			</Typography>
			<Product />
		</Container>
	);
};

export default Shop;
