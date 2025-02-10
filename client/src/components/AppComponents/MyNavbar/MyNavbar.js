import { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Badge, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import MobileView from "./Views/MobileView";
import { Link as RouterLink } from "react-router-dom";
import myLogo from "../../../assets/logos/logo-white.png";
import "./MyNavbar.scss";
import { signOutUser } from "../../../store/authThunks/authThunks";
import { useIsMobile } from "../../../hooks/hooks";

const MyNavbar = ({ openModal }) => {
  const totalItems = useSelector((state) => state.user.cart.total_items) || 0;
  const { isAuthenticated } = useSelector((state) => state.user);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile(700);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutUser());
  };

  const stephaniesLogo = (
    <RouterLink className="logo-link" to="/">
      <img style={{ height: 50, width: 50 }} src={myLogo} alt="logo" />
    </RouterLink>
  );

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
            openModal={openModal}
            handleSignOut={handleSignOut}
          />
        ) : (
          <Toolbar style={{ minHeight: "40px" }} className="toolbar">
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
              >
                <Badge badgeContent={totalItems} color="secondary">
                  <ShoppingCart className="cart-icon" />
                </Badge>
              </IconButton>
              {!isAuthenticated ? (
                <Button id="login-button" onClick={openModal}>
                  Login
                </Button>
              ) : (
                <Button id="sign-out-button" onClick={handleSignOut}>
                  Sign Out
                </Button>
              )}
            </span>
          </Toolbar>
        )}
      </AppBar>
    </nav>
  );
};

export default MyNavbar;
