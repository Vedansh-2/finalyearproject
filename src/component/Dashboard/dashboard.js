import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot, query, where } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { BiEditAlt, BiTrash } from 'react-icons/bi';
import './dash.scss';

// Dashboard component manages board creation, editing, deletion, and navigation.
function Dashboard() {
  // State hooks to manage board data, form visibility and contents.
  const [boards, setBoards] = useState([]);
  const [newBoardName, setNewBoardName] = useState('');
  const [newBoardDescription, setNewBoardDescription] = useState('');
  const [showCreateBoard, setShowCreateBoard] = useState(false);
  const [editBoardId, setEditBoardId] = useState(null);
  const [editBoardName, setEditBoardName] = useState('');
  const [editBoardDescription, setEditBoardDescription] = useState('');
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Authenticate user and redirect if not logged in.
  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, currentUser => {
      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate('/login');
      }
    });
    return () => unsubscribeAuth();
  }, [navigate]);

  // Check user status if user is logged in if not it will not go to dashboard.
  useEffect(() => {
    if (!user) return;
    const boardRef = collection(firestore, "boards");
    const q = query(boardRef, where("members", "array-contains", user.uid));
    const unsubscribeBoards = onSnapshot(q, snapshot => {
      const boardsData = snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
      setBoards(boardsData);
    });
    return () => unsubscribeBoards();
  }, [user]);

  // Create a new board with input data.
  const createBoard = async () => {
    if (!newBoardName || !newBoardDescription) return;
    await addDoc(collection(firestore, "boards"), {
      name: newBoardName,
      description: newBoardDescription,
      creationDate: new Date().toISOString(),
      adminId: user.uid,
      members: [user.uid]
    });
    setNewBoardName('');
    setNewBoardDescription('');
    setShowCreateBoard(false);
  };

  // Delete a board by ID.
  const deleteBoard = async (id) => {
    const boardDocRef = doc(firestore, "boards", id);
    await deleteDoc(boardDocRef);
  };

  // Start editing a board.
  const startEdit = (board, event) => {
    event.stopPropagation();
    setEditBoardId(board.id);
    setEditBoardName(board.name);
    setEditBoardDescription(board.description);
  };

  // Save board edits to Firestore.
  const saveBoardEdit = async (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!editBoardId || !editBoardName || !editBoardDescription) return;
    const boardDocRef = doc(firestore, "boards", editBoardId);
    await updateDoc(boardDocRef, {
      name: editBoardName,
      description: editBoardDescription
    });
    setEditBoardId(null);
    setEditBoardName('');
    setEditBoardDescription('');
  };

  // Cancel the edit operation.
  const cancelEdit = (event) => {
    event.stopPropagation();
    setEditBoardId(null);
    setEditBoardName('');
    setEditBoardDescription('');
  };

  // Toggle visibility of the create board form.
  const toggleCreateBoard = () => {
    setShowCreateBoard(!showCreateBoard);
  };

  // Cancel creation of a new board.
  const cancelCreateBoard = () => {
    setShowCreateBoard(false);
    setNewBoardName('');
    setNewBoardDescription('');
  };

  // Handle click on a board, navigating to its details.
  const handleBoardClick = (boardId) => {
    if (!editBoardId) {
      navigate('/Table', { state: { boardId: boardId } });
    }
  };

  // Displaying data in a UI component
  return (
    <div className="container h-100" style={{marginTop:"10%", marginBottom:"5%", minHeight: "40vh"}}>
      <div className="row align-items-start">
        <div className="col-12">
          <button className="btn btn-primary mb-3" onClick={toggleCreateBoard}>
            {showCreateBoard ? 'Hide Create Board' : 'Create a Board'}
          </button>
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
            <button className="btn btn-success mb-5" onClick={createBoard}>Create</button>
            <button className="btn btn-secondary ms-2 mb-5" onClick={cancelCreateBoard}>Cancel</button>
          </div>
        )}
        {boards.map((board) => (
          <div key={board.id} className="col-md-6 col-lg-4" onClick={() => handleBoardClick(board.id)}>
            <div className="card bg-danger-subtle text-danger-emphasis mb-3" style={{ maxWidth: '18rem', minHeight: '14rem', maxHeight: '22rem' }}>
              <div className="card-header">
                {editBoardId === board.id ? (
                  <input
                    type="text"
                    className="form-control"
                    value={editBoardName}
                    onChange={(e) => setEditBoardName(e.target.value)}
                  />
                ) : (
                  board.name
                )}
              </div>
              <div className="card-body">
                {editBoardId === board.id ? (
                  <textarea
                    className="form-control"
                    value={editBoardDescription}
                    onChange={(e) => setEditBoardDescription(e.target.value)}
                  />
                ) : (
                  <p className="card-text">{board.description}</p>
                )}
                {user && user.uid === board.adminId && (
                  <>
                    {editBoardId === board.id ? (
                      <>
                        <button className="btn btn-success position-absolute bottom-0 start-0 ms-3" onClick={saveBoardEdit}>Save</button>
                        <button className="btn btn-secondary position-absolute bottom-0 start-50 translate-middle-x" onClick={cancelEdit}>Cancel</button>
                      </>
                    ) : (
                      <>
                        <button className="btn btn-primary position-absolute bottom-0 start-0 ms-2" onClick={(e) => startEdit(board, e)}><BiEditAlt /> Edit</button>
                        <button className="btn btn-danger position-absolute bottom-0 start-50 translate-middle-x ms-3" onClick={(e) => { e.stopPropagation(); deleteBoard(board.id); }}><BiTrash /> Delete</button>
                      </>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
