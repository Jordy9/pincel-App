import React, { useEffect } from 'react'
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import { DashboardAdmin } from '../components/dashBoardLeader/DashboardAdmin'
import { Dashboard } from '../components/dashBoard/Dashboard'
import { Perfil } from '../components/perfil/Perfil'
import { VideosComponent } from '../components/capacitacion/VideosComponent'
import { Capacitacion } from '../components/capacitacion/Capacitacion'
import { EvaluacionPage } from '../components/capacitacion/EvaluacionPage'
import { ToRedirect } from '../components/capacitacion/ToRedirect'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { activeCapacitacion } from '../store/capacitacion/capacitacionSlice'
import { obtenerEnEvaluacion } from '../store/enEvaluacion/thunk'

export const LeaderRoute = ({uid}) => {

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
            <Route path='/pincel-admin' element = {<DashboardAdmin />} />
            <Route path='/pincel' element = {<Dashboard />} />
            <Route path='/capacitacion' element = {<Capacitacion />} />
            <Route path='/evaluacionCapacitacion/:id' element = {(enEv?.capacitacionActiva?._id && capacitacionActiva) ? <EvaluacionPage /> : <ToRedirect capacitacionActiva={enEv?.capacitacionActiva?._id} />} />
            <Route path='/capacitacion/:id' element = {<VideosComponent />} />
            {/* <Route path='/Aclaraciones' element = {<ChatScreen />} />
            <Route path='/Comunicado' element = {<Comunicado />} />
            <Route path='/ListComunicados' element = {<ListadoComunicados />} /> */}
            <Route path='/perfil' element = {<Perfil />} />
    
            <Route path='/*' element = {<Navigate to='/pincel-admin' />} />
        </Routes>
      )
}
