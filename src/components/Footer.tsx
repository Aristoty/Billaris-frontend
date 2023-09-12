import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-dark text-light text-center py-3 mt-4">
      <div className='containair d-flex flex-column align-items-center'>
        <p>&copy; {new Date().getFullYear()} Aristoty Entreprise. All rights reserved.</p>
      </div>
      
    </footer>
  );
};

export default Footer;
