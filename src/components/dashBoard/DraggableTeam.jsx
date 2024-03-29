import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import user from '../../heroes/user.webp'

export const DraggableTeam = ({item, index, name}) => {
  return (
    <Draggable
        key={item.id}
        draggableId={item.id}
        index={index}
    >
        {(provided, snapshot) => {
        return (
            <div
            className='d-flex align-items-center'
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            style={{
                userSelect: "none",
                border: (index === 0 && name !== 'Sin equipo') && '5px solid gold',
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
                <img src={(item.content[0]) ? item.content[0] : user} className='img-fluid' alt="" />
            </div>
            <div className='mx-auto'>{item.content[1]}</div>
            </div>
        );
        }}
    </Draggable>
  )
}
