import { Action } from '@ngrx/store';

export const CREATE_TAREFA = '[TAREFA] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[TAREFA] CREATE TAREFA SUCCESS';

export const SAVE_TAREFA = '[TAREFA] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA] SAVE TAREFA FAILED';

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

    constructor(public payload: any)
    {
    }
}

/**
 * Create Tarefa Success
 */
export class CreateTarefaSuccess implements Action
{
    readonly type = CREATE_TAREFA_SUCCESS;

    constructor()
    {
    }
}

export type TarefaCreateActionsAll
    = CreateTarefa
    | CreateTarefaSuccess

    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed;
