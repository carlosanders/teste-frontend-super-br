import {Action} from '@ngrx/store';

export const CREATE_TAREFA = '[TAREFA EDIT] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[TAREFA EDIT] CREATE TAREFA SUCCESS';

export const SAVE_TAREFA = '[TAREFA EDIT] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA EDIT] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA EDIT] SAVE TAREFA FAILED';

export const GET_TAREFA = '[TAREFA EDIT] GET TAREFA';
export const GET_TAREFA_SUCCESS = '[TAREFA EDIT] GET TAREFA SUCCESS';
export const GET_TAREFA_FAILED = '[TAREFA EDIT] GET TAREFA FAILED';

export const UNLOAD_STORE = '[TAREFA EDIT] UNLOAD STORE';

/**
 * Get Tarefa
 */
export class GetTarefa implements Action
{
    readonly type = GET_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefa Success
 */
export class GetTarefaSuccess implements Action
{
    readonly type = GET_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tarefa Failed
 */
export class GetTarefaFailed implements Action
{
    readonly type = GET_TAREFA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Tarefa
 */
export class SaveTarefa implements Action
{
    readonly type = SAVE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Tarefa Success
 */
export class SaveTarefaSuccess implements Action
{
    readonly type = SAVE_TAREFA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Tarefa Failed
 */
export class SaveTarefaFailed implements Action
{
    readonly type = SAVE_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Tarefa
 */
export class CreateTarefa implements Action
{
    readonly type = CREATE_TAREFA;

    constructor()
    {
    }
}

/**
 * Create Tarefa Success
 */
export class CreateTarefaSuccess implements Action
{
    readonly type = CREATE_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Store
 */
export class UnloadStore implements Action
{
    readonly type = UNLOAD_STORE;

    constructor()
    {
    }
}

export type TarefaEditActionsAll
    = CreateTarefa
    | CreateTarefaSuccess
    | GetTarefa
    | GetTarefaSuccess
    | GetTarefaFailed
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | UnloadStore;
