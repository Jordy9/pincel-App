import React, { useEffect, useRef, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom';

import { Login } from '../components/home/Login';
import { Registro } from '../components/home/Registro';
import { Notificaciones } from '../components/Notificaciones';
import { useSelector, useDispatch } from 'react-redux'
import { iniciarAutenticacion, iniciarLogoutTokenExpire, obtenerUsuarioActivo, obtenerUsuarios } from '../store/auth/thunk';
import { Spinner } from '../components/Spinner';
import moment from 'moment';
import 'moment/locale/es';
import { useSocket } from '../hooks/useSocket';
import { startSocket } from '../store/socket/socketSlice';
import { activeMessage, isTyping } from '../store/chat/chatSlice';
import { cargarNotificaciones } from '../store/notificaciones/thunks';
import { IconExit } from '../components/IconExit';
import { obtenerResena, obtenerToResena } from '../store/resena/thunk';
import { obtenerComunicados } from '../store/comunicado/thunk';
import { UserRoute } from './UserRoute';
import { AdminRoute } from './AdminRoute';
import { Evaluacion } from '../components/home/Evaluacion';
import { obtenerCapacitacion } from '../store/capacitacion/thunk';
import { obtenerEvaluacion } from '../store/evaluacion/thunk';
import { obtenerEquipo } from '../store/equipo/thunk';
import { CustomEvaluacion } from '../components/home/CustomEvaluacion';
import { obtenerToShowResena } from '../store/toShowResena/thunk';
import { obtenerCustomResena } from '../store/customResena/thunk';
import { LeaderRoute } from './LeaderRoute';
import { ScrollToTop } from '../components/scrollToTop/ScrollToTop';
import axios from 'axios';
moment.locale('es');

export const AppRoute = () => {

  const dispatch = useDispatch();

  const { uid, usuarioActivo } = useSelector(state => state.auth);

  const { equipos } = useSelector(state => state.eq);

  let usuariosFiltrado = []

  equipos?.filter(equipo => usuariosFiltrado.push(equipo?.items[0]?.id))

  const isLeader = usuariosFiltrado?.includes(uid)

  const { toShowResena } = useSelector(state => state.to);

  const {socket, online, conectarSocket, desconectarSocket} = useSocket(`${process.env.REACT_APP_API_URL.split('/api')[0]}`)

  const token = localStorage.getItem('token')

  const tokenInit = localStorage.getItem('token-init-date')

  // console.log(moment(Number(tokenInit)).fromNow())

  // const [segundos, setSegundos] = useState(0)
  //   const refSegundos = useRef()

  //   useEffect(() => {
  //     refSegundos.current && clearInterval(refSegundos.current)
  //     refSegundos.current = setInterval(
  //        () => (token) && setSegundos(s => s + 1)
  //       , 1000)
  //   }, [token])

  // useEffect(() => {
  //   if (moment().diff(moment(Number(tokenInit)), 'hours') >= 2 && moment().diff(moment(Number(tokenInit)), 'hours') < 462716) {
  //     dispatch(iniciarAutenticacion())
  //   }
  // }, [segundos, tokenInit, dispatch])
  
  useEffect(() => {
    dispatch(obtenerUsuarios())
    dispatch(iniciarAutenticacion())
    dispatch(cargarNotificaciones())
    dispatch(obtenerResena())
    dispatch(obtenerToResena())
    dispatch(obtenerCapacitacion())
    dispatch(obtenerComunicados())
    dispatch(obtenerEvaluacion())
    dispatch(obtenerEquipo())
    dispatch(obtenerToShowResena())
    dispatch(obtenerCustomResena())
  }, [dispatch])

  useEffect(() => {
    if (uid && !usuarioActivo) {
      dispatch(obtenerUsuarioActivo())
    }
  }, [dispatch, uid, usuarioActivo])
  
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
    dispatch(startSocket({socket, online}))
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
          {/* <Notificaciones /> */}
          <IconExit />
          <ScrollToTop />

          {
            (usuarioActivo?.role && usuarioActivo?.role === 'Usuario')
              ?
            (isLeader)
              ?
            <LeaderRoute />
              :
            <UserRoute />
              :
            <AdminRoute />
          }
        </>
          :
        <Routes>
          <Route path='/login' element = {<Login />} />
          {/* <Route path='/registro' element = {<Registro />} /> */}
          <Route path='/Evaluacion' element = { (toShowResena[0]?.showResena === 'Normal') ? <Evaluacion /> : <CustomEvaluacion />} />

          <Route path='/*' element = {<Navigate to='/login' />} />
        </Routes>
      }
    </>
  )
}
