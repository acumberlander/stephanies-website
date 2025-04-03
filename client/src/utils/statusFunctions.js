import React from "react";
import {
  TableCell,
  TableRow,
  Paper,
  Typography,
  Chip,
  Button,
  Box,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";

export const getStatusChip = (status) => {
  const colors = {
    canceled: "error",
    processing: "warning",
    requires_action: "warning",
    requires_capture: "warning",
    requires_confirmation: "warning",
    requires_payment_method: "warning",
    succeeded: "success",
  };

  return (
    <Chip
      label={status.charAt(0).toUpperCase() + status.slice(1).replace("_", " ")}
      color={colors[status] || "default"}
      size="small"
      sx={{ maxWidth: "200px"}}
    />
  );
};

export const getRowBackgroundColor = (status) => {
  if (status === "succeeded") return "#d5ffd5";
  if (status === "processing" || status === "requires_action" || status === "requires_confirmation" || status === "requires_payment_method") return "#fffde7";
  return "inherit";
};

export const formatDate = (timestamp) =>
  new Date(timestamp * 1000).toLocaleString();

export const renderMobileCard = (transaction, index, openDetails) => (
  <Paper
    key={transaction.id}
    elevation={2}
    sx={{
      mb: 2,
      p: 2,
      backgroundColor: getRowBackgroundColor(transaction.status),
    }}
  >
    <Typography variant="subtitle2" fontWeight={600}>
      {`${transaction.id.slice(0, 20)}...`}
    </Typography>
    <Typography variant="body2" color="text.secondary">
      {formatDate(transaction.created)}
    </Typography>
    <Typography mt={1}>
      <strong>Customer:</strong> {transaction.shipping?.name || "Guest"}
    </Typography>
    <Typography>
      <strong>Amount:</strong> ${(transaction.amount / 100).toFixed(2)}
    </Typography>
    <Box mt={1} display="flex" justifyContent="space-between">
      {getStatusChip(transaction.status)}
      <Button
        size="small"
        startIcon={<VisibilityIcon />}
        onClick={() => openDetails(index)}
      >
        View
      </Button>
    </Box>
  </Paper>
);

export const renderDesktopRow = (transaction, index, openDetails) => (
  <TableRow
    key={transaction.id}
    sx={{ backgroundColor: getRowBackgroundColor(transaction.status) }}
  >
    <TableCell>{`${transaction.id.slice(0, 20)}...`}</TableCell>
    <TableCell>{formatDate(transaction.created)}</TableCell>
    <TableCell>{transaction.shipping?.name || "Guest"}</TableCell>
    <TableCell>${(transaction.amount / 100).toFixed(2)}</TableCell>
    <TableCell>{getStatusChip(transaction.status)}</TableCell>
    <TableCell>
      <Button
        size="small"
        startIcon={<VisibilityIcon />}
        onClick={() => openDetails(index)}
      >
        View
      </Button>
    </TableCell>
  </TableRow>
);
