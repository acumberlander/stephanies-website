import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoadingPage from '../../Pages/LoadingPage/LoadingPage';

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated, isAdmin, status } = useSelector(state => state.user);
  
  // Show loading while authentication status is being determined
  if (status === 'loading') {
    return <LoadingPage />;
  }
  
  // If admin access is required, check both authentication and admin status
  if (requireAdmin && (!isAuthenticated || !isAdmin)) {
    return <Navigate to="/" replace />;
  }
  
  // For routes that just require authentication
  if (!requireAdmin && !isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  
  return children;
};

export default ProtectedRoute;