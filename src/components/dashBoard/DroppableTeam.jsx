import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import { DraggableTeam } from './DraggableTeam';

export const DroppableTeam = ({column, columnId}) => {
  return (
    <Droppable droppableId={columnId} key={columnId}>
        {(provided, snapshot) => {
        return (
            <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={{
                background: snapshot.isDraggingOver
                ? "lightblue"
                : "lightgrey",
                padding: 4,
                width: 250,
                height: 500,
                overflow: 'auto'
            }}
            >
            {column.items.map((item, index) => {
                return (
                    <DraggableTeam key={item} item={item} index = {index} />
                );
            })}
            {provided.placeholder}
            </div>
        );
        }}
    </Droppable>
  )
}
