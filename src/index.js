import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ContactUsForm from './component/contactus/contactus';
import Signup from './component/signup/signup';
import Login from './component/Login/login';
import Footer from './component/footer/footer';
import Board from './component/Board/Board';
import Sticky from './component/stick/Sticky';
import Navbar from './component/Navbar/navbar';
import Aboutus from './component/Aboutus/aboutus';
import Dashboard from './component/Dashboard/dashboard';
import Kb from './component/KB/kb';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />}/>
        <Route path="/contactus" element={<ContactUsForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Board" element={<Board />} />
        <Route path="/sticky" element={<Sticky />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path='/kb' element={<Kb />} />
        

      </Routes>
    </Router>
    <Footer/>
  </React.StrictMode>
);
