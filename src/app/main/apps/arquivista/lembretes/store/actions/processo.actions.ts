import {Action} from '@ngrx/store';

export const GET_PROCESSOS = '[LEMBRETE] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[LEMBRETE] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[LEMBRETE] GET PROCESSOS FAILED';

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

export type ProcessoActionsAll
    = GetProcessos
    | GetProcessosFailed
    | GetProcessosSuccess;
