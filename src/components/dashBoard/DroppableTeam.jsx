import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { DraggableTeam } from './DraggableTeam';

export const DroppableTeam = ({column, columnId, index}) => {
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
                height: (index === 0 || column?.items?.length === 0) ? 'auto' : 'auto',
                // overflow: 'auto'
            }}
            >
            {column.items.map((item, index) => {
                return (
                    <DraggableTeam item={item} index={index} name = {column.name} />
                );
            })}
            {provided.placeholder}
            </div>
        );
        }}
    </Droppable>
  )
}
