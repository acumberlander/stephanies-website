import React from 'react';
import { Typography, Button, Container } from '@material-ui/core';
import hoodie from '../../../assets/sexes-hoodie.jpg';

import useStyles from './cartItemStyles';

const CartItem = ({ item, onUpdateCartQty, onRemoveFromCart }) => {
	const classes = useStyles();

	return (
		<Container className={classes.container}>
			<div className={classes.imageAndDescription}>
				<img
					// image={item.media.source}
					src={hoodie}
					alt="hoodie"
					// alt={item.name}
					className={classes.media}
				/>
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
							onClick={() => onUpdateCartQty(item.id, item.quantity - 1)}
						>
							-
						</Button>
						<Typography>{item.quantity}</Typography>
						<Button
							type="button"
							size="small"
							onClick={() => onUpdateCartQty(item.id, item.quantity + 1)}
						>
							+
						</Button>
					</div>
				</div>
			</div>
			<div className={classes.priceAndRemove}>
				<Typography>$190.00</Typography>
				<Button
					type="button"
					color="secondary"
					// onClick={() => onRemoveFromCart(item.id)}
				>
					X
				</Button>
			</div>
		</Container>
	);
};

export default CartItem;
