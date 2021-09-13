import {Action} from '@ngrx/store';

export const GET_ESPECIE_TAREFA = '[SUPERADMIN ESPECIE TAREFA LIST] GET ESPECIE_TAREFA';
export const GET_ESPECIE_TAREFA_SUCCESS = '[SUPERADMIN ESPECIE TAREFA LIST] GET ESPECIE_TAREFA SUCCESS';
export const GET_ESPECIE_TAREFA_FAILED = '[SUPERADMIN ESPECIE TAREFA LIST] GET ESPECIE_TAREFA FAILED';

export const RELOAD_ESPECIE_TAREFA = '[SUPERADMIN ESPECIE TAREFA LIST] RELOAD ESPECIE_TAREFA';
export const UNLOAD_ESPECIE_TAREFA = '[SUPERADMIN ESPECIE TAREFA LIST] UNLOAD ESPECIE_TAREFA';

export const DELETE_ESPECIE_TAREFA = '[SUPERADMIN ESPECIE TAREFA LIST] DELETE ESPECIE_TAREFA';
export const DELETE_ESPECIE_TAREFA_SUCCESS = '[SUPERADMIN ESPECIE TAREFA LIST] DELETE ESPECIE_TAREFA SUCCESS';
export const DELETE_ESPECIE_TAREFA_FAILED = '[SUPERADMIN ESPECIE TAREFA LIST] DELETE ESPECIE_TAREFA FAILED';

/**
 * Get EspecieTarefa
 */
export class GetEspecieTarefa implements Action {
    readonly type = GET_ESPECIE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieTarefa Success
 */
export class GetEspecieTarefaSuccess implements Action {
    readonly type = GET_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieTarefa Failed
 */
export class GetEspecieTarefaFailed implements Action {
    readonly type = GET_ESPECIE_TAREFA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload EspecieTarefa
 */
export class UnloadEspecieTarefa implements Action {
    readonly type = UNLOAD_ESPECIE_TAREFA;

    constructor() {
    }
}

/**
 * Reload EspecieTarefa
 */
export class ReloadEspecieTarefa implements Action {
    readonly type = RELOAD_ESPECIE_TAREFA;

    constructor() {
    }
}

/**
 * Delete EspecieTarefa
 */
export class DeleteEspecieTarefa implements Action {
    readonly type = DELETE_ESPECIE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Delete EspecieTarefa Success
 */
export class DeleteEspecieTarefaSuccess implements Action {
    readonly type = DELETE_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete EspecieTarefa Failed
 */
export class DeleteEspecieTarefaFailed implements Action {
    readonly type = DELETE_ESPECIE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

export type EspecieTarefaListActionsAll
    = GetEspecieTarefa
    | GetEspecieTarefaSuccess
    | GetEspecieTarefaFailed
    | ReloadEspecieTarefa
    | UnloadEspecieTarefa
    | DeleteEspecieTarefa
    | DeleteEspecieTarefaSuccess
    | DeleteEspecieTarefaFailed;

