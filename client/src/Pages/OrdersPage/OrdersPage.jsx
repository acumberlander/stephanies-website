import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  useMediaQuery,
  Button,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { formateDateAndTime } from "../../utils/formatFunctions/formatDateAndTime";
import LoadingPage from "../../Pages/LoadingPage/LoadingPage";
import { formatStripeAmount } from "../../utils/formatFunctions/formatStripeAmounts";
import DetailsModal from "../../modals/DetailsModal";
import { _fetchOrdersByUid } from "../../api/mongoRequests";

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [userOrders, setUserOrders] = useState([]);

  const user = useSelector((state) => state.user);
  const uid = user.uid;

  const isMobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    const fetchUserOrders = async () => {
      setLoading(true);
      try {
        const response = await _fetchOrdersByUid(uid);
        setUserOrders(response);
      } catch (error) {
        console.error("Error fetching user orders:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserOrders();
  }, [uid]);

  const filteredOrders =
    userOrders?.filter((order) =>
      order.items.some((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    ) || [];

  const selectedOrders =
    selectedIndex !== null ? filteredOrders[selectedIndex] : null;

  const handleOpenDetails = (index) => {
    setSelectedIndex(index);
  };
  const handleCloseDetails = () => setSelectedIndex(null);

  const handleNext = () => {
    if (selectedIndex < filteredOrders.length - 1) {
      setSelectedIndex((prev) => prev + 1);
    }
  };
  const handlePrev = () => {
    if (selectedIndex > 0) {
      setSelectedIndex((prev) => prev - 1);
    }
  };

  return (
    <Box
      sx={{
        maxWidth: 900,
        minHeight: 500,
        overflow: "auto",
        mx: "auto",
        px: 2,
        py: 4,
      }}
    >
      <Typography sx={{ color: "#cc34ab" }} variant="h6" gutterBottom>
        Your Orders
      </Typography>

      <TextField
        placeholder="Filter orders by item name..."
        size="small"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ mb: 3 }}
      />

      {!userOrders ? (
        <Typography variant="body2" color="text.secondary">
          <LoadingPage />
        </Typography>
      ) : filteredOrders.length === 0 ? (
        <Typography sx={{ color: "#cc34ab" }} variant="body2">
          You don’t have any orders yet...
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {filteredOrders.map((order, index) => (
            <Paper
              key={order.payment_intent}
              elevation={2}
              sx={{ p: 2, backgroundColor: "#f9f9f9" }}
            >
              <Box
                display="flex"
                flexDirection={isMobile ? "column" : "row"}
                justifyContent="space-between"
                flexWrap="wrap"
                gap={1}
                mb={2}
              >
                <Typography sx={{ color: "#cc34ab" }} variant="body2">
                  Order placed: {formateDateAndTime(order.created)}
                </Typography>
                <Typography sx={{ color: "#cc34ab" }} variant="body2">
                  Total: ${formatStripeAmount(order.total)}
                </Typography>
                <Typography sx={{ color: "#cc34ab" }} variant="body2">
                  Order #: {order.payment_intent}
                </Typography>
              </Box>
              <Box display="flex" flexDirection="column" gap={2}>
                {order?.items?.map((item, idx) => (
                  <Box key={idx} display="flex" alignItems="center" gap={2}>
                    <Box
                      component="img"
                      src={item?.images[0]}
                      alt=""
                      sx={{
                        width: 60,
                        height: 60,
                        objectFit: "cover",
                        borderRadius: 1,
                        backgroundColor: "#f0f0f0",
                      }}
                    />
                    <Link
                      to={`/product/${item?.id}`}
                      style={{ color: "#cc34ab", textDecoration: "none" }}
                    >
                      {item?.name}
                    </Link>
                  </Box>
                ))}
              </Box>
              <Box mt={2} display="flex" gap={2}>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleOpenDetails(index)}
                  sx={{ color: "#cc34ab", borderColor: "#cc34ab" }}
                >
                  View order details
                </Button>
              </Box>
            </Paper>
          ))}
        </Box>
      )}

      <DetailsModal
        selectedIndex={selectedIndex}
        closeDetails={handleCloseDetails}
        next={handleNext}
        prev={handlePrev}
        selectedTransaction={selectedOrders}
        filteredTransactions={filteredOrders}
        isMobile={isMobile}
        isOrders={true}
        user={user}
      />
    </Box>
  );
};

export default OrdersPage;
