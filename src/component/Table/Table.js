import React, { useState, useEffect } from 'react';
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
  onSnapshot,
  query,
  where,
  getDocs,
  getDoc,
  arrayUnion
} from 'firebase/firestore';
import { firestore, auth } from '../Firebase/Firebase';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

function Table() {
  const [tasks, setTasks] = useState([]);
  const [members, setMembers] = useState([]);
  const [newTaskName, setNewTaskName] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [newTaskDate, setNewTaskDate] = useState(new Date().toISOString().slice(0, 10));
  const [newTaskDeadline, setNewTaskDeadline] = useState(new Date().toISOString().slice(0, 10));
  const [newTaskStatus, setNewTaskStatus] = useState('To Do');
  const [newTaskAssignedTo, setNewTaskAssignedTo] = useState('');
  const [showAddTask, setShowAddTask] = useState(false);
  const [taskEdits, setTaskEdits] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const [inviteEmail, setInviteEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const { boardId } = location.state || {};

  useEffect(() => {
    if (!boardId) return;

    const boardDocRef = doc(firestore, "boards", boardId);
    const unsubscribeBoard = onSnapshot(boardDocRef, (doc) => {
      if (doc.exists()) {
        const boardData = doc.data();
        setIsAdmin(auth.currentUser && boardData.adminId === auth.currentUser.uid);
        fetchMembers(boardData.members);
      }
    });

    const taskCollectionRef = collection(firestore, "taskboard");
    const q = query(taskCollectionRef, where("boardId", "==", boardId));
    const unsubscribeTasks = onSnapshot(q, (snapshot) => {
      const tasksData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTasks(tasksData);
    });

    return () => {
      unsubscribeBoard();
      unsubscribeTasks();
    };
  }, [boardId]);

  const fetchMembers = async (memberIds) => {
    const memberData = await Promise.all(
      memberIds.map(async memberId => {
        const memberDocRef = doc(firestore, "users", memberId);
        const memberDoc = await getDoc(memberDocRef);
        return { id: memberId, email: memberDoc.data().email, name: memberDoc.data().name };
      })
    );
    setMembers(memberData);
  };

  const handleBack = () => {
    navigate('/dashboard');
  };

  const inviteUser = async () => {
    if (!inviteEmail || !boardId) return;
    const usersRef = collection(firestore, "users");
    const q = query(usersRef, where("email", "==", inviteEmail));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      alert("No matching user found with that email");
      return;
    }else{
      alert( "The invitation have been send seccessfully.");
    }
    const userToAddId = querySnapshot.docs[0].id;
    const boardRef = doc(firestore, "boards", boardId);
    await updateDoc(boardRef, {
      members: arrayUnion(userToAddId)
    });
    setMembers(prevMembers => [...prevMembers, { id: userToAddId, email: inviteEmail }]);
    setInviteEmail('');
  };

  const addTask = async () => {
    if (!newTaskName || !newTaskDescription || !boardId) return;
    await addDoc(collection(firestore, "taskboard"), {
      name: newTaskName,
      description: newTaskDescription,
      date: newTaskDate,
      deadline: newTaskDeadline,
      status: newTaskStatus,
      assignedTo: newTaskAssignedTo,
      boardId: boardId
    });
    setNewTaskName('');
    setNewTaskDescription('');
    setNewTaskDate(new Date().toISOString().slice(0, 10));
    setNewTaskDeadline(new Date().toISOString().slice(0, 10));
    setShowAddTask(false);
  };

  const toggleAddTask = () => {
    setShowAddTask(!showAddTask);
  };

  const deleteTask = async (id) => {
    await deleteDoc(doc(firestore, "taskboard", id));
  };

  const toggleTaskEditing = (id) => {
    setTaskEdits(prev => ({
      ...prev,
      [id]: tasks.find(task => task.id === id) || {}
    }));
  };

  const handleTaskChange = (id, field, value) => {
    setTaskEdits(prev => ({
      ...prev,
      [id]: { ...prev[id], [field]: value }
    }));
  };

  const saveTaskEdits = async (id) => {
    const taskToUpdate = taskEdits[id];
    const taskDocRef = doc(firestore, "taskboard", id);
    await updateDoc(taskDocRef, taskToUpdate);
    setTaskEdits(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  const cancelTaskEdit = (id) => {
    setTaskEdits(prev => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div className="container-fluid mt-5" style={{minHeight: "40vh"}}>
      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-secondary mb-3" onClick={handleBack}>
            Back to Dashboard
          </button>
        </div>
        {isAdmin && (
          <div className="col-md-6 text-end">
            <div className="d-flex justify-content-end">
              <div style={{ width: '200px' }}>
                <input
                  type="email"
                  className="form-control mb-2"
                  placeholder="Enter email to invite"
                  value={inviteEmail}
                  onChange={(e) => setInviteEmail(e.target.value)}
                />
                <button className="btn btn-primary ms-1" onClick={inviteUser}>Invite to Board</button>
              </div>
            </div>
          </div>
        )}
      </div>
      {showAddTask && (
        <div>
          <input
            className="form-control"
            type="text"
            placeholder="Task Name"
            value={newTaskName}
            onChange={(e) => setNewTaskName(e.target.value)}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Task Description"
            value={newTaskDescription}
            onChange={(e) => setNewTaskDescription(e.target.value)}
          />
          <input
            className="form-control"
            type="date"
            value={newTaskDate}
            onChange={(e) => setNewTaskDate(e.target.value)}
          />
          <input
            className="form-control"
            type="date"
            value={newTaskDeadline}
            onChange={(e) => setNewTaskDeadline(e.target.value)}
          />
          <select
            className="form-control mb-2"
            value={newTaskStatus}
            onChange={(e) => setNewTaskStatus(e.target.value)}
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Review">Review</option>
            <option value="Done">Done</option>
          </select>
          <select
            className="form-control mb-2"
            value={newTaskAssignedTo}
            onChange={(e) => setNewTaskAssignedTo(e.target.value)}
          >
            <option value="">Unassigned</option>
            {members.map((member) => (
              <option key={member.id} value={member.id}>{member.email}</option>
            ))}
          </select>
          <button className="btn btn-primary" onClick={addTask}>Save Task</button>
          <button className="btn btn-secondary" onClick={toggleAddTask}>Cancel</button>
        </div>
      )}
      {!showAddTask && (
        <button className="btn btn-primary" onClick={toggleAddTask}>Add Task</button>
      )}
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Date</th>
            <th>Deadline</th>
            <th>Assigned To</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((task) => (
            <tr key={task.id}>
              <td>
                {taskEdits[task.id] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={taskEdits[task.id].name || task.name}
                    onChange={(e) => handleTaskChange(task.id, 'name', e.target.value)}
                  />
                ) : (
                  <span>{task.name}</span>
                )}
              </td>
              <td>
                {taskEdits[task.id] ? (
                  <input
                    type="text"
                    className="form-control"
                    value={taskEdits[task.id].description || task.description}
                    onChange={(e) => handleTaskChange(task.id, 'description', e.target.value)}
                  />
                ) : (
                  <span>{task.description}</span>
                )}
              </td>
              <td>{task.date}</td>
              <td>{task.deadline}</td>
              <td>
                {taskEdits[task.id] ? (
                  <select
                    className="form-control"
                    value={taskEdits[task.id].assignedTo || task.assignedTo}
                    onChange={(e) => handleTaskChange(task.id, 'assignedTo', e.target.value)}
                  >
                    <option value="">Unassigned</option>
                    {members.map((member) => (
                      <option key={member.id} value={member.id}>{member.name}</option>
                    ))}
                  </select>
                ) : (
                  <span>{members.find(m => m.id === task.assignedTo)?.name || 'Unassigned'}</span>
                )}
              </td>
              <td>
                {taskEdits[task.id] ? (
                  <select
                    className="form-control"
                    value={taskEdits[task.id].status || task.status}
                    onChange={(e) => handleTaskChange(task.id, 'status', e.target.value)}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Review">Review</option>
                    <option value="Done">Done</option>
                  </select>
                ) : (
                  <span>{task.status}</span>
                )}
              </td>
              <td>
                {taskEdits[task.id] ? (
                  <>
                    <button className="btn btn-success" onClick={() => saveTaskEdits(task.id)}><FaSave /></button>
                    <button className="btn btn-warning" onClick={() => cancelTaskEdit(task.id)}><FaTimes /></button>
                  </>
                ) : (
                  <>
                    <button className="btn btn-primary" onClick={() => toggleTaskEditing(task.id)}><FaEdit /></button>
                    <button className="btn btn-danger" onClick={() => deleteTask(task.id)}><FaTrash /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;