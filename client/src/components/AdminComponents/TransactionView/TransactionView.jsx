import React from "react";
import { Box, Typography } from "@mui/material";
import { getStatusChip } from "../../../utils/statusFunctions";

const TransactionView = ({ selectedTransaction }) => {
  const formatDate = (timestamp) =>
    new Date(timestamp * 1000).toLocaleString();

  return (
    <>
      <Typography variant="h5" fontWeight="bold">
        ${(selectedTransaction.amount / 100).toFixed(2)} USD
      </Typography>
      {getStatusChip(selectedTransaction.status)}
      <Box display="flex" flexWrap="wrap" gap={4}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Customer
          </Typography>
          <Typography>
            {selectedTransaction.shipping?.name || "Guest"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Email
          </Typography>
          <Typography>{selectedTransaction.receipt_email || "N/A"}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Created
          </Typography>
          <Typography>{formatDate(selectedTransaction.created)}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Transaction ID
          </Typography>
          <Typography sx={{ wordBreak: "break-all" }}>
            {selectedTransaction.id}
          </Typography>
        </Box>
      </Box>
      <Box>
        <Typography variant="subtitle1" fontWeight="bold" mb={1}>
          Payment Breakdown
        </Typography>
        <Box display="flex" justifyContent="space-between">
          <Typography>Payment amount</Typography>
          <Typography>
            ${(selectedTransaction.amount / 100).toFixed(2)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography>Stripe processing fees</Typography>
          <Typography color="text.secondary">– $1.56</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography fontWeight="bold">Net amount</Typography>
          <Typography fontWeight="bold">
            ${((selectedTransaction.amount - 156) / 100).toFixed(2)}
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
