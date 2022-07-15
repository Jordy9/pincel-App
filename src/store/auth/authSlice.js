import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
name: 'auth',
initialState: {
    checking: true,
    uid: null,
    name: null,
    usuarioActivo: null,
    activeUser: null,
    usuarios: null,
    modalUser: false
},
reducers: {
    onGetUsers: (state, action ) => {
        state.usuarios = action.payload;
    },
    
    onLogin: (state, action ) => {
        state.checking = false
        state.uid = action.payload.uid;
        state.name = action.payload.name;
    },
    
    onRegister: (state, action ) => {
        state.uid = action.payload.uid;
        state.name = action.payload.name;
    },

    onUpdate: (state, action ) => {
        state.usuarios = state.usuarios.map(
            e => (e.id === action.payload.id) ? action.payload : e);
        state.usuarioActivo = action.payload;
    },

    onActiveUser: (state, action ) => {
        state.usuarioActivo = action.payload;
    },

    onChecking: (state) => {
        state.checking = false;
    },

    onLogout: (state) => {
        state.checking = true;
        state.uid = null;
        state.name = null;
        state.usuarioActivo = null;
    },

    setActiveUser: (state, action) => {
        state.activeUser = action.payload
    },

    modalOpen: (state) => {
        state.modalUser = true
    },

    modalClose: (state) => {
        state.modalUser = false
    },
}
});
export const 
    { 
        onGetUsers, 
        onLogin, 
        onRegister,
        onUpdate,
        onActiveUser, 
        onChecking, 
        onLogout,
        setActiveUser,
        modalOpen,
        modalClose
    } = authSlice.actions;