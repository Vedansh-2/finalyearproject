import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { signInWithEmailAndPassword } from "firebase/auth"; // Import the Firebase auth function
import { auth } from '../Firebase/Firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

        try {
            // Use signInWithEmailAndPassword to authenticate the user
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/';
        } catch (error) {
            setErrorMessage(error.message); // Update the UI with an error message
        }
    };

    return (
        <>
            <main>
                <section className="sign-in-form section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">
                                <h1 className="hero-title text-center mb-5">Sign In</h1>
                                <div className="row">
                                    <div className="col-lg-8 col-11 mx-auto">
                                        <form role="form" method="post" onSubmit={handleSubmit}>
                                            <div className="form-floating mb-4 p-0">
                                                <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)}/>
                                                <label htmlFor="email">Email address</label>
                                            </div>

                                            <div className="form-floating p-0">
                                                <input type="password" name="password" id="password" className="form-control" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)}/>
                                                <label htmlFor="password">Password</label>
                                            </div>

                                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}

                                            <button type="submit" className="btn custom-btn form-control mt-4 mb-3" style={{border: '1px solid rgba(0, 0, 0, 0.6)', backgroundColor: 'red', color:'white'}}>
                                                Sign in
                                            </button>

                                            <p className="text-center">Don’t have an account? <a href="/signup">Create One</a></p>
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

export default Login;
