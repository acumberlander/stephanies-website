import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import { _fetchInvoiceById } from "../../../api/stripeRequests";
import { formatStripeAmount } from "../../../utils/formatFunctions/formatStripeAmounts";

const formatDate = (timestamp) =>
  timestamp ? new Date(timestamp * 1000).toLocaleString() : "N/A";

const InvoiceView = ({ selectedTransaction }) => {
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchInvoice = async () => {
      if (!selectedTransaction?.invoice) return;

      setLoading(true);
      try {
        const res = await _fetchInvoiceById(selectedTransaction.invoice);
        setInvoice(res);
      } catch (err) {
        console.error("Error fetching invoice:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoice();
  }, [selectedTransaction?.invoice]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress size={24} sx={{ color: "#cc34ab" }} />
      </Box>
    );
  }

  if (!invoice) return <Typography>Invoice not found.</Typography>;

  const lineItems = invoice?.lines?.data || [];
  const taxDetails = lineItems[0]?.tax_rates || [];

  return (
    <>
      <Typography variant="h6" fontWeight="bold">
        Invoice Summary
      </Typography>

      <Box display="flex" flexWrap="wrap" gap={4}>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Invoice number
          </Typography>
          <Typography>{invoice.number || "N/A"}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Created
          </Typography>
          <Typography>{formatDate(invoice.created)}</Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Tax Calculation
          </Typography>
          <Typography>
            {invoice.automatic_tax?.enabled ? "Automatic" : "Manual"}
          </Typography>
        </Box>
        <Box>
          <Typography variant="caption" color="text.secondary">
            Currency
          </Typography>
          <Typography>{invoice.currency?.toUpperCase()}</Typography>
        </Box>
      </Box>

      <Box mt={3}>
        <Typography fontWeight="bold" mb={1}>
          Items
        </Typography>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Description</TableCell>
              <TableCell>Qty</TableCell>
              <TableCell>Unit price</TableCell>
              <TableCell>Amount</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {lineItems.length > 0 ? (
              lineItems.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.description || "N/A"}</TableCell>
                  <TableCell>{item.quantity || 1}</TableCell>
                  <TableCell>
                    ${formatStripeAmount(item.price?.unit_amount || 0)}
                  </TableCell>
                  <TableCell>${formatStripeAmount(item.amount)}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  No items found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>

      <Box mt={2}>
        <Box display="flex" justifyContent="space-between">
          <Typography>Subtotal</Typography>
          <Typography>${formatStripeAmount(invoice.subtotal)}</Typography>
        </Box>
        {invoice.amount_shipping > 0 && (
          <Box display="flex" justifyContent="space-between">
            <Typography>Shipping</Typography>
            <Typography>
              ${formatStripeAmount(invoice.amount_shipping)}
            </Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between">
          <Typography>Total excluding tax</Typography>
          <Typography>
            ${formatStripeAmount(invoice.total_excluding_tax)}
          </Typography>
        </Box>
        {invoice.tax !== null && (
          <Box display="flex" justifyContent="space-between">
            <Typography>Sales tax</Typography>
            <Typography>${formatStripeAmount(invoice.tax)}</Typography>
          </Box>
        )}
        <Box display="flex" justifyContent="space-between" fontWeight="bold">
          <Typography>Total</Typography>
          <Typography>${formatStripeAmount(invoice.total)}</Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">Amount paid</Typography>
          <Typography color="text.secondary">
            – ${formatStripeAmount(invoice.amount_paid)}
          </Typography>
        </Box>
        <Box display="flex" justifyContent="space-between">
          <Typography color="text.secondary">Amount due</Typography>
          <Typography color="text.secondary">
            ${formatStripeAmount(invoice.amount_due)}
          </Typography>
        </Box>
      </Box>

      {taxDetails.length > 0 && (
        <Box mt={3}>
          <Typography variant="subtitle1" fontWeight="bold" mb={1}>
            Tax Breakdown
          </Typography>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>Region</TableCell>
                <TableCell>Rate</TableCell>
                <TableCell>Amount</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {taxDetails.map((tax, index) => (
                <TableRow key={index}>
                  <TableCell>{tax.display_name || "Sales Tax"}</TableCell>
                  <TableCell>{tax.country || "N/A"}</TableCell>
                  <TableCell>{(tax.percentage || 0).toFixed(2)}%</TableCell>
                  <TableCell>${formatStripeAmount(invoice.tax)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default InvoiceView;
