import React from 'react';
import './Footer.scss';
import instaIcon from '../../assets/instagram.png';
import facebookIcon from '../../assets/facebook.png';

const Footer = () => {
	return (
		<div className="footer-container">
			<div className="program-and-involved">
				<div className="programs">
					<p className="footer-header">Programs</p>
					<a className="footer-links" href="web-development">
						<p>Web Development</p>
					</a>
					<a className="footer-links" href="data-analytics">
						<p>Data Analytics</p>
					</a>
					<a className="footer-links" href="cyber-security">
						<p>Cyber Security</p>
					</a>
				</div>
				<div className="get-involved">
					<p className="footer-header">Get Involved</p>
					<a className="footer-links" href="pivot-partners">
						<p>Pivot Partners</p>
					</a>
					<a className="footer-links" href="mentor-program">
						<p>Mentor Program</p>
					</a>
				</div>
			</div>
			<div className="community">
				<p className="footer-header">Community</p>
				<a href="pivot-team">
					<p>Our Team</p>
				</a>
				<a href="pivot-graduates">
					<p>Alumni</p>
				</a>
			</div>
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
		</div>
	);
};

export default Footer;
