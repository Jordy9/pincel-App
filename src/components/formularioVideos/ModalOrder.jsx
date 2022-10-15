import React from 'react'
import { DragDropContext } from 'react-beautiful-dnd'
import { Modal } from 'react-bootstrap'
import { DroppableOrder } from './DroppableOrder'
import { DroppableOrderVideo } from './DroppableOrderVideo'

export const ModalOrder = ({showOrder, setShowOrder, formEvaluacion, setFormEvaluacion, formValues, setFormValues}) => {

    const handleClose = () => {
        setShowOrder(false)
    }

    const columnsFromBackend = [
        formEvaluacion
    ];

    const columnsFromBackendVideos = [
        formValues
    ];

    const onDragEndOrderUsers = (result, columnsOrder, setColumnsOrder) => {
        if (!result.destination) return;
        const { source, destination } = result;
              
        if (source.droppableId !== destination.droppableId) {
            return
        } else {
          const copiedItems = [...columnsOrder];
          const [removed] = copiedItems.splice(source.index, 1);
          console.log(removed)
          copiedItems.splice(destination.index, 0, removed);
          console.log(copiedItems)
          setColumnsOrder(
            copiedItems
          );
        }
      };
      
    const onDragEndOrderVideos = (result, columnsOrder, setColumnsOrder) => {
        if (!result.destination) return;
        const { source, destination } = result;
              
        if (source.droppableId !== destination.droppableId) {
            return
        } else {
          const copiedItems = [...columnsOrder];
          const [removed] = copiedItems.splice(source.index, 1);
          console.log(removed)
          copiedItems.splice(destination.index, 0, removed);
          console.log(copiedItems)
          setColumnsOrder(
            copiedItems
          );
        }
      };

  return (
    <Modal fullscreen centered show={showOrder} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton></Modal.Header>
        <Modal.Title>Ordenar</Modal.Title>
        <Modal.Body>
            <div className='row' style={{ height: "300px" }}>
                <DragDropContext onDragEnd={result => onDragEndOrderUsers(result, formEvaluacion, setFormEvaluacion)}>
                    {columnsFromBackend.map((e, index) => {
                    const columnId = formEvaluacion[index]?._id
                    const column = formEvaluacion
                    
                    return (
                        <div
                        className='d-flex'
                        key={columnId}
                        >
                        <div className='col-12'>
                            <h2 className='text-center'>Preguntas</h2>
                            <div className='d-flex justify-content-center' style={{ margin: 8 }}>
                                <DroppableOrder columnId={columnId} column = {column} />
                            </div>
                        </div>
                        </div>
                    );
                    })}
                </DragDropContext>
            </div>

            <div className='row' style={{ height: "450px" }}>
                <DragDropContext onDragEnd={result => onDragEndOrderVideos(result, formValues, setFormValues)}>
                    {columnsFromBackendVideos.map((e, index) => {
                    const columnId = formValues[index]?._id
                    const column = formValues
                    
                    return (
                        <div
                        className='d-flex'
                        key={columnId}
                        >
                        <div className='col-12'>
                            <h2 className='text-center'>Videos</h2>
                            <div className='d-flex justify-content-center' style={{ margin: 8 }}>
                                <DroppableOrderVideo columnId={columnId} column = {column} />
                            </div>
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
