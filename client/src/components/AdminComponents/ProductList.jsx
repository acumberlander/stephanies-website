import React, { useState } from 'react'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, Button, TextField, InputAdornment, 
  IconButton, Typography, Chip
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import EditIcon from '@mui/icons-material/Edit'
import ArchiveIcon from '@mui/icons-material/Archive'
import UnarchiveIcon from '@mui/icons-material/Unarchive'
import axios from 'axios'

const ProductList = ({ products, onEdit }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001"
  
  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleArchiveToggle = async (productId, currentStatus) => {
    try {
      await axios.post(`${baseUrl}/stripe/product/${productId}/archive`, {
        archive: !currentStatus
      })
      // Refresh products list would happen here
      window.location.reload()
    } catch (error) {
      console.error('Error toggling product archive status:', error)
    }
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
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

      <TableContainer component={Paper} sx={{ maxHeight: '400px', overflow: 'auto' }}>
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
                      style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                    />
                  ) : (
                    <div style={{ width: '50px', height: '50px', backgroundColor: '#eee' }} />
                  )}
                </TableCell>
                <TableCell>{product.name}</TableCell>
                <TableCell>{product.category}</TableCell>
                <TableCell>${product.price?.toFixed(2)}</TableCell>
                <TableCell>
                  <Chip 
                    label={product.active !== false ? "Active" : "Archived"} 
                    color={product.active !== false ? "success" : "default"} 
                    size="small"
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => onEdit(product)} title="Edit">
                    <EditIcon />
                  </IconButton>
                  <IconButton 
                    onClick={() => handleArchiveToggle(product.id, product.active !== false)}
                    title={product.active !== false ? "Archive" : "Unarchive"}
                  >
                    {product.active !== false ? <ArchiveIcon /> : <UnarchiveIcon />}
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default ProductList
