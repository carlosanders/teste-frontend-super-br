import {Action} from '@ngrx/store';

export const OPEN_CHAT = '[CHAT PANEL] OPEN CHAT';
export const OPEN_CHAT_SUCCESS = '[CHAT PANEL] OPEN CHAT SUCCESS';
export const OPEN_CHAT_FAILED = '[CHAT PANEL] OPEN CHAT FAILED';
export const CLOSE_CHAT = '[CHAT PANEL] CLOSE CHAT';
export const CHAT_SAVE = '[CHAT PANEL] CHAT SAVE';
export const CHAT_SAVE_SUCCESS = '[CHAT PANEL] CHAT SAVE SUCCESS';
export const CHAT_SAVE_FAILED = '[CHAT PANEL] CHAT SAVE FAILED';
export const CHAT_UPDATED_BROADCAST = '[CHAT PANEL] CHAT UPDATED BROADCAST';
export const ADD_PARTICIPANT = '[CHAT PANEL] ADD PARTICIPANT';
export const ADD_PARTICIPANT_SUCCESS = '[CHAT PANEL] ADD PARTICIPANT SUCCESS';
export const ADD_PARTICIPANT_FAILED = '[CHAT PANEL] ADD PARTICIPANT FAILED';
export const GET_CHAT = '[CHAT PANEL] GET CHAT';
export const GET_CHAT_SUCCESS = '[CHAT PANEL] GET CHAT SUCCESS';
export const GET_CHAT_FAILED = '[CHAT PANEL] GET CHAT FAILED';
export const CRIAR_OU_RETORNAR = '[CHAT PANEL] CRIAR OU RETORNAR';
export const CRIAR_OU_RETORNAR_SUCCESS = '[CHAT PANEL] CRIAR OU RETORNAR SUCCESS';
export const CRIAR_OU_RETORNAR_FAILED = '[CHAT PANEL] CRIAR OU RETORNAR FAILED';
export const GET_CHAT_INCREMENT = '[CHAT PANEL] GET CHAT INCREMENT';
export const GET_CHAT_INCREMENT_SUCCESS = '[CHAT PANEL] GET CHAT INCREMENT SUCCESS';
export const GET_CHAT_INCREMENT_FAILED = '[CHAT PANEL] GET CHAT INCREMENT FAILED';
export const RELOAD_CHAT = '[CHAT PANEL] RELOAD CHAT';

export class OpenChat implements Action
{
    readonly type = OPEN_CHAT;

    constructor(public payload: any) { }
}

export class OpenChatSuccess implements Action
{
    readonly type = OPEN_CHAT_SUCCESS;

    constructor(public payload: any) { }
}

export class OpenChatFailed implements Action
{
    readonly type = OPEN_CHAT_FAILED;

    constructor(public payload: any) { }
}

export class CloseChat implements Action
{
    readonly type = CLOSE_CHAT;

    constructor(public payload: any) { }
}

export class ChatSave implements Action
{
    readonly type = CHAT_SAVE;

    constructor(public payload: any) { }
}

export class ChatSaveSuccess implements Action
{
    readonly type = CHAT_SAVE_SUCCESS;

    constructor(public payload: any) { }
}

export class ChatSaveFailed implements Action
{
    readonly type = CHAT_SAVE_FAILED;

    constructor(public payload: any) { }
}

export class AddParticipant implements Action
{
    readonly type = ADD_PARTICIPANT;

    constructor(public payload: any) { }
}

export class AddParticipantSuccess implements Action
{
    readonly type = ADD_PARTICIPANT_SUCCESS;

    constructor(public payload: any) { }
}

export class AddParticipantFailed implements Action
{
    readonly type = ADD_PARTICIPANT_FAILED;

    constructor(public payload: any) { }
}

export class GetChat implements Action
{
    readonly type = GET_CHAT;

    constructor(public payload: any) { }
}

export class GetChatSuccess implements Action
{
    readonly type = GET_CHAT_SUCCESS;

    constructor(public payload: any) { }
}

export class GetChatFailed implements Action
{
    readonly type = GET_CHAT_FAILED;

    constructor(public payload: any) { }
}

export class CriarOuRetornar implements Action
{
    readonly type = CRIAR_OU_RETORNAR;

    constructor(public payload: any) { }
}

export class CriarOuRetornarSuccess implements Action
{
    readonly type = CRIAR_OU_RETORNAR_SUCCESS;

    constructor(public payload: any) { }
}

export class CriarOuRetornarFailed implements Action
{
    readonly type = CRIAR_OU_RETORNAR_FAILED;

    constructor(public payload: any) { }
}

export class ChatUpdatedBroadcast implements Action
{
    readonly type = CHAT_UPDATED_BROADCAST;

    constructor(public payload: any) { }
}

export class GetChatIncrement implements Action
{
    readonly type = GET_CHAT_INCREMENT;

    constructor(public payload: any) { }
}

export class GetChatIncrementSuccess implements Action
{
    readonly type = GET_CHAT_INCREMENT_SUCCESS;

    constructor(public payload: any) { }
}

export class GetChatIncrementFailed implements Action
{
    readonly type = GET_CHAT_INCREMENT_FAILED;

    constructor(public payload: any) { }
}

export class ReloadChat implements Action
{
    readonly type = RELOAD_CHAT;
}

export type ChatActionsAll
    = OpenChat
    | OpenChatSuccess
    | OpenChatFailed
    | CloseChat
    | ChatSave
    | ChatSaveSuccess
    | ChatSaveFailed
    | AddParticipant
    | AddParticipantSuccess
    | AddParticipantFailed
    | GetChat
    | GetChatSuccess
    | GetChatFailed
    | CriarOuRetornar
    | CriarOuRetornarFailed
    | CriarOuRetornarSuccess
    | ChatUpdatedBroadcast
    | GetChatIncrement
    | GetChatIncrementSuccess
    | GetChatIncrementFailed
    | ReloadChat
    ;

