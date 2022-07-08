import React from 'react'
import { Accordion } from 'react-bootstrap'

export const Sidebar = () => {
    const arreglo = [
        {
            titulo: 'Que es el cliente',
            content: [
                {
                    nombre: 'primero1',
                    imagen: 'https://cdn.pixabay.com/photo/2017/02/04/12/25/man-2037255__340.jpg',
                    duracion: '2 h 05 min',
                },
                {
                    nombre: 'primero2',
                    imagen: 'https://cdn.pixabay.com/photo/2017/02/04/12/25/man-2037255__340.jpg',
                    duracion: '2 h 05 min',
                },
                {
                    nombre: 'primero3',
                    imagen: 'https://cdn.pixabay.com/photo/2017/02/04/12/25/man-2037255__340.jpg',
                    duracion: '2 h 05 min',
                },
            ],
        },
        {
            titulo: 'Que es el servicio al cliente',
            content: [
                {
                    nombre: 'segundo1',
                    imagen: 'https://cdn.pixabay.com/photo/2017/03/20/10/50/books-2158737__340.jpg',
                    duracion: '2 h 05 min',
                },
                {
                    nombre: 'segundo2',
                    imagen: 'https://cdn.pixabay.com/photo/2017/03/20/10/50/books-2158737__340.jpg',
                    duracion: '2 h 05 min',
                },
                {
                    nombre: 'segundo3',
                    imagen: 'https://cdn.pixabay.com/photo/2017/03/20/10/50/books-2158737__340.jpg',
                    duracion: '2 h 05 min',
                },
            ],
        },
    ]
    console.log(arreglo)
  return (
    <div style={{width: '100%', height: '100vh'}}>
        <h4 className='text-center p-1'>Contenido de la capacitacion</h4>
        <Accordion flush style={{backgroundColor: '#181818'}} defaultActiveKey="">
            {
                arreglo.map((capa, index) => (
                    <Accordion.Item eventKey={index - 1}>
                        <Accordion.Header>{capa.titulo}</Accordion.Header>
                        <Accordion.Body>
                                {
                                    capa.content.map(capa => (
                                        <>
                                        <div className="row">
                                            <div className="col-1">
                                                <input type="checkbox" className='form-check-input' />
                                            </div>
                                            <div className="col-11">
                                                <img src={capa.imagen} style = {{width: '100px', height: '100px'}} className = 'mx-2 img-fluid' alt="" />
                                                {capa.nombre}
                                            </div>
                                        
                                            <caption style={{fontSize: '13px'}}>{capa.duracion}</caption>
                                        </div>
                                        </>

                                    ))

                                    
                                }

                        </Accordion.Body>
                    </Accordion.Item>
                ))
            }
        </Accordion>
    </div>
  )
}
