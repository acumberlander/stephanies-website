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
import myLogo from '../../assets/logos/logo-6.jpg';
import useStyles from './navbarStyles';

const MyNavbar = () => {
	const {
		navContainer,
		logo,
		logoLink,
		cartButton,
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
			{/* <Typography variant="h6" component="h1" className={logo}>
				Sexes
			</Typography> */}
			<img style={{ height: 50, width: 50 }} src={myLogo} alt="logo" />
		</RouterLink>
	);

	return (
		<div className={navContainer}>
			<AppBar style={{ backgroundColor: '#cc34ab' }}>
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
								to="/shop/all-products"
								component={RouterLink}
								className={navButton}
							>
								Shop
							</Button>
							<Button
								key="About"
								color="inherit"
								to="/about"
								component={RouterLink}
								className={navButton}
							>
								About
							</Button>
						</span>

						<span>
							<Button
								key="About"
								color="inherit"
								component={RouterLink}
								className={navButton}
							>
								Log In
							</Button>
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
						</span>
					</Toolbar>
				)}
			</AppBar>
		</div>
	);
};

export default MyNavbar;
