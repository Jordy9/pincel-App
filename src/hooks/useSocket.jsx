import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { UsuariosCargados } from '../store/chat/chatSlice';
import { NotificacionesCargadas } from '../store/notificaciones/notificacionesSlice';
import { BorrarNotificaciones } from '../store/notificaciones/thunks';
// import { NotificationPublicAdmin } from '../action/auth';
// import { UsuariosCargados } from '../action/chat';
// import { cargarContactos } from '../action/contact';
// import { BorrarNotificaciones, NotificacionesCargadas } from '../action/notifications';
// import { startGetNotificationsAdmin, StartUpdateNotificationAdmin } from '../action/notificationsAdmin';
// import { cargarPeticiones, cargarPeticionesPastores, cargarPeticionesSinCuenta, startGetPaginatePetitions, startGetPaginatePetitionUser } from '../action/petition';


export const useSocket = ( serverPath ) => {

    const token = localStorage.getItem('token')

    const dispatch = useDispatch()
    
    const [ socket, setSocket ] = useState(null);
    const [ online, setOnline ] = useState(false);

    const conectarSocket = useCallback(
        () => {
           const socketTemp = io.connect( serverPath, {
                transports: ['websocket'],
                autoConnect: true,
                forceNew: true,
                query: {
                    'x-token': token
                }
            } )

           setSocket(socketTemp)
        }, [serverPath, token])

    const desconectarSocket = useCallback(
        () => {
            socket?.disconnect()
        }, [socket])

    useEffect(() => {
        setOnline( socket?.connected );
    }, [socket])

    useEffect(() => {
        socket?.on('connect', () => setOnline( true ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('disconnect', () => setOnline( false ));
    }, [ socket ])

    useEffect(() => {
        socket?.on('lista-usuarios', (usuarios) => {
            dispatch(UsuariosCargados(usuarios))
        })
    }, [ socket, dispatch ])

    useEffect(() => {
        socket?.on('lista-notificaciones', (notificaciones) => {
            dispatch(NotificacionesCargadas(notificaciones))

            dispatch(BorrarNotificaciones())
        })
    }, [ socket, dispatch])

    // useEffect(() => {
    //     socket?.on('Deleted-Notifications-count-Admin', (notification) => {
    //         if (notification !== null) {
    //             dispatch(StartUpdateNotificationAdmin(notification))
    //         }
    //     })
    // }, [ socket, dispatch])

    // useEffect(() => {
    //     socket?.on('notifications-Show-admin', (notification) => {

    //         if (notification?.subtitle === 'Nueva petición de oración de usuario agregada') {
    //             dispatch(startGetPaginatePetitionUser())
    //         } else if (notification?.subtitle === 'Nueva petición de oración de pastores agregada de: ') {
    //             dispatch(startGetPaginatePetitions())
    //         }

    //         dispatch(startGetNotificationsAdmin())

    //         dispatch(NotificationPublicAdmin(notification))
    //     })
    // }, [ socket, dispatch])
    
    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}