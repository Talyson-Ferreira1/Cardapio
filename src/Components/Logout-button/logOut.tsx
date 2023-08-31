'use client';
import React from 'react';
import { LogOut } from '@/services/authServices';

import './style-logout.css';
const LogoutButton = () => {
  const handleLogout = async () => {
    try {
      await LogOut();
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      Fazer Logout
    </button>
  );
};

export default LogoutButton;
