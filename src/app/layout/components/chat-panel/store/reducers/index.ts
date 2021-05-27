import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {ChatState, ChatReducer} from "./chat.reducer";
import {ChatMensagemState, ChatMensagemReducer} from "./chat-mensagem.reducer";

export interface ChatAppState
{
    chat: ChatState,
    chatMensagem: ChatMensagemState
}

export const getChatAppState = createFeatureSelector<ChatAppState>('chat-app');


export const reducers: ActionReducerMap<ChatAppState> = {
    chat: ChatReducer,
    chatMensagem: ChatMensagemReducer,
};

export * from './chat.reducer';
export * from './chat-mensagem.reducer';

