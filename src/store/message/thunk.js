
export const deleteMessage = (id) => {
    return (dispatch, getState) => {
        const {socket} = getState().sk

        socket?.emit('delete-mensaje-personal', id)
        // dispatch(removeMessage(id))
    }
}

export const hiddeMessage = (id) => {
    return (dispatch, getState) => {
        const {socket} = getState().sk

        const {uid} = getState().auth

        socket?.emit('hidde-mensaje-personal', id, uid)
        // dispatch(removeMessage(id))
    }
}