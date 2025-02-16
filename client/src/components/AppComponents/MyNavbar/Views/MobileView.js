import {
  Toolbar,
  Badge,
  IconButton,
  Drawer,
  Link,
  MenuItem,
} from "@mui/material";
import { ShoppingCart, Menu } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const MobileView = ({
  stephaniesLogo,
  setDrawerOpen,
  drawerOpen,
  totalItems,
  isAuthenticated,
  openModal,
  handleSignOut,
}) => {
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const handleAuth = () => {
    handleDrawerClose();
    openModal();
  };
  const handleLogOut = () => {
    handleDrawerClose();
    handleSignOut();
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Toolbar className="toolbar">
      {stephaniesLogo}
      <div className="cart-and-menu-container">
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
          {!isAuthenticated ? (
            <MenuItem onClick={handleAuth} className="menu-item">
              Login
            </MenuItem>
          ) : (
            <MenuItem onClick={handleLogOut} className="menu-item">
              Sign Out
            </MenuItem>
          )}
          <Link
            component={RouterLink}
            onClick={toggleDrawer}
            to="/"
            color="inherit"
            style={{ textDecoration: "none" }}
            key="Home"
          >
            <MenuItem className="menu-item">Home</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            onClick={toggleDrawer}
            to="/shop/all-products"
            color="inherit"
            style={{ textDecoration: "none" }}
            key="Shop"
          >
            <MenuItem className="menu-item">Shop</MenuItem>
          </Link>
          <Link
            component={RouterLink}
            onClick={toggleDrawer}
            to="/about"
            color="inherit"
            style={{ textDecoration: "none" }}
            key="About"
          >
            <MenuItem className="menu-item">About</MenuItem>
          </Link>
        </div>
      </Drawer>
    </Toolbar>
  );
};

export default MobileView;
