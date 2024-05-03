import React, { useEffect, useState } from 'react';
import './profile.css';
import { auth, firestore } from '../Firebase/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

function Profile() {
    const [userProfile, setUserProfile] = useState({
        name: '',
        email: '',
        dob: '',
        country: ''
    });
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const docRef = doc(firestore, "users", user.uid);
                try {
                    const docSnap = await getDoc(docRef);
                    if (docSnap.exists()) {
                        setUserProfile({
                            name: docSnap.data().name,
                            email: user.email,
                            dob: docSnap.data().dob || '',
                            country: docSnap.data().country || ''
                        });
                    } else {
                        setError('No such document!');
                    }
                } catch (err) {
                    setError('Failed to fetch user data');
                    console.error(err);
                }
            } else {
                setError('User is not logged in');
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const handleEdit = () => {
        setEditMode(true);
    };

    const handleSave = async () => {
        setEditMode(false);
        setLoading(true);
        const user = auth.currentUser;
        if (user) {
            const docRef = doc(firestore, "users", user.uid);
            await updateDoc(docRef, {
                name: userProfile.name,
                email: userProfile.email,  // Assuming you have permissions to update email which usually isn't the case
                dob: userProfile.dob,
                country: userProfile.country
            });
        }
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserProfile(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="page-content page-container" id="page-content">
            <div className="padding">
                <div className="row container d-flex justify-content-center">
                    <div className="col-xl-6 col-md-12">
                        <div className="card user-card-full">
                            <div className="row m-l-0 m-r-0">
                                <div className="col-sm-4 bg-c-lite-green user-profile">
                                    <div className="card-block text-center text-white">
                                        <div className="m-b-25">
                                            <img src="https://img.icons8.com/bubbles/100/000000/user.png" className="img-radius" alt="User-Profile"/>
                                        </div>
                                        <h6 className="f-w-600">{userProfile.name}</h6>
                                        
                                    </div>
                                </div>
                                <div className="col-sm-8">
                                    <div className="card-block">
                                        <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                        {editMode ? (
                                            <>
                                                <div className="row">
                                                    <div className="col-sm-6 form-group">
                                                        <label>Name</label>
                                                        <input type="text" className="form-control" value={userProfile.name} name="name" onChange={handleChange} />
                                                    </div>
                                                    <div className="col-sm-6 form-group">
                                                        <label>Email</label>
                                                        <input type="email" className="form-control" value={userProfile.email} name="email"  disabled/>
                                                    </div>
                                                </div>
                                                <div className="row">
                                                    <div className="col-sm-6 form-group">
                                                        <label>Date of Birth</label>
                                                        <input type="date" className="form-control" value={userProfile.dob} name="dob" onChange={handleChange} />
                                                    </div>
                                                    <div className="col-sm-6 form-group">
                                                        <label>Country</label>
                                                        <input type="text" className="form-control" value={userProfile.country} name="country" onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <button onClick={handleSave} className="btn btn-success">Save</button>
                                            </>
                                        ) : (
                                            <>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Email</p>
                                                        <h6 className="text-muted f-w-400">{userProfile.email}</h6>
                                                    </div>
                                                  
                                                
                                                <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">country</p>
                                                        <h6 className="text-muted f-w-400">{userProfile.country}</h6>
                                                    </div>
                                                    <div className="col-sm-6">
                                                        <p className="m-b-10 f-w-600">Date of Birth</p>
                                                        <h6 className="text-muted f-w-400">{userProfile.dob}</h6>
                                                    </div>
                                                <button onClick={handleEdit} className="btn btn-primary">Edit</button>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profile;
