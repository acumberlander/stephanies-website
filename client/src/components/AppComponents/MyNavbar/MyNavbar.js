import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Badge,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MobileView from "./Views/MobileView";
import { Link as RouterLink } from "react-router-dom";
import myLogo from "../../../assets/logos/logo-white.png";
import { signOutUser } from "../../../store/authThunks/authThunks";
import { useIsMobile } from "../../../hooks/hooks";
import "./MyNavbar.scss";

const MyNavbar = ({ openModal }) => {
  const totalItems = useSelector((state) => state.user.cart.total_items) || 0;
  const { isAuthenticated, isAdmin, email } = useSelector(
    (state) => state.user
  );
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const isMobile = useIsMobile(700);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutUser());
    handleMenuClose();
  };

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const stephaniesLogo = (
    <RouterLink className="logo-link" to="/">
      <img id="logo-link-image" src={myLogo} alt="logo" />
    </RouterLink>
  );

  // Get first letter of email for avatar
  const getAvatarLetter = () => {
    return email ? email.charAt(0).toUpperCase() : "U";
  };

  return (
    <nav className="nav-container">
      <AppBar className="my-navbar">
        {isMobile ? (
          <MobileView
            stephaniesLogo={stephaniesLogo}
            setDrawerOpen={setDrawerOpen}
            drawerOpen={drawerOpen}
            totalItems={totalItems}
            isAuthenticated={isAuthenticated}
            isAdmin={isAdmin}
            handleSignOut={handleSignOut}
            getAvatarLetter={getAvatarLetter}
          />
        ) : (
          <Toolbar style={{ minHeight: "55px" }} className="toolbar">
            {stephaniesLogo}
            <span>
              <Button
                key="Home"
                color="inherit"
                to="/"
                component={RouterLink}
                className="nav-button"
              >
                Home
              </Button>

              <Button
                key="About"
                color="inherit"
                to="/about"
                component={RouterLink}
                className="nav-button"
              >
                About
              </Button>

              <Button
                key="Shop"
                color="inherit"
                to="/shop/all-products"
                component={RouterLink}
                className="nav-button"
              >
                Shop
              </Button>
            </span>

            <span id="cart-and-login-div">
              <IconButton
                component={RouterLink}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
                className="cart-button"
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart className="cart-icon" />
                </Badge>
              </IconButton>

              {!isAuthenticated ? (
                <Button aria-label="login" id="login-button" onClick={openModal}>
                  Login
                </Button>
              ) : (
                <>
                  <IconButton
                    onClick={handleAvatarClick}
                    className="avatar-button"
                  >
                    <Avatar
                      sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}
                    >
                      {getAvatarLetter()}
                    </Avatar>
                  </IconButton>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                  >
                    <MenuItem
                      component={RouterLink}
                      to="/account"
                      onClick={handleMenuClose}
                    >
                      Account Settings
                    </MenuItem>
                    {isAdmin && (
                      <MenuItem
                        component={RouterLink}
                        to="/admin"
                        onClick={handleMenuClose}
                      >
                        Admin Dashboard
                      </MenuItem>
                    )}
                    <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
                  </Menu>
                </>
              )}
            </span>
          </Toolbar>
        )}
      </AppBar>
    </nav>
  );
};

export default MyNavbar;
