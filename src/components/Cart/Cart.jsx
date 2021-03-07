import React from 'react';
import { Container, Typography, Button, Grid } from '@material-ui/core';
import { Link } from 'react-router-dom';

import useStyles from './cartStyles';
import CartItem from './CartItem/CartItem';

const Cart = ({
	cart,
	handleUpdateCartQty,
	handleRemoveFromCart,
	handleEmptyCart,
}) => {
	const classes = useStyles();

	// const testItems = [1, 2];

	// let uniqueItems = [...new Set(cart)];

	const EmptyCart = () => (
		<div className={classes.emptyCartContainer}>
			<Typography variant="subtitle1">
				You have no items in your shopping cart,{' '}
				<Link to="/" className={classes.link}>
					start adding some
				</Link>
				!
			</Typography>
		</div>
	);

	const FilledCart = () => (
		<div className={classes.cartItemsContainer}>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h6">
				My Cart
			</Typography>
			<hr />
			<div>
				{cart.line_items.map((item) => (
					<CartItem
						key={item.id}
						item={item}
						onUpdateCartQty={handleUpdateCartQty}
						onRemoveFromCart={handleRemoveFromCart}
					/>
				))}
			</div>
			<div className={classes.emptyButtonContainer}>
				<Button
					className={classes.emptyButton}
					size="large"
					type="button"
					variant="contained"
					color="secondary"
					onClick={handleEmptyCart}
				>
					Empty Cart
				</Button>
			</div>
		</div>
	);

	const OrderSummary = () => (
		<div className={classes.orderSummaryContainer}>
			<div className={classes.toolbar} />
			<Typography className={classes.title} variant="h6">
				Order Summary
			</Typography>
			<hr />
			<div className={classes.subtotalContainer}>
				<Typography>Subtotal</Typography>
				<Typography>$500.00</Typography>
			</div>
			<Typography>Estimate Shipping</Typography>
			<hr />
			<div className={classes.totalContainer}>
				<Typography>Total</Typography>
				<Typography>$500.00</Typography>
			</div>
			<div className={classes.checkoutButtonContainer}>
				<Button
					component={Link}
					to="/checkout"
					className={classes.checkoutButton}
					size="large"
					type="button"
					variant="contained"
					color="primary"
				>
					Checkout
				</Button>
			</div>
		</div>
	);

	if (!cart.line_items) return 'Loading...';

	return (
		<Container className={classes.cartContainer}>
			{!cart.line_items.length ? (
				<EmptyCart />
			) : (
				<>
					<FilledCart />
					<OrderSummary />
				</>
			)}
		</Container>
	);
};

export default Cart;
