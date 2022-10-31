import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import user from '../../heroes/user.webp'

export const DraggableOrderVideo = ({item, index}) => {
  return (
    <Draggable
        key={item._id}
        draggableId={item._id}
        index={index}
    >
        {(provided, snapshot) => {
        return (
            <div
            className='mx-1 my-auto'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                userSelect: "none",
                padding: 16,
                margin: "0 0 8px 0",
                minHeight: "50px",
                backgroundColor: snapshot.isDragging
                ? "#263B4A"
                : "#456C86",
                color: "white",
                ...provided.draggableProps.style
            }}
            >
                <div className="text-center">
                    <button className='btn btn-primary'>{index + 1}</button>
                </div>
                <div className='mx-auto elipsisOrdercapModal'>{item.titulo}</div>
            </div>
        );
        }}
    </Draggable>
  )
}
