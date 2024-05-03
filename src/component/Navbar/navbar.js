import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { auth, firestore as db} from "../Firebase/Firebase";
import { signOut } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

function NavBar() {
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (user) {
      // user has a property uid that is the document ID in the Firestore collection
      const getUserData = async () => {
        const userDoc = doc(db, 'users', user.uid);
        const docSnap = await getDoc(userDoc);

        if (docSnap.exists()) {
          setUserName(docSnap.data().name); // the field storing the user's name is called 'name'
        } else {
          console.log("No such document!");
        }
      };

      getUserData();
    }
    const unsubscribe = auth.onAuthStateChanged(currentUser => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // Clean up the listener
  }, [user]);

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
          <Nav className="me-auto text-nowrap">
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
              <NavDropdown
                title={
                  <>
                    <i className="bi-person ps-1" style={{ fontSize: '1rem', color: 'white' }}></i>
                    <span style={{ marginLeft: '5px', color: 'white' }}>{userName}</span>
                  </>
                }
                id="collapsible-nav-dropdown"
                align="end"
              >
                <NavDropdown.Item href="/Profile">Profile</NavDropdown.Item>
                <NavDropdown.Item href="/Login" onClick={handleLogout}>Logout</NavDropdown.Item>

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