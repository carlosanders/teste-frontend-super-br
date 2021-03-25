import { Action } from '@ngrx/store';

export const SAVE_TAREFA = '[TAREFA EDIT] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA EDIT] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA EDIT] SAVE TAREFA FAILED';

export const UNLOAD_TAREFA = '[TAREFA EDIT] UNLOAD TAREFA';

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
 * Unload Tarefa
 */
export class UnloadTarefa implements Action
{
    readonly type = UNLOAD_TAREFA;

    constructor()
    {
    }
}

export type TarefaActionsAll
    = SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | UnloadTarefa;
