import React, { useState, useEffect } from 'react';
import { collection, addDoc, deleteDoc, doc, updateDoc, onSnapshot } from 'firebase/firestore';
import { firestore } from '../Firebase/Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Table() {
    const [tasks, setTasks] = useState([]);
    const [newTaskName, setNewTaskName] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const location = useLocation();
    const navigate = useNavigate(); // For navigation
    const { boardId } = location.state || {};

    useEffect(() => {
        if (!boardId) return;
        const taskCollectionRef = collection(firestore, "taskboard");
        const unsubscribe = onSnapshot(taskCollectionRef, (snapshot) => {
            const tasksData = snapshot.docs
                .map(doc => ({ ...doc.data(), id: doc.id }))
                .filter(task => task.boardId === boardId);
            setTasks(tasksData);
        });

        return () => unsubscribe();
    }, [boardId]);

    const addTask = async () => {
        if (!newTaskName || !newTaskDescription || !boardId) return;
        await addDoc(collection(firestore, "taskboard"), {
            name: newTaskName,
            description: newTaskDescription,
            boardId: boardId,
            date: date,
            status: 'To Do'  // Default status
        });
        setNewTaskName('');
        setNewTaskDescription('');
    };

    const deleteTask = async (id) => {
        const taskDocRef = doc(firestore, "taskboard", id);
        await deleteDoc(taskDocRef);
    };

    const updateTaskStatus = async (id, status) => {
        const taskDocRef = doc(firestore, "taskboard", id);
        await updateDoc(taskDocRef, { status: status });
    };

    const handleBack = () => {
        navigate('/dashboard'); // Adjust the path as needed
    };

    return (
        <div className="container-fluid mt-5">
            <div className="row">
                <div className="col-md-12">
                    <button className="btn btn-secondary mb-3" onClick={handleBack}>Back to Dashboard</button>
                    <table className="table table-striped table-bordered table-hover">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Description</th>
                                <th>Date</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.map((task) => (
                                <tr key={task.id}>
                                    <td>{task.name}</td>
                                    <td>{task.description}</td>
                                    <td>{task.date}</td>
                                    <td>
                                        <select
                                            className="form-select"
                                            aria-label="Default select example"
                                            value={task.status}
                                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                                        >
                                            <option value="To Do">To Do</option>
                                            <option value="In Progress">In Progress</option>
                                            <option value="Review">Review</option>
                                            <option value="Done">Done</option>
                                        </select>
                                    </td>
                                    <td>
                                        <button className="btn"><FaEdit /></button>
                                        <button className="btn" onClick={() => deleteTask(task.id)}><FaTrash /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div>
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="Task Name"
                            value={newTaskName}
                            onChange={(e) => setNewTaskName(e.target.value)}
                        />
                        <input
                            className="form-control mb-2"
                            type="text"
                            placeholder="Task Description"
                            value={newTaskDescription}
                            onChange={(e) => setNewTaskDescription(e.target.value)}
                        />
                        <input
                            className="form-control mb-2"
                            type="date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={addTask}>Add Task</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Table;

