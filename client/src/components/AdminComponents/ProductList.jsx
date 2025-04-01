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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import UnarchiveIcon from "@mui/icons-material/Unarchive";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  _deleteProduct,
  _archiveProduct,
  _unarchiveProduct,
  _fetchStripeProductById,
} from "../../api/stripeRequests";
import DeleteConfirmationModal from "../../modals/DeleteConfirmationModal";

const ProductList = ({ products, onEdit, onProductUpdate }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState(null);

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

  const handleDeleteClick = (product) => {
    setProductToDelete(product);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    try {
      await _deleteProduct(productToDelete.id);
      setDeleteDialogOpen(false);
      onProductUpdate();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleDeleteCancel = () => {
    setDeleteDialogOpen(false);
    setProductToDelete(null);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
        }}
      >
        <Typography variant="h6">Product Management</Typography>
        <TextField
          placeholder="Search products..."
          size="small"
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
      </div>

      <TableContainer
        component={Paper}
        sx={{ maxHeight: "400px", overflow: "auto" }}
      >
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
                  <IconButton
                    onClick={() => handleDeleteClick(product)}
                    title="Delete"
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <DeleteConfirmationModal
        deleteDialogOpen={deleteDialogOpen}
        handleDeleteCancel={handleDeleteCancel}
        handleDeleteConfirm={handleDeleteConfirm}
        productToDelete={productToDelete}
      />
    </div>
  );
};

export default ProductList;
