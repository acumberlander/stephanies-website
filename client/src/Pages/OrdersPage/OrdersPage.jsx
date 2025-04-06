import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Box,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { fetchOrdersByUid } from "../../store/orderThunks/orderThunks";
import { formateDateAndTime } from "../../utils/formatFunctions/formatDateAndTime";
import LoadingPage from "../LoadingPage/LoadingPage";
import { formatStripeAmount } from "../../utils/formatFunctions/formatStripeAmounts";

const OrdersPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width:800px)");
  const dispatch = useDispatch();
  const { orders } = useSelector((state) => state.orders);
  const { uid } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(fetchOrdersByUid(uid));
  }, [dispatch, uid]);

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

      {!orders ? (
        <Typography variant="body2" color="text.secondary">
          <LoadingPage />
        </Typography>
      ) : orders.length === 0 ? (
        <Typography
          sx={{ color: "#cc34ab" }}
          variant="body2"
          color="text.secondary"
        >
          You don’t have any orders yet...
        </Typography>
      ) : (
        <Box display="flex" flexDirection="column" gap={3}>
          {orders.map((order) => (
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
                      underline="hover"
                      style={{ color: "#cc34ab", textDecoration: "none" }}
                    >
                      {item?.name}
                    </Link>
                  </Box>
                ))}
              </Box>
              {/* <Box mt={2} display="flex" gap={3}>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  variant="body2"
                >
                  View order details
                </Link>
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  variant="body2"
                >
                  View invoice
                </Link>
              </Box> */}
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default OrdersPage;
