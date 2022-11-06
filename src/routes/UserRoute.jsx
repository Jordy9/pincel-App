import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Capacitacion } from '../components/capacitacion/Capacitacion';
import { VideosComponent } from '../components/capacitacion/VideosComponent';
import { Dashboard } from '../components/dashBoard/Dashboard';
import { ChatScreen } from '../components/chat2.0/ChatScreen';
import { Perfil } from '../components/perfil/Perfil';
import { ListadoComunicadoUser } from '../components/listadoComunicadoUser/ListadoComunicadosUser';
import { EvaluacionPage } from '../components/capacitacion/EvaluacionPage';

export const UserRoute = ({capacitacionActiva}) => {
  return (
    <Routes>
        <Route path='/pincel' element = {<Dashboard />} />
        <Route path='/capacitacion' element = {<Capacitacion />} />
        <Route path='/evaluacionCapacitacion/:id' element = {(capacitacionActiva?._id) && <EvaluacionPage />} />
        <Route path='/capacitacion/:id' element = {<VideosComponent />} />
        <Route path='/Aclaraciones' element = {<ChatScreen />} />
        <Route path='/ListComunicadoUser' element = {<ListadoComunicadoUser />} />
        <Route path='/perfil' element = {<Perfil />} />
        <Route path='/*' element = {<Navigate to='/pincel' />} />
    </Routes>
  )
}
