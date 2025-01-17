import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import commerce from '../../lib/commerce';
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
} from '@mui/material';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../actions/cart';
import PinterestIcon from '@mui/icons-material/Pinterest';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import productModel from '../../Models/Product';
import ProductDetailsDropdowns from '../../components/ProductComponents/ProductDetailsDropdowns/ProductDetailsDropdowns';
import './ProductDetails.scss';

const ProductDetails = () => {
	const [size, setSize] = useState('Choose a size');
	const [hasError, setHasError] = useState(false);
	const [product, setProduct] = useState(productModel);
	const [quantity, setQuantity] = useState(1);
	const [displayedProduct, setDisplayedProduct] = useState('');
	const dispatch = useDispatch();

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
		<Container className="container">
			<div className="content-container">
				<div className="product-and-details">
					{/* Left Section */}
					<div className="left-section">
						<Typography className="product-name" variant="h5">
							{product.name}
						</Typography>
						<div className="display-container">
							{!displayedProduct ? (
								<CircularProgress size={80} />
							) : (
								<Fade
									in={displayedProduct !== null}
									style={{ transformOrigin: '0 0 0' }}
									{...(displayedProduct !== null ? { timeout: 1000 } : {})}
								>
									<img
										className="product-image"
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
									className="thumbnail-container"
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

						<Typography className="product-details-text">
							{product.name}
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
						</Typography>
					</div>
					{/* Right Section */}
					<div className="right-section">
						<Typography className="price-header">
							{product.price.formatted_with_symbol}
						</Typography>
						{/* {
							<Typography className="color-header">
							Color: Default
						</Typography>
						} */}
						{sizeOptions && (
							<>
								<Typography className="size-header">Size</Typography>
								<FormControl required error={hasError}>
									<Select
										className="size-selection"
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

						<Typography className="quantity-header">Quantity</Typography>

						<div className="quantity-container">
							<Button
								className="quantity-button"
								onClick={() => setQuantity(quantity - 1)}
							>
								-
							</Button>
							<Typography>{quantity}</Typography>
							<Button
								className="quantity-button"
								onClick={() => setQuantity(quantity + 1)}
							>
								+
							</Button>
						</div>
						<br />

						<Button
							variant="contained"
							className="button"
							onClick={handleAddToCart}
						>
							Add To Cart
						</Button>

						<div className="accordion-container">
							<ProductDetailsDropdowns />
						</div>

						<div className="social-media-group">
							<PinterestIcon className="socialIcon" />
							<FacebookIcon className="socialIcon" />
							<TwitterIcon className="socialIcon" />
						</div>
					</div>
				</div>
			</div>
		</Container>
	);
};

export default ProductDetails;
