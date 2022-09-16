import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { actualizarColumnas, actualizarColumnasInicio, actualizarColumnasInicioOrder, actualizarColumnasOrdenar, crearEquipo } from '../../store/equipo/thunk'
import { useDispatch } from 'react-redux'
import uuid from "uuid/v4";
import user from '../../heroes/user.webp'
import { useSelector } from 'react-redux'
import { DroppableTeam } from './DroppableTeam'
import { DroppableOrder } from './DroppableOrder'
import { ModalEdit } from './ModalEdit'
import Swal from 'sweetalert2'
import { useResponsive } from '../../hooks/useResponsive'

export const ModalTeam = ({modalTeam, setModalTeam}) => {

    const handleClose = () => {
      setModalTeam(false)
    }
    
    const dispatch = useDispatch();

    const { usuarios, uid } = useSelector(state => state.auth);

    const { equipos } = useSelector(state => state.eq);

    const { toResena } = useSelector(state => state.rs);

    const [crearEquipoState, setCrearEquipoState] = useState('')

    const [changeColumns, setchangeColumns] = useState(false)

    const [modalEdit, setModalEdit] = useState(false)

    const createEq = () => {
      if (crearEquipoState?.trim()?.length > 2) {
        dispatch(crearEquipo(crearEquipoState, undefined, setchangeColumns))
        setCrearEquipoState('')
      }
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

      const columnsFromBackendUsers = [
        {
          _id: uuid(),
          name: "Desactivados para reseñas",
          items: usuarios?.filter(items => !items?.name.includes('Jordy') && !items?.name.includes('Mariela') && !items?.name.includes('Lorena') && !items?.name.includes('Francis') && items.toResena === 'Desactivados para reseñas')
        },
        ...toResena
      ];

      const [moveColumns, setMoveColumns] = useState()
      
      const [moveColumnsStart, setMoveColumnsStart] = useState()

      const [moveColumnsOrder, setMoveColumnsOrder] = useState()
      
      const [moveColumnsStartOrder, setMoveColumnsStartOrder] = useState()

      const onDragEnd = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;
      
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

      const onDragEndOrderUsers = (result, columnsOrder, setColumnsOrder) => {
        if (!result.destination) return;
        const { source, destination } = result;
              
        if (source.droppableId !== destination.droppableId) {
          const sourceColumn = columnsOrder.find(columnsOrder => columnsOrder._id === source.droppableId);
          // const indexStart = columnsOrder.indexOf(sourceColumn)
          const destColumn = columnsOrder.find(columnsOrder => columnsOrder._id === destination.droppableId);
          const sourceItems = [...sourceColumn.items];
          const destItems = [...destColumn.items];
          const [removed] = sourceItems.splice(source.index, 1);
          destItems.splice(destination.index, 0, removed);
          const newColumn = columnsOrder.map(e => (e._id === sourceColumn._id ? {...sourceColumn, items: sourceItems} : e))
          setColumnsOrder(
            newColumn.map(e => (
              e._id === destColumn._id ? {...destColumn, items: destItems} : e
            ))
          )
        } else {
          const column = columnsOrder.find(columnsOrder => columnsOrder._id === source.droppableId);
          const copiedItems = [...column.items];
          const [removed] = copiedItems.splice(source.index, 1);
          copiedItems.splice(destination.index, 0, removed);
          setColumnsOrder(
            columnsOrder.map(e => (
              e._id === source.droppableId ? {...column, items: copiedItems} : e
            ))
          );
        }
        setMoveColumnsOrder([destination.droppableId, destination.index])
        setMoveColumnsStartOrder(source.droppableId)
      };
      
      const [columns, setColumns] = useState(columnsFromBackend);

      const [columnsOrder, setColumnsOrder] = useState(columnsFromBackendUsers);

      useEffect(() => {
        if (moveColumns && moveColumnsStart) {
          if (moveColumns[0] === moveColumnsStart) {
            dispatch(actualizarColumnas([...moveColumns, columns?.find(col => col._id === moveColumns[0])]))
          } else {
            dispatch(actualizarColumnas([...moveColumns, columns?.find(col => col._id === moveColumns[0])]))
            dispatch(actualizarColumnasInicio([moveColumnsStart, columns?.find(col => col._id === moveColumnsStart)]))
          }
        }
      }, [moveColumns, columns, dispatch, moveColumnsStart])

      useEffect(() => {
        if (moveColumnsOrder && moveColumnsStartOrder) {
          if (moveColumnsOrder[0] === moveColumnsStartOrder) {
            dispatch(actualizarColumnasOrdenar([...moveColumnsOrder, columnsOrder?.find(col => col._id === moveColumnsOrder[0])]))
          } else {
            dispatch(actualizarColumnasOrdenar([...moveColumnsOrder, columnsOrder?.find(col => col._id === moveColumnsOrder[0])]))
            dispatch(actualizarColumnasInicioOrder([moveColumnsStartOrder, columnsOrder?.find(col => col._id === moveColumnsStartOrder)]))
          }
        }
      }, [moveColumnsOrder, columnsOrder, dispatch, moveColumnsStartOrder])

      useEffect(() => {
        if (changeColumns) {
          setColumns(columnsFromBackend)
          setchangeColumns(false)
        }

      }, [changeColumns])  

      const [changeToOrder, setchangeToOrder] = useState(false)

      const [sendProps, setSendProps] = useState()

      const openModalEdit = (props) => {
        if (props.name === 'Sin equipo') {
          const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 5000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })
        
        return Toast.fire({
            icon: 'info',
            title: 'No puede editar la información de este equipo'
        })
        }
        setSendProps(props)
        setModalEdit(true)
      }

      useEffect(() => {
        setColumns(columnsFromBackend)
      }, [modalEdit])

      const [ respWidth ] = useResponsive()

  return (
    <Modal fullscreen show={modalTeam} onHide={handleClose}>
      <Modal.Header style={{border: 'none'}} closeButton>
        <Modal.Title>
          <button type='button' onClick={() => setchangeToOrder(!changeToOrder)} className='btn btn-primary'>{(changeToOrder) ? 'Ir a equipos' : 'Ir a ordenar usuarios'}</button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {
          (!changeToOrder)
            ?
          <>
            <div className="row mb-2">
              <div className='col-xs-8 col-sm-10 col-md-6 col-lg-5 col-xl-3 col-xxl-3'>
                <input value={crearEquipoState} placeholder = 'Agregar equipo' onChange = {({target}) => setCrearEquipoState(target.value)} type="text" className='form-control'/>
              </div>

              <div className={`col-xs-4 col-sm-2 col-md-2 col-lg-2 col-xl-2 col-xxl-2 ${(respWidth < 720) && 'my-1'}`}>
                <button type='button' onClick={createEq} className={`btn btn-primary ${(respWidth < 720) && 'form-control'}`}>Agregar</button>
              </div>
            </div>

            <div className='row' style={{ height: "100%" }}>
              <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
                {columns.map((e, index) => {
                  const columnId = e._id
                  const column = {items: e.items, name: e.name}
                  
                  return (
                    <div
                      className='col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-3 col-xxl-3'
                      key={columnId}
                    >
                      {
                        (index !== 0 && e?.items.length !== 0)
                          &&
                        <div className='d-flex align-items-center'>
                          <div className='ml-auto mr-1' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                            <img src={(e?.items[0]?.content[0]) ? e?.items[0]?.content[0] : user} className='img-fluid' alt="" />
                          </div>
                          <h5 className='mr-auto'>Lider</h5>
                        </div>
                      }
                      <h2 
                        onDoubleClick={() => openModalEdit(e)} 
                        className='text-center'
                        data-bs-toggle="tooltip" data-bs-placement="left" title="Al hacer click sobre el título, podrá editar la información de este equipo"
                        style={{cursor: 'pointer'}}
                      >
                        {column.name}
                      </h2>
                      <div className='d-flex justify-content-center' style={{ margin: 8 }}>
                        <DroppableTeam columnId={columnId} column = {column} index = {index} />
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
          </>
          :
          <>
            <div className='row' style={{ height: "450px" }}>
              <DragDropContext onDragEnd={result => onDragEndOrderUsers(result, columnsOrder, setColumnsOrder)}>
                {columnsOrder.map((e, index) => {
                  const columnId = e._id
                  const column = {items: e.items, name: e.name}
                  
                  return (
                    <div
                      className='d-flex'
                      key={columnId}
                    >
                      <div className='col-12'>
                        <h2 className='text-center'>{column.name}</h2>
                        <div className='d-flex justify-content-center' style={{ margin: 8 }}>
                          <DroppableOrder columnId={columnId} column = {column} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </DragDropContext>
            </div>
          </>
        }
      </Modal.Body>
        {
          (modalEdit && sendProps)
            &&
          <ModalEdit sendProps = {sendProps} modalEdit = {modalEdit} setModalEdit = {setModalEdit} />
        }
    </Modal>
  )
}
