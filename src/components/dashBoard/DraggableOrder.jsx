import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import user from '../../heroes/user.webp'

export const DraggableOrder = ({item, index}) => {
  return (
    <Draggable
        key={item.id}
        draggableId={item.id}
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
                <div style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                    <img src={(item.urlImage) ? item.urlImage : user} className='img-fluid' alt="" />
                </div>
                <div className='mx-auto'>{item.name}</div>
            </div>
        );
        }}
    </Draggable>
  )
}
