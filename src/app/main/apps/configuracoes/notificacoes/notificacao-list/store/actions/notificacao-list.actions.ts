import {Action} from '@ngrx/store';

export const GET_NOTIFICACOES = '[NOTIFICACAO LIST] GET NOTIFICACOES';
export const GET_NOTIFICACOES_SUCCESS = '[NOTIFICACAO LIST] GET NOTIFICACOES SUCCESS';
export const GET_NOTIFICACOES_FAILED = '[NOTIFICACAO LIST] GET NOTIFICACOES FAILED';

export const RELOAD_NOTIFICACOES = '[NOTIFICACAO LIST] RELOAD NOTIFICACOES';
export const UNLOAD_NOTIFICACOES = '[NOTIFICACAO LIST] UNLOAD NOTIFICACOES';


export const TOGGLE_LIDA_NOTIFICACAO = '[NOTIFICACAO LIST] TOGGLE LIDA NOTIFICACAO';
export const TOGGLE_LIDA_NOTIFICACAO_SUCCESS = '[NOTIFICACAO LIST] TOGGLE LIDA NOTIFICACAO SUCCESS';
export const TOGGLE_LIDA_NOTIFICACAO_FAILED = '[NOTIFICACAO LIST] TOGGLE LIDA NOTIFICACAO FAILED';

export const DELETE_NOTIFICACAO = '[NOTIFICACAO LIST] DELETE NOTIFICACAO';
export const DELETE_NOTIFICACAO_SUCCESS = '[NOTIFICACAO LIST] DELETE NOTIFICACAO SUCCESS';
export const DELETE_NOTIFICACAO_FAILED = '[NOTIFICACAO LIST] DELETE NOTIFICACAO FAILED';

/**
 * Get Notificacoes
 */
export class GetNotificacoes implements Action
{
    readonly type = GET_NOTIFICACOES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Notificacoes Success
 */
export class GetNotificacoesSuccess implements Action
{
    readonly type = GET_NOTIFICACOES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Notificacoes Failed
 */
export class GetNotificacoesFailed implements Action
{
    readonly type = GET_NOTIFICACOES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Notificacoes
 */
 export class UnloadNotificacoes implements Action
 {
     readonly type = UNLOAD_NOTIFICACOES;

     constructor()
     {
     }
 }

/**
 * Reload Notificacoes
 */
export class ReloadNotificacoes implements Action
{
    readonly type = RELOAD_NOTIFICACOES;

    constructor()
    {
    }
}

/**
 * ToggleLida Notificacao
 */
export class ToggleLidaNotificacao implements Action
{
    readonly type = TOGGLE_LIDA_NOTIFICACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * ToggleLida Notificacao Success
 */
export class ToggleLidaNotificacaoSuccess implements Action
{
    readonly type = TOGGLE_LIDA_NOTIFICACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * ToggleLida Notificacao Failed
 */
export class ToggleLidaNotificacaoFailed implements Action
{
    readonly type = TOGGLE_LIDA_NOTIFICACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Notificacao
 */
export class DeleteNotificacao implements Action
{
    readonly type = DELETE_NOTIFICACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Notificacao Success
 */
export class DeleteNotificacaoSuccess implements Action
{
    readonly type = DELETE_NOTIFICACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Notificacao Failed
 */
export class DeleteNotificacaoFailed implements Action
{
    readonly type = DELETE_NOTIFICACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type NotificacaoListActionsAll
    = GetNotificacoes
    | GetNotificacoesSuccess
    | GetNotificacoesFailed
    | ToggleLidaNotificacao
    | ToggleLidaNotificacaoSuccess
    | ToggleLidaNotificacaoFailed
    | UnloadNotificacoes
    | ReloadNotificacoes
    | DeleteNotificacao
    | DeleteNotificacaoSuccess
    | DeleteNotificacaoFailed;

