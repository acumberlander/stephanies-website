import React from 'react';
import {
	Toolbar,
	Badge,
	IconButton,
	Drawer,
	Link,
	MenuItem,
} from '@mui/material';
import { ShoppingCart, Menu } from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';
// import useStyles from '../navbarStyles';

const MobileView = ({
	stephaniesLogo,
	setDrawerOpen,
	drawerOpen,
	totalItems,
}) => {
	const handleDrawerOpen = () => setDrawerOpen(true);
	const handleDrawerClose = () => setDrawerOpen(false);

	const toggleDrawer = () => {
		setDrawerOpen(!drawerOpen);
	};

	// const {
	// 	menuButton,
	// 	toolbar,
	// 	cartIcon,
	// 	drawerContainer,
	// 	cartButton,
	// 	drawerContent,
	// 	menuItem,
	// } = useStyles();

	return (
		<Toolbar className="toolbar">
			{stephaniesLogo}
			<div>
				<IconButton
					className="cart-button"
					component={RouterLink}
					to="/cart"
					aria-label="Show cart items"
					color="inherit"
				>
					<Badge badgeContent={totalItems} color="secondary">
						<ShoppingCart className="cart-icon" />
					</Badge>
				</IconButton>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					aria-haspopup="true"
					onClick={handleDrawerOpen}
				>
					<Menu className="menu-button" />
				</IconButton>
			</div>

			<Drawer
				className="drawer-container"
				anchor="right"
				open={drawerOpen}
				onClose={handleDrawerClose}
			>
				<div className="drawer-content">
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Home"
					>
						<MenuItem className="menu-item">Home</MenuItem>
					</Link>
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/shop/all-products"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Shop"
					>
						<MenuItem className="menu-item">Shop</MenuItem>
					</Link>
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/about"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="About"
					>
						<MenuItem className="menu-item">About</MenuItem>
					</Link>
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/services"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Services"
					>
						<MenuItem className="menu-item">Services</MenuItem>
					</Link>
				</div>
			</Drawer>
		</Toolbar>
	);
};

export default MobileView;
