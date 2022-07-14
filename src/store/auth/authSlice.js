import { createSlice } from '@reduxjs/toolkit';
export const authSlice = createSlice({
name: 'auth',
initialState: {
    checking: true,
    uid: null,
    name: null,
    usuarioActivo: null,
    usuarios: null
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
        state.usuarios = null;
    },
}
});
export const { onGetUsers, onLogin, onRegister, onActiveUser, onChecking, onLogout } = authSlice.actions;