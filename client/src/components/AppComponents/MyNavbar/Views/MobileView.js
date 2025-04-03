import {
  Toolbar,
  Badge,
  IconButton,
  Drawer,
  Link,
  MenuItem,
  Divider,
  Avatar,
} from "@mui/material";
import { ShoppingCart, Menu as MenuIcon } from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const MobileView = ({
  stephaniesLogo,
  setDrawerOpen,
  drawerOpen,
  totalItems,
  isAuthenticated,
  isAdmin,
  openModal,
  handleSignOut,
  getAvatarLetter,
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
        {isAuthenticated ? (
          <IconButton onClick={handleDrawerOpen} className="avatar-button">
            <Avatar sx={{ width: 32, height: 32, bgcolor: "secondary.main" }}>
              {getAvatarLetter()}
            </Avatar>
          </IconButton>
        ) : (
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            aria-haspopup="true"
            onClick={handleDrawerOpen}
          >
            <MenuIcon className="menu-button" />
          </IconButton>
        )}
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
            <>
              <Link
                component={RouterLink}
                onClick={toggleDrawer}
                to="/account"
                color="inherit"
                style={{ textDecoration: "none" }}
                key="Account"
              >
                <MenuItem className="menu-item">Account Settings</MenuItem>
              </Link>
              {isAdmin && (
                <Link
                  component={RouterLink}
                  onClick={toggleDrawer}
                  to="/admin"
                  color="inherit"
                  style={{ textDecoration: "none" }}
                  key="Account"
                >
                  <MenuItem className="menu-item">Admin Dashboard</MenuItem>
                </Link>
              )}
              <MenuItem onClick={handleLogOut} className="menu-item">
                Sign Out
              </MenuItem>
            </>
          )}
          <Divider sx={{ my: 1 }} />
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
