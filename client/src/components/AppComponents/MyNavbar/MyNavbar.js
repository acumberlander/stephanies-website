import { useState } from "react";
import { AppBar, Toolbar, Button, Badge, IconButton } from "@mui/material";
import { ShoppingCart } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { Link as RouterLink } from "react-router-dom";
import MobileView from "./Views/MobileView";
import myLogo from "../../../assets/logos/logo-white.png";
import { useIsMobile, useModal } from "../../../hooks/hooks";

import "./MyNavbar.scss";
import { signOutWithGoogle } from "../../../store/userThunks/userThunks";

const MyNavbar = ({ openModal }) => {
  const totalItems = useSelector((state) => state.user.cart.total_items) || 0;
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isMobile = useIsMobile(700);
  const { isAuthenticated } = useSelector((state) => state.isAuthenticated);
  const dispatch = useDispatch();

  const handleSignOut = () => {
    dispatch(signOutWithGoogle());
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
          />
        ) : (
          <Toolbar className="toolbar">
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

            <span>
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
