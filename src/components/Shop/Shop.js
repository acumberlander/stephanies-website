import React from 'react';
import Grid from '@material-ui/core/Grid';
import { Container, Typography, Fade } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { useStyles } from './shopStyles.js';
import Product from '../Products/Product/Product.jsx';

export default function Shop() {
	const classes = useStyles();
	const products = useSelector((state) => state.products);

	return (
		<>
			{/* Header unit */}
			<div className={classes.shopHeader}>
				<Container maxWidth="sm">
					<Typography
						variant="h3"
						align="center"
						color="textPrimary"
						className={classes.header}
						gutterBottom
					>
						All Products
					</Typography>
				</Container>
			</div>
			{/* End header unit */}
			<Container className={classes.cardGrid} maxWidth="xl">
				<Grid container spacing={6}>
					{products.map((product) => (
						<>
							<Fade
								key={product.id}
								in={product !== null}
								style={{ transformOrigin: '0 0 0' }}
								{...(product !== null ? { timeout: 1500 } : {})}
							>
								<Grid
									className={classes.gridItem}
									item
									xs={12}
									sm={6}
									md={4}
									lg={4}
									xl={3}
								>
									<Product product={product} className={classes.card} />
								</Grid>
							</Fade>
						</>
					))}
				</Grid>
			</Container>
		</>
	);
}
