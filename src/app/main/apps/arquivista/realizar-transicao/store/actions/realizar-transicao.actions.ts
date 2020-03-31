import {Action} from '@ngrx/store';

export const SAVE_REALIZAR_TRANSICAO = '[REALIZAR_TRANSICAO] SAVE REALIZAR_TRANSICAO';
export const SAVE_REALIZAR_TRANSICAO_SUCCESS = '[REALIZAR_TRANSICAO] SAVE REALIZAR_TRANSICAO SUCCESS';
export const SAVE_REALIZAR_TRANSICAO_FAILED = '[REALIZAR_TRANSICAO] SAVE REALIZAR_TRANSICAO FAILED';

export const GET_REALIZAR_TRANSICAO = '[REALIZAR_TRANSICAO] GET REALIZAR_TRANSICAO';
export const GET_REALIZAR_TRANSICAO_SUCCESS = '[REALIZAR_TRANSICAO] GET REALIZAR_TRANSICAO SUCCESS';
export const GET_REALIZAR_TRANSICAO_FAILED = '[REALIZAR_TRANSICAO] GET REALIZAR_TRANSICAO FAILED';

export const GET_PROCESSOS = '[REALIZAR_TRANSICAO] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[REALIZAR_TRANSICAO] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[REALIZAR_TRANSICAO] GET PROCESSOS FAILED';

/**
 * Get RealizarTransicao
 */
export class GetRealizarTransicao implements Action
{
    readonly type = GET_REALIZAR_TRANSICAO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get RealizarTransicao Success
 */
export class GetRealizarTransicaoSuccess implements Action
{
    readonly type = GET_REALIZAR_TRANSICAO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get RealizarTransicao Failed
 */
export class GetRealizarTransicaoFailed implements Action
{
    readonly type = GET_REALIZAR_TRANSICAO_FAILED;

    constructor(public payload: string)
    {
    }
}

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

    constructor()
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

export type RealizarTransicaoActionsAll
    = GetRealizarTransicao
    | GetRealizarTransicaoSuccess
    | GetRealizarTransicaoFailed
    | SaveRealizarTransicao
    | SaveRealizarTransicaoSuccess
    | SaveRealizarTransicaoFailed
    | GetProcessos
    | GetProcessosFailed
    | GetProcessosSuccess;
