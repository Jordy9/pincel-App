import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
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


export const AdminRoute = () => {

  const { toShowResena } = useSelector(state => state.to);
  
  return (
    <Routes>
        <Route path='/pincel' element = {<Dashboard />} />
        <Route path='/pincel-admin' element = {<DashboardAdmin />} />
        <Route path='/capacitacion' element = {<Capacitacion />} />
        <Route path='/formCapacitaciones' element = {<FormularioVideos />} />
        <Route path='/ListCapacitaciones' element = {<ListadoCapacitaciones />} />
        <Route path='/capacitacion/:id' element = {<VideosComponent />} />
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
