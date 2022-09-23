import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { checkVideoUser, saveVideoId } from '../../store/capacitacion/thunk';
import ReactPlayer from 'react-player'
import { useRef } from 'react';
import { activeCapacitacion } from '../../store/capacitacion/capacitacionSlice';

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

  const [duration, setDuration] = useState(0)

  const [timeUpdate, setTimeUpdate] = useState(0)

  useEffect(() => {
    const calculoCheckVideo = (duration*95) / 100

    if (parseInt(timeUpdate) === parseInt(calculoCheckVideo)) {
      dispatch(checkVideoUser(capacitacionId, capacitacionActiva?.videos?.idVideo, uid))
    }

  }, [timeUpdate, dispatch])

  const [showContinue, setShowContinue] = useState(true)

  const [ NextVideo ] = capacitacion?.filter(capa => capa._id === capacitacionId)

  const [segundos, setSegundos] = useState(5)
  const refSegundosFront = useRef()

    useEffect(() => {
      refSegundosFront.current && clearInterval(refSegundosFront.current)
      refSegundosFront.current = setInterval(
         () => (!showContinue) && setSegundos(s => s - 1)
        , 1000)
    }, [showContinue])

    useEffect(() => {
      setSegundos(5)
    }, [showContinue])

    const cuentaVideos = NextVideo?.video?.indexOf(capacitacionActiva?.videos) + 1
    
    useEffect(() => {
      const calculoCheckVideo = (duration*100) / 100

      if (parseInt(timeUpdate) === parseInt(calculoCheckVideo) - 1 && NextVideo?.video?.length !== cuentaVideos) {
        setShowContinue(false)
      }
    }, [timeUpdate])
    
    useEffect(() => {
      if (segundos === 0 && NextVideo?.video?.length !== cuentaVideos) {
        dispatch(activeCapacitacion({...capacitacionActiva, videos: NextVideo?.video[NextVideo?.video?.indexOf(capacitacionActiva?.videos) + 1]}))
      }

      if (segundos === -1) {
        setShowContinue(true)
      }
    }, [segundos, dispatch])

    const nuevoVideo = NextVideo?.video[NextVideo?.video?.indexOf(capacitacionActiva?.videos) + 1]

  return (
    // <video onTimeUpdate={(e) => setTimeUpdate(e.target.currentTime)} onDurationChangeCapture = {(e) => setDuration(e.target.duration)} controls style={{width: '100%', borderRadius: '20px'}} src={capacitacionActiva?.videos?.video || capacitacion[0]?.video[0]?.video} />
    <>
      {
        (!showContinue)
          ?
        <div className='d-flex justify-content-center align-items-center' style={{width: '100%', height: '60vh'}}>
          <div style={{position: 'absolute', zIndex: 1045, top: '40vh'}}>
            <button onClick={() => setShowContinue(true)} className='btn btn-primary'>Cancelar</button>
          </div>
          <h5>A continuación en {(segundos > -1) && segundos} {(NextVideo?.video?.length !== cuentaVideos) && nuevoVideo?.titulo}</h5>
        </div>
          :
        <ReactPlayer onProgress={(state) => setTimeUpdate(state.playedSeconds)} onDuration = {(e) => setDuration(e)} width='100%' height = '60vh' controls url={capacitacionActiva?.videos?.video || capacitacion[0]?.video[0]?.video} />
      }
    </>
  )
}
