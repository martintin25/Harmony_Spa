import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <div>Cargando perfil...</div>;

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #eaeaea', paddingBottom: '20px', marginBottom: '30px' }}>
        <h1>Harmony Spa - Panel de Control</h1>
        <button 
          onClick={logout} 
          style={{ backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Cerrar Sesión
        </button>
      </header>

      <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', maxWidth: '600px' }}>
        <h2>Bienvenido, {user.first_name} {user.last_name}</h2>
        <p style={{ color: '#666', marginBottom: '20px' }}>Rol en el sistema: <strong>{user.role}</strong></p>
        
        <ul style={{ lineHeight: '1.8', listStyle: 'none', padding: 0 }}>
          <li><strong>Correo electrónico:</strong> {user.email}</li>
          <li><strong>Teléfono:</strong> {user.phone || 'No registrado'}</li>
          <li><strong>Estado de cuenta:</strong> {user.is_active ? 'Activa ✅' : 'Inactiva ❌'}</li>
          <li><strong>Miembro desde:</strong> {new Date(user.created_at).toLocaleDateString()}</li>
        </ul>
      </div>
    </div>
  );
}