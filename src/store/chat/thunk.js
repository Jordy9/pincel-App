import axios from 'axios'
import { scrollToBottom } from '../../helper/PrepareEvents';
import { chatCarga, imageMessage } from "./chatSlice";

const endPoint = process.env.REACT_APP_API_URL

const token = localStorage.getItem('token') || '';

export const cargarChat = (id) => {
    return async(dispatch, getState) => {

        const {usuarios, chatActivo} = getState().cht

        const imageUserMessage = await usuarios.find(user => user.id === chatActivo)

        const resp = await axios.get(`${endPoint}/mensaje/${id}`, {headers: {'x-token': token}})

        dispatch(chatCarga(resp.data.message))
        // dispatch(imageMessage(imageUserMessage?.urlImage))

        scrollToBottom('messages')
    }
}


