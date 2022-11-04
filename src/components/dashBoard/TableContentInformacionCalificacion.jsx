import React from 'react'
import { onDoubleTap } from '../../helper/onDoubleTap'

export const TableContentInformacionCalificacion = (props) => {
    const { titulo, evaluacion, VideoComponent, _id } = props

  return (
    <tr onTouchStart = {(e) => onDoubleTap(e, VideoComponent, _id)} onDoubleClick = {() => VideoComponent(_id)} style={{cursor: 'pointer'}} data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click para ver su capacitación">
        <td>{titulo}</td>
        <td>{evaluacion}</td>
    </tr>
  )
}
