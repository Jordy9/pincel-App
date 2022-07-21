import React from 'react'
import { Container } from 'react-bootstrap'
import { ModalUser } from './ModalUser'
import { TableSpreedList } from './TableSpreedList';

export const TableAdmin = () => {

  return (
    <Container>
        <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '300px'}}>
            <table className="table borderless">
                <thead>
                    <tr>
                        <th scope="col">Foto</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Promedio de las evaluaciones</th>
                        <th scope="col">Promedio de las reseñas</th>
                        <th scope="col">Capacitaciones en curso</th>
                        <th scope="col">Rol</th>
                        <th scope="col">Acción</th>
                    </tr>
                </thead>
                <tbody>
                    <TableSpreedList />
                </tbody>
            </table>
        </div>
        <ModalUser />
    </Container>
  )
}
