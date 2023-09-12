// src/components/Navigation.js
import React from 'react';
import { useNavigate } from 'react-router-dom';


const LogoutButton = () => {

    const navigate = useNavigate();

  const handleLogout = () => {
    window.localStorage.removeItem("token"); // Appelle la méthode de déconnexion du service d'authentification
    window.localStorage.clear();
    navigate( "/login")
    };

  return (
    <nav>


          <button type="button" className="btn btn-success" onClick={handleLogout}>Logout</button>


    </nav>
  );
};

export default LogoutButton;
