import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

// Helper functions
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);
  return {
    [droppableSource.droppableId]: sourceClone,
    [droppableDestination.droppableId]: destClone,
  };
};

const getItems = (count, prefix) =>
  Array.from({ length: count }, (_, k) => ({
    id: `${prefix}-${k}`,
    content: `Card ${k}`,
  }));

const columnsFromBackend = {
  'column-1': {
    name: 'Requested',
    items: getItems(5, 'requested'),
  },
  'column-2': {
    name: 'To do',
    items: getItems(4, 'todo'),
  },
  'column-3': {
    name: 'In Progress',
    items: getItems(3, 'inprogress'),
  },
  'column-4': {
    name: 'Done',
    items: getItems(2, 'done'),
  },
};

const KanbanBoard = () => {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [newCardText, setNewCardText] = useState('');

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }
    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        columns[source.droppableId].items,
        source.index,
        destination.index
      );
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items,
        },
      });
    } else {
      const result = move(
        columns[source.droppableId].items,
        columns[destination.droppableId].items,
        source,
        destination
      );
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...columns[source.droppableId],
          items: result[source.droppableId],
        },
        [destination.droppableId]: {
          ...columns[destination.droppableId],
          items: result[destination.droppableId],
        },
      });
    }
  };

  const handleAddCard = (columnId) => {
    const newCard = { id: `new-${Date.now()}`, content: newCardText };
    const column = columns[columnId];
    const updatedItems = [...column.items, newCard];
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: updatedItems,
      },
    });
    setNewCardText('');
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
        {Object.entries(columns).map(([columnId, column]) => (
          <Droppable droppableId={columnId} key={columnId}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                style={{
                  background: 'lightgrey',
                  padding: 4,
                  margin: 8,
                  width: 250,
                  minHeight: 500,
                }}
              >
                <h2>{column.name}</h2>
                {column.items.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          userSelect: 'none',
                          padding: 16,
                          margin: '0 0 8px 0',
                          minHeight: '50px',
                          backgroundColor: '#456C86',
                          color: 'white',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {item.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                <input
                  type="text"
                  placeholder="Add new card"
                  value={newCardText}
                  onChange={(e) => setNewCardText(e.target.value)}
                />
                <button onClick={() => handleAddCard(columnId)}>Add Card</button>
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default KanbanBoard;
