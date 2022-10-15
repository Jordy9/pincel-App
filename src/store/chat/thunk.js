import { scrollToBottom } from '../../helper/PrepareEvents';
import salonApi from '../../salonApi/salonApi';
import { chatCarga, imageMessage } from "./chatSlice";

export const cargarChat = (id) => {
    return async(dispatch, getState) => {

        const {usuarios, chatActivo} = getState().cht

        const imageUserMessage = await usuarios.find(user => user.id === chatActivo)

        const resp = await salonApi.get(`/mensaje/${id}`)

        dispatch(chatCarga(resp.data.message))
        // dispatch(imageMessage(imageUserMessage?.urlImage))

        scrollToBottom('messages')
    }
}


