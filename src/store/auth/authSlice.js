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
    modalUser: false,
    upload: 0,
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
        state.usuarios.push(action.payload)
    },

    onUpdate: (state, action ) => {
        state.usuarios = state.usuarios.map(
            e => (e.id === action.payload.id) ? action.payload : e);
        state.usuarioActivo = action.payload;
    },
    
    onUpdateUser: (state, action ) => {
        state.usuarios = state.usuarios.map(
            e => (e.id === action.payload.id) ? action.payload : e);
        state.activeUser = action.payload;
    },

    onUpdateTeam: (state, action ) => {
        state.usuarios = state.usuarios.map(
            e => (e.id === action.payload.id) ? action.payload : e);
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
        state.activeUser = action.payload;
    },

    modalOpen: (state) => {
        state.modalUser = true;
    },

    uploadImagePerfil: (state, action ) => {
        state.upload = action.payload
     },

    uploadFinish: (state ) => {
        state.upload = 0
     },

    modalClose: (state) => {
        state.modalUser = false;
        state.activeUser = null;
    },
}
});
export const 
    { 
        onGetUsers, 
        onLogin, 
        onRegister,
        onUpdate,
        onUpdateUser,
        onUpdateTeam,
        onActiveUser, 
        onChecking, 
        onLogout,
        setActiveUser,
        modalOpen,
        modalClose,
        uploadImagePerfil,
        uploadFinish
    } = authSlice.actions;