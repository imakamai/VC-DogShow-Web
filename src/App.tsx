import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

import Dogs from './pages/Dogs';
import Apply from './pages/Apply';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Competitions from './pages/Competitions';
import AddDog from './pages/AddDog';
import CreateCompetition from './pages/CreateCompetition';
import AdminDashboard from './pages/AdminDashboard';
import ManagerDashboard from './pages/ManagerDashboard';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dogs" element={
                <ProtectedRoute allowedRoles={['User']}>
                  <Dogs />
                </ProtectedRoute>
              } />
              <Route path="/add-dog" element={
                <ProtectedRoute allowedRoles={['User']}>
                  <AddDog />
                </ProtectedRoute>
              } />
              <Route path="/apply" element={
                <ProtectedRoute allowedRoles={['User']}>
                  <Apply />
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/competitions" element={<Competitions />} />
              <Route path="/create-competition" element={
                <ProtectedRoute allowedRoles={['Manager', 'Admin']}>
                  <CreateCompetition />
                </ProtectedRoute>
              } />
              <Route path="/admin" element={
                <ProtectedRoute allowedRoles={['Admin']}>
                  <AdminDashboard />
                </ProtectedRoute>
              } />
              <Route path="/manager" element={
                <ProtectedRoute allowedRoles={['Manager', 'Admin']}>
                  <ManagerDashboard />
                </ProtectedRoute>
              } />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
