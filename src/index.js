import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactUsForm from './component/contactus/contactus';
import Signup from './component/signup/signup';
import Login from './component/Login/login';
import Footer from './component/footer/footer';
import Navbar from './component/Navbar/navbar';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
<Navbar/>
    <Router>
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/contactus" element={<ContactUsForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />

      </Routes>
    </Router>
    <Footer/>
  </React.StrictMode>
);
