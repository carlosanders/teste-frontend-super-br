import {Action} from '@ngrx/store';

export const EDIT_TAREFA = '[TAREFA EDIT] EDIT TAREFA';
export const EDIT_TAREFA_SUCCESS = '[TAREFA EDIT] EDIT TAREFA SUCCESS';

export const SAVE_TAREFA = '[TAREFA EDIT] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA EDIT] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA EDIT] SAVE TAREFA FAILED';

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

    constructor(public payload: any)
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
 * Edit Tarefa
 */
export class EditTarefa implements Action
{
    readonly type = EDIT_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Edit Tarefa Success
 */
export class EditTarefaSuccess implements Action
{
    readonly type = EDIT_TAREFA_SUCCESS;

    constructor()
    {
    }
}

export type TarefaEditBlocoActionsAll
    = EditTarefa
    | EditTarefaSuccess
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed;
