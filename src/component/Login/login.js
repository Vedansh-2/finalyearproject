import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

function Login(){
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
return(
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
                <a className="nav-link active" href="/Login" style={{color:"white"}}>Login/Sign Up</a>
              </li>
            </ul>

            <div className="d-none d-lg-block">
              <a href="/Login" className="bi-person custom-icon me-3"></a>
            </div>
          </div>
        </div>
      </nav>   
          <main>

<section class="sign-in-form section-padding">
    <div class="container">
        <div class="row">

            <div class="col-lg-8 mx-auto col-12">

                <h1 class="hero-title text-center mb-5">Sign In</h1>

                <div class="row">
                    <div class="col-lg-8 col-11 mx-auto">
                        <form role="form" method="post">

                            <div class="form-floating mb-4 p-0">
                                <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Email address" required/>

                                <label for="email">Email address</label>
                            </div>

                            <div class="form-floating p-0">
                                <input type="password" name="password" id="password" class="form-control" placeholder="Password" required/>

                                <label for="password">Password</label>
                            </div>

                            <button type="submit" class="btn custom-btn form-control mt-4 mb-3" style={{border: '1px solid rgba(0, 0, 0, 0.6)', backgroundColor: 'red', color:'white'}}>
                                Sign in
                            </button>

                            <p class="text-center">Don’t have an account? <a href="/signup">Create One</a></p>

                        </form>
                    </div>
                </div>
                
            </div>

        </div>
    </div>
</section>

</main>



</>
)
}
export default Login;
