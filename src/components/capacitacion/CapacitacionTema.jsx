import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkVideoUser } from '../../store/capacitacion/thunk';

export const CapacitacionTema = () => {

  const dispatch = useDispatch();

  const { capacitacion, capacitacionActiva } = useSelector(state => state.cp);

  const { uid } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const capacitacionId = window.location.pathname.split('/')[2]

  useEffect(() => {
    if (capacitacionActiva) {
      navigate(`?q=${capacitacionActiva?.idVideo}`)
    }
  }, [capacitacionActiva])

  const [duration, setDuration] = useState(0)

  const [timeUpdate, setTimeUpdate] = useState(null)

  useEffect(() => {
    const calculoCheckVideo = (duration*80) / 100

    if (parseInt(timeUpdate) === parseInt(calculoCheckVideo)) {
      dispatch(checkVideoUser(capacitacionId, capacitacionActiva?.idVideo, uid))
    }

  }, [timeUpdate, dispatch])
  
  return (
    <video onTimeUpdate={(e) => setTimeUpdate(e.target.currentTime)} onDurationChangeCapture = {(e) => setDuration(e.target.duration)} controls style={{width: '100%', height: '60vh', borderRadius: '20px', objectFit: 'cover'}} src={capacitacionActiva?.video || capacitacion[0]?.video[0]?.video} />
  )
}
