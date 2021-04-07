import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useStyles } from './productDetailsStyles';
import commerce from '../../../lib/commerce';
import {
	Container,
	Select,
	Typography,
	MenuItem,
	FormControl,
	FormHelperText,
	Button,
	CircularProgress,
	Fade,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../../actions/cart';
import PinterestIcon from '@material-ui/icons/Pinterest';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import productModel from '../../../Models/Product';
import ProductDetailsDropdowns from '../../ProductComponents/ProductDetailsDropdowns/ProductDetailsDropdowns';

const ProductDetails = () => {
	const [size, setSize] = useState('Choose a size');
	const [hasError, setHasError] = useState(false);
	const [product, setProduct] = useState(productModel);
	const [quantity, setQuantity] = useState(1);
	const [displayedProduct, setDisplayedProduct] = useState('');
	const dispatch = useDispatch();
	const classes = useStyles();

	let params = useParams();

	const fetchProductById = async (id) => {
		const data = await commerce.products.retrieve(id);

		setProduct(data);
		setDisplayedProduct(data.assets[0].url);
	};

	const handleAddToCart = () => {
		if (product.variant_groups[0]) {
			if (size === 'Choose a size') {
				setHasError(true);
				return;
			}
			const { id } = product.variant_groups[0];
			dispatch(addToCart(product.id, quantity, { [id]: size.id }));
			setHasError(false);
		} else {
			dispatch(addToCart(product.id, quantity));
			setHasError(false);
		}
		setQuantity(1);
		setSize('Choose a size');
	};

	useEffect(() => {
		fetchProductById(params.id);
		if (window.scrollY !== 0) {
			window.scrollTo(0, 0);
		}
	}, [params]);

	const sizeOptions = product.variant_groups[0]
		? [
				<MenuItem value={'Choose a size'} disabled>
					Choose a size
				</MenuItem>,
				...product.variant_groups[0].options.map((option) => (
					<MenuItem key={option.id} value={option}>
						{option.name}
					</MenuItem>
				)),
		  ]
		: null;

	return (
		<Container className={classes.container}>
			<div className={classes.contentContainer}>
				<div className={classes.productAndDetails}>
					{/* Left Section */}
					<div className={classes.leftSection}>
						<Typography className={classes.productName} variant="h5">
							{product.name}
						</Typography>
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
										alt={product.name}
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
											borderRadius: '0.2rem',
										}}
										src={imageObj.url}
										alt="hoodie"
									/>
								</div>
							))}
						</div>

						<Typography className={classes.productDetailsText}>
							{product.name}
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</Typography>
					</div>
					{/* Right Section */}
					<div className={classes.rightSection}>
						<Typography className={classes.priceHeader}>
							{product.price.formatted_with_symbol}
						</Typography>
						{/* {
							<Typography className={classes.colorHeader}>
							Color: Default
						</Typography>
						} */}
						{sizeOptions && (
							<>
								<Typography className={classes.sizeHeader}>Size</Typography>
								<FormControl required error={hasError}>
									<Select
										className={classes.sizeSelection}
										onChange={(e) => setSize(e.target.value)}
										value={size}
									>
										{sizeOptions}
									</Select>
									{hasError && (
										<FormHelperText>Please select a size</FormHelperText>
									)}
								</FormControl>
							</>
						)}

						<Typography className={classes.quantityHeader}>Quantity</Typography>

						<div className={classes.quantityContainer}>
							<Button
								className={classes.quantityButton}
								onClick={() => setQuantity(quantity - 1)}
							>
								-
							</Button>
							<Typography>{quantity}</Typography>
							<Button
								className={classes.quantityButton}
								onClick={() => setQuantity(quantity + 1)}
							>
								+
							</Button>
						</div>
						<br />

						<Button
							variant="contained"
							className={classes.button}
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
