import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from "react";

function Signup(){
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);
return(
    <>
    <main>  
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
<section class="sign-in-form section-padding">
    <div class="container">
        <div class="row">

            <div class="col-lg-8 mx-auto col-12">

                <h1 class="hero-title text-center mb-5">Sign Up</h1>

                <div class="social-login d-flex flex-column w-50 m-auto">
                    
                    <a style={{border: '1px solid rgba(0, 0, 0, 0.1)'}}href="#" class="btn custom-btn social-btn mb-4">
                        <i class="bi bi-google me-3" style={{color: "red"}}></i>

                        Continue with Google
                    </a>

                    <a style={{border: '1px solid rgba(0, 0, 0, 0.1)'}} href="#" class="btn custom-btn social-btn">
                        <i class="bi bi-facebook me-3" style={{color: "blue"}}></i>

                        Continue with Facebook
                    </a>
                </div>

                <div class="div-separator w-50 m-auto my-5" ><span style={{color: "white"}}>or</span></div>

                <div class="row">
                    <div class="col-lg-8 col-11 mx-auto">
                        <form role="form" method="post">

                            <div class="form-floating">
                                <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Email address" required/>

                                <label for="email">Email address</label>
                            </div>

                            <div class="form-floating my-4">
                                <input type="password" name="password" id="password" pattern="[0-9a-zA-Z]{4,10}" class="form-control" placeholder="Password" required/>

                                <label for="password">Password</label>
                                
                                <p class="text-center">* shall include 0-9 a-z A-Z in 4 to 10 characters</p>
                            </div>

                            <div class="form-floating">
                                <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" class="form-control" placeholder="Password" required/>

                                <label for="confirm_password">Password Confirmation</label>
                            </div>

                            <button type="submit" class="btn custom-btn form-control mt-4 mb-3" style={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'blue', color:'white'}}>
                                Create account
                            </button>

                            <p class="text-center">Already have an account? Please <a href="/Login">Sign In</a></p>

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
export default Signup;