import {Action} from '@ngrx/store';

export const CREATE_TAREFA = '[ENCAMINHAR TAREFA CREATE BLOCO] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[ENCAMINHAR TAREFA CREATE BLOCO] CREATE TAREFA SUCCESS';

export const SAVE_TAREFA = '[ENCAMINHAR TAREFA CREATE BLOCO] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[ENCAMINHAR TAREFA CREATE BLOCO] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[ENCAMINHAR TAREFA CREATE BLOCO] SAVE TAREFA FAILED';

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

export type TarefaCreateBlocoActionsAll
    = CreateTarefa
    | CreateTarefaSuccess
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed;
