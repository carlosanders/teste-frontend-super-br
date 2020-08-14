import { Action } from '@ngrx/store';

export const GET_TAREFAS = '[PROCESSO CAPA] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[PROCESSO CAPA] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[PROCESSO CAPA] GET TAREFAS FAILED';

export const UNLOAD_TAREFAS = '[PROCESSO CAPA] UNLOAD TAREFAS';

/**
 * Get Tarefas Processo
 */
export class GetTarefas implements Action {
    readonly type = GET_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Processo
 */
export class GetTarefasSuccess implements Action {
    readonly type = GET_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Processo
 */
export class GetTarefasFailed implements Action {
    readonly type = GET_TAREFAS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Tarefas
 */
export class UnloadTarefas implements Action
{
    readonly type = UNLOAD_TAREFAS;

    constructor(public payload: any)
    {
    }
}


export type TarefaActionsAll
    = GetTarefas
    | GetTarefasSuccess
    | GetTarefasFailed
    | UnloadTarefas;
