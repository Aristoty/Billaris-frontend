import React from 'react';
import { Link } from 'react-router-dom';

const DashboardPage: React.FC = () => {
  return (
    <div className='container mt-5'>
      <div className='text-center'>
        <h2>Welcome to Your Dashboard</h2>
        <p>Here's an overveiw of your company's dATA:</p>
      </div>

      <div className='row mt-4'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Customer Insights</h5>
              <p className='card-text'>Analyze customer data and behavior for targeted marketing.</p>
              <Link to="/sales" className='btn btn-primary'> View Sales </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Sales Overview</h5>
              <p className='card-text'>View your company's sales performance and trends.</p>
              <Link to="/sales" className='btn btn-primary'> View Sales </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4 '>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Inventory Management</h5>
              <p className='card-text'>manage your product inventory and stock levels.</p>
              <Link to="/sales" className='btn btn-primary'> Manage Inventory </Link>
            </div>
          </div>
        </div>
      </div>

      <div className='row mt-4 mb-4'>
        <div className='col-md-6'>
          <div className='card'>
            <div className='card-body'>
              <h5 className='card-title'>Reports and Analytics</h5>
              <p className='card-text'>Generate Reports and analyse business performance.</p>
              <Link to="/sales" className='btn btn-primary'> View Reports </Link>
            </div>
          </div>
        </div>
      </div>

    </div>

 
  )
}

export default DashboardPage;