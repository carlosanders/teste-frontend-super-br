import {Action} from '@ngrx/store';

export const SAVE_TRANSICAO = '[TRANSICAO] SAVE TRANSICAO';
export const SAVE_TRANSICAO_SUCCESS = '[TRANSICAO] SAVE TRANSICAO SUCCESS';
export const SAVE_TRANSICAO_FAILED = '[TRANSICAO] SAVE TRANSICAO FAILED';

export const GET_PROCESSOS = '[TRANSICAO] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[TRANSICAO] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[TRANSICAO] GET PROCESSOS FAILED';

export class SaveTransicao implements Action
{
    readonly type = SAVE_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

export class SaveTransicaoSuccess implements Action
{
    readonly type = SAVE_TRANSICAO_SUCCESS;

    constructor()
    {
    }
}

export class SaveTransicaoFailed implements Action
{
    readonly type = SAVE_TRANSICAO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processos
 */
export class GetProcessos implements Action {
    readonly type = GET_PROCESSOS;

    constructor(public payload: any) {
    }
}


/**
 * Get Processos Success
 */
export class GetProcessosSuccess implements Action {
    readonly type = GET_PROCESSOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processos Failed
 */
export class GetProcessosFailed implements Action {
    readonly type = GET_PROCESSOS_FAILED;

    constructor(public payload: string) {
    }
}

export type RealizarTransicaoActionsAll =
    SaveTransicao
    | SaveTransicaoSuccess
    | SaveTransicaoFailed
    | GetProcessos
    | GetProcessosFailed
    | GetProcessosSuccess;
