import React from 'react';
import { Typography, Button, Container } from '@material-ui/core';
import hoodie from '../../../assets/sexes-hoodie.jpg';
import { updateCartQty } from '../../../actions/cart';
import { useDispatch } from 'react-redux';

import useStyles from './cartItemStyles';

const CartItem = ({ item }) => {
	const dispatch = useDispatch();
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<div className={classes.imageAndDescription}>
				<img src={hoodie} alt="hoodie" className={classes.media} />
				{/* <Typography variant="h4">{item.name}</Typography> */}
				<div>
					<Typography variant="h6" className={classes.productName}>
						Item Name
					</Typography>
					<Typography>Color: Default</Typography>
					<Typography>Size: Medium</Typography>
					<div className={classes.buttons}>
						<Button
							type="button"
							size="small"
							onClick={() =>
								dispatch(updateCartQty(item.id, item.quantity - 1))
							}
						>
							-
						</Button>
						<Typography>{item.quantity}</Typography>
						<Button
							type="button"
							size="small"
							onClick={() =>
								dispatch(updateCartQty(item.id, item.quantity + 1))
							}
						>
							+
						</Button>
					</div>
				</div>
			</div>
			<div className={classes.priceAndRemove}>
				{/* TODO need to apply logic to account for dynamic change amount (money) */}
				<Typography>{`$${item.price.raw * item.quantity}.00`}</Typography>
				<Button
					type="button"
					color="secondary"
					onClick={() =>
						dispatch(updateCartQty(item.id, item.quantity - item.quantity))
					}
				>
					X
				</Button>
			</div>
		</Container>
	);
};

export default CartItem;
