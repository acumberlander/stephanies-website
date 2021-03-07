import React from 'react';
import './Footer.scss';
import instaIcon from '../../assets/instagram.png';
import facebookIcon from '../../assets/facebook.png';
import { Typography } from '@material-ui/core';

const Footer = () => {
	return (
		<footer className="footer-container">
			<div className="social-media">
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.facebook.com/pivottechschool/"
				>
					<img className="social-icon" src={facebookIcon} alt="facebook" />
				</a>
				<a
					target="_blank"
					rel="noopener noreferrer"
					href="https://www.instagram.com/pivottechschool/"
				>
					<img className="social-icon" src={instaIcon} alt="instagram" />
				</a>
			</div>
		</footer>
	);
};

export default Footer;
