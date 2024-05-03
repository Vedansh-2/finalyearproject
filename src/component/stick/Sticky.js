import React, { useState, useEffect } from 'react';
import './Sticky.css';
import { firestore, auth } from '../Firebase/Firebase';
import { collection, query, where, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';
import { onAuthStateChanged } from "firebase/auth";

function Sticky() {
  const [user, setUser] = useState(null);
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState({ title: '', content: '' });

  useEffect(() => {
    
    const unsubscribe = onAuthStateChanged(auth, currentUser => {
      setUser(currentUser); // Set the user state
      if (currentUser) {
        fetchNotes(currentUser.uid); // Fetch notes only when user is logged in
      } else {
        setNotes([]); // Clear notes when no user is logged in
      }
    });

    return () => unsubscribe(); // Clean up the listener on component unmount
  }, []);

  const fetchNotes = async (userId) => {
    const notesCollectionRef = collection(firestore, 'notes');
    const q = query(notesCollectionRef, where("userId", "==", userId));
    const response = await getDocs(q);
    const fetchedNotes = response.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setNotes(fetchedNotes);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const addNote = async (event) => {
    event.preventDefault();
    if (user && (input.title || input.content)) {
      const notesCollectionRef = collection(firestore, 'notes');
      const newNote = { ...input, timestamp: Date.now(), userId: user.uid };
      const docRef = await addDoc(notesCollectionRef, newNote);
      setNotes([...notes, { ...newNote, id: docRef.id }]);
      setInput({ title: '', content: '' });
    }
  };

  const deleteNote = async (idToDelete) => {
    const noteDocRef = doc(firestore, 'notes', idToDelete);
    await deleteDoc(noteDocRef);
    setNotes(notes.filter(note => note.id !== idToDelete));
  };

  return (
    <div>
      <form onSubmit={addNote} className="note-form">
        <input
          type="text"
          className="note-title"
          name="title"
          value={input.title}
          onChange={handleChange}
          placeholder="Title"
        />
        <textarea
          className="note-content"
          name="content"
          value={input.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <button type="submit" className="add-note-button">Add Note</button>
      </form>

      <div className="note-container">
        {notes.map((note) => (
          <div key={note.id} className="note">
            <h1 className="note-title-display">{note.title}</h1>
            <p className="note-content-display">{note.content}</p>
            <div className="note-buttons">
              <button className="note-delete-button" onClick={() => deleteNote(note.id)}>x</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sticky;
