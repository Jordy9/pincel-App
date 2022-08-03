import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export const CapacitacionTema = () => {
  const { capacitacion, capacitacionActiva } = useSelector(state => state.cp);

  const navigate = useNavigate()

  useEffect(() => {
    if (capacitacionActiva) {
      navigate(`?q=${capacitacionActiva?.idVideo}`)
    }
  }, [capacitacionActiva])

  const [duration, setDuration] = useState(0)

  const [timeUpdate, setTimeUpdate] = useState(0)
  
  return (
    <video onTimeUpdate={(e) => setTimeUpdate(e.target.currentTime)} onDurationChangeCapture = {(e) => setDuration(e.target.duration)} controls style={{width: '100%', height: '60vh', borderRadius: '20px', objectFit: 'cover'}} src={capacitacionActiva?.video || capacitacion[0]?.video[0]?.video} />
  )
}
