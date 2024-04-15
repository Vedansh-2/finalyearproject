import React, { useState, useEffect } from 'react';
import { collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';  // Import the authentication library
import './dash.scss';

function Dashboard() {
    const [boards, setBoards] = useState([]);
    const [newBoardName, setNewBoardName] = useState('');
    const [newBoardDescription, setNewBoardDescription] = useState('');
    const [showCreateBoard, setShowCreateBoard] = useState(false); // State to toggle input visibility
    const navigate = useNavigate();
    const auth = getAuth();  // Firebase Authentication instance
    const user = auth.currentUser; // Currently logged-in user

    useEffect(() => {
        if (!user) return; // Ensure there is a user logged in
        const boardRef = collection(firestore, "boards");
        const q = query(boardRef, where("members", "array-contains", user.uid));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const boardsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setBoards(boardsData);
        });

        return () => unsubscribe();
    }, [user]);

    const createBoard = async () => {
        if (!newBoardName || !newBoardDescription) return;
        await addDoc(collection(firestore, "boards"), {
            name: newBoardName,
            description: newBoardDescription,
            creationDate: new Date().toISOString(),
            adminId: user.uid, // Save the creator as 'admin'
            members: [user.uid] // Also add the creator to the members list
        });
        setNewBoardName('');
        setNewBoardDescription('');
        setShowCreateBoard(false); // Hide inputs after creation
    };

    const toggleCreateBoard = () => {
        setShowCreateBoard(!showCreateBoard);
    };

    const cancelCreateBoard = () => {
        setShowCreateBoard(false);
        setNewBoardName('');
        setNewBoardDescription('');
    };

    return (
        <div className="container h-100">
            <div className="row align-items-start">
                <div className="col-12">
                    <button className="btn btn-primary mb-3" onClick={toggleCreateBoard}>Create a Board</button>
                </div>
                {showCreateBoard && (
                    <div className="col-12">
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Board Name"
                            value={newBoardName}
                            onChange={(e) => setNewBoardName(e.target.value)}
                        />
                        <textarea
                            className="form-control mb-2"
                            placeholder="Board Description"
                            value={newBoardDescription}
                            onChange={(e) => setNewBoardDescription(e.target.value)}
                        />
                        <button className="btn btn-success" onClick={createBoard}>Create</button>
                        <button className="btn btn-secondary" onClick={cancelCreateBoard}>Cancel</button>
                    </div>
                )}
                {boards.map((board) => (
                    <div key={board.id} className={`col-md-6 col-lg-4 ${getCardClassName()}`} onClick={() => navigate('/Table', { state: { boardId: board.id } })}>
                        <div className="card">
                            <div className="txt">
                                <h1>{board.name}</h1>
                                <p>{board.description}</p>
                            </div>
                            <a href="#" onClick={(e) => { e.preventDefault(); console.log('Remove or view user function here'); }}>Remove Me</a>
                            <div className="ico-card">
                                <i className="fa fa-rebel"></i>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

const getCardClassName = () => {
    const gradients = ['gr-1', 'gr-2', 'gr-3'];
    return gradients[Math.floor(Math.random() * gradients.length)];
};

export default Dashboard;
