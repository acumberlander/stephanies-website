import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Typography,
	Toolbar,
	Button,
	Badge,
	IconButton,
} from '@material-ui/core';
import MobileView from './Views/MobileView';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navbarStyles';

const MyNavbar = () => {
	const { header, logo, logoLink, menuButton, toolbar, cartIcon } = useStyles();

	const [mobileView, setMobileView] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);

	useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 900
				? setMobileView(true)
				: setMobileView(false);
		};

		setResponsiveness();

		window.addEventListener('resize', () => setResponsiveness());
	}, []);

	const stephaniesLogo = (
		<RouterLink className={logoLink} to="/">
			<Typography variant="h6" component="h1" className={logo}>
				Sexes
			</Typography>
		</RouterLink>
	);

	return (
		<div className={header}>
			<AppBar>
				{mobileView ? (
					<MobileView
						stephaniesLogo={stephaniesLogo}
						setDrawerOpen={setDrawerOpen}
						drawerOpen={drawerOpen}
					/>
				) : (
					<Toolbar className={toolbar}>
						{stephaniesLogo}
						<div>
							<Button
								key="Home"
								color="inherit"
								to="/"
								component={RouterLink}
								className={menuButton}
							>
								Home
							</Button>
							<Button
								key="Shop"
								color="inherit"
								to="/shop"
								component={RouterLink}
								className={menuButton}
							>
								Shop
							</Button>
							<IconButton
								component={RouterLink}
								to="/cart"
								aria-label="Show cart items"
								color="inherit"
							>
								<Badge badgeContent={1} color="secondary">
									<ShoppingCart className={cartIcon} />
								</Badge>
							</IconButton>
						</div>
					</Toolbar>
				)}
			</AppBar>
		</div>
	);
};

export default MyNavbar;
