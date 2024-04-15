import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { auth } from "../Firebase/Firebase";
import { signOut } from "firebase/auth";


function NavBar() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up the listener
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth); // Call Firebase signOut method to log the user out
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <Navbar collapseOnSelect expand="lg" variant="dark" style={{ backgroundColor: '#e41919' }}>
      <Container>
     
      <a className="navbar-brand" href="/">
            <strong style={{color:"white"}}><span style={{color:"black"}}>Ways</span>2Track</strong>
          </a>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/" style={{color:'white'}} >Home</Nav.Link>
            <Nav.Link href="/aboutus" style={{color:'white'}} >About us</Nav.Link>
            {user && <Nav.Link href="/dashboard" style={{color:'white'}} >Dashboard</Nav.Link>} {/* Only show when user is logged in */}
            <Nav.Link href="/contactus" style={{color:'white'}} >Contact us</Nav.Link>
          </Nav>
          <Nav>
            {!user ? (
              <Nav.Link href="/Login" style={{color:'white'}} >Login/Sign Up</Nav.Link>
            ) : (
              <div className="d-flex align-items-center">
                <NavDropdown title={<i className="bi-person" style={{ fontSize: '1.5rem', color: 'white' }}></i>} id="collapsible-nav-dropdown" align="end">
                  <NavDropdown.Item href="#" onClick={handleLogout}>Logout</NavDropdown.Item>
                </NavDropdown>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;