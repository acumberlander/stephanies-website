import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, Button, Badge, IconButton } from "@material-ui/core";
import { useSelector } from "react-redux";
import MobileView from "./Views/MobileView";
import { Link as RouterLink } from "react-router-dom";
import { ShoppingCart } from "@material-ui/icons";
import myLogo from "../../../assets/logos/logo-white.png";
import useStyles from "./navbarStyles";

const MyNavbar = () => {
  const { navContainer, logoLink, myNavbar, toolbar, cartIcon, navButton } =
    useStyles();
  // const totalItems = useSelector((state) => state.cart.total_items);
  const [mobileView, setMobileView] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const setResponsiveness = () => {
      return window.innerWidth < 900
        ? setMobileView(true)
        : setMobileView(false);
    };

    setResponsiveness();

    window.addEventListener("resize", () => setResponsiveness());
  }, []);

  const stephaniesLogo = (
    <RouterLink className={logoLink} to="/">
      <img style={{ height: 50, width: 50 }} src={myLogo} alt="logo" />
    </RouterLink>
  );

  return (
    <div className={navContainer}>
      <AppBar className={myNavbar}>
        {mobileView ? (
          <MobileView
            stephaniesLogo={stephaniesLogo}
            setDrawerOpen={setDrawerOpen}
            drawerOpen={drawerOpen}
            // totalItems={totalItems}
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
                key="About"
                color="inherit"
                to="/about"
                component={RouterLink}
                className={navButton}
              >
                About
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
                key="Services"
                color="inherit"
                to="/services"
                component={RouterLink}
                className={navButton}
              >
                Services
              </Button>
            </span>

            <span>
              <IconButton
                component={RouterLink}
                to="/cart"
                aria-label="Show cart items"
                color="inherit"
              >
                <Badge badgeContent={1} color="secondary">
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
