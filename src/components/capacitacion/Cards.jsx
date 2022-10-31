import React, { useState } from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../hooks/useResponsive'
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';
import { Spinner } from '../Spinner';
import { Pagination } from '../usuarios/Pagination';

export const Cards = () => {

  const dispatch = useDispatch();

  const { capacitacion } = useSelector(state => state.cp);

  const { evaluacion } = useSelector(state => state.ev);

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const VideoComponent = (id) => {
    navigate(`/capacitacion/${id}`)
    const capacitacionfilter = capacitacion?.filter(capacitacion => capacitacion?._id === id)
    
    if (capacitacionfilter?.length !== 0) {
      dispatch(activeCapacitacion({_id: capacitacionfilter[0]?._id, videos: capacitacionfilter[0]?.video[0], preguntas: capacitacionfilter[0]?.Preguntas, descripcion: capacitacionfilter[0]?.descripcion, usuariosEvaluacion: capacitacionfilter[0]?.usuariosEvaluacion, intentos: capacitacionfilter[0]?.intentos, EvaluatShow: capacitacionfilter[0]?.EvaluatShow, title: capacitacionfilter[0]?.title}))
    }
  }

  const [respWidth] = useResponsive()

  let capacitacionTOList = []

  capacitacionTOList = capacitacion?.filter(capacitacion => capacitacion?.publicar === true && (capacitacion?.team?.some(team => team?.value === usuarioActivo?.team || team?.value === usuarioActivo?.id || usuarioActivo?.role === 'Administrador')))

  const [title, setTitle] = useState('')

  const [currentPage, setCurrentPage] = useState(0)

  useEffect(() => {
    setCurrentPage(0)
  }, [])

  const PaginateCapacitaciones = () => {
    const allCapacitaciones = [...capacitacionTOList]
    return allCapacitaciones?.slice(currentPage, currentPage + 8)
  }
  
  return (
    <>

    <input placeholder='Buscador' type="search" value={title} onChange={({target}) => setTitle(target.value)} className="form-control buscador" />

      {
        (!capacitacionTOList)
          ?
        <Spinner />
          :
        <>
          {
            PaginateCapacitaciones()?.filter(capacitacion => (title === '') ? capacitacion : (capacitacion.title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"").includes(title.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))) && capacitacion)?.map(({title, _id, image, duracion, video, EvaluatShow}) => {
              const duration = parseInt(duracion / 60)
              const CantidadCheck = video?.filter(video => video?.check?.includes(uid))

              const EvaluacionDeCap = evaluacion?.filter(evaluacion => evaluacion?.idCapacitacion === _id && evaluacion?.idUsuario === uid)

              const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)        
              return (
                <div key = {_id} className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-3">
                  <div className='bg-transparent d-flex flex-column' style={{borderRadius: '10px'}}>
                    <img src={image} className='img-fluid' style={{borderRadius: '20px', width: '100%', height: (respWidth >= 768) ? 170 : 'auto'}} alt="" />
                    <div className='p-2'>
                      <h5 className='elipsisCard'>{title}</h5>
                      <p style={{fontSize: '13.5px'}} className='text-muted'>Duracion: {(duration < 1) ? 1 : duration} min</p>
                      {
                        (porcentaje >= 1)
                          &&
                        <div className="progress my-2">
                          <div className="progress-bar" role="progressbar" style={{width: `${porcentaje}%`, backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{porcentaje}%</div>
                        </div>
                      }
                      <button onClick={() => VideoComponent(_id)} className='btn btn-primary form-control'>{(porcentaje === 100 && (EvaluacionDeCap?.length !== 0 || !EvaluatShow)) ? 'Capacitación completa' : (porcentaje >= 1 && EvaluacionDeCap?.length === 0) ? 'Continuar capacitación' : 'Empezar capacitación'}</button>
                    </div>
                  </div>
                </div>
              )
            })
          }

          <div className='mt-3'>
            <Pagination setCurrentPage = {setCurrentPage} usuariosFiltro = {capacitacionTOList} changeNumber = {8}/>
          </div>
        </>
      }
    </>
  )
}
