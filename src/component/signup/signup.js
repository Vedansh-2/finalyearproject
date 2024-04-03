import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { auth, firestore } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Import setDoc for setting document data
import { useNavigate } from 'react-router-dom';


function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth,email, password);
            await setDoc(doc(firestore, 'users', user.uid), {
              name,
              email,
          });
          navigate('/Login'); // Redirect the user to the dashboard or home page
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    return (
        <>
            <main>  
                <section className="sign-in-form section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">
                                <h1 className="hero-title text-center mb-5">Sign Up</h1>
                                <div className="social-login d-flex flex-column w-50 m-auto">
                                    {/* Social buttons */}
                                </div>
                                <div className="div-separator w-50 m-auto my-5" ><span style={{color: "white"}}>or</span></div>
                                <div className="row">
                                    <div className="col-lg-8 col-11 mx-auto">
                                        <form role="form" method="post" onSubmit={handleSubmit}>
                                            <div className="form-floating my-4">
                                                <input type="text" name="Name" id="Name" className="form-control" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)}/>
                                                <label htmlFor="Name">Name</label>
                                            </div>
                                            <div className="form-floating">
                                                <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" className="form-control" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                <label htmlFor="email">Email address</label>
                                            </div>
                                            <div className="form-floating my-4">
                                                <input type="password" name="password" id="password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <div className="form-floating">
                                                <input type="password" name="confirm_password" id="confirm_password" pattern="[0-9a-zA-Z]{4,10}" className="form-control" placeholder="Password Confirmation" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
                                                <label htmlFor="confirm_password">Password Confirmation</label>
                                            </div>
                                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                            <button type="submit" className="btn custom-btn form-control mt-4 mb-3" style={{border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'blue', color:'white'}}>
                                                Create account
                                            </button>
                                            <p className="text-center">Already have an account? Please <a href="/Login">Sign In</a></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    );
}

export default Signup;