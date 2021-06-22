import {Action} from '@ngrx/store';

export const GET_TAREFAS = '[TAREFA LIST] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[TAREFA LIST] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[TAREFA LIST] GET TAREFAS FAILED';

export const RELOAD_TAREFAS = '[TAREFA LIST] RELOAD TAREFAS';
export const UNLOAD_TAREFAS = '[TAREFA LIST] UNLOAD TAREFAS';

export const DELETE_TAREFA = '[TAREFA LIST] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[TAREFA LIST] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[TAREFA LIST] DELETE TAREFA FAILED';

/**
 * Get Tarefas
 */
export class GetTarefas implements Action
{
    readonly type = GET_TAREFAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefas Success
 */
export class GetTarefasSuccess implements Action
{
    readonly type = GET_TAREFAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefas Failed
 */
export class GetTarefasFailed implements Action
{
    readonly type = GET_TAREFAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Tarefas
 */
export class ReloadTarefas implements Action
{
    readonly type = RELOAD_TAREFAS;

    constructor()
    {
    }
}

/**
 * Unload Tarefas
 */
export class UnloadTarefas implements Action
{
    readonly type = UNLOAD_TAREFAS;

    constructor()
    {
    }
}

/**
 * Delete Tarefa
 */
export class DeleteTarefa implements Action
{
    readonly type = DELETE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tarefa Success
 */
export class DeleteTarefaSuccess implements Action
{
    readonly type = DELETE_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tarefa Failed
 */
export class DeleteTarefaFailed implements Action
{
    readonly type = DELETE_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type TarefaListActionsAll
    = GetTarefas
    | GetTarefasSuccess
    | GetTarefasFailed
    | ReloadTarefas
    | UnloadTarefas
    | DeleteTarefa
    | DeleteTarefaSuccess
    | DeleteTarefaFailed;

