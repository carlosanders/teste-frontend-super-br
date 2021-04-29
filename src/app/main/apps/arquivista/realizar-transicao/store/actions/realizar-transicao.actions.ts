import {Action} from '@ngrx/store';

export const SAVE_REALIZAR_TRANSICAO = '[REALIZAR_TRANSICAO] SAVE REALIZAR_TRANSICAO';
export const SAVE_REALIZAR_TRANSICAO_SUCCESS = '[REALIZAR_TRANSICAO] SAVE REALIZAR_TRANSICAO SUCCESS';
export const SAVE_REALIZAR_TRANSICAO_FAILED = '[REALIZAR_TRANSICAO] SAVE REALIZAR_TRANSICAO FAILED';

export const GET_PROCESSO = '[REALIZAR_TRANSICAO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[REALIZAR_TRANSICAO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[REALIZAR_TRANSICAO] GET PROCESSO FAILED';


/**
 * Save RealizarTransicao
 */
export class SaveRealizarTransicao implements Action
{
    readonly type = SAVE_REALIZAR_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save RealizarTransicao Success
 */
export class SaveRealizarTransicaoSuccess implements Action
{
    readonly type = SAVE_REALIZAR_TRANSICAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save RealizarTransicao Failed
 */
export class SaveRealizarTransicaoFailed implements Action
{
    readonly type = SAVE_REALIZAR_TRANSICAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo
 */
export class GetProcesso implements Action {
    readonly type = GET_PROCESSO;

    constructor(public payload: any) {
    }
}


/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action {
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action {
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string) {
    }
}

export type RealizarTransicaoActionsAll
    = SaveRealizarTransicao
    | SaveRealizarTransicaoSuccess
    | SaveRealizarTransicaoFailed
    | GetProcesso
    | GetProcessoFailed
    | GetProcessoSuccess;
