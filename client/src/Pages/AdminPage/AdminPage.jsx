import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchAllStripeProducts } from '../../store/productThunks/productThunks'
import { Container, Tabs, Tab, Box, Typography } from '@mui/material'
import ProductList from '../../components/AdminComponents/ProductList'
import ProductForm from '../../components/AdminComponents/ProductForm'
import TransactionList from '../../components/AdminComponents/TransactionList'
import './AdminPage.scss'

const AdminPage = () => {
  const [tabValue, setTabValue] = useState(0)
  const [editingProduct, setEditingProduct] = useState(null)
  const dispatch = useDispatch()
  const products = useSelector(state => state.products.items)
  const productsStatus = useSelector(state => state.products.status)
  const { isAdmin } = useSelector(state => state.user)

  useEffect(() => {
    if (productsStatus === 'idle') {
      dispatch(fetchAllStripeProducts())
    }
  }, [dispatch, productsStatus])

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
    setEditingProduct(null)
  }

  const handleProductEdit = (product) => {
    setEditingProduct(product)
    setTabValue(1)
  };

  const handleProductSave = () => {
    setEditingProduct(null);
    dispatch(fetchAllStripeProducts());
    setTabValue(0);
  }

  return (
    <Container className="admin-page">
      <Typography className="admin-header" variant="h4" sx={{ my: 4 }}>
        Admin Dashboard
      </Typography>

      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label="Products" />
          <Tab label={editingProduct ? "Edit Product" : "Add Product"} />
          <Tab label="Transactions" />
        </Tabs>
      </Box>

      {tabValue === 0 && (
        <ProductList
          products={products}
          onEdit={handleProductEdit}
          onProductUpdate={() => dispatch(fetchAllStripeProducts())}
        />
      )}

      {tabValue === 1 && (
        <ProductForm product={editingProduct} onSave={handleProductSave} />
      )}

      {tabValue === 2 && <TransactionList />}
    </Container>
  );
}

export default AdminPage
