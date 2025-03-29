import React, { useState, useEffect } from 'react'
import { 
  TextField, Button, Grid, Typography, FormControl, 
  InputLabel, Select, MenuItem, Chip, Box, Paper,
  InputAdornment, CircularProgress
} from '@mui/material'
import axios from 'axios'

const ProductForm = ({ product, onSave }) => {
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001"
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    sizes: [],
    images: []
  })
  const [imageUrls, setImageUrls] = useState([])
  const [newSize, setNewSize] = useState('')
  const [error, setError] = useState('')

  const categories = ['tees', 'accessories', 'glassware', 'other']

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        description: product.description || '',
        price: product.price || '',
        category: product.category || '',
        sizes: product.sizes || [],
        images: product.images || []
      })
      setImageUrls(product.images || [])
    }
  }, [product])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleAddSize = () => {
    if (newSize && !formData.sizes.includes(newSize)) {
      setFormData({
        ...formData,
        sizes: [...formData.sizes, newSize]
      })
      setNewSize('')
    }
  }

  const handleRemoveSize = (sizeToRemove) => {
    setFormData({
      ...formData,
      sizes: formData.sizes.filter(size => size !== sizeToRemove)
    })
  }

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files)
    if (files.length === 0) return

    setLoading(true)
    setError('')

    try {
      // This is a placeholder for your actual image upload logic
      // You would typically upload to Firebase Storage or another service
      const uploadPromises = files.map(async (file) => {
        const formData = new FormData()
        formData.append('image', file)
        
        // Replace with your actual image upload endpoint
        const response = await axios.post(`${baseUrl}/upload`, formData)
        return response.data.url
      })

      const uploadedUrls = await Promise.all(uploadPromises)
      
      setImageUrls([...imageUrls, ...uploadedUrls])
      setFormData({
        ...formData,
        images: [...formData.images, ...uploadedUrls]
      })
    } catch (error) {
      console.error('Error uploading images:', error)
      setError('Failed to upload images. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleRemoveImage = (urlToRemove) => {
    setImageUrls(imageUrls.filter(url => url !== urlToRemove))
    setFormData({
      ...formData,
      images: formData.images.filter(url => url !== urlToRemove)
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const productData = {
        ...formData,
        price: parseFloat(formData.price) * 100, // Convert to cents for Stripe
      }

      if (product) {
        // Update existing product
        await axios.put(`${baseUrl}/stripe/product/${product.id}`, productData)
      } else {
        // Create new product
        await axios.post(`${baseUrl}/stripe/products`, productData)
      }

      onSave()
    } catch (error) {
      console.error('Error saving product:', error)
      setError('Failed to save product. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        {product ? 'Edit Product' : 'Add New Product'}
      </Typography>
      
      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Product Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <TextField
              required
              fullWidth
              label="Price"
              name="price"
              type="number"
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
              value={formData.price}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleChange}
            />
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth required>
              <InputLabel>Category</InputLabel>
              <Select
                name="category"
                value={formData.category}
                onChange={handleChange}
                label="Category"
              >
                {categories.map(category => (
                  <MenuItem key={category} value={category}>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          
          <Grid item xs={12} sm={6}>
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }}>
              <TextField
                fullWidth
                label="Add Size"
                value={newSize}
                onChange={(e) => setNewSize(e.target.value)}
              />
              <Button 
                variant="contained" 
                onClick={handleAddSize}
                sx={{ ml: 1, height: 56 }}
              >
                Add
              </Button>
            </Box>
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {formData.sizes.map(size => (
                <Chip 
                  key={size} 
                  label={size} 
                  onDelete={() => handleRemoveSize(size)} 
                />
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12}>
            <Typography variant="subtitle1" gutterBottom>
              Product Images
            </Typography>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="image-upload"
              multiple
              type="file"
              onChange={handleImageUpload}
            />
            <label htmlFor="image-upload">
              <Button 
                variant="outlined" 
                component="span"
                disabled={loading}
              >
                Upload Images
                {loading && <CircularProgress size={24} sx={{ ml: 1 }} />}
              </Button>
            </label>
            
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {imageUrls.map((url, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    position: 'relative',
                    width: 100,
                    height: 100
                  }}
                >
                  <img 
                    src={url} 
                    alt={`Product ${index}`}
                    style={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'cover',
                      borderRadius: '4px'
                    }} 
                  />
                  <Button
                    variant="contained"
                    color="error"
                    size="small"
                    sx={{ 
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      minWidth: '30px',
                      width: '30px',
                      height: '30px',
                      p: 0
                    }}
                    onClick={() => handleRemoveImage(url)}
                  >
                    X
                  </Button>
                </Box>
              ))}
            </Box>
          </Grid>
          
          <Grid item xs={12} sx={{ mt: 2 }}>
            <Button 
              type="submit" 
              variant="contained" 
              color="primary"
              disabled={loading}
              sx={{ mr: 2 }}
            >
              {loading ? <CircularProgress size={24} /> : (product ? 'Update Product' : 'Create Product')}
            </Button>
            <Button 
              variant="outlined" 
              onClick={onSave}
            >
              Cancel
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  )
}

export default ProductForm