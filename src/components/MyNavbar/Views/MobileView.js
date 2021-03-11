import React from 'react';
import {
	Toolbar,
	Badge,
	IconButton,
	Drawer,
	Link,
	MenuItem,
	Divider,
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

	const openModal = () => {
		handleDrawerClose();
	};

	const {
		menuButton,
		toolbar,
		cartIcon,
		drawerContainer,
		cartButton,
	} = useStyles();

	return (
		<Toolbar className={toolbar}>
			<div>{stephaniesLogo}</div>
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
					{...{
						edge: 'start',
						color: 'inherit',
						'aria-label': 'menu',
						'aria-haspopup': 'true',
						onClick: handleDrawerOpen,
					}}
				>
					<MenuIcon className={menuButton} />
				</IconButton>
			</div>

			<Drawer
				{...{
					anchor: 'right',
					open: drawerOpen,
					onClose: handleDrawerClose,
				}}
			>
				<div className={drawerContainer}>
					<MenuItem onClick={openModal}>Log In</MenuItem>
					<Divider></Divider>
					<Link
						component={RouterLink}
						to="/"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Home"
					>
						<MenuItem>Home</MenuItem>
					</Link>
					<Link
						component={RouterLink}
						to="/shop"
						color="inherit"
						style={{ textDecoration: 'none' }}
						key="Shop"
					>
						<MenuItem>Shop</MenuItem>
					</Link>
				</div>
			</Drawer>
		</Toolbar>
	);
};

export default MobileView;
