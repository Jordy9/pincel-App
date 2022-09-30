import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { onDoubleTap } from '../../helper/onDoubleTap';
import { setActiveResena } from '../../store/customResena/customResenaSlice';
import { ModalCustomResena } from './ModalCustomResena';

export const TableContentCustomResena = (props) => {

  const dispatch = useDispatch();

    const { titulo, descripcion, calificacion } = props

    const [showModalCustomResena, setShowModalCustomResena] = useState(false)

    const setActive = (resena) => {
      dispatch(setActiveResena(resena))
      setShowModalCustomResena(true)
    }

  return (
    <tr style={{cursor: 'pointer'}} onTouchStart = {(e) => onDoubleTap(e, setActive, props)} onDoubleClick={() => setActive(props)} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre una resena para ver su detalle">
        <td>{titulo}</td>
        <td>{calificacion}</td>
        <td className='d-flex justify-content-center mx-auto'>{descripcion}</td>

        <ModalCustomResena showModalCustomResena = {showModalCustomResena} setShowModalCustomResena = {setShowModalCustomResena} />
    </tr>
  )
}
