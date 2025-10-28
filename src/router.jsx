import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './features/auth/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import PublicRoute from './components/PublicRoute';
import Navbar from './components/Navbar';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import Profile from './features/profile/pages/Profile';

const Home = () => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center">
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Bienvenido a la App
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Sistema de autenticación con React y Tailwind CSS
      </p>
      <div className="space-x-4">
        <a
          href="/login"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-md text-lg font-medium"
        >
          Iniciar Sesión
        </a>
        <a
          href="/register"
          className="bg-white hover:bg-gray-50 text-indigo-600 border border-indigo-600 px-6 py-3 rounded-md text-lg font-medium"
        >
          Registrarse
        </a>
      </div>
    </div>
  </div>
);

const AppRouter = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route 
              path="/login" 
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              } 
            />
            <Route 
              path="/register" 
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              } 
            />
            <Route 
              path="/profile" 
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default AppRouter;