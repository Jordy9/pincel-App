import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkVideoUser, saveVideoId } from '../../store/capacitacion/thunk';
import ReactPlayer from 'react-player'

export const CapacitacionTema = () => {

  const dispatch = useDispatch();

  const { capacitacion, capacitacionActiva } = useSelector(state => state.cp);

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const navigate = useNavigate()

  const capacitacionId = window.location.pathname.split('/')[2]

  useEffect(() => {
    if (capacitacionActiva) {
      navigate(`?q=${capacitacionActiva?.videos?.idVideo || usuarioActivo?.lastVideo}`)      
    }

    if (capacitacionActiva?.idVideo) {
      dispatch(saveVideoId(capacitacionActiva?.videos?.idVideo, uid))
    }
  }, [capacitacionActiva])

  // const [duration, setDuration] = useState(0)

  const [end, setEnd] = useState('no')

  useEffect(() => {
    // const calculoCheckVideo = (duration*95) / 100

    if (end === undefined) {
      dispatch(checkVideoUser(capacitacionId, capacitacionActiva?.videos?.idVideo, uid))
    }

  }, [end, dispatch])

  // console.log(duration)
  
  return (
    // <video onTimeUpdate={(e) => setTimeUpdate(e.target.currentTime)} onDurationChangeCapture = {(e) => setDuration(e.target.duration)} controls style={{width: '100%', borderRadius: '20px'}} src={capacitacionActiva?.videos?.video || capacitacion[0]?.video[0]?.video} />
    <ReactPlayer onEnded = {(e) => setEnd(e)} width='100%' height = '60vh' controls url={capacitacionActiva?.videos?.video || capacitacion[0]?.video[0]?.video} />
  )
}
