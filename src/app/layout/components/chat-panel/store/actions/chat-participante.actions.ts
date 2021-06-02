import {Action} from '@ngrx/store';

export const LIMPAR_MENSAGENS_NAO_LIDAS = '[CHAT PANEL PARTICIPANTE] LIMPAR MENSAGENS NAO LIDAS';
export const LIMPAR_MENSAGENS_NAO_LIDAS_SUCCESS = '[CHAT PANEL PARTICIPANTE] LIMPAR MENSAGENS NAO LIDAS SUCCESS';
export const LIMPAR_MENSAGENS_NAO_LIDAS_FAILED = '[CHAT PANEL PARTICIPANTE] LIMPAR MENSAGENS NAO LIDAS FAILED';

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

export type ChatParticipanteActionsAll
    = LimparMensagensNaoLidasSuccess
    | LimparMensagensNaoLidasFailed
    ;

