import React, { useEffect, useState } from 'react'
import user from '../../heroes/user.webp'
import { useDispatch, useSelector } from 'react-redux'
import { modalOpen, setActiveUser } from '../../store/auth/authSlice';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const { resena } = useSelector(state => state.rs);

    const {id, name, lastName, date, email, urlImage, role} = props

    const handledActive = (user) => {
        dispatch(setActiveUser(user))
        dispatch(modalOpen())
    }

    let calificacionFiltrada = []

    resena?.filter(resena => resena?.estado !== false)?.map(resena => {
        return (
            (resena?.calificacion?.filter(resena => resena?.id === id))
                &&
            calificacionFiltrada.push(resena?.calificacion?.filter(resena => resena?.id === id))
        )
    })
    
    let suma = 0
    let division = 0

    calificacionFiltrada?.map((calificacion) => {
        if (calificacion[0]?.id === id) {
            division += 1
        }
        return suma += calificacion[0]?.calificacion || 0
    })

    const usuarioCompleto = {
        ...props,
        calificacion: parseInt(suma/division) || 0,
        cantidad: division
    }

  return (
    <tr style={{cursor: 'pointer'}} onDoubleClick={() => handledActive(usuarioCompleto)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{name}</td>
        <td>{lastName}</td>
        <td>10</td>
        <td>{parseInt(suma/division) || 0}</td>
        <td>
            <div data-bs-toggle="tooltip" data-bs-placement="left" title="3/10 cursos completados" className="progress my-2">
              <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
            </div>
        </td>
        <td className={`${(role === 'Usuario') ? 'text-primary' : 'text-success'}`}>{role}</td>
    </tr>
  )
}
