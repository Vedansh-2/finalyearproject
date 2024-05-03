// Import necessary React libraries and CSS
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

// Import App component and other necessary components
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactUsForm from './component/contactus/contactus';
import Signup from './component/signup/signup';
import Login from './component/Login/login';
import Footer from './component/footer/footer';
import Sticky from './component/stick/Sticky';
import Navbar from './component/Navbar/navbar';
import Aboutus from './component/Aboutus/aboutus';
import Dashboard from './component/Dashboard/dashboard';
import Table from './component/Table/Table';
import Profile from './component/Profile/Profile';

// Create a root element where the React application will attach
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the React application within the root element
root.render(
  <React.StrictMode>
    <Router>
      {/* Navbar component displayed on all pages */}
      <Navbar />

      {/* Router setup for handling different routes */}
      <Routes>
        {/* Route for the home page */}
        <Route path="/" element={<App />}/>
        {/* Route for the contact us page */}
        <Route path="/contactus" element={<ContactUsForm />} />
        {/* Route for the signup page */}
        <Route path="/signup" element={<Signup />} />
        {/* Route for the login page */}
        <Route path="/Login" element={<Login />} />
        {/* Route for a sticky feature, possibly a sticky header or footer */}
        <Route path="/sticky" element={<Sticky />} />
        {/* Route for the about us page */}
        <Route path="/aboutus" element={<Aboutus />} />
        {/* Route for the user dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
        {/* Route for a table component, possibly displaying data */}
        <Route path='/Table' element={<Table/>} />
        {/* Route for the user profile page */}
        <Route path='/Profile' element={<Profile/>} />
      </Routes>

      {/* Footer component displayed on all pages */}
      <Footer/>
    </Router>
  </React.StrictMode>
);
