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
import { useModal } from "../../../../hooks/hooks";
import { useSelector } from "react-redux";

const MobileView = ({
  stephaniesLogo,
  setDrawerOpen,
  drawerOpen,
  totalItems,
}) => {
  const handleDrawerOpen = () => setDrawerOpen(true);
  const handleDrawerClose = () => setDrawerOpen(false);
  const { openModal } = useModal();
  const { type } = useSelector((state) => state.user);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  const toggleModal = () => {
    toggleDrawer();
    openModal();
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
          {type.guest ? (
            <Link
              component={RouterLink}
              onClick={toggleModal}
              to="/"
              color="inherit"
              style={{ textDecoration: "none" }}
              key="Home"
            >
              <MenuItem className="menu-item">Login</MenuItem>
            </Link>
          ) : (
            <Link
              component={RouterLink}
              onClick={toggleModal}
              to="/"
              color="inherit"
              style={{ textDecoration: "none" }}
              key="Home"
            >
              <MenuItem className="menu-item">Sign Out</MenuItem>
            </Link>
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
