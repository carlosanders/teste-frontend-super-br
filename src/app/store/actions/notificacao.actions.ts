import {Action} from '@ngrx/store';

export const GET_NOTIFICACOES = '[NOTIFICACAO] GET NOTIFICACOES';
export const GET_NOTIFICACOES_SUCCESS = '[NOTIFICACAO] GET NOTIFICACOES SUCCESS';
export const GET_NOTIFICACOES_FAILED = '[NOTIFICACAO] GET NOTIFICACOES FAILED';

export const RELOAD_NOTIFICACOES = '[NOTIFICACAO] RELOAD NOTIFICACOES';

export const TOGGLE_LIDA_NOTIFICACAO = '[NOTIFICACAO] TOGGLE LIDA NOTIFICACAO';
export const TOGGLE_LIDA_NOTIFICACAO_SUCCESS = '[NOTIFICACAO] TOGGLE LIDA NOTIFICACAO SUCCESS';
export const TOGGLE_LIDA_NOTIFICACAO_FAILED = '[NOTIFICACAO] TOGGLE LIDA NOTIFICACAO FAILED';

export const SNACKBAR_EXIBIR_NOTIFICACAO = '[NOTIFICACAO] EXIBIR NOTIFICACAO';
export const BUTTON_TODAS_NOTIFICACOES_LIDAS = '[NOTIFICACAO] BUTTON TODAS NOTIFICACOES LIDAS';

/**
 * Get Notificacoes
 */
export class GetNotificacoes implements Action
{
    readonly type = GET_NOTIFICACOES;

    constructor(public payload: any) { }
}

/**
 * Get Notificacoes Success
 */
export class GetNotificacoesSuccess implements Action
{
    readonly type = GET_NOTIFICACOES_SUCCESS;

    constructor(public payload: any) { }
}

/**
 * Get Notificacoes Failed
 */
export class GetNotificacoesFailed implements Action
{
    readonly type = GET_NOTIFICACOES_FAILED;

    constructor(public payload: string) { }
}

/**
 * Reload Notificacoes
 */
export class ReloadNotificacoes implements Action
{
    readonly type = RELOAD_NOTIFICACOES;

    constructor() { }
}

/**
 * ToggleLida Notificacao
 */
export class ToggleLidaNotificacao implements Action
{
    readonly type = TOGGLE_LIDA_NOTIFICACAO;

    constructor(public payload: any) { }
}

/**
 * ToggleLida Notificacao Success
 */
export class ToggleLidaNotificacaoSuccess implements Action
{
    readonly type = TOGGLE_LIDA_NOTIFICACAO_SUCCESS;

    constructor(public payload: any) { }
}

/**
 * ToggleLida Notificacao Failed
 */
export class ToggleLidaNotificacaoFailed implements Action
{
    readonly type = TOGGLE_LIDA_NOTIFICACAO_FAILED;

    constructor(public payload: any) { }
}

/**
 * Exibir Snackbar de notificação
 */
export class SnackbarExibirNotificacao implements Action
{
    readonly type = SNACKBAR_EXIBIR_NOTIFICACAO;

    constructor(public payload: any) { }
}

/**
 * Marcar todas as notificações como lidas
 */
export class ButtonTodasNotificacoesLidas implements Action
{
    readonly type = BUTTON_TODAS_NOTIFICACOES_LIDAS;

    constructor() { }
}

export type NotificacaoActionsAll
    = GetNotificacoes
    | GetNotificacoesSuccess
    | GetNotificacoesFailed
    | ToggleLidaNotificacao
    | ToggleLidaNotificacaoSuccess
    | ToggleLidaNotificacaoFailed
    | ReloadNotificacoes
    | SnackbarExibirNotificacao;

