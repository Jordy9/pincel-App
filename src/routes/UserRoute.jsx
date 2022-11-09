import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Capacitacion } from '../components/capacitacion/Capacitacion';
import { VideosComponent } from '../components/capacitacion/VideosComponent';
import { Dashboard } from '../components/dashBoard/Dashboard';
import { ChatScreen } from '../components/chat2.0/ChatScreen';
import { Perfil } from '../components/perfil/Perfil';
import { ListadoComunicadoUser } from '../components/listadoComunicadoUser/ListadoComunicadosUser';
import { EvaluacionPage } from '../components/capacitacion/EvaluacionPage';
import { ToRedirect } from '../components/capacitacion/ToRedirect';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { activeCapacitacion } from '../store/capacitacion/capacitacionSlice';
import { obtenerEnEvaluacion } from '../store/enEvaluacion/thunk';

export const UserRoute = ({uid}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerEnEvaluacion())
  }, [])

  const { enEvaluacion } = useSelector(state => state.enE);

  const { capacitacionActiva } = useSelector(state => state.cp);

  const enEv = enEvaluacion?.find(ev => ev?.idUsuario === uid)

  const navigate = useNavigate()

  useEffect(() => {
    if (enEv?._id && enEv?.capacitacionActiva) {
      dispatch(activeCapacitacion({...enEv?.capacitacionActiva}))
      navigate(`/evaluacionCapacitacion/${enEv?.capacitacionActiva?._id}`)
    }
  }, [enEv, dispatch, navigate])

  return (
    <Routes>
        <Route path='/pincel' element = {<Dashboard />} />
        <Route path='/capacitacion' element = {<Capacitacion />} />
        <Route path='/evaluacionCapacitacion/:id' element = {(enEv?.capacitacionActiva?._id && capacitacionActiva) ? <EvaluacionPage /> : <ToRedirect capacitacionActiva={enEv?.capacitacionActiva?._id} />} />
        <Route path='/capacitacion/:id' element = {<VideosComponent />} />
        <Route path='/Aclaraciones' element = {<ChatScreen />} />
        <Route path='/ListComunicadoUser' element = {<ListadoComunicadoUser />} />
        <Route path='/perfil' element = {<Perfil />} />
        
        <Route path='/*' element = {<Navigate to='/pincel' />} />
    </Routes>
  )
}
