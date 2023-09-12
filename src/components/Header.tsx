
import React from "react";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";


interface HeaderProps {
    isAuthenticated: boolean;
    
  }


  const Header: React.FC<HeaderProps> = ({ isAuthenticated }) => {
  
    return (
      <header className="bg-primary py-3 mb-4">
      <nav className="container d-flex justify-content-between align-items-center">
        <Link to="/" className="navbar-brand text-light">
          <h1 className="display-4">BILLARIS</h1>
        </Link>
        <ul className="nav d-flex">
          <li className="nav-item">
            <Link className="nav-link text-light" to="/">Accueil</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/products">Produits</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link text-light" to="/contact">Contact</Link>
          </li>
          {isAuthenticated ? (
            <li className="nav-item">
              <LogoutButton />
            </li>
          ) : (
            <li className="nav-item">
              <Link className="btn btn-outline-light" to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
    );
  };

export default Header;