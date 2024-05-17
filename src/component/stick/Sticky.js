import React, { useState, useEffect } from 'react';
import './Sticky.css';
import { useNavigate } from 'react-router-dom'; // for redirection
import { firestore, auth } from '../Firebase/Firebase';
import { collection, getDocs, addDoc, doc, deleteDoc } from 'firebase/firestore';

function Sticky() {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState({ title: '', content: '' });

  // Authentication check and redirection
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (!user) {
        navigate('/login'); // Redirect to login page if not logged in
      }
    });
    return () => unsubscribe(); // Cleanup the subscription
  }, [navigate]);

  // Fetching notes from Firestore
  useEffect(() => {
    const fetchNotes = async () => {
      const notesCollectionRef = collection(firestore, 'notes');
      const response = await getDocs(notesCollectionRef);
      const fetchedNotes = response.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setNotes(fetchedNotes);
    };

    fetchNotes();
  }, []);

  // Handling input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput(prevInput => ({
      ...prevInput,
      [name]: value,
    }));
  };

  // Adding a new note to Firestore
  const addNote = async (event) => {
    event.preventDefault();
    if (input.title || input.content) {
      const notesCollectionRef = collection(firestore, 'notes');
      const newNote = { ...input, timestamp: Date.now() };
      const docRef = await addDoc(notesCollectionRef, newNote);
      setNotes([...notes, { ...newNote, id: docRef.id }]);
      setInput({ title: '', content: '' });
    }
  };

  // Deleting a note from Firestore
  const deleteNote = async (idToDelete) => {
    const noteDocRef = doc(firestore, 'notes', idToDelete);
    await deleteDoc(noteDocRef);
    setNotes(notes.filter(note => note.id !== idToDelete));
  };

  // Render the component
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
