import { Route, Navigate } from 'react-router-dom';
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem('isLogged');

  return isLoggedIn ? children : <Navigate to='/' />;
};

export default ProtectedRoute;
