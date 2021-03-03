import React from 'react';
import { Grid } from '@material-ui/core';

import Product from './Product/Product';
import useStyles from './productsStyles';

// const products = [
// 	{
// 		id: 1,
// 		name: 'Shoes',
// 		description: 'Running shoes.',
// 		price: '$5',
// 		image:
// 			'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
// 	},
// 	{
// 		id: 2,
// 		name: 'Macbook',
// 		description: 'Apple Macbook.',
// 		price: '$10',
// 		image:
// 			'https://www.apple.com/newsroom/images/product/mac/standard/Apple_macbookpro-13-inch_screen_05042020_big.jpg.large.jpg',
// 	},
// ];

const Products = ({ products, onAddToCart }) => {
	const classes = useStyles();

	return (
		<main className={classes.content}>
			<div className={classes.toolbar} />
			<Grid container justify="center" spacing={4}>
				{products.map((product) => (
					<Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
						<Product product={product} onAddToCart={onAddToCart} />
					</Grid>
				))}
			</Grid>
		</main>
	);
};

export default Products;
