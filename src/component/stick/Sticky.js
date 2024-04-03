import React, { useState } from 'react';
import './Sticky.css'; // Make sure this path is correct

function Sticky() {
  const [notes, setNotes] = useState([]);
  const [input, setInput] = useState({ title: '', content: '' });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
  };

  const addNote = (event) => {
    event.preventDefault();
    if (input.title || input.content) {
      setNotes([...notes, { ...input, id: Date.now() }]);
      setInput({ title: '', content: '' });
    }
  };

  const deleteNote = (idToDelete) => {
    setNotes(notes.filter((note) => note.id !== idToDelete));
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

