import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import { getStatusChip } from "../../../utils/statusFunctions";
import { formatStripeAmount } from "../../../utils/formatFunctions/formatStripeAmounts";
import { formateDateAndTime } from "../../../utils/formatFunctions/formatDateAndTime";
import { _fetchPaymentIntentById } from "../../../api/stripeRequests";

const TransactionView = ({ user, selectedTransaction, isOrders }) => {
  const formatDate = (timestamp) => new Date(timestamp * 1000).toLocaleString();
  const [selectedOrder, setSelectedOrder] = useState(selectedTransaction);

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        $
        {isOrders
          ? formatStripeAmount(selectedOrder.total)
          : formatStripeAmount(selectedTransaction.amount)}{" "}
        USD
      </Typography>
      {!isOrders && getStatusChip(selectedTransaction.status)}
      <Box display="flex" flexWrap="wrap" gap={4}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Customer
          </Typography>
          <Typography>
            {isOrders
              ? `${user.firstName} ${user.lastName}`
              : selectedTransaction.shipping?.name || "Guest"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Email
          </Typography>
          <Typography>
            {isOrders ? user.email : selectedTransaction.receipt_email || "N/A"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Created
          </Typography>
          <Typography>
            {isOrders
              ? formateDateAndTime(selectedTransaction.created)
              : formatDate(selectedTransaction.created)}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Transaction ID
          </Typography>
          <Typography sx={{ wordBreak: "break-all" }}>
            {isOrders
              ? selectedTransaction.payment_intent
              : selectedTransaction.id}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Box display="flex" justifyContent="space-between">
          <Typography variant="subtitle1" fontWeight="bold">
            Payment amount
          </Typography>
          <Typography>
            $
            {isOrders
              ? formatStripeAmount(selectedTransaction.total)
              : formatStripeAmount(selectedTransaction.amount)}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Payment Method
        </Typography>
        <Typography variant="body2">
          Visa ending in 4242 — Exp: 02 / 2034
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Type: Visa credit card · Country: United States
        </Typography>
      </Box>
    </>
  );
};

export default TransactionView;
