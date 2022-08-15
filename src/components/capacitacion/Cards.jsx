import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../hooks/useResponsive'
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';

export const Cards = () => {

  const dispatch = useDispatch();

  const { capacitacion } = useSelector(state => state.cp);

  const { uid } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const VideoComponent = (id) => {
    navigate(`/capacitacion/${id}`)
    const capacitacionfilter = capacitacion?.filter(capacitacion => capacitacion?._id === id)

    if (capacitacionfilter?.length !== 0) {
      dispatch(activeCapacitacion({videos: capacitacionfilter[0]?.video[0], preguntas: capacitacionfilter[0]?.Preguntas, descripcion: capacitacionfilter[0]?.descripcion, usuariosEvaluacion: capacitacionfilter[0]?.usuariosEvaluacion, intentos: capacitacionfilter[0]?.intentos}))
    }
  }

  const [respWidth] = useResponsive()
  
  return (
    <>
    {
      capacitacion?.map(({title, _id, image, duracion, video}) => {
        const duration = parseInt(duracion / 60)
        const CantidadCheck = video?.filter(video => video?.check?.includes(uid))

        const porcentaje = parseInt((CantidadCheck?.length / video?.length) * 100)        
        return (
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
            <div className='bg-transparent d-flex flex-column' style={{borderRadius: '10px'}}>
              <img src={image} className='img-fluid' style={{borderRadius: '20px', width: '100%', height: (respWidth >= 768) ? 170 : 'auto', objectFit: 'cover'}} alt="" />
              <div className='p-2'>
                <h5>{title}</h5>
                <p style={{fontSize: '13.5px'}} className='text-muted'>Duracion: {(duration < 1) ? 1 : duration} min</p>
                {
                  (porcentaje >= 1)
                    &&
                  <div className="progress my-2">
                    <div className="progress-bar" role="progressbar" style={{width: `${porcentaje}%`, backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{porcentaje}%</div>
                  </div>
                }
                <button onClick={() => VideoComponent(_id)} className='btn btn-primary form-control'>{(porcentaje >= 1) ? 'Continuar capacitación' : 'Empezar capacitación' }</button>
              </div>
            </div>
          </div>
        )
      })
    }
    </>
  )
}
