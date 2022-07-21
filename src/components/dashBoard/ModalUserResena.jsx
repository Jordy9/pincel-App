import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import { Rating } from 'react-simple-star-rating'
import { useSelector } from 'react-redux'
import user from '../../heroes/user.webp'
import DataTable from 'react-data-table-component'

export const ModalUserResena = ({modalShowResena, setModalShowResena}) => {

    const { evaluacion } = useSelector(state => state.ev);

    // const evaluacionUser = evaluacion.filter(evaluacion => evaluacion.usuario === activeUser?.id)

    // const [completa, mejorar, calificacion] = evaluacionUser;

    const [rating, setRating] = useState(90) // initial rating value

    // Catch Rating value
    // const handleRating = (rate) => {
    //     setRating(rate)
    //     // other logic
    // }

    const handleClose = () => {
        setModalShowResena(false)
    }

    const columns = [
        {
          name: 'Calificación',
          selector: 'calificacion',
          sortable: true
        },
        {
          name: 'Descripción',
          selector: 'descripcion',
        },
        {
          name: 'Fecha',
          selector: 'fecha',
          sortable: true,
        },
      ]
  
      const rows = [
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/06/2021',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        {
          calificacion: <Rating size={20} readonly ratingValue={rating} />,
          descripcion: 'Lorem ipsum dolor sit amet consectetur adipisicing.',
          fecha: '20/07/2022',
        },
        
      ]
  
      const paginationOptions = {
          rowsPerPageText: 'Filas por página',
          rangeSeparatorText: 'de',
          selectAllRowsItem: true,
          selectAllRowsItemText: 'Todos',
      }
  
      const customStyles = {
          rows: {
          },
          headCells: {
              style: {
                background: 'white',
                color: 'black',
                fontWeight: 'bold',
                fontSize: '16px',
                justifyContent: 'center'
              },
          },
          cells: {
              style: {
                textDecoration: 'none',
                justifyContent: 'center',
                fontSize: '16px',
              },
          },
          pagination: {
              style: {
                background: 'white',
                color: 'black'
              }
          }
      };

  return (
    <Modal fullscreen show={modalShowResena} onHide={handleClose}>
        <Modal.Header style={{border: 'none'}} closeButton>
          <Modal.Title><h1>Reseñas</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="row my-3 p-4">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 col-xxl-12 my-auto" style={{borderRadius: '35px'}}>
                    <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '500px'}}>
                        <DataTable
                            customStyles = {customStyles}
                            columns = {columns}
                            theme = "white"
                            data={rows}
                            pagination
                            paginationComponentOptions = {paginationOptions}
                            // fixedHeader
                            // fixedHeaderScrollHeight = '500px'
                            responsive
                        />
                    </div>
                </div>
            </div>

        </Modal.Body>
    </Modal>
  )
}
