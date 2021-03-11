import React from 'react';
import instaIcon from '../../assets/instagram.png';
import facebookIcon from '../../assets/facebook.png';
import { Typography } from '@material-ui/core';
import { useStyles } from './footerStyles';

const Footer = () => {
	const classes = useStyles();

	return (
		<footer className={classes.footerContainer}>
			<div className={classes.socialMedia}>
				<a
					className={classes.footerLink}
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.facebook.com/Sexes-Custom-Brand-149443252511629"
				>
					<img
						className={classes.socialIcon}
						src={facebookIcon}
						alt="facebook"
					/>
				</a>
				<a
					className={classes.footerLink}
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.instagram.com/sexesbystephanie/"
				>
					<img className={classes.socialIcon} src={instaIcon} alt="instagram" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
