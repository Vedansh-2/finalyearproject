// Card.js
import React, { useState } from 'react';

function Card({ cardData, deleteCard, updateCard }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(cardData.Summary);

    return (
        <div className="card-content">
            {isEditing ? (
                <input 
                    type="text" 
                    value={editText} 
                    onChange={(e) => setEditText(e.target.value)} 
                    className="form-control mb-2"
                />
            ) : (
                <div>{cardData.Summary}</div>
            )}
            <div>
                {isEditing ? (
                    <button 
                        onClick={() => {
                            updateCard(cardData.id, editText);
                            setIsEditing(false);
                        }} 
                        className="btn btn-sm btn-success"
                    >
                        Save
                    </button>
                ) : (
                    <button onClick={() => setIsEditing(true)} className="btn btn-sm btn-primary">Edit</button>
                )}
                <button onClick={() => deleteCard(cardData.id)} className="btn btn-sm btn-danger">Delete</button>
            </div>
        </div>
    );
}

export default Card;
