import {Action} from '@ngrx/store';

export const EDIT_TAREFA = '[REDISTRIBUICAO EDIT] EDIT TAREFA';
export const EDIT_TAREFA_SUCCESS = '[REDISTRIBUICAO EDIT] EDIT TAREFA SUCCESS';

export const SAVE_TAREFA = '[REDISTRIBUICAO EDIT] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[REDISTRIBUICAO EDIT] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[REDISTRIBUICAO EDIT] SAVE TAREFA FAILED';

export const TAREFAS_PROCESOS_RESTRITO_VALIDADAS_SUCCESS = '[REDISTRIBUICAO EDIT] TAREFAS PROCESSO RESTRITO VALIDADAS SUCCESS';

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

export class TarefasProcessoRestritoValidadasSuccess implements Action
{
    readonly type = TAREFAS_PROCESOS_RESTRITO_VALIDADAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type RedistribuicaoEditBlocoActionsAll
    = EditTarefa
    | EditTarefaSuccess
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | TarefasProcessoRestritoValidadasSuccess;
