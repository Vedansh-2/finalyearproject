import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../Firebase/Firebase';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [modalMessage, setModalMessage] = useState('');
    const [showModal, setShowModal] = useState(false);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const validatePassword = (password) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateEmail(email)) {
            setErrorMessage("Please enter a valid email address.");
            return;
        }

        if (!validatePassword(password)) {
            setErrorMessage("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.");
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = '/';
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const handleResetPassword = async () => {
        if (!email) {
            setModalMessage("Please enter your email to reset your password.");
            setShowModal(true);
            return;
        }

        try {
            await sendPasswordResetEmail(auth, email);
            setModalMessage("Password reset email sent!");
            setShowModal(true);
        } catch (error) {
            setModalMessage(error.message);
            setShowModal(true);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <main>
                <section className="sign-in-form section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">
                                <h1 className="hero-title text-center mb-5">Login</h1>
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

                                            <button type="submit" className="btn custom-btn form-control mt-4 mb-3" style={{border: '1px solid rgba(0, 0, 0, 0.6)', backgroundColor: 'red', color: 'white'}}>
                                                Sign in
                                            </button>

                                            <p className="text-center">
                                                <a href="#" onClick={handleResetPassword} style={{ textDecoration: 'none', color: 'blue' }}>Forgot Password?</a>
                                            </p>

                                            <p className="text-center">Don’t have an account? <a href="/signup">Create One</a></p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Notification</h5>
                                </div>
                                <div className="modal-body">
                                    <p>{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default Login;

