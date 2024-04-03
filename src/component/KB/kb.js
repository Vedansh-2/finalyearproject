import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './kb.css';

function Kb() {
  const [lists, setLists] = useState([
    { id: 'list1', title: 'To Do', tasks: [] },
    { id: 'list2', title: 'In Progress', tasks: [] },
    { id: 'list3', title: 'Done', tasks: [] }
  ]);

  const [newListTitle, setNewListTitle] = useState('');
  const [newTaskContent, setNewTaskContent] = useState('');

  const addList = () => {
    if (newListTitle.trim() === '') return;
    const newList = { id: `list${lists.length + 1}`, title: newListTitle, tasks: [] };
    setLists([...lists, newList]);
    setNewListTitle('');
  };

  const deleteList = (id) => {
    setLists(lists.filter(list => list.id !== id));
  };

  const addTask = (listId) => {
    if (newTaskContent.trim() === '') return;
    const newTask = { id: `task${Date.now()}`, content: newTaskContent };
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return { ...list, tasks: [...list.tasks, newTask] };
      }
      return list;
    });
    setLists(updatedLists);
    setNewTaskContent('');
  };

  const deleteTask = (listId, taskId) => {
    const updatedLists = lists.map(list => {
      if (list.id === listId) {
        return { ...list, tasks: list.tasks.filter(task => task.id !== taskId) };
      }
      return list;
    });
    setLists(updatedLists);
  };

  const onDragEnd = (result) => {
    const { source, destination, draggableId } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      const listIndex = Number(source.droppableId.slice(-1)) - 1;
      const tasks = [...lists[listIndex].tasks];
      const [removed] = tasks.splice(source.index, 1);
      tasks.splice(destination.index, 0, removed);
      const updatedLists = [...lists];
      updatedLists[listIndex].tasks = tasks;
      setLists(updatedLists);
    } else {
      const sourceIndex = Number(source.droppableId.slice(-1)) - 1;
      const destinationIndex = Number(destination.droppableId.slice(-1)) - 1;
      const sourceTasks = [...lists[sourceIndex].tasks];
      const destinationTasks = [...lists[destinationIndex].tasks];
      const [removed] = sourceTasks.splice(source.index, 1);
      destinationTasks.splice(destination.index, 0, removed);
      const updatedLists = [...lists];
      updatedLists[sourceIndex].tasks = sourceTasks;
      updatedLists[destinationIndex].tasks = destinationTasks;
      setLists(updatedLists);
    }
  };

  return (
    <div className="App">
      <div className="controls">
        <input
          type="text"
          placeholder="Enter list title"
          value={newListTitle}
          onChange={(e) => setNewListTitle(e.target.value)}
        />
        <button onClick={addList}>Add List</button>
      </div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="lists">
          {lists.map((list, index) => (
            <div className="list" key={list.id}>
              <h2>{list.title}</h2>
              <button onClick={() => deleteList(list.id)}>Delete List</button>
              <Droppable droppableId={`list${index + 1}`} key={list.id}>
                {(provided) => (
                  <div className="tasks" {...provided.droppableProps} ref={provided.innerRef}>
                    {list.tasks.map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <div
                            className="task"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            {task.content}
                            <button onClick={() => deleteTask(list.id, task.id)}>Delete Task</button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
              <div className="controls">
                <input
                  type="text"
                  placeholder="Enter task content"
                  value={newTaskContent}
                  onChange={(e) => setNewTaskContent(e.target.value)}
                />
                <button onClick={() => addTask(list.id)}>Add Task</button>
              </div>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default Kb;
