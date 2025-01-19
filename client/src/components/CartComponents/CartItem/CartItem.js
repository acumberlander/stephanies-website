import React from 'react';
import { Typography, Button, Container } from '@mui/material';
import { updateCartQty } from '../../../actions/cart';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import './CartItem.scss';

const CartItem = ({ item }) => {
	const dispatch = useDispatch();

	return (
		<Container className="cart-item-container">
			<div className="image-and-description">
				<Link className="shop-link" to={`/product/${item.product_id}`}>
					<img src={item.media.source} alt="hoodie" className="media" />
				</Link>
				<div>
					<Link className="shop-link" to={`/product/${item.product_id}`}>
						<Typography variant="h6" className="cart-product-name">
							{item.name}
						</Typography>
					</Link>
					{item.selected_options[0] && (
						<Typography>{`Size: ${item.selected_options[0].option_name}`}</Typography>
					)}
					<div className="buttons">
						<Button
							type="button"
							size="small"
							// onClick={() =>
							// 	dispatch(updateCartQty(item.id, item.quantity - 1))
							// }
						>
							-
						</Button>
						<Typography>{item.quantity}</Typography>
						<Button
							type="button"
							size="small"
							// onClick={() =>
							// 	dispatch(updateCartQty(item.id, item.quantity + 1))
							// }
						>
							+
						</Button>
					</div>
				</div>
			</div>
			<div className="price-and-remove">
				{/* TODO need to apply logic to account for dynamic change amount (money) */}
				<Typography>{`$${item.price.raw * item.quantity}.00`}</Typography>
				<Button
					type="button"
					color="secondary"
					// onClick={() =>
					// 	dispatch(updateCartQty(item.id, item.quantity - item.quantity))
					// }
				>
					X
				</Button>
			</div>
		</Container>
	);
};

export default CartItem;
