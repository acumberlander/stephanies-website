import React from 'react';
import {
	Toolbar,
	Badge,
	IconButton,
	Drawer,
	Link,
	MenuItem,
} from '@material-ui/core';
import { ShoppingCart } from '@material-ui/icons';
import MenuIcon from '@material-ui/icons/Menu';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from '../navbarStyles';

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

	const {
		menuButton,
		toolbar,
		cartIcon,
		drawerContainer,
		cartButton,
		drawerContent,
		menuItem,
	} = useStyles();

	return (
		<Toolbar className={toolbar}>
			{stephaniesLogo}
			<div>
				<IconButton
					className={cartButton}
					component={RouterLink}
					to="/cart"
					aria-label="Show cart items"
					color="inherit"
				>
					<Badge badgeContent={totalItems} color="secondary">
						<ShoppingCart className={cartIcon} />
					</Badge>
				</IconButton>
				<IconButton
					edge="start"
					color="inherit"
					aria-label="menu"
					aria-haspopup="true"
					onClick={handleDrawerOpen}
				>
					<MenuIcon className={menuButton} />
				</IconButton>
			</div>

			<Drawer
				className={drawerContainer}
				anchor="right"
				open={drawerOpen}
				onClose={handleDrawerClose}
			>
				<div className={drawerContent}>
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Home"
					>
						<MenuItem className={menuItem}>Home</MenuItem>
					</Link>
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/shop/all-products"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Shop"
					>
						<MenuItem className={menuItem}>Shop</MenuItem>
					</Link>
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/about"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="About"
					>
						<MenuItem className={menuItem}>About</MenuItem>
					</Link>
					<Link
						component={RouterLink}
						onClick={toggleDrawer}
						to="/services"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Services"
					>
						<MenuItem className={menuItem}>Services</MenuItem>
					</Link>
				</div>
			</Drawer>
		</Toolbar>
	);
};

export default MobileView;
