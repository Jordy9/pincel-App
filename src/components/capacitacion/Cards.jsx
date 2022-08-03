import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { useResponsive } from '../../hooks/useResponsive'
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';

export const Cards = () => {

  const dispatch = useDispatch();

  const { capacitacion } = useSelector(state => state.cp);

  const navigate = useNavigate()

  const VideoComponent = (id) => {
    navigate(`/capacitacion/${id}`)
    const capacitacionfilter = capacitacion?.filter(capacitacion => capacitacion?._id === id)

    if (capacitacionfilter?.length !== 0) {
      dispatch(activeCapacitacion(capacitacionfilter[0]?.video[0]))
    }
  }

  const [respWidth] = useResponsive()
  
  return (
    <>
    {
      capacitacion?.map(({title, _id, image}) => {
        return (
          <div className="col-xs-12 col-sm-12 col-md-6 col-lg-3 col-xl-3 col-col-xxl-3 my-2">
            <div className='bg-transparent d-flex flex-column' style={{borderRadius: '10px'}}>
              <img src={image} className='img-fluid' style={{borderRadius: '20px', width: '100%', height: (respWidth >= 768) ? 170 : 'auto', objectFit: 'cover'}} alt="" />
              <div className='p-2'>
                <h5>{title}</h5>
                <p style={{fontSize: '13.5px'}} className='text-muted'>Duracion: 2 h 05 min</p>
                <div className="progress my-2">
                  <div className="progress-bar" role="progressbar" style={{width: '25%', backgroundColor: 'rgb(89, 7, 211)'}} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">25%</div>
                </div>
                <button onClick={() => VideoComponent(_id)} className='btn btn-primary form-control'>Continuar capacitación</button>
              </div>
            </div>
          </div>
        )
      })
    }
    </>
  )
}
