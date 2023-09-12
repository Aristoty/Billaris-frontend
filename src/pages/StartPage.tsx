import React from "react";
import { Link } from 'react-router-dom';

const StartPage: React.FC = () => {
  return (
    <div className="container mt-5">
      <div className="text-center">
        <h1>Get Started with BILLARIS</h1>
        <p>Choose an option to proceed:</p>
        <div>
          <div className="mb-3">
            <Link className="btn btn-primary btn-lg" to="/create-company">Create Company</Link>
          </div>
          <div className="mb-3">
            <Link className="btn btn-info btn-lg" to="/your-companies">Your Companies</Link>
          </div>
          <div className="mb-3">
            <Link className="btn btn-outline-success btn-lg" to="/dashboard">View Dashboard</Link>
          </div>
          <div className="mb-3">
            <Link className="btn btn-success btn-lg" to="/create-invoice">Create Invoice</Link>
          </div>
        </div>

      </div>

    </div>
  )
}

export default StartPage;