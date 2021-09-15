import {Action} from '@ngrx/store';

export const GET_ESPECIE_ATIVIDADE = '[SUPERADMIN ESPECIE ATIVIDADE LIST] GET ESPECIE_ATIVIDADE';
export const GET_ESPECIE_ATIVIDADE_SUCCESS = '[SUPERADMIN ESPECIE ATIVIDADE LIST] GET ESPECIE_ATIVIDADE SUCCESS';
export const GET_ESPECIE_ATIVIDADE_FAILED = '[SUPERADMIN ESPECIE ATIVIDADE LIST] GET ESPECIE_ATIVIDADE FAILED';

export const RELOAD_ESPECIE_ATIVIDADE = '[SUPERADMIN ESPECIE ATIVIDADE LIST] RELOAD ESPECIE_ATIVIDADE';
export const UNLOAD_ESPECIE_ATIVIDADE = '[SUPERADMIN ESPECIE ATIVIDADE LIST] UNLOAD ESPECIE_ATIVIDADE';


/**
 * Get EspecieAtividade
 */
export class GetEspecieAtividade implements Action {
    readonly type = GET_ESPECIE_ATIVIDADE;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieAtividade Success
 */
export class GetEspecieAtividadeSuccess implements Action {
    readonly type = GET_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get EspecieAtividade Failed
 */
export class GetEspecieAtividadeFailed implements Action {
    readonly type = GET_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Unload EspecieAtividade
 */
export class UnloadEspecieAtividade implements Action {
    readonly type = UNLOAD_ESPECIE_ATIVIDADE;

    constructor() {
    }
}

/**
 * Reload EspecieAtividade
 */
export class ReloadEspecieAtividade implements Action {
    readonly type = RELOAD_ESPECIE_ATIVIDADE;

    constructor() {
    }
}


export type EspecieAtividadeListActionsAll
    = GetEspecieAtividade
    | GetEspecieAtividadeSuccess
    | GetEspecieAtividadeFailed
    | UnloadEspecieAtividade
    | ReloadEspecieAtividade;

