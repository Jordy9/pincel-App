import React, { useRef } from 'react'
import { Container } from 'react-bootstrap'
import { TableSpreedList } from './TableSpreedList'
import { useNavigate } from 'react-router-dom'
import { toUpdateClear } from '../../store/capacitacion/capacitacionSlice'
import { useDispatch, useSelector } from 'react-redux'
import { Pagination } from '../usuarios/Pagination'
import { useEffect } from 'react'
import { useState } from 'react'
import { MultiSelect } from 'react-multi-select-component'

export const TableCapacitaciones = () => {

    const navigate = useNavigate()

    const dispatch = useDispatch();

    const { paraEditar, capacitacion } = useSelector(state => state.cp);

    const goToForm = () => {
        if (paraEditar) {
            dispatch(toUpdateClear())
        }
        navigate('/formCapacitaciones')
    }

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        setCurrentPage(0)
    }, [])

    let capacitacionParaList = []

    const [title, setTitle] = useState('')

    capacitacionParaList = capacitacion?.filter(capacitacion => (title === '') ? capacitacion : (capacitacion.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))) && capacitacion)

    const ref = useRef(null)

  return (
    <Container>

        <input placeholder='Buscador' type="search" value={title} onChange={({target}) => setTitle(target.value)} className="form-control buscador" />
        <div className = 'text-right'>
            <button className = 'btn btn-primary my-1' onClick = {goToForm}>Crear capacitación</button>
        </div>
        <div className='table-responsive shadow pt-4 pb-4 px-1' style={{borderTopLeftRadius: '35px', borderBottomLeftRadius: '35px', borderTopRightRadius: '10px', borderBottomRightRadius: '10px', height: '550px'}}>
            <table ref = {ref} className="table borderless">
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
                    <TableSpreedList capacitacion = {capacitacionParaList} currentPage = {currentPage} />
                </tbody>
            </table>
        </div>

        <div className='mt-3'>
            <Pagination setCurrentPage = {setCurrentPage} usuariosFiltro = {capacitacionParaList} element = {ref?.current} />
        </div>
    </Container>
  )
}
