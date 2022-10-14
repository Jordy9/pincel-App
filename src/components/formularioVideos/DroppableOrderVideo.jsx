import React from 'react'
import { Droppable } from 'react-beautiful-dnd';
import { DraggableOrder } from './DraggableOrder';
import { DraggableOrderVideo } from './DraggableOrderVideo';

export const DroppableOrderVideo = ({column, columnId}) => {
  return (
    <Droppable direction='horizontal' droppableId={columnId} key={columnId}>
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
                    width: '100%',
                    height: 130,
                    overflowX: 'auto',
                    overflowY: 'hidden',
                    display: 'flex'
                }}
            >
            {column?.map((item, index) => {
                return (
                    <DraggableOrderVideo item={item} index={index} />
                );
            })}
            {provided.placeholder}
            </div>
        );
        }}
    </Droppable>
  )
}
