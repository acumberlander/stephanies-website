import React, { useState, useEffect } from 'react'
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, TextField, InputAdornment, Typography,
  CircularProgress, Chip, Button, Box
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import VisibilityIcon from '@mui/icons-material/Visibility'
import axios from 'axios'

const TransactionList = () => {
  const [transactions, setTransactions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const baseUrl = process.env.REACT_APP_BASE_URL || "http://localhost:5001"

  useEffect(() => {
    fetchTransactions()
  }, [])

  const fetchTransactions = async () => {
    setLoading(true)
    try {
      const response = await axios.get(`${baseUrl}/stripe/transactions`)
      setTransactions(response.data)
    } catch (error) {
      console.error('Error fetching transactions:', error)
      setError('Failed to load transactions. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredTransactions = transactions.filter(transaction => 
    transaction.id.includes(searchTerm) || 
    (transaction.customer?.email && transaction.customer.email.includes(searchTerm))
  )

  const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  const getStatusChip = (status) => {
    let color = 'default'
    
    switch(status) {
      case 'succeeded':
        color = 'success'
        break
      case 'pending':
        color = 'warning'
        break
      case 'failed':
        color = 'error'
        break
      default:
        color = 'default'
    }
    
    return (
      <Chip 
        label={status.charAt(0).toUpperCase() + status.slice(1)} 
        color={color} 
        size="small"
      />
    )
  }

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
        <CircularProgress sx={{ color: "#cc34ab" }} />
      </Box>
    )
  }

  if (error) {
    return (
      <Box sx={{ mt: 2 }}>
        <Typography color="error">{error}</Typography>
        <Button 
          variant="contained" 
          onClick={fetchTransactions} 
          sx={{ mt: 2 }}
        >
          Try Again
        </Button>
      </Box>
    )
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <Typography variant="h6">Transaction History</Typography>
        <TextField
          placeholder="Search by ID or email..."
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

      <TableContainer component={Paper}>
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
          <TableBody>
            {filteredTransactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.id}</TableCell>
                <TableCell>{formatDate(transaction.created)}</TableCell>
                <TableCell>
                  {transaction.customer?.email || 'Guest'}
                </TableCell>
                <TableCell>
                  ${(transaction.amount / 100).toFixed(2)}
                </TableCell>
                <TableCell>
                  {getStatusChip(transaction.status)}
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    startIcon={<VisibilityIcon />}
                    onClick={() => window.open(`${baseUrl}/stripe/transactions/${transaction.id}`, '_blank')}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
            {filteredTransactions.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No transactions found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default TransactionList
