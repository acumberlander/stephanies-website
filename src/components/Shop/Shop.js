// import React from 'react';
// import { Container, Grow, Grid, Card, Typography } from '@material-ui/core';
// import Product from '../Products/Product/Product.jsx';
// import './Shop.scss';
// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
// 	header: {
// 		textAlign: 'center',
// 		margin: '70px 0',
// 	},
// }));

// const Shop = () => {
// 	const { header } = useStyles();

// 	return (
// 		<Container>
// 			<Typography className={header}>
// 				<h1>All Products</h1>
// 			</Typography>
// 			<Product />
// 		</Container>
// 	);
// };

// export default Shop;

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { useStyles } from './shopStyles.js';
import Product from '../Products/Product/Product.jsx';

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Shop() {
	const classes = useStyles();

	return (
		<>
			{/* Header unit */}
			<div className={classes.shopHeader}>
				<Container maxWidth="sm">
					<Typography
						variant="h2"
						align="center"
						color="textPrimary"
						gutterBottom
					>
						All Products
					</Typography>
				</Container>
			</div>
			{/* End header unit */}
			<Container className={classes.cardGrid} maxWidth="xl">
				<Grid container spacing={6}>
					{cards.map((card) => (
						<Grid
							className={classes.gridItem}
							item
							key={card}
							xs={12}
							sm={6}
							md={4}
						>
							<Product className={classes.card} />
						</Grid>
					))}
				</Grid>
			</Container>
		</>
	);
}
