import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Navbar(){
return(
  <>
      <nav class="navbar navbar-expand-lg">
    <div class="container">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <a class="navbar-brand" href="/">
            <strong style={{color:"white"}}><span style={{color:"black"}}>Ways</span>2Track</strong>
        </a>

        <div class="d-lg-none">
            <a href="sign-in.html" class="bi-person custom-icon me-3"></a>

            <a href="product-detail.html" class="bi-bag custom-icon"></a>
        </div>

        <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav mx-auto">
                <li class="nav-item">
                    <a class="nav-link " href="/" style={{color:"white"}}>Home</a>
                </li>
 
                {/* <li class="nav-item">
    n                 <a class="nav-link" href="#introduction" style={{color:"white"}}>About us</a>
                 </li> */}

                <li class="nav-item">
                <a class="nav-link" href="/contactus" style={{color:"white"}}>Contact us</a>
                </li>

                <li class="nav-item">
                    <a class="nav-link" href="/Login" style={{color:"white"}}>Login/Sign Up</a>
                </li>
            </ul>

            <div class="d-none d-lg-block">
                <a href="/Login" class="bi-person custom-icon me-3"></a>

            </div>
        </div>
    </div>
</nav>
     

  </>
)
}
export default Navbar;