import {Action} from '@ngrx/store';

export const SAVE_REALIZAR_DESARQUIVAMENTO = '[REALIZAR_DESARQUIVAMENTO] SAVE REALIZAR_DESARQUIVAMENTO';
export const SAVE_REALIZAR_DESARQUIVAMENTO_SUCCESS = '[REALIZAR_DESARQUIVAMENTO] SAVE REALIZAR_DESARQUIVAMENTO SUCCESS';
export const SAVE_REALIZAR_DESARQUIVAMENTO_FAILED = '[REALIZAR_DESARQUIVAMENTO] SAVE REALIZAR_DESARQUIVAMENTO FAILED';

export const GET_PROCESSO = '[REALIZAR_DESARQUIVAMENTO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[REALIZAR_DESARQUIVAMENTO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[REALIZAR_DESARQUIVAMENTO] GET PROCESSO FAILED';

/**
 * Save RealizarDesarquivamento
 */
export class SaveRealizarDesarquivamento implements Action
{
    readonly type = SAVE_REALIZAR_DESARQUIVAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save RealizarDesarquivamento Success
 */
export class SaveRealizarDesarquivamentoSuccess implements Action
{
    readonly type = SAVE_REALIZAR_DESARQUIVAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save RealizarDesarquivamento Failed
 */
export class SaveRealizarDesarquivamentoFailed implements Action
{
    readonly type = SAVE_REALIZAR_DESARQUIVAMENTO_FAILED;

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

export type RealizarDesarquivamentoActionsAll
    = SaveRealizarDesarquivamento
    | SaveRealizarDesarquivamentoSuccess
    | SaveRealizarDesarquivamentoFailed
    | GetProcesso
    | GetProcessoFailed
    | GetProcessoSuccess;
