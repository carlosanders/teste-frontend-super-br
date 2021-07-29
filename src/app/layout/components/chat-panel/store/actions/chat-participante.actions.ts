import {Action} from '@ngrx/store';

export const LIMPAR_MENSAGENS_NAO_LIDAS = '[CHAT PANEL PARTICIPANTE] LIMPAR MENSAGENS NAO LIDAS';
export const LIMPAR_MENSAGENS_NAO_LIDAS_SUCCESS = '[CHAT PANEL PARTICIPANTE] LIMPAR MENSAGENS NAO LIDAS SUCCESS';
export const LIMPAR_MENSAGENS_NAO_LIDAS_FAILED = '[CHAT PANEL PARTICIPANTE] LIMPAR MENSAGENS NAO LIDAS FAILED';

export const GET_PARTICIPANTES = '[CHAT PANEL PARTICIPANTE] GET PARTICIPANTES';
export const GET_PARTICIPANTES_SUCCESS = '[CHAT PANEL PARTICIPANTE] GET PARTICIPANTES SUCCESS';
export const GET_PARTICIPANTES_FAILED = '[CHAT PANEL PARTICIPANTE] GET PARTICIPANTES FAILED';

export const ADD_PARTICIPANTE = '[CHAT PANEL PARTICIPANTE] ADD PARTICIPANTE';
export const ADD_PARTICIPANTE_SUCCESS = '[CHAT PANEL PARTICIPANTE] ADD PARTICIPANTE SUCCESS';
export const ADD_PARTICIPANTE_FAILED = '[CHAT PANEL PARTICIPANTE] ADD PARTICIPANTE FAILED';

export const UPDATE_PARTICIPANTE = '[CHAT PANEL PARTICIPANTE] UPDATE PARTICIPANTE';
export const UPDATE_PARTICIPANTE_SUCCESS = '[CHAT PANEL PARTICIPANTE] UPDATE PARTICIPANTE SUCCESS';
export const UPDATE_PARTICIPANTE_FAILED = '[CHAT PANEL PARTICIPANTE] UPDATE PARTICIPANTE FAILED';

export const REMOVER_PARTICIPANTE = '[CHAT PANEL PARTICIPANTE] REMOVER PARTICIPANTE';
export const REMOVER_PARTICIPANTE_SUCCESS = '[CHAT PANEL PARTICIPANTE] REMOVER PARTICIPANTE SUCCESS';
export const REMOVER_PARTICIPANTE_FAILED = '[CHAT PANEL PARTICIPANTE] REMOVER PARTICIPANTE FAILED';

export const UNLOAD_CHAT_PARTICIPANTES = '[CHAT PANEL PARTICIPANTE] UNLOAD CHAT PARTICIPANTES';

export const CHAT_PARTICIPANTE_UPDATE_BROADCAST = '[CHAT PANEL PARTICIPANTE] PARTICIPANTE UPDATE BROADCAST';

export const CHAT_PARTICIPANTE_LIMPAR_ERROS = '[CHAT PANEL PARTICIPANTE] PARTICIPANTE LIMPAR ERROS';

export class LimparMensagensNaoLidas implements Action
{
    readonly type = LIMPAR_MENSAGENS_NAO_LIDAS;

    constructor(public payload: any) { }
}

export class LimparMensagensNaoLidasSuccess implements Action
{
    readonly type = LIMPAR_MENSAGENS_NAO_LIDAS_SUCCESS;

    constructor(public payload: any) { }
}

export class LimparMensagensNaoLidasFailed implements Action
{
    readonly type = LIMPAR_MENSAGENS_NAO_LIDAS_FAILED;

    constructor(public payload: any) { }
}

export class AddParticipante implements Action
{
    readonly type = ADD_PARTICIPANTE;

    constructor(public payload: any) { }
}

export class AddParticipanteSuccess implements Action
{
    readonly type = ADD_PARTICIPANTE_SUCCESS;

    constructor(public payload: any) { }
}

export class AddParticipanteFailed implements Action
{
    readonly type = ADD_PARTICIPANTE_FAILED;

    constructor(public payload: any) { }
}

export class UpdateParticipante implements Action
{
    readonly type = UPDATE_PARTICIPANTE;

    constructor(public payload: any) { }
}

export class UpdateParticipanteSuccess implements Action
{
    readonly type = UPDATE_PARTICIPANTE_SUCCESS;

    constructor(public payload: any) { }
}

export class UpdateParticipanteFailed implements Action
{
    readonly type = UPDATE_PARTICIPANTE_FAILED;

    constructor(public payload: any) { }
}

export class RemoverParticipante implements Action
{
    readonly type = REMOVER_PARTICIPANTE;

    constructor(public payload: any) { }
}

export class RemoverParticipanteSuccess implements Action
{
    readonly type = REMOVER_PARTICIPANTE_SUCCESS;

    constructor(public payload: any) { }
}

export class RemoverParticipanteFailed implements Action
{
    readonly type = REMOVER_PARTICIPANTE_FAILED;

    constructor(public payload: any) { }
}

export class GetParticipantes implements Action
{
    readonly type = GET_PARTICIPANTES;

    constructor(public payload: any) { }
}

export class GetParticipantesSuccess implements Action
{
    readonly type = GET_PARTICIPANTES_SUCCESS;

    constructor(public payload: any) { }
}

export class GetParticipantesFailed implements Action
{
    readonly type = GET_PARTICIPANTES_FAILED;

    constructor(public payload: any) { }
}

export class UnloadChatParticipantes implements Action
{
    readonly type = UNLOAD_CHAT_PARTICIPANTES;
}

export class ChatParticipanteUpdateBroadCast implements Action
{
    readonly type = CHAT_PARTICIPANTE_UPDATE_BROADCAST;

    constructor(public payload: any) { }
}

export class ChatParticipanteLimparErros implements Action
{
    readonly type = CHAT_PARTICIPANTE_LIMPAR_ERROS;
}

export type ChatParticipanteActionsAll
    = LimparMensagensNaoLidasSuccess
    | LimparMensagensNaoLidasFailed
    | AddParticipante
    | AddParticipanteSuccess
    | AddParticipanteFailed
    | UpdateParticipante
    | UpdateParticipanteSuccess
    | UpdateParticipanteFailed
    | RemoverParticipante
    | RemoverParticipanteSuccess
    | RemoverParticipanteFailed
    | GetParticipantes
    | GetParticipantesSuccess
    | GetParticipantesFailed
    | UnloadChatParticipantes
    | ChatParticipanteUpdateBroadCast
    | ChatParticipanteLimparErros
    ;

