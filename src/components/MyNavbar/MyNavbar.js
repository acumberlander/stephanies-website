import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Typography,
	Toolbar,
	Button,
	Badge,
	IconButton,
} from '@material-ui/core';
import { useSelector } from 'react-redux';
import MobileView from './Views/MobileView';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import useStyles from './navbarStyles';

const MyNavbar = () => {
	const {
		navContainer,
		logo,
		logoLink,
		menuButton,
		toolbar,
		cartIcon,
		navButton,
	} = useStyles();
	const totalItems = useSelector((state) => state.cart.total_items);
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
	}, [totalItems]);

	const stephaniesLogo = (
		<RouterLink className={logoLink} to="/">
			<Typography variant="h6" component="h1" className={logo}>
				Sexes
			</Typography>
		</RouterLink>
	);

	return (
		<div className={navContainer}>
			<AppBar>
				{mobileView ? (
					<MobileView
						stephaniesLogo={stephaniesLogo}
						setDrawerOpen={setDrawerOpen}
						drawerOpen={drawerOpen}
						totalItems={totalItems}
					/>
				) : (
					<Toolbar className={toolbar}>
						{stephaniesLogo}
						<span>
							<Button
								key="Home"
								color="inherit"
								to="/"
								component={RouterLink}
								className={navButton}
							>
								Home
							</Button>
							<Button
								key="Shop"
								color="inherit"
								to="/shop"
								component={RouterLink}
								className={navButton}
							>
								Shop
							</Button>
						</span>

						<IconButton
							component={RouterLink}
							to="/cart"
							aria-label="Show cart items"
							color="inherit"
						>
							<Badge badgeContent={totalItems} color="secondary">
								<ShoppingCart className={cartIcon} />
							</Badge>
						</IconButton>
					</Toolbar>
				)}
			</AppBar>
		</div>
	);
};

export default MyNavbar;
