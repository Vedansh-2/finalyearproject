import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
// Assuming these images are used within this component. If not, remove the unused imports.
import Image1 from "../../assets/images/Image1.webp";
// import other images if needed

function ContactUsForm() {
    const [isNavCollapsed, setIsNavCollapsed] = useState(true);

    const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed); 

    return (
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
                                <a className="nav-link" href="#introduction" style={{color:"white"}}>About us</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link active" href="/contactus" style={{color:"white"}}>Contact us</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link" href="/login" style={{color:"white"}}>Login/Sign Up</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>   

            <section className="contact section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 col-12">
                            <h2 className="mb-4">Let's <span>begin</span></h2>

                            <form className="contact-form me-lg-5 pe-lg-3" role="form">
                                <div className="form-floating">
                                    <input type="text" name="name" id="name" className="form-control" placeholder="Full name" required/>
                                    <label htmlFor="name">Full name</label>
                                </div>

                                <div className="form-floating my-4">
                                    <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email address" required/>
                                    <label htmlFor="email">Email address</label>
                                </div>
                                
                                <div className="form-floating my-4">
                                    <input type="subject" name="subject" id="subject" className="form-control" placeholder="Subject" required/>
                                    <label htmlFor="subject">Subject</label>
                                </div>

                                <div className="form-floating mb-4">
                                    <textarea id="message" name="message" className="form-control" placeholder="Leave a comment here" required style={{height: "160px"}}></textarea>
                                    <label htmlFor="message">Tell us about the project</label>
                                </div>

                                <button type="submit" className="btn btn-primary form-control mt-4 mb-3" style={{color:'white'}}>Send</button>
                            </form>
                        </div>

                        <div className="col-lg-6 col-12 mt-5 ms-auto">
                            <div className="row">
                                <div className="col-6 border-end contact-info">
                                    <h6 className="mb-3">New Business Contact us </h6>
                                    <a href="mailto:w1855183@my.westminster.ac.uk" className="custom-link">
                                        w1855183@my.westminster.ac.uk
                                        <i className="bi-arrow-right ms-2"></i>
                                    </a>
                                </div>

                                {/* Additional contact info sections if needed */}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

export default ContactUsForm;
