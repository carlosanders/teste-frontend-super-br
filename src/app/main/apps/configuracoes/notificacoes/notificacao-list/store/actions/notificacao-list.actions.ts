import { Action } from '@ngrx/store';

export const GET_LOTACOES = '[LOTACAO LIST] GET LOTACOES';
export const GET_LOTACOES_SUCCESS = '[LOTACAO LIST] GET LOTACOES SUCCESS';
export const GET_LOTACOES_FAILED = '[LOTACAO LIST] GET LOTACOES FAILED';

export const RELOAD_LOTACOES = '[LOTACAO LIST] RELOAD LOTACOES';

export const DELETE_LOTACAO = '[LOTACAO LIST] DELETE LOTACAO';
export const DELETE_LOTACAO_SUCCESS = '[LOTACAO LIST] DELETE LOTACAO SUCCESS';
export const DELETE_LOTACAO_FAILED = '[LOTACAO LIST] DELETE LOTACAO FAILED';

/**
 * Get Notificacoes
 */
export class GetNotificacoes implements Action
{
    readonly type = GET_LOTACOES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Notificacoes Success
 */
export class GetNotificacoesSuccess implements Action
{
    readonly type = GET_LOTACOES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Notificacoes Failed
 */
export class GetNotificacoesFailed implements Action
{
    readonly type = GET_LOTACOES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Notificacoes
 */
export class ReloadNotificacoes implements Action
{
    readonly type = RELOAD_LOTACOES;

    constructor()
    {
    }
}

/**
 * Delete Notificacao
 */
export class DeleteNotificacao implements Action
{
    readonly type = DELETE_LOTACAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Notificacao Success
 */
export class DeleteNotificacaoSuccess implements Action
{
    readonly type = DELETE_LOTACAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Notificacao Failed
 */
export class DeleteNotificacaoFailed implements Action
{
    readonly type = DELETE_LOTACAO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type NotificacaoListActionsAll
    = GetNotificacoes
    | GetNotificacoesSuccess
    | GetNotificacoesFailed
    | ReloadNotificacoes
    | DeleteNotificacao
    | DeleteNotificacaoSuccess
    | DeleteNotificacaoFailed;

