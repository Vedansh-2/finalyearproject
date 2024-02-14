import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar() {
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <button className="navbar-toggler" type="button" onClick={handleNavCollapse} aria-controls="navbarNav" aria-expanded={!isNavCollapsed} aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <a className="navbar-brand" href="/">
            <strong style={{color:"white"}}><span style={{color:"black"}}>Ways</span>2Track</strong>
          </a>
          <div className={`collapse navbar-collapse ${isNavCollapsed ? '' : 'show'}`} id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <a className="nav-link" href="/" style={{color:"white"}}>Home</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="introduction" style={{color:"white"}}>About us</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contactus" style={{color:"white"}}>Contact us</a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/Login" style={{color:"white"}}>Login/Sign Up</a>
              </li>
            </ul>

            <div className="d-none d-lg-block">
              <a href="/Login" className="bi-person custom-icon me-3"></a>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
