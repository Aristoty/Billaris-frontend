import React from 'react';
import { Link } from 'react-router-dom';

interface HeaderProps {
  isAuthenticated: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogout }) => {
  return (
    <header className="bg-primary py-3">
      <nav className="container navbar navbar-expand-lg navbar-light">
        <Link to="/" className="navbar-brand text-light">Billaris</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
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
                <button className="btn btn-outline-light" onClick={onLogout}>Déconnexion</button>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="btn btn-outline-light" to="/login">Connexion</Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
