// import React, { useState } from 'react';
// import { extend } from '@syncfusion/ej2-base';
// import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
// import { kanbanData } from '../datasource/datasource';
// import { registerLicense } from '@syncfusion/ej2-base';
// import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
// import './Board.css'; // Import your custom styles



// // Don't forget to register your Syncfusion license
// registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0QHxbf1x0ZFNMYVhbQXRPIiBoS35RckVgW3lfeHVRQ2NYUEJ/');


// function Board() {
//   const initialData = extend([], kanbanData, null, true);
//   const initialColumns = [
//       { headerText: 'To Do', keyField: 'To Do', cssClass: 'column-todo' },
//       { headerText: 'In Progress', keyField: 'In Progress', cssClass: 'column-inprogress' },
//       { headerText: 'Review', keyField: 'Review', cssClass: 'column-review' },
//       { headerText: 'Done', keyField: 'Done', cssClass: 'column-done' }
//   ];

//   const [data, setData] = useState(initialData);
//   const [columns, setColumns] = useState(initialColumns);

//   const addNewCard = () => {
//       const summary = prompt("Enter task summary:");
//       if (summary) {
//           setData(data.concat({ Id: `${data.length + 1}`, Status: 'To Do', Summary: summary }));
//       }
//   };

//   const deleteCard = (id) => {
//       setData(data.filter(card => card.Id.toString() !== id));
//   };

//   const addNewColumn = () => {
//       const headerText = prompt("Enter column name:");
//       const keyField = prompt("Enter unique keyField:");
//       if (headerText && keyField) {
//           const cssClass = `column-${keyField.toLowerCase()}`;
//           setColumns(columns.concat({ headerText, keyField, cssClass }));
//       }
//   };

//   const deleteColumn = (headerText) => {
//       setColumns(columns.filter(column => column.headerText !== headerText));
//   };

//   return (
//       <div className="container my-4">
//           <div className="d-flex justify-content-between mb-3">
//               <button onClick={addNewCard} className="btn btn-dark btn-lg">New Card</button>
//               <button onClick={addNewColumn} className="btn btn-danger btn-lg">New Column</button>
//               <button onClick={() => deleteCard(prompt("Enter card ID to delete:"))} className="btn btn-warning btn-lg">Delete Card</button>
//               <button onClick={() => deleteColumn(prompt("Enter column name to delete:"))} className="btn btn-info btn-lg">Delete Column</button>
//           </div>
//           <KanbanComponent id="kanban" dataSource={data} cardSettings={{ contentField: "Summary", headerField: "Id" }} keyField="Status">
//               <ColumnsDirective>
//                   {columns.map((column, index) => (
//                       <ColumnDirective key={index} headerText={column.headerText} keyField={column.keyField} cssClass={column.cssClass} />
//                   ))}
//               </ColumnsDirective>
//           </KanbanComponent>
//       </div>
//   );
// }

// export default Board;
import React, { useState, useEffect } from 'react';
import { KanbanComponent, ColumnsDirective, ColumnDirective } from "@syncfusion/ej2-react-kanban";
import { registerLicense } from '@syncfusion/ej2-base';
import 'bootstrap/dist/css/bootstrap.min.css';
import { firestore } from '../Firebase/Firebase';
import './Board.css';
import { collection, doc, addDoc, onSnapshot, updateDoc } from 'firebase/firestore';

// Register Syncfusion license
registerLicense('Ngo9BigBOggjHTQxAR8/V1NBaF5cXmZCekx0QHxbf1x0ZFNMYVhbQXRPIiBoS35RckVgW3lfeHVRQ2NYUEJ/');

function Board() {
    const [data, setData] = useState([]);
    const [projectName, setProjectName] = useState('');
    const [newTaskText, setNewTaskText] = useState('');

    useEffect(() => {
        const unsubscribeData = onSnapshot(collection(firestore, 'kanbanData'), (snapshot) => {
            setData(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        });

        return () => {
            unsubscribeData();
        };
    }, []);

    const addNewTask = async () => {
        if (newTaskText.trim()) {
            await addDoc(collection(firestore, 'kanbanData'), {
                Summary: newTaskText,
                Status: 'To Do'
            });
            setNewTaskText('');
        }
    };

    const handleCardDragStop = async (args) => {
        const { data: card, dropColumn } = args;
        const newStatus = dropColumn.keyField;
        if (card.id && newStatus && card.Status !== newStatus) {
            const cardRef = doc(firestore, 'kanbanData', card.id);
            await updateDoc(cardRef, {
                Status: newStatus
            });
        }
    };

    return (
        <div className="container my-4">
            <div className="project-name-box p-3 mb-4 shadow-sm">
                <input
                    type="text"
                    className="form-control text-center mb-2"
                    value={projectName}
                    onChange={(e) => setProjectName(e.target.value)}
                    placeholder="Enter Project Name"
                />
                <h2 className="mt-2">{projectName}</h2>
            </div>

            <div className="add-task-box mb-4">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Enter Task Summary"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                />
                <button className="btn btn-primary mt-2" onClick={addNewTask}>
                    Add Task
                </button>
            </div>

            <KanbanComponent
                id="kanban"
                dataSource={data}
                keyField="Status"
                cardSettings={{ contentField: "Summary", headerField: "id" }}
                cardDragStop={handleCardDragStop}
            >
                <ColumnsDirective>
                    <ColumnDirective headerText="To Do" keyField="To Do" />
                    <ColumnDirective headerText="In Progress" keyField="In Progress" />
                    <ColumnDirective headerText="Review" keyField="Review" />
                    <ColumnDirective headerText="Done" keyField="Done" />
                </ColumnsDirective>
            </KanbanComponent>
        </div>
    );
}

export default Board;

