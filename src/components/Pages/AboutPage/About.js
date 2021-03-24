import React from 'react';
import { useStyles } from './aboutStyles';
import steph from '../../../assets/tutu-1.jpeg';
import { Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';

const About = () => {
	const classes = useStyles();

	if (window.scrollY !== 0) {
		window.scrollTo(0, 0);
	}

	return (
		<div className={classes.aboutContainer}>
			<div className={classes.imageAndTextContainer}>
				<Typography variant="h2" className={classes.aboutHeader}>
					About Us
				</Typography>
				<div className={classes.imageContainer}>
					<img
						className={classes.ownerImage}
						src={steph}
						alt="Stephanie Wilbourn"
					/>
				</div>
				<div className={classes.textBorder}>
					<Typography className={classes.aboutText}>
						Stephanie Wilbourn, a transcendent of a legacy of fashion designers
						and seamstresses, helms from Jackson, TN. This renowned legacy
						consisted of seven girls and their mother, who started the world
						prominent Wilbourn’s Sewing and Alterations in the early 1970s. From
						early childhood, Stephanie was a great artist and visionary. This
						talent and foresight has allowed her to be the recipient of several
						art scholarships, awards and recognitions. After high school,
						Stephanie attended Tuskegee University and majored in fashion design
						where she designed several lines of clothing for both sexes. In
						1991, she left Tuskegee University and moved to Atlanta, Georgia to
						help two of her aunts with their family business, Wilbourn Exclusive
						Designs. In 1995, Stephanie migrated back to her hometown, Jackson,
						Tennessee, to pursue a career in the hair industry. In April of
						1996, she independently opened her first salon Caché The Cutting
						Edge.
					</Typography>
					<Typography className={classes.aboutText}>
						In 2006 Stephanie birthed her first clothing brand SexesByStephanie
						a unisex clothing brand which protrayed her passion for hair, art
						and designing all into one. In 2015, SexesByStephanie launched its
						first fashion showcase exhibiting custom handmade pieces. In
						November of 2018, Stephanie manifested her latest and most lucrative
						creation, Adam’s Apple Ascots custom one of a kind handcrafted
						Brooch Tie Pins; a very unique, distinctive original combination of
						a bow tie, necktie, scarf, and ascot all in one. This latest
						creation was created from the soul and the love of diversity,
						uniqueness, boldness, style, flare & elegance for the nonconformist
						individuals who are very in tuned with their own unique style of
						fashion! Stephanie Wilbourn is not just a visionary, design, model,
						writer, artist, hair and clothing stylist, but also a creator of all
						her deep-rooted passions and desires!
					</Typography>
					<Typography variant="h5" className={classes.adamsSlogan}>
						All Designs Are My Soul!
					</Typography>
				</div>
			</div>
			<Link className={classes.shopLink} to="/shop/all-products">
				<h1 className={classes.linkText}>See Our Collection</h1>
			</Link>
		</div>
	);
};

export default About;
