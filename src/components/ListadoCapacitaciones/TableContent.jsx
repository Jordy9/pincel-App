import moment from 'moment'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { toUpdate } from '../../store/capacitacion/capacitacionSlice';
import { eliminarCapacitacion, publicarCapacitacion } from '../../store/capacitacion/thunk';

export const TableContent = (props) => {

    const dispatch = useDispatch();

    const { usuarios } = useSelector(state => state.auth);

    let nuevoUser = usuarios?.filter(usuario => usuario?.estado === true)

    const navigate = useNavigate()
    
    const { image, title, createdAt, team, publicar, video, Preguntas} = props

    const handledActive = (capacitacion) => {
      dispatch(toUpdate(capacitacion))
      navigate('/formCapacitaciones')
    }

    let ok = true

    for (let index = 0; index < Preguntas?.length; index++) {
      const element = Preguntas[index];

      if (!element.pregunta) {
        ok = false
      }

      for (let index = 0; index < Preguntas[index]?.respuesta?.length; index++) {
        const element = Preguntas[index].respuesta[index];
        if (!element.respuesta) {
          ok = false
        }
      }
    }

    let okVideo = true

    for (let index = 0; index < video?.length; index++) {
      const element = video[index];

      if (!element.titulo) {
        okVideo = false
      }

      if (!element.video) {
        okVideo = false
      }
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

    const handledPublicar = (capacita, publicarAhora) => {
      if (okVideo) {
        if (ok) {
          if (!publicar) {
            Swal.fire({
              title: '¿Esta seguro que desea publicar esta capacitación?',
              icon: 'warning',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonColor: 'rgb(71, 7, 168)',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Publicar'
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(publicarCapacitacion(capacita, !publicarAhora))
              }
            })
    
          } else {
    
            Swal.fire({
              title: '¿Esta seguro que desea ocultar esta capacitación?',
              icon: 'warning',
              showCancelButton: true,
              cancelButtonText: 'Cancelar',
              confirmButtonColor: 'rgb(71, 7, 168)',
              cancelButtonColor: '#3085d6',
              confirmButtonText: 'Ocultar'
            }).then((result) => {
              if (result.isConfirmed) {
                dispatch(publicarCapacitacion(capacita, !publicarAhora))
              }
            })
    
          }
        } else {
          Swal.fire({
            title: 'Por favor, verifique que todos los campos de las evaluaciones estén correctos',
            icon: 'warning',
          })
        }
      } else {
        Swal.fire({
          title: 'Por favor, verifique que todos los campos de los videos estén correctos',
          icon: 'warning',
        })
      }
    }

  return (
    <tr onDoubleClick = {() => handledActive(props)} style={{cursor: 'pointer'}}  data-bs-toggle="tooltip" data-bs-placement="left" title="Haga doble click sobre una capacitacion para ver o editar su contenido">
        <td className='d-flex justify-content-center'>
            <div className='d-flex justify-content-center' style={{width: '50px', height: '50px', borderRadius: '50%', overflow: 'hidden', objectFit: 'cover'}}>
                <img src={image} className='img-fluid' alt="" />
            </div>
        </td>
        <td>{title}</td>
        <td>{moment(createdAt).format('DD/MM/YYYY, h:mm a')}</td>
        <td>{(nuevoUser?.length === team?.length) ? 'Todos' : team?.map(teamm => teamm?.label + ', ')}</td>
        <td>        
            <button onClick={() => handledDelete(props)} className='btn btn-primary mx-1 my-1'><i className="bi bi-trash text-danger"></i></button>
            <button onClick={() => handledPublicar(props, publicar)} className='btn btn-primary mx-1 my-1'>{(!publicar) ? 'Publicar' : 'Ocultar'}</button>
        </td>
    </tr>
  )
}
