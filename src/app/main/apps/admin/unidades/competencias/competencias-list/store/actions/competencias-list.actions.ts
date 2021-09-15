import {Action} from '@ngrx/store';

export const GET_COMPETENCIAS = '[ADMIN COMPETENCIAS LIST] GET COMPETENCIAS';
export const GET_COMPETENCIAS_SUCCESS = '[ADMIN COMPETENCIAS LIST] GET COMPETENCIAS SUCCESS';
export const GET_COMPETENCIAS_FAILED = '[ADMIN COMPETENCIAS LIST] GET COMPETENCIAS FAILED';

export const DELETE_COMPETENCIA = '[ADMIN COMPETENCIA LIST] DELETE COMPETENCIA';
export const DELETE_COMPETENCIA_SUCCESS = '[ADMIN COMPETENCIA LIST] DELETE COMPETENCIA SUCCESS';
export const DELETE_COMPETENCIA_FAILED = '[ADMIN COMPETENCIA LIST] DELETE COMPETENCIA FAILED';

export const RELOAD_COMPETENCIAS = '[ADMIN COMPETENCIAS LIST] RELOAD COMPETENCIAS';

/**
 * Get VinculacaoSetorMunicipio[]
 */
export class GetCompetencias implements Action {
    readonly type = GET_COMPETENCIAS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoSetorMunicipio[] Success
 */
export class GetCompetenciasSuccess implements Action {
    readonly type = GET_COMPETENCIAS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoSetorMunicipio[] Failed
 */
export class GetCompetenciasFailed implements Action {
    readonly type = GET_COMPETENCIAS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload VinculacaoSetorMunicipio[]
 */
export class ReloadCompetencias implements Action {
    readonly type = RELOAD_COMPETENCIAS;

    constructor() {
    }
}

/**
 * Delete Competencia
 */
export class DeleteCompetencia implements Action {
    readonly type = DELETE_COMPETENCIA;

    constructor(public payload: any) {
    }
}

/**
 * Delete Competencia Success
 */
export class DeleteCompetenciaSuccess implements Action {
    readonly type = DELETE_COMPETENCIA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Competencia Failed
 */
export class DeleteCompetenciaFailed implements Action {
    readonly type = DELETE_COMPETENCIA_FAILED;

    constructor(public payload: any) {
    }
}


export type CompetenciasListActionsAll
    = GetCompetencias
    | GetCompetenciasSuccess
    | GetCompetenciasFailed
    | ReloadCompetencias
    | DeleteCompetencia
    | DeleteCompetenciaSuccess
    | DeleteCompetenciaFailed;

