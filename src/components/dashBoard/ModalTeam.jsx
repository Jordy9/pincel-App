import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { actualizarColumnas, actualizarColumnasInicio, crearEquipo } from '../../store/equipo/thunk'
import { useDispatch } from 'react-redux'
import uuid from "uuid/v4";
import user from '../../heroes/user.webp'
import { useSelector } from 'react-redux'

export const ModalTeam = ({modalTeam, setModalTeam}) => {

    const handleClose = () => {
      setModalTeam(false)
    }
    
    const dispatch = useDispatch();

    const { usuarios, uid } = useSelector(state => state.auth);

    const { equipos } = useSelector(state => state.eq);

    const [crearEquipoState, setCrearEquipoState] = useState('')
    
    // const test1 = equipos.some(el => console.log(el.name));

    // console.log(equipos)

    const [changeColumns, setchangeColumns] = useState(false)

    const createEq = () => {
      dispatch(crearEquipo(crearEquipoState, undefined ,setchangeColumns))
      setCrearEquipoState('')
    }

    const itemsFromBackend = usuarios?.filter(usuarios => usuarios?.id !== uid && usuarios.team === 'Sin equipo' && !usuarios?.name.includes('Jordy') && !usuarios?.name.includes('Francis'))?.map(usuarios => (
      {id: usuarios?.id, content: [ usuarios?.urlImage, usuarios?.name]}
    ))

    let arreg = []

    equipos.map(e => (
      arreg.push(
        {
          [e._id]: {
            name: e.name,
            items: e.items,
            order: e.order,
            createdAt: e.createdAt,
            updatedAt: e.updatedAt
          }
        }
      )
    ))
    
    const arregNuevo = Object.assign({}, ...arreg)

      const columnsFromBackend = {
        [uuid()]: {
          name: "Sin equipo",
          items: itemsFromBackend
        },
        ...arregNuevo
      };

      const [moveColumns, setMoveColumns] = useState()
      
      const [moveColumnsStart, setMoveColumnsStart] = useState()

      const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
      
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns[source.droppableId];
          const destColumn = columns[destination.droppableId];
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...sourceColumn,
              items: sourceItems
            },
            [destination.droppableId]: {
              ...destColumn,
              items: destItems
            }
          });
        } else {
          const column = columns[source.droppableId];
          const copiedItems = [...column.items];
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          setColumns({
            ...columns,
            [source.droppableId]: {
              ...column,
              items: copiedItems
            }
          });
        }
        setMoveColumns([destination.droppableId, destination.index])
        setMoveColumnsStart(source.droppableId)
      };
      
      const [columns, setColumns] = useState(columnsFromBackend);

      useEffect(() => {
        if (moveColumns && moveColumnsStart) {
          if (moveColumns === moveColumnsStart) {
            dispatch(actualizarColumnas([...moveColumns, columns[moveColumns[0]]]))
          } else {
            dispatch(actualizarColumnas([...moveColumns, columns[moveColumns[0]]]))
            dispatch(actualizarColumnasInicio([moveColumnsStart, columns[moveColumnsStart]]))
          }
        }
      }, [moveColumns, columns, dispatch, moveColumnsStart])

      useEffect(() => {
        if (changeColumns) {
          setColumns(columnsFromBackend)
          setchangeColumns(false)
        }

      }, [changeColumns])      

  return (
    <Modal fullscreen show={modalTeam} onHide={handleClose}>
      <Modal.Header style={{border: 'none'}} closeButton>
        <Modal.Title>Equipos</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="row">
          <div className='col-2'>
            <input value={crearEquipoState} onChange = {({target}) => setCrearEquipoState(target.value)} type="text" className='form-control'/>
          </div>

          <div className='col'>
            <button type='button' onClick={createEq} className='btn btn-primary'>Agregar</button>
          </div>
        </div>

        <div className='row' style={{ height: "100%" }}>
          <DragDropContext
            onDragEnd={result => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <div
                  className='col-3'
                  key={columnId}
                >
                  <h2 className='text-center'>{column.name}</h2>
                  <div className='d-flex justify-content-center' style={{ margin: 8 }}>
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
                              minHeight: 500
                            }}
                          >
                            {column.items.map((item, index) => {
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
                              );
                            })}
                            {provided.placeholder}
                          </div>
                        );
                      }}
                    </Droppable>
                  </div>
                </div>
              );
            })}
          </DragDropContext>
        </div>
      </Modal.Body>
    </Modal>
  )
}
