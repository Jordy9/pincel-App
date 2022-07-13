import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';
import { Capacitacion } from '../components/capacitacion/Capacitacion';
import { VideosComponent } from '../components/capacitacion/VideosComponent';
import { Dashboard } from '../components/dashBoard/Dashboard';
import { DashboardAdmin } from '../components/dashBoard/DashboardAdmin';
import { FormularioVideos } from '../components/formularioVideos/FormularioVideos';
import { Login } from '../components/home/Login';
import { Registro } from '../components/home/Registro';
import { ListadoVideos } from '../components/ListadoVideos/ListadoVideos';
import { Notificaciones } from '../components/Notificaciones';
import { Perfil } from '../components/perfil/Perfil';
import { useSelector, useDispatch } from 'react-redux'
import { iniciarAutenticacion, obtenerUsuarios } from '../store/auth/thunk';
import { Spinner } from '../components/Spinner';
import { ChatScreen } from '../components/chat2.0/ChatScreen';
import moment from 'moment';
import 'moment/locale/es';
import { useSocket } from '../hooks/useSocket';
import { startSocket } from '../store/socket/socketSlice';
import { activeMessage, isTyping } from '../store/chat/chatSlice';
import { cargarNotificaciones } from '../store/notificaciones/thunks';
moment.locale('es');

export const AppRoute = () => {

  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth);

  const {socket, online, conectarSocket, desconectarSocket} = useSocket(`${process.env.REACT_APP_API_URL.split('/api')[0]}`)

  const token = localStorage.getItem('token')

  useEffect(() => {
    dispatch(obtenerUsuarios())
    dispatch(iniciarAutenticacion())
    dispatch(cargarNotificaciones())
  }, [dispatch])

  useEffect(() => {
    if (uid) {
        conectarSocket()
    }
  }, [uid, conectarSocket])

  useEffect(() => {
      if (!uid) {
          desconectarSocket()
      }
  }, [uid, desconectarSocket])

  useEffect(() => {
      dispatch(startSocket(socket, online))
  }, [dispatch, socket, online])

  useEffect(() => {
      socket?.on('mensaje-personal', (mensaje) => {
          dispatch(activeMessage(mensaje))
      })
  }, [socket, dispatch])

  useEffect(() => {
      socket?.on('escribiendo', (typing) => {
          dispatch(isTyping(typing))
      })
  }, [socket, dispatch])

  return (
    <>
      {
        (!!token)
          ?
        (!uid)
          ?
        <Spinner />
          :
        <>
          <Notificaciones />
          <Routes>
            <Route path='/pincel' element = {<Dashboard />} />
            <Route path='/pincel-admin' element = {<DashboardAdmin />} />
            <Route path='/capacitacion' element = {<Capacitacion />} />
            <Route path='/formCapacitaciones' element = {<FormularioVideos />} />
            <Route path='/ListVideos' element = {<ListadoVideos />} />
            <Route path='/capacitacion/:id' element = {<VideosComponent />} />
            <Route path='/Aclaraciones' element = {<ChatScreen />} />
            <Route path='/perfil' element = {<Perfil />} />

            <Route path='/*' element = {<Navigate to='/pincel' />} />
          </Routes>
        </>
          :
        <Routes>
          <Route path='/login' element = {<Login />} />
          <Route path='/registro' element = {<Registro />} />

          <Route path='/*' element = {<Navigate to='/login' />} />
        </Routes>
      }
    </>
  )
}
