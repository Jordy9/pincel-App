import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { actualizarColumnas, actualizarColumnasInicio, crearEquipo } from '../../store/equipo/thunk'
import { useDispatch } from 'react-redux'
import uuid from "uuid/v4";
import user from '../../heroes/user.webp'
import { useSelector } from 'react-redux'
import { DroppableTeam } from './DroppableTeam'

export const ModalTeam = ({modalTeam, setModalTeam}) => {

    const handleClose = () => {
      setModalTeam(false)
    }
    
    const dispatch = useDispatch();

    const { usuarios, uid } = useSelector(state => state.auth);

    const { equipos } = useSelector(state => state.eq);

    const [crearEquipoState, setCrearEquipoState] = useState('')

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

      const columnsFromBackend = [
        {
          _id: uuid(),
          name: "Sin equipo",
          items: itemsFromBackend
        },
        ...equipos
      ];

      const [moveColumns, setMoveColumns] = useState()
      
      const [moveColumnsStart, setMoveColumnsStart] = useState()

      const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination, type } = result;

        if (type === 'column') {
          // const copiedColumns = [...columns]
          // const [removed] = copiedColumns.splice(source.index, 1);
          // copiedColumns.splice(destination.index, 0, removed);
          // setColumns(
          //   copiedColumns
          // )
          return
        }
      
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columns.find(columns => columns._id === source.droppableId);
          // const indexStart = columns.indexOf(sourceColumn)
          const destColumn = columns.find(columns => columns._id === destination.droppableId);
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
          const newColumn = columns.map(e => (e._id === sourceColumn._id ? {...sourceColumn, items: sourceItems} : e))
          setColumns(
            newColumn.map(e => (
              e._id === destColumn._id ? {...destColumn, items: destItems} : e
            ))
          )
        } else {
          const column = columns.find(columns => columns._id === source.droppableId);
          const copiedItems = [...column.items];
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          setColumns(
            columns.map(e => (
              e._id === source.droppableId ? {...column, items: copiedItems} : e
            ))
          );
        }
        setMoveColumns([destination.droppableId, destination.index])
        setMoveColumnsStart(source.droppableId)
      };
      
      const [columns, setColumns] = useState(columnsFromBackend);

      // useEffect(() => {
      //   if (moveColumns && moveColumnsStart) {
      //     if (moveColumns[0] === moveColumnsStart) {
      //       dispatch(actualizarColumnas([...moveColumns, columns?.find(col => col._id === moveColumns[0])]))
      //     } else {
      //       dispatch(actualizarColumnas([...moveColumns, columns?.find(col => col._id === moveColumns[0])]))
      //       dispatch(actualizarColumnasInicio([moveColumnsStart, columns?.find(col => col._id === moveColumnsStart)]))
      //     }
      //   }
      // }, [moveColumns, columns, dispatch, moveColumnsStart])

      // useEffect(() => {
      //   if (changeColumns) {
      //     setColumns(columnsFromBackend)
      //     setchangeColumns(false)
      //   }

      // }, [changeColumns])  

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

        {/* <div className='row' style={{ height: "100%" }}> */}
          <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
            <Droppable droppableId="all-column" type="column" direction="horizontal">
              {(provided, snapshot) => (
                <div 
                  className="d-flex"
                  isDraggingOver={snapshot.isDraggingOver}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {columns.map((e, index) => {
                    const columnId = e._id
                    const column = {items: e.items, name: e.name}

                    return (
                      <DroppableTeam columnId={columnId} column = {column} index = {index}/>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        {/* </div> */}
      </Modal.Body>
    </Modal>
  )
}

{/* <Droppable droppableId="all-column" type="column" direction="horizontal">
              {(provided, snapshot) => (
                <div
                  className='d-flex'
                  // isDraggingOver={snapshot.isDraggingOver}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {columns.map((e, index) => {
                    const columnId = e._id
                    const column = {items: e.items, name: e.name}
                    
                    return (
                      // <div
                      //   className='col-3'
                      //   key={columnId}
                      // >
                      //   <h2 className='text-center'>{column.name}</h2>
                        // <div className='d-flex justify-content-center' style={{ margin: 8 }}>
                          <DroppableTeam columnId={columnId} column = {column} index = {index} />
                        // </div>
                      // {/* </div>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable> */}
