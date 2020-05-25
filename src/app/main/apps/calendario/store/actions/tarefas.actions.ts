import {Action} from '@ngrx/store';

export const UNLOAD_TAREFAS = '[CALENDARIO] UNLOAD TAREFAS';

export const GET_TAREFAS = '[CALENDARIO] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[CALENDARIO] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[CALENDARIO] GET TAREFAS FAILED';

export const CREATE_TAREFA = '[CALENDARIO] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[CALENDARIO] CREATE TAREFA SUCCESS';

export const DELETE_TAREFA = '[CALENDARIO] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[CALENDARIO] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[CALENDARIO] DELETE TAREFA FAILED';

export const SAVE_TAREFA = '[CALENDARIO] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[CALENDARIO] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[CALENDARIO] SAVE TAREFA FAILED';

/**
 * Unload Tarefas
 */
export class UnloadTarefas implements Action {
    readonly type = UNLOAD_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas
 */
export class GetTarefas implements Action {
    readonly type = GET_TAREFAS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Success
 */
export class GetTarefasSuccess implements Action {
    readonly type = GET_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Failed
 */
export class GetTarefasFailed implements Action {
    readonly type = GET_TAREFAS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Creat Tarefa
 */
export class CreateTarefa implements Action {
    readonly type = CREATE_TAREFA;

    constructor() {
    }
}

/**
 * Creat Tarefa Success
 */
export class CreateTarefaSuccess implements Action {
    readonly type = CREATE_TAREFA_SUCCESS;

    constructor() {
    }
}

/**
 * Delete Tarefa
 */
export class DeleteTarefa implements Action {
    readonly type = DELETE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Delete Tarefa Success
 */
export class DeleteTarefaSuccess implements Action {
    readonly type = DELETE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Tarefa Failed
 */
export class DeleteTarefaFailed implements Action {
    readonly type = DELETE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Save Tarefa
 */
export class SaveTarefa implements Action {
    readonly type = SAVE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Save Tarefa Success
 */
export class SaveTarefaSuccess implements Action {
    readonly type = SAVE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Tarefa Failed
 */
export class SaveTarefaFailed implements Action {
    readonly type = SAVE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

export type TarefasActionsAll
    = UnloadTarefas
    | GetTarefas
    | GetTarefasSuccess
    | GetTarefasFailed
    | CreateTarefa
    | CreateTarefaSuccess
    | DeleteTarefa
    | DeleteTarefaSuccess
    | DeleteTarefaFailed
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed;
