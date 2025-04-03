import React, { useState } from "react";
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
  IconButton,
  Typography,
  Chip,
  Box,
  useMediaQuery,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import { _archiveProduct, _unarchiveProduct } from "../../api/stripeRequests";

const ProductList = ({ products, onEdit, onProductUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const isMobile = useMediaQuery("(max-width:800px)");

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleArchiveToggle = async (productId, isActive) => {
    try {
      if (isActive) {
        await _archiveProduct(productId);
      } else {
        await _unarchiveProduct(productId);
      }

      onProductUpdate();
    } catch (error) {
      console.error("Error toggling product archive status:", error);
    }
  };

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
        <Typography variant="h6">Product Management</Typography>
        <TextField
          placeholder="Search products..."
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

      {isMobile ? (
        <Box sx={{ maxHeight: 400, overflow: "auto" }}>
          {filteredProducts.map((product) => (
            <Paper
              key={product.id}
              elevation={2}
              sx={{
                mb: 2,
                p: 2,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Box display="flex" alignItems="center" gap={2}>
                <Box
                  component="img"
                  src={product.images?.[0] || ""}
                  alt={product.name}
                  sx={{
                    width: 50,
                    height: 50,
                    objectFit: "cover",
                    backgroundColor: product.images?.length
                      ? "transparent"
                      : "#eee",
                  }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold">
                    {product.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.category}
                  </Typography>
                  <Typography variant="body2">
                    ${product.price?.toFixed(2)}
                  </Typography>
                </Box>
              </Box>
              <Box mt={1} display="flex" justifyContent="space-between">
                <Chip
                  label={product.active ? "Active" : "Archived"}
                  color={product.active ? "success" : "default"}
                  size="small"
                />
                <Box>
                  <IconButton onClick={() => onEdit(product)} title="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() =>
                      handleArchiveToggle(product.id, product.active)
                    }
                    title={product.active ? "Archive" : "Unarchive"}
                  >
                    {product.active ? <ArchiveIcon /> : <UnarchiveIcon />}
                  </IconButton>
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>
      ) : (
        <TableContainer component={Paper} sx={{ maxHeight: 400 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                <TableCell>Image</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell>
                    {product.images && product.images.length > 0 ? (
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        style={{
                          width: "50px",
                          height: "50px",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#eee",
                        }}
                      />
                    )}
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>${product.price?.toFixed(2)}</TableCell>
                  <TableCell>
                    <Chip
                      label={product.active ? "Active" : "Archived"}
                      color={product.active ? "success" : "default"}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>
                    <IconButton onClick={() => onEdit(product)} title="Edit">
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      onClick={() =>
                        handleArchiveToggle(product.id, product.active)
                      }
                      title={product.active ? "Archive" : "Unarchive"}
                    >
                      {product.active ? <ArchiveIcon /> : <UnarchiveIcon />}
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
};

export default ProductList;
