import {
	AppBar,
	Toolbar,
	Typography,
	makeStyles,
	Button,
	IconButton,
	Drawer,
	Link,
	MenuItem,
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import useStyles from './navbarStyles';

const headersData = [
	{
		label: 'Home',
		href: '/',
	},
	{
		label: 'Shop',
		href: '/shop',
	},
	{
		label: 'Log Out',
		href: '/logout',
	},
];

export default function Header() {
	const { header, logo, menuButton, toolbar, drawerContainer } = useStyles();

	const [state, setState] = useState({
		mobileView: false,
		drawerOpen: false,
	});

	const { mobileView, drawerOpen } = state;

	useEffect(() => {
		const setResponsiveness = () => {
			return window.innerWidth < 900
				? setState((prevState) => ({ ...prevState, mobileView: true }))
				: setState((prevState) => ({ ...prevState, mobileView: false }));
		};

		setResponsiveness();

		window.addEventListener('resize', () => setResponsiveness());
	}, []);

	const displayDesktop = () => {
		return (
			<Toolbar className={toolbar}>
				{femmecubatorLogo}
				<div>{getMenuButtons()}</div>
			</Toolbar>
		);
	};

	const displayMobile = () => {
		const handleDrawerOpen = () =>
			setState((prevState) => ({ ...prevState, drawerOpen: true }));
		const handleDrawerClose = () =>
			setState((prevState) => ({ ...prevState, drawerOpen: false }));

		return (
			<Toolbar className={toolbar}>
				<div>{femmecubatorLogo}</div>
				<IconButton
					{...{
						edge: 'start',
						color: 'inherit',
						'aria-label': 'menu',
						'aria-haspopup': 'true',
						onClick: handleDrawerOpen,
					}}
				>
					<MenuIcon />
				</IconButton>

				<Drawer
					{...{
						anchor: 'right',
						open: drawerOpen,
						onClose: handleDrawerClose,
					}}
				>
					<div className={drawerContainer}>{getDrawerChoices()}</div>
				</Drawer>
			</Toolbar>
		);
	};

	const getDrawerChoices = () => {
		return headersData.map(({ label, href }) => {
			return (
				<Link
					component={RouterLink}
					to={href}
					color="inherit"
					style={{ textDecoration: 'none' }}
					key={label}
				>
					<MenuItem>{label}</MenuItem>
				</Link>
			);
		});
	};

	const femmecubatorLogo = (
		<Typography variant="h6" component="h1" className={logo}>
			Sexes
		</Typography>
	);

	const getMenuButtons = () => {
		return headersData.map(({ label, href }) => {
			return (
				<Button
					key={label}
					color="inherit"
					to={href}
					component={RouterLink}
					className={menuButton}
				>
					{label}
				</Button>
			);
		});
	};

	return (
		<div className={header}>
			<AppBar>{mobileView ? displayMobile() : displayDesktop()}</AppBar>
		</div>
	);
}
