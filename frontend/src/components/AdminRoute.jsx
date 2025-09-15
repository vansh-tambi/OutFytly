import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AdminRoute = () => {
  const { user } = useContext(AuthContext);

  // This check is important for when the user state is still loading.
  // We can add a proper loading spinner here if needed.
  if (user === undefined) {
    return <div>Loading...</div>; // Or a spinner component
  }

  // If a user exists and they are an admin, render the child route (Outlet).
  // Otherwise, redirect them to the home page.
  return user && user.isAdmin ? <Outlet /> : <Navigate to="/" replace />;
};

export default AdminRoute;