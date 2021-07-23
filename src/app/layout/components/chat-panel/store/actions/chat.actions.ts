import {Action} from '@ngrx/store';

export const OPEN_CHAT = '[CHAT PANEL] OPEN CHAT';
export const OPEN_CHAT_SUCCESS = '[CHAT PANEL] OPEN CHAT SUCCESS';
export const OPEN_CHAT_FAILED = '[CHAT PANEL] OPEN CHAT FAILED';
export const CLOSE_CHAT = '[CHAT PANEL] CLOSE CHAT';
export const CHAT_SAVE = '[CHAT PANEL] CHAT SAVE';
export const CHAT_SAVE_SUCCESS = '[CHAT PANEL] CHAT SAVE SUCCESS';
export const CHAT_SAVE_FAILED = '[CHAT PANEL] CHAT SAVE FAILED';
export const CHAT_UPDATED_BROADCAST = '[CHAT PANEL] CHAT UPDATED BROADCAST';

export const GET_CHAT = '[CHAT PANEL] GET CHAT';
export const GET_CHAT_SUCCESS = '[CHAT PANEL] GET CHAT SUCCESS';
export const GET_CHAT_FAILED = '[CHAT PANEL] GET CHAT FAILED';

export const CHAT_EXCLUIR = '[CHAT PANEL] CHAT EXCLUIR';
export const CHAT_EXCLUIR_SUCCESS = '[CHAT PANEL] CHAT EXCLUIR SUCCESS';
export const CHAT_EXCLUIR_FAILED = '[CHAT PANEL] CHAT EXCLUIR FAILED';

export const CRIAR_OU_RETORNAR = '[CHAT PANEL] CRIAR OU RETORNAR';
export const CRIAR_OU_RETORNAR_SUCCESS = '[CHAT PANEL] CRIAR OU RETORNAR SUCCESS';
export const CRIAR_OU_RETORNAR_FAILED = '[CHAT PANEL] CRIAR OU RETORNAR FAILED';
export const GET_CHAT_INCREMENT = '[CHAT PANEL] GET CHAT INCREMENT';
export const GET_CHAT_INCREMENT_SUCCESS = '[CHAT PANEL] GET CHAT INCREMENT SUCCESS';
export const GET_CHAT_INCREMENT_FAILED = '[CHAT PANEL] GET CHAT INCREMENT FAILED';
export const RELOAD_CHAT = '[CHAT PANEL] RELOAD CHAT';

export const UPLOAD_IMAGEM_CAPA = '[CHAT PANEL] UPLOAD IMAGEM CAPA';
export const UPLOAD_IMAGEM_CAPA_SUCCESS = '[CHAT PANEL] UPLOAD IMAGEM CAPA SUCCESS';
export const UPLOAD_IMAGEM_CAPA_FAILED = '[CHAT PANEL] UPLOAD IMAGEM CAPA FAILED';

export const SET_CHAT_ACTIVE_CARD = '[CHAT PANEL] SET CHAT ACTIVE CARD';
export const UNLOAD_CHAT = '[CHAT PANEL] UNLOAD CHAT';

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

export class UploadImagemCapa implements Action
{
    readonly type = UPLOAD_IMAGEM_CAPA;

    constructor(public payload: any) { }
}

export class UploadImagemCapaSuccess implements Action
{
    readonly type = UPLOAD_IMAGEM_CAPA_SUCCESS;

    constructor(public payload: any) { }
}

export class UploadImagemCapaFailed implements Action
{
    readonly type = UPLOAD_IMAGEM_CAPA_FAILED;

    constructor(public payload: any) { }
}

export class SetChatActiveCard implements Action
{
    readonly type = SET_CHAT_ACTIVE_CARD;

    constructor(public payload: any) { }
}

export class UnloadChat implements Action
{
    readonly type = UNLOAD_CHAT;

    constructor(public payload: any) { }
}

export class ChatExcluir implements Action
{
    readonly type = CHAT_EXCLUIR;

    constructor(public payload: any) { }
}

export class ChatExcluirSuccess implements Action
{
    readonly type = CHAT_EXCLUIR_SUCCESS;

    constructor(public payload: any) { }
}

export class ChatExcluirFailed implements Action
{
    readonly type = CHAT_EXCLUIR_FAILED;

    constructor(public payload: any) { }
}

export type ChatActionsAll
    = OpenChat
    | OpenChatSuccess
    | OpenChatFailed
    | CloseChat
    | ChatSave
    | ChatSaveSuccess
    | ChatSaveFailed
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
    | UploadImagemCapa
    | UploadImagemCapaSuccess
    | UploadImagemCapaFailed
    | SetChatActiveCard
    | UnloadChat
    | ChatExcluir
    | ChatExcluirSuccess
    | ChatExcluirFailed
    ;

