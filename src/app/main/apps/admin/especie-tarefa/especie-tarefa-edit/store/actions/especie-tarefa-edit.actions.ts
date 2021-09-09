import {Action} from '@ngrx/store';

export const CREATE_ESPECIE_TAREFA = '[ADMIN ESPECIE_TAREFA EDIT] CREATE ESPECIE_TAREFA';
export const CREATE_ESPECIE_TAREFA_SUCCESS = '[ADMIN ESPECIE_TAREFA EDIT] CREATE ESPECIE_TAREFA SUCCESS';

export const SAVE_ESPECIE_TAREFA = '[ADMIN ESPECIE_TAREFA EDIT] SAVE ESPECIE_TAREFA';
export const SAVE_ESPECIE_TAREFA_SUCCESS = '[ADMIN ESPECIE_TAREFA EDIT] SAVE ESPECIE_TAREFA SUCCESS';
export const SAVE_ESPECIE_TAREFA_FAILED = '[ADMIN ESPECIE_TAREFA EDIT] SAVE ESPECIE_TAREFA FAILED';

export const UPDATE_ESPECIE_TAREFA = '[ADMIN ESPECIE_TAREFA EDIT] UPDATE ESPECIE_TAREFA';
export const UPDATE_ESPECIE_TAREFA_SUCCESS = '[ADMIN ESPECIE_TAREFA EDIT] UPDATE ESPECIE_TAREFA SUCCESS';
export const UPDATE_ESPECIE_TAREFA_FAILED = '[ADMIN ESPECIE_TAREFA EDIT] UPDATE ESPECIE_TAREFA FAILED';

export const GET_ESPECIE_TAREFA = '[ADMIN ESPECIE_TAREFA EDIT] GET ESPECIE_TAREFA';
export const GET_ESPECIE_TAREFA_SUCCESS = '[ADMIN ESPECIE_TAREFA EDIT] GET ESPECIE_TAREFA SUCCESS';
export const GET_ESPECIE_TAREFA_FAILED = '[ADMIN ESPECIE_TAREFA EDIT] GET ESPECIE_TAREFA FAILED';

export const SAVE_COLABORADOR = '[ADMIN ESPECIE_TAREFA EDIT] SAVE COLABORADOR';
export const SAVE_COLABORADOR_SUCCESS = '[ADMIN ESPECIE_TAREFA EDIT] SAVE COLABORADOR SUCCESS';
export const SAVE_COLABORADOR_FAILED = '[ADMIN ESPECIE_TAREFA EDIT] SAVE COLABORADOR FAILED';

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
 * Save EspecieTarefa
 */
export class SaveEspecieTarefa implements Action {
    readonly type = SAVE_ESPECIE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieTarefa
 */
export class UpdateEspecieTarefa implements Action {
    readonly type = UPDATE_ESPECIE_TAREFA;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieTarefa Success
 */
export class SaveEspecieTarefaSuccess implements Action {
    readonly type = SAVE_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save EspecieTarefa Failed
 */
export class SaveEspecieTarefaFailed implements Action {
    readonly type = SAVE_ESPECIE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieTarefa Success
 */
export class UpdateEspecieTarefaSuccess implements Action {
    readonly type = UPDATE_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Update EspecieTarefa Failed
 */
export class UpdateEspecieTarefaFailed implements Action {
    readonly type = UPDATE_ESPECIE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create EspecieTarefa
 */
export class CreateEspecieTarefa implements Action {
    readonly type = CREATE_ESPECIE_TAREFA;

    constructor() {
    }
}

/**
 * Create EspecieTarefa Success
 */
export class CreateEspecieTarefaSuccess implements Action {
    readonly type = CREATE_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador
 */
export class SaveColaborador implements Action {
    readonly type = SAVE_COLABORADOR;

    constructor(public payload: any) {
    }
}

/**
 * Save Colaborador Success
 */
export class SaveColaboradorSuccess implements Action {
    readonly type = SAVE_COLABORADOR_SUCCESS;

    constructor() {
    }
}

/**
 * Save Colaborador Failed
 */
export class SaveColaboradorFailed implements Action {
    readonly type = SAVE_COLABORADOR_FAILED;

    constructor(public payload: any) {
    }
}

export type EspecieTarefaEditActionsAll
    = CreateEspecieTarefa
    | CreateEspecieTarefaSuccess
    | GetEspecieTarefa
    | GetEspecieTarefaSuccess
    | GetEspecieTarefaFailed
    | SaveEspecieTarefa
    | SaveEspecieTarefaSuccess
    | SaveEspecieTarefaFailed
    | UpdateEspecieTarefa
    | UpdateEspecieTarefaSuccess
    | UpdateEspecieTarefaFailed
    | SaveColaborador
    | SaveColaboradorSuccess
    | SaveColaboradorFailed;
