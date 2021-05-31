import {Action} from '@ngrx/store';

export const NEW_CHAT_MENSAGEM = '[CHAT-MERCURE] NEW CHAT MENSAGEM';
export const CHAT_UPDATE = '[CHAT-MERCURE] CHAT UPDATE';
export const NEW_CHAT = '[CHAT-MERCURE] NEW CHAT';

export class NewChatMensagem implements Action
{
    readonly type = NEW_CHAT_MENSAGEM;

    constructor(public payload: any) { }
}

export class ChatUpdate implements Action
{
    readonly type = CHAT_UPDATE;

    constructor(public payload: any) { }
}

export class NewChat implements Action
{
    readonly type = NEW_CHAT;

    constructor(public payload: any) { }
}

export type ChatMercureActionsAll
    = NewChatMensagem
    | ChatUpdate
    | NewChat;

