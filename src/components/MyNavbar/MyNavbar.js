import React, { useState, useEffect } from 'react';
import {
	AppBar,
	Toolbar,
	Button,
	Badge,
	IconButton,
	Input,
	Divider,
	Typography,
} from '@material-ui/core';
import Modal from 'react-modal';
import { useSelector } from 'react-redux';
import MobileView from './Views/MobileView';
import { Link as RouterLink } from 'react-router-dom';
import { ShoppingCart } from '@material-ui/icons';
import myLogo from '../../assets/logos/logo-white.png';
import useStyles from './navbarStyles';

const MyNavbar = () => {
	const {
		navContainer,
		modal,
		logoLink,
		myNavbar,
		toolbar,
		cartIcon,
		navButton,
		modalOverlay,
		loginContainer,
		modalContent,
		modalHeader,
		lineBreak,
		loginButton,
		signUpText,
		modalText,
	} = useStyles();
	const totalItems = useSelector((state) => state.cart.total_items);
	const [mobileView, setMobileView] = useState(false);
	const [drawerOpen, setDrawerOpen] = useState(false);
	const [modalOpen, setmodalOpen] = useState(false);

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
			<Modal
				isOpen={modalOpen}
				onRequestClose={() => setmodalOpen(false)}
				className={modal}
				ariaHideApp={false}
				overlayClassName={modalOverlay}
				shouldCloseOnOverlayClick={true}
			>
				<div className={modalContent}>
					<h2 className={modalHeader}>Log In</h2>
					<div className={loginContainer}>
						<Input placeholder="email" />
						<Input placeholder="password" />
					</div>
					<Button variant="contained" className={loginButton}>
						Login
					</Button>
					<Divider className={lineBreak} />
					<Typography className={modalText}>Don't have an account?</Typography>
					<Typography className={signUpText}>Sign up now</Typography>
				</div>
			</Modal>
			<AppBar className={myNavbar}>
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
								onClick={() => setmodalOpen(!modalOpen)}
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
