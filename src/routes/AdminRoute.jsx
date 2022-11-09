import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { Capacitacion } from '../components/capacitacion/Capacitacion';
import { VideosComponent } from '../components/capacitacion/VideosComponent';
import { Dashboard } from '../components/dashBoard/Dashboard';
import { DashboardAdmin } from '../components/dashBoard/DashboardAdmin';
import { FormularioVideos } from '../components/formularioVideos/FormularioVideos';
import { ListadoCapacitaciones } from '../components/ListadoCapacitaciones/ListadoCapacitaciones';
import { Perfil } from '../components/perfil/Perfil';
import { ChatScreen } from '../components/chat2.0/ChatScreen';
import { Comunicado } from '../components/comunicado/Comunicado';
import { ListadoComunicados } from '../components/listadoComunicados/ListadoComunicados';
import { Evaluacion } from '../components/home/Evaluacion';
import { TipoResenas } from '../components/tipoResenas/TipoResenas';
import { useSelector } from 'react-redux';
import { Spinner } from '../components/Spinner';
import { ListadoUsuarios } from '../components/usuarios/ListadoUsuarios';
import { EvaluacionPage } from '../components/capacitacion/EvaluacionPage';
import { ToRedirect } from '../components/capacitacion/ToRedirect';
import { useDispatch } from 'react-redux';
import { activeCapacitacion } from '../store/capacitacion/capacitacionSlice';
import { obtenerEnEvaluacion } from '../store/enEvaluacion/thunk';


export const AdminRoute = ({uid}) => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(obtenerEnEvaluacion())
  }, [])

  const capacitacionId = window.location.pathname.split('/')[2]

  const { toShowResena } = useSelector(state => state.to);

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
        <Route path='/pincel-admin' element = {<DashboardAdmin />} />
        <Route path='/capacitacion' element = {<Capacitacion />} />
        <Route path='/formCapacitaciones' element = {<FormularioVideos />} />
        <Route path='/ListCapacitaciones' element = {<ListadoCapacitaciones />} />
        <Route path='/capacitacion/:id' element = {(capacitacionActiva && capacitacionId === capacitacionActiva?._id) ? <VideosComponent /> : <ToRedirect capacitacionActiva={capacitacionActiva?._id} />} />
        <Route path='/evaluacionCapacitacion/:id' element = {(enEv?.capacitacionActiva?._id && capacitacionActiva) ? <EvaluacionPage /> : <ToRedirect capacitacionActiva={enEv?.capacitacionActiva?._id} />} />
        <Route path='/Aclaraciones' element = {<ChatScreen />} />
        <Route path='/Comunicado' element = {<Comunicado />} />
        <Route path='/ListComunicados' element = {<ListadoComunicados />} />
        <Route path='/perfil' element = {<Perfil />} />
        <Route path='/Evaluacion' element = {<Evaluacion />} />
        <Route path='/Usuarios' element = {<ListadoUsuarios />} />
        <Route path='/TipoResenas' element = {(toShowResena[0]?.inputType) ? <TipoResenas /> : <Spinner />} />

        <Route path='/*' element = {<Navigate to='/pincel-admin' />} />
    </Routes>
  )
}
