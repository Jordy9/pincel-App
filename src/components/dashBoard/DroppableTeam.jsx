import React from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { DraggableTeam } from './DraggableTeam';

export const DroppableTeam = ({column, columnId, index}) => {
  return (
    <Draggable draggableId={columnId} index={index} type="column">
      {provided => (
        <div
          className="containerColum"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h2 className='text-center'>{column.name}</h2>
          <Droppable droppableId={columnId} type="task">
            {(provided, snapshot) => (
              <div
                isDraggingOver={snapshot.isDraggingOver}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {column.items.map((item, index) => (
                  <DraggableTeam key={item.id} item={item} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
    // <Draggable droppableId={columnId} key={columnId} index={index} type="column">
    //     {(provided, snapshot) => (
    //         <div
    //             ref={provided.innerRef}
    //             {...provided.draggableProps}
    //             {...provided.dragHandleProps} 
    //             className = 'col-3'
    //             style={{
    //                 background: snapshot.isDraggingOver
    //                 ? "lightblue"
    //                 : "lightgrey",
    //                 padding: 4,
    //                 width: 250,
    //                 minHeight: 500
    //             }}
    //         >
    //             <h2 className='text-center'>{column.name}</h2>
    //             <Droppable droppableId={column.id} type="item">
    //                 {(provided, snapshot) => (
    //                     <div
    //                         isDraggingOver={snapshot.isDraggingOver}
    //                         ref={provided.innerRef}
    //                         {...provided.droppableProps}
    //                     >
    //                         {column.items.map((item, index) => {
    //                             return (
    //                                 <DraggableTeam key={item.id} item={item} index={index} />
    //                             );
    //                         })}
    //                         {provided.placeholder}
    //                     </div>
    //                 )}
    //             </Droppable>
    //         </div>
    //     )
    //     }
    // </Draggable>
  )
}
