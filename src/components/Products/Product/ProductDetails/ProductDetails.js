import React, { useEffect, useState } from 'react';
import { useStyles } from './productDetailsStyles';
import {
	Container,
	Grid,
	Select,
	Typography,
	MenuItem,
	Input,
	Button,
	Accordion,
	AccordionSummary,
	AccordionDetails,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import hoodie from '../../../../assets/sexes-hoodie.jpg';
import PinterestIcon from '@material-ui/icons/Pinterest';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';

const ProductDetails = () => {
	const [age, setAge] = useState('');
	const classes = useStyles();

	useEffect(() => {});

	const productImages = [1, 2];

	const handleChange = (event) => {
		setAge(event.target.value);
	};

	return (
		<Container className={classes.container}>
			<div className={classes.contentContainer}>
				{/* <span className={classes.navbar}>
					<Typography>Home/Shop/Lulo</Typography>
					<Typography>Prev | Next</Typography>
				</span> */}
				<div className={classes.productAndDetails}>
					<div className={classes.leftSection}>
						<img className={classes.productImage} src={hoodie} alt="hoodie" />
						<div style={{ display: 'flex', margin: '10px 0' }}>
							{productImages.map((option) => (
								<div>
									<img
										style={{
											height: '50px',
											width: '40px',
											margin: '10px',
											cursor: 'pointer',
										}}
										src={hoodie}
										alt="hoodie"
									/>
								</div>
							))}
						</div>
						<Typography>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusamus
							libero aliquid ab necessitatibus quo mollitia fugiat, tempora eos,
							assumenda consectetur, excepturi voluptas. Nulla exercitationem
							incidunt earum accusantium magnam atque harum.
						</Typography>
					</div>
					<div className={classes.rightSection}>
						<Typography className={classes.productName} variant="h5">
							Product
						</Typography>
						<Typography className={classes.priceText}>$109.00</Typography>
						<Typography>Color: Default</Typography>
						<Typography>Size</Typography>
						<Select
							className={classes.sizeSelection}
							placeholder="Select"
							value={age}
							onChange={handleChange}
						>
							<MenuItem value={'small'}>Small</MenuItem>
							<MenuItem value={'medium'}>Medium</MenuItem>
							<MenuItem value={'large'}>Large</MenuItem>
						</Select>
						<Typography>Quantity</Typography>
						<Input className={classes.quantityInput} placeholder="1" />
						<br />
						<Button
							variant="contained"
							className={classes.button}
							color="primary"
						>
							Add To Cart
						</Button>
						<div className={classes.accordionContainer}>
							<Accordion className={classes.accordion}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>
										Product Info
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Suspendisse malesuada lacus ex, sit amet blandit leo
										lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion className={classes.accordion}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>
										Return & Refund Policy
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Suspendisse malesuada lacus ex, sit amet blandit leo
										lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion className={classes.accordion}>
								<AccordionSummary
									expandIcon={<ExpandMoreIcon />}
									aria-controls="panel1a-content"
									id="panel1a-header"
								>
									<Typography className={classes.heading}>
										Shipping Info
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography>
										Lorem ipsum dolor sit amet, consectetur adipiscing elit.
										Suspendisse malesuada lacus ex, sit amet blandit leo
										lobortis eget.
									</Typography>
								</AccordionDetails>
							</Accordion>
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
