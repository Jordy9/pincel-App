import React from 'react'
import user from '../../heroes/user.webp'
import { useDispatch } from 'react-redux'
import { useResponsive } from '../../hooks/useResponsive';
import { ModalUser } from './ModalUser';
import { useState } from 'react';
import { setActiveUser } from '../../store/auth/authSlice';
import { onDoubleTap } from '../../helper/onDoubleTap';
import { useSelector } from 'react-redux';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const { equipos } = useSelector(state => state.eq);

    const { id, name, role, team, estado, urlImage } = props

    const [ respWidth ] = useResponsive()

    const [showModalUser, setShowModalUser] = useState(false)

    const handleActive = () => {
        dispatch(setActiveUser(props))
        setShowModalUser(true)
    }

    const lider = equipos?.find(equipo => equipo?.items[0]?.id === id)

  return (
    <>
        <tr style={{cursor: 'pointer'}} onTouchStart = {(e) => onDoubleTap(e, handleActive)} onDoubleClick={handleActive} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
            {
                (respWidth > 992)
                    &&
                <td className='d-flex justify-content-center'>
                    <div className='d-flex justify-content-center my-1' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                        <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
                    </div>
                </td>
            }
            <td>{name}</td>
            <td style={{color: (lider) ? 'gold' : (role === 'Administrador') ? 'green' : 'blue'}}>{(lider) ? 'Lider' : role}</td>
            <td>{team}</td>
            <td style={{color: (estado) ? 'green' : 'red'}}>
                {
                    (estado)
                        ?
                    'Activo'
                        :
                    'Inactivo'
                }
            </td>
        </tr>

        {
            (showModalUser)
                &&
            <ModalUser ShowModalUser={showModalUser} setShowModalUser = {setShowModalUser} />
        }
    </>
  )
}
