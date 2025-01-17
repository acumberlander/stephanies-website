import React from 'react';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import './HomeCard.scss';
// import { useStyles } from './homeCardStyles';

const HomeCard = ({ image, category, style, page, topText, bottomText }) => {
	// const classes = useStyles();

	return (
		<Grid
			className="home-card-grid-container"
			size={{ 
				xs: 12,
				sm: 12,
				md: 6,
				lg: 4,
				xl: 4, 
			}}
		>
			<Link className="option-image-container" to={`/shop/${page}`}>
				<div className="overlay" />
				{category ? (
					<h1 className="option-header">{category}</h1>
				) : (
					<div style={{ position: 'absolute', textAlign: 'center' }}>
						<h1
							style={{ position: 'relative' }}
							className="option-header"
						>
							{topText}
						</h1>
						<h1
							style={{ position: 'relative' }}
							className="option-header"
						>
							{bottomText}
						</h1>
					</div>
				)}
				<img
					style={style}
					className="option-images"
					alt=""
					src={image}
				/>
			</Link>
		</Grid>
	);
};

export default HomeCard;
