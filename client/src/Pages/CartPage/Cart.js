import React from 'react';
import { Container, Typography, Button, Divider } from '@mui/material';
import { Link } from 'react-router-dom';

// import useStyles from './cartStyles';
import CartItem from '../../components/CartComponents/CartItem/CartItem';
import { emptyCart } from '../../actions/cart';
import { useSelector, useDispatch } from 'react-redux';
import './Cart.scss';

const Cart = () => {
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	// const classes = useStyles();

	if (window.scrollY !== 0) {
		window.scrollTo(0, 0);
	}

	const handleEmptyCart = () => {
		// dispatch(emptyCart());
	};

	const EmptyCart = () => (
		<div className="empty-cart-container">
			<Typography className="empty-text">
				You have no items in your shopping cart,{' '}
				<Link to="/shop/all-products" className="link">
					start adding some
				</Link>
				!
			</Typography>
		</div>
	);

	const FilledCart = () => (
		<div className="cart-items-container">
			<div className="toolbar" />
			<Typography className="title" variant="h6">
				My Cart
			</Typography>
			<Divider className="divider" />
			<div>
				{cart.line_items.map((item) => (
					<CartItem key={item.id} item={item} />
				))}
			</div>
			<div className="empty-button-container">
				<Button
					className="empty-button"
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
		<div className="order-summary-container">
			<div className="toolbar" />
			<Typography className="title" variant="h6">
				Order Summary
			</Typography>
			<Divider className="divider" />
			<div className="subtotal-container">
				<Typography>Subtotal</Typography>
				<Typography>{cart.subtotal.formatted_with_symbol}</Typography>
			</div>
			<Typography>Estimate Shipping</Typography>
			<Divider className="divider" />
			<div className="total-container">
				<Typography>Total</Typography>
				{/* TODO Need to add logic that accounts for shipping and other costs/discounts (taxes or discount codes) */}
				<Typography>{cart.subtotal.formatted_with_symbol}</Typography>
			</div>
			<div className="checkout-button-container">
				<Button
					component={Link}
					to="/checkout"
					className="checkout-button"
					size="large"
					type="button"
					variant="contained"
				>
					Checkout
				</Button>
			</div>
		</div>
	);

	if (!cart.line_items) return 'Loading...';

	return (
		<Container className="cart-container">
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
