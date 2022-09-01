import React from 'react'
import { Container } from 'react-bootstrap'
import { TableSpreedList } from './TableSpreedList'
import { useNavigate } from 'react-router-dom'
import { toUpdateClear } from '../../store/capacitacion/capacitacionSlice'
import { useDispatch, useSelector } from 'react-redux'

export const TableCapacitaciones = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const { paraEditar } = useSelector(state => state.cp);

    const goToForm = () => {
        if (paraEditar) {
            dispatch(toUpdateClear())
        }
        navigate('/formCapacitaciones')
    }
  return (
    <Container>
        <div className = 'text-right'>
            <button className = 'btn btn-primary my-1' onClick = {goToForm}>Crear capacitación</button>
        </div>
        <div className='table-responsive shadow p-4' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '550px'}}>
            <table className="table borderless">
                <thead>
                    <tr>
                        <th scope="col">Imagen</th>
                        <th scope="col">Titulo</th>
                        <th scope="col">Fecha</th>
                        <th scope="col">Equipo</th>
                        <th scope="col">Acción</th>
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
