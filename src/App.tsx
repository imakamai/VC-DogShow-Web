import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';

import { AuthProvider } from './context/AuthContext';

import Dogs from './pages/Dogs';
import Apply from './pages/Apply';
import Profile from './pages/Profile';
import Pricing from './pages/Pricing';
import Competitions from './pages/Competitions';
import AddDog from './pages/AddDog';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dogs" element={
              <ProtectedRoute>
                <Dogs />
              </ProtectedRoute>
            } />
            <Route path="/add-dog" element={
              <ProtectedRoute>
                <AddDog />
              </ProtectedRoute>
            } />
            <Route path="/apply" element={
              <ProtectedRoute>
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
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
