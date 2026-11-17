import React, { createContext, useState, useEffect } from 'react';
import axiosClient from '../api/axiosClient';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Verificar si hay sesión activa al recargar la página
  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem('access_token');
      if (token) {
        try {
          const response = await axiosClient.get('/auth/me');
          setUser(response.data);
        } catch (error) {
          console.error("Sesión expirada o inválida", error);
          logout();
        }
      }
      setLoading(false);
    };
    verifyUser();
  }, []);

  // Función de Login
  const login = async (email, password) => {
    try {
      const response = await axiosClient.post('/auth/login', { email, password });
      const { access_token } = response.data;
      
      localStorage.setItem('access_token', access_token);
      
      // Obtener datos del usuario tras iniciar sesión
      const userResponse = await axiosClient.get('/auth/me');
      setUser(userResponse.data);
      return { success: true };
    } catch (error) {
      return { 
        success: false, 
        message: error.response?.data?.detail || "Error al iniciar sesión" 
      };
    }
  };

  // Función de Logout
  const logout = async () => {
    try {
      await axiosClient.post('/auth/logout');
    } catch (error) {
      console.error("Error al revocar sesión en el backend", error);
    } finally {
      localStorage.removeItem('access_token');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};