import React from 'react'
import user from '../../heroes/user.webp'
import { useDispatch } from 'react-redux'
import { useResponsive } from '../../hooks/useResponsive';
import { ModalUser } from './ModalUser';
import { useState } from 'react';
import { setActiveUser } from '../../store/auth/authSlice';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const { id, name, lastName, email, estado, urlImage } = props

    const [ respWidth ] = useResponsive()

    const [showModalUser, setShowModalUser] = useState(false)

    const handleActive = () => {
        dispatch(setActiveUser(props))
        setShowModalUser(true)
    }

  return (
    <>
        <tr style={{cursor: 'pointer'}} onTouchStart = {handleActive} onDoubleClick={handleActive} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre un usuario para ver su detalle">
            {
                (respWidth > 992)
                    &&
                <td className='d-flex justify-content-center'>
                    <div className='d-flex justify-content-center my-3' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                        <img src={(urlImage) ? urlImage : user} className='img-fluid' alt="" />
                    </div>
                </td>
            }
            <td>{name}</td>
            <td>{lastName}</td>
            <td>{email}</td>
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
