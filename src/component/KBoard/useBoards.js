// import { useState, useEffect } from 'react';
// import { db } from '../Firebase/Firebase'; // Adjust the import path as necessary

// const useBoards = (userId) => {
//     const [boards, setBoards] = useState(null);

//     useEffect(() => {
//         const unsubscribe = db.collection(`users/${userId}/boards`).onSnapshot(snap => {
//             const documents = [];
//             snap.forEach(doc => documents.push({ id: doc.id, ...doc.data() }));
//             setBoards(documents);
//         });

//         return () => unsubscribe(); // Cleanup subscription on unmount
//     }, [userId]);

//     return boards;
// };

// export default useBoards;
