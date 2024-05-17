import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { auth, firestore } from '../Firebase/Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from 'react-router-dom';

function Signup() {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const navigate = useNavigate();
 // Validate the email 
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

        if (password !== confirmPassword) {
            setErrorMessage("Passwords do not match.");
            return;
        }

        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);
            await setDoc(doc(firestore, 'users', user.uid), {
                name,
                email,
            });
            await sendEmailVerification(user);
            setModalMessage("Signup successful! Verification email sent. Please check your email.");
            setShowModal(true);
        } catch (error) {
            setErrorMessage(error.message);
        }
    };

    const closeModalAndNavigate = () => {
        setShowModal(false);
        navigate('/Login');
    };

    return (
        <>
            <main>
                <section className="sign-in-form section-padding">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 mx-auto col-12">
                                <h1 className="hero-title text-center mb-5">Sign Up</h1>
                                <div className="row">
                                    <div className="col-lg-8 col-11 mx-auto">
                                        <form role="form" method="post" onSubmit={handleSubmit}>
                                            <div className="form-floating my-4">
                                                <input type="text" name="Name" id="Name" className="form-control" placeholder="Name" required value={name} onChange={(e) => setName(e.target.value)} />
                                                <label htmlFor="Name">Name</label>
                                            </div>
                                            <div className="form-floating">
                                                <input type="email" name="email" id="email" className="form-control" placeholder="Email address" required value={email} onChange={(e) => setEmail(e.target.value)} />
                                                <label htmlFor="email">Email address</label>
                                            </div>
                                            <div className="form-floating my-4">
                                                <input type="password" name="password" id="password" className="form-control" placeholder="Password" required value={password} onChange={(e) => setPassword(e.target.value)} />
                                                <label htmlFor="password">Password</label>
                                            </div>
                                            <div className="form-floating">
                                                <input type="password" name="confirm_password" id="confirm_password" className="form-control" placeholder="Password Confirmation" required value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                                                <label htmlFor="confirm_password">Password Confirmation</label>
                                            </div>
                                            {errorMessage && <div className="alert alert-danger" role="alert">{errorMessage}</div>}
                                            <button type="submit" className="btn custom-btn form-control mt-4 mb-3" style={{ border: '1px solid rgba(0, 0, 0, 0.1)', backgroundColor: 'blue', color: 'white' }}>
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
                {showModal && (
                    <div className="modal show d-block" tabIndex="-1" role="dialog" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <div className="modal-dialog" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title">Signup Notification</h5>
                                </div>
                                <div className="modal-body">
                                    <p>{modalMessage}</p>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" onClick={closeModalAndNavigate}>OK</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </>
    );
}

export default Signup;
