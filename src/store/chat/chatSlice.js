import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
   name: 'chat',
   initialState: {
      usuarios: [],
      chatActivo: null,
      image: '',
      mensajes: [],
      id: null,
      typing: null
   },
   reducers: {
        UsuariosCargados: (state, action ) => {
           state.usuarios = action.payload;
        },

        activeChat: (state, action ) => {
            if (state.chatActivo === action.payload) return state
            
            state.chatActivo = action.payload;
            state.mensajes = [];
            state.id = action.payload;
        },

        activeMessage: (state, action ) => {
            if (state.chatActivo === action.payload.from || 
                state.chatActivo === action.payload.to
            ) {
                
                state.mensajes.push(action.payload);

            } else {
                return state;
            }
        },

        chatCarga: (state, action ) => {
            state.mensajes = action.payload;
        },

        imageMessage: (state, action ) => {
            state.mensajes = action.payload;
        },

        clearChat: (state ) => {
            state.uid = null;
            state.chatActivo = null;
            state.usuarios = [];
            state.mensajes = [];
        },

        isTyping: (state, action ) => {
            state.typing = action.payload;
        },

        chtClearChatActive: (state ) => {
            state.chatActivo = null;
        },
   }
});


// Action creators are generated for each case reducer function
export const { UsuariosCargados, activeChat, activeMessage, chatCarga, clearChat, imageMessage, isTyping, chtClearChatActive } = chatSlice.actions;