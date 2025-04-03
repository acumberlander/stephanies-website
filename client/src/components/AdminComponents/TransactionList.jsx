import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
  Typography,
  CircularProgress,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

import { _fetchAllPaymentIntents } from "../../api/stripeRequests";
import DetailsModal from "../../modals/DetailsModal";
import { renderMobileCard, renderDesktopRow } from "../../utils/statusFunctions";

const TransactionList = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(null);

  const isMobile = useMediaQuery("(max-width:800px)");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      try {
        const response = await _fetchAllPaymentIntents();
        setTransactions(response);
      } catch (err) {
        console.error("Error fetching transactions:", err);
        setError("Failed to load transactions. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const filteredTransactions = useMemo(
    () =>
      transactions.filter(
        (tx) =>
          tx.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.shipping?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.shipping?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          tx.receipt_email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.status?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tx.amount?.toString().includes(searchTerm) ||
          tx.created?.toString().includes(searchTerm)
      ),
    [transactions, searchTerm]
  );

  const openDetails = (index) => setSelectedIndex(index);
  const closeDetails = () => setSelectedIndex(null);
  const next = () =>
    setSelectedIndex((i) => Math.min(i + 1, filteredTransactions.length - 1));
  const prev = () => setSelectedIndex((i) => Math.max(i - 1, 0));

  const selectedTransaction =
    selectedIndex !== null ? filteredTransactions[selectedIndex] : null;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "stretch" : "center",
          gap: 2,
          mb: 3,
        }}
      >
        <Typography variant="h6">Transaction History</Typography>
        <TextField
          placeholder="Search by ID or name..."
          size="small"
          fullWidth={isMobile}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress sx={{ color: "#cc34ab" }} />
        </Box>
      ) : error ? (
        <Box mt={2}>
          <Typography color="error">{error}</Typography>
          <Button
            variant="contained"
            onClick={() => window.location.reload()}
            sx={{ mt: 2 }}
          >
            Try Again
          </Button>
        </Box>
      ) : filteredTransactions.length === 0 ? (
        <Typography align="center" mt={2}>
          No transactions found
        </Typography>
      ) : isMobile ? (
        <Box sx={{ maxHeight: 400, overflow: "auto" }}>
          {filteredTransactions.map((tx, index) => renderMobileCard(tx, index, openDetails))}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Transaction ID</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Customer</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>{filteredTransactions.map((tx, index) => renderDesktopRow(tx, index, openDetails))}</TableBody>
          </Table>
        </TableContainer>
      )}

      <DetailsModal
        selectedIndex={selectedIndex}
        closeDetails={closeDetails}
        next={next}
        prev={prev}
        selectedTransaction={selectedTransaction}
        filteredTransactions={filteredTransactions}
        isMobile={isMobile}
      />
    </Box>
  );
};

export default TransactionList;
