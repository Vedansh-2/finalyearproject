// import { useState, useEffect } from 'react';
// import { db } from '../Firebase/Firebase'; // Adjust the import path as necessary

// const useKanban = (userId, boardId) => {
//     const [tasks, setTasks] = useState(null);
//     const [columns, setColumns] = useState(null);
//     const [final, setFinal] = useState(null);
//     const [boardName, setBoardName] = useState('');

//     useEffect(() => {
//         const unsubscribeTasks = db.collection(`users/${userId}/boards/${boardId}/tasks`).onSnapshot(snap => {
//             const documents = [];
//             snap.forEach(d => documents.push({ id: d.id, ...d.data() }));
//             setTasks(documents);
//         });

//         return () => unsubscribeTasks(); // Cleanup subscription on unmount
//     }, [userId, boardId]);

//     useEffect(() => {
//         db.collection(`users/${userId}/boards`).doc(boardId).get().then(d => {
//             setBoardName(d.data()?.name);
//         });
//     }, [userId, boardId]);

//     useEffect(() => {
//         const unsubscribeColumns = db.collection(`users/${userId}/boards/${boardId}/columns`).onSnapshot(snap => {
//             const documents = [];
//             snap.forEach(d => documents.push({ id: d.id, ...d.data() }));
//             setColumns(documents);
//         });

//         return () => unsubscribeColumns(); // Cleanup subscription on unmount
//     }, [userId, boardId]);

//     useEffect(() => {
//         if (tasks && columns) {
//             const finalObject = {
//                 columnOrder: [],
//                 columns: {},
//                 tasks: {}
//             };

//             columns.forEach(c => {
//                 if (c.id === 'columnOrder') {
//                     finalObject.columnOrder = c.order;
//                 } else {
//                     finalObject.columns[c.id] = c;
//                 }
//             });

//             tasks.forEach(t => {
//                 finalObject.tasks[t.id] = t;
//             });

//             setFinal(finalObject);
//         }
//     }, [tasks, columns]);

//     return { initialData: final, boardName };
// };

// export default useKanban;
