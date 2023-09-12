import React, { useState, lazy, ReactNode, FC } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';


import Home from '../pages/Home';
import ProductsPage from '../pages/ProductsPage';
import ContactPage from '../pages/ContactPage';
import StartPage from '../pages/StartPage';
import CreateCompanyPage from '../pages/companies/CreateCompanyPage';
import DashboardPage from '../pages/DashboardPage';
import CompanyHomePage from '../pages/companies/CompanyHomePage';
import LoginPage from '../pages/Auth/LoginPage';
import RegisterPage from '../pages/Auth/RegisterPage';
import MessagesPage from '../pages/MessagesPage';
import AuthGuard from './auth.guard';
import LoginPageAlert from '../pages/Auth/LoginPageAlert';
import CreateInvoicePage from '../pages/invoices/CreateInvoicePage';
import YourCompaniesPage from '../pages/companies/YourCompaniesPage';




function App() {

  

  return (      

      <Router>
        


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactPage />} />
        
        <Route path="/login" element={<LoginPage />} />
        <Route path='/loginAlert' element={<LoginPageAlert/>}/>
        <Route path='/Register' element={<RegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        

        {/*protected Routes*/}

        <Route element={<AuthGuard />}>
          
          <Route path="/user/:userId/start" element={<StartPage />} />
          <Route path="/messages" element={<MessagesPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/create-company" element={<CreateCompanyPage />} />
          <Route path="/company/:companyId/:companyName" element={<CompanyHomePage />} />
          <Route path="/your-companies" element={<YourCompaniesPage />} />

          <Route path='/create-invoice/:companyId' element={<CreateInvoicePage/>} />
        </Route>


        </Routes>


  

      </Router>

  );
}

export default App;
