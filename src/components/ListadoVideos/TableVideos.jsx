import React from 'react'
import { Container } from 'react-bootstrap'
import { TableSpreedList } from './TableSpreedList'

export const TableVideos = () => {
  return (
    <Container>
        <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '550px'}}>
            <table className="table borderless">
                <thead>
                    <tr>
                        <th scope="col">Imagen</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Equipo</th>
                        <th scope="col">Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                    <TableSpreedList />
                </tbody>
            </table>
        </div>
    </Container>
  )
}
