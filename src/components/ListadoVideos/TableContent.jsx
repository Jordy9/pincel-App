import moment from 'moment'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toUpdate } from '../../store/capacitacion/capacitacionSlice';
import { eliminarCapacitacion } from '../../store/capacitacion/thunk';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const navigate = useNavigate()
    
    const { image, title, createdAt, team } = props

    const handledActive = (capacitacion) => {
      dispatch(toUpdate(capacitacion))
      navigate('/formCapacitaciones')
    }

    const handledDelete = (capacita) => {
          Swal.fire({
            title: '¿Esta seguro que desea eliminar esta capacitación?',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
          }).then((result) => {
            if (result.isConfirmed) {
              dispatch(eliminarCapacitacion(capacita))
            }
          })
        }

  return (
    <tr onDoubleClick = {() => handledActive(props)} style={{cursor: 'pointer'}}  data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre una capacitacion para ver o editar su contenido">
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={image} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{title}</td>
        <td>{moment(createdAt).format('MMMM Do YYYY')}</td>
        <td>{team?.map(team => team?.label)}</td>
        <td>             
            <button onClick={() => handledDelete(props)} className='btn btn-primary mx-1 my-1'><i className="bi bi-trash text-danger"></i></button>
        </td>
    </tr>
  )
}
