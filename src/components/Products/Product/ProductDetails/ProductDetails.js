import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStyles } from './productDetailsStyles';
import commerce from '../../../../lib/commerce';
import {
	Container,
	Select,
	Typography,
	MenuItem,
	Input,
	Button,
	CircularProgress,
	Fade,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, fetchCart, updateCartQty } from '../../../../actions/cart';
// import { fetchProductById } from '../../../../actions/products';
import PinterestIcon from '@material-ui/icons/Pinterest';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import productModel from '../../../Models/Product';
import ProductDetailsDropdowns from '../../../ProductDetailsDropdowns/ProductDetailsDropdowns';

const ProductDetails = () => {
	const [size, setSize] = useState('Medium');
	const [product, setProduct] = useState(productModel);
	const [quantity, setQuantity] = useState(1);
	const totalItems = useSelector((state) => state.cart.total_items);
	// const product = useSelector((state) => (state.product = productModel));
	const [displayedProduct, setDisplayedProduct] = useState('');
	const dispatch = useDispatch();
	const classes = useStyles();

	let params = useParams();

	const fetchProductById = async (id) => {
		const data = await commerce.products.retrieve(id);

		console.log(data);

		setProduct(data);
		setDisplayedProduct(data.assets[0].url);
	};

	const handleAddToCart = () => {
		dispatch(addToCart(product.id, quantity));
	};

	useEffect(() => {
		fetchProductById(params.id);
		dispatch(fetchCart());
	}, [params, dispatch]);

	const sizeOptions = product.variant_groups[0].options.map((size) => (
		<MenuItem value={size.name}>{size.name}</MenuItem>
	));

	return (
		<Container className={classes.container}>
			<div className={classes.contentContainer}>
				{/* <span className={classes.navbar}>
					<Typography>Home/Shop/Lulo</Typography>
					<Typography>Prev | Next</Typography>
				</span> */}
				<div className={classes.productAndDetails}>
					{/* Left Section */}
					<div className={classes.leftSection}>
						<div className={classes.displayContainer}>
							{!displayedProduct ? (
								<CircularProgress size={80} />
							) : (
								<Fade
									in={displayedProduct !== null}
									style={{ transformOrigin: '0 0 0' }}
									{...(displayedProduct !== null ? { timeout: 1000 } : {})}
								>
									<img
										className={classes.productImage}
										src={displayedProduct}
										alt="hoodie"
									/>
								</Fade>
							)}
						</div>

						<div style={{ display: 'flex', margin: '10px 0' }}>
							{product.assets.map((imageObj) => (
								<div
									key={imageObj.id}
									onClick={(e) => setDisplayedProduct(e.target.src)}
									className={classes.thumbnailContainer}
								>
									<img
										style={{
											height: '50px',
											width: '40px',
											margin: '10px',
											cursor: 'pointer',
										}}
										src={imageObj.url}
										alt="hoodie"
									/>
								</div>
							))}
						</div>

						<Typography>
							{product.name}
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
							libero aliquid ab necessitatibus quo mollitia fugiat, tempora eos,
							assumenda consectetur, excepturi voluptas. Nulla exercitationem
							incidunt earum accusantium magnam atque harum.
						</Typography>
					</div>
					{/* Right Section */}
					<div className={classes.rightSection}>
						<Typography className={classes.productName} variant="h5">
							{product.name}
						</Typography>
						<Typography className={classes.priceHeader}>
							{product.price.formatted_with_symbol}
						</Typography>
						<Typography className={classes.colorHeader}>
							Color: Default
						</Typography>
						<Typography className={classes.sizeHeader}>Size</Typography>

						<Select
							className={classes.sizeSelection}
							onChange={(e) => setSize(e.target.value)}
							value={size}
						>
							{sizeOptions}
						</Select>

						<Typography className={classes.quantityHeader}>Quantity</Typography>

						<div className={classes.quantityContainer}>
							<Button
								className={classes.quantityButton}
								onClick={() =>
									dispatch(updateCartQty(product.id, quantity - 1))
								}
							>
								-
							</Button>
							<Typography>{quantity}</Typography>
							<Button
								className={classes.quantityButton}
								onClick={() =>
									dispatch(updateCartQty(product.id, quantity + 1))
								}
							>
								+
							</Button>
						</div>
						<br />

						<Button
							variant="contained"
							className={classes.button}
							color="primary"
							onClick={handleAddToCart}
						>
							Add To Cart
						</Button>

						<div className={classes.accordionContainer}>
							<ProductDetailsDropdowns />
						</div>

						<div className={classes.socialMediaGroup}>
							<PinterestIcon className={classes.socialIcon} />
							<FacebookIcon className={classes.socialIcon} />
							<TwitterIcon className={classes.socialIcon} />
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ProductDetails;
