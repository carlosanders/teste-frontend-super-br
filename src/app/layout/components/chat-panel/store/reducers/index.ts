import {ActionReducerMap, createFeatureSelector} from '@ngrx/store';
import {ChatReducer, ChatState} from "./chat.reducer";
import {ChatMensagemReducer, ChatMensagemState} from "./chat-mensagem.reducer";

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

