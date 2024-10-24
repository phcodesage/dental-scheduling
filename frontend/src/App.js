import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import BookingPage from './pages/BookingPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';  // Import the ProtectedRoute component
import { setupAxiosInterceptor } from './services/axiosConfig';

const App = () => {
  useEffect(() => {
    setupAxiosInterceptor();
  }, []);

  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* Protect BookingPage and DashboardPage */}
        <Route path="/booking" element={<ProtectedRoute element={BookingPage} />} />
        <Route path="/dashboard" element={<ProtectedRoute element={DashboardPage} />} />
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
      </Routes>
    </Router>
  );
};

export default App;
