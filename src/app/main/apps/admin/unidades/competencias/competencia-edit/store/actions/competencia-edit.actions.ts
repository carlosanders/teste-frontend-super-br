import {Action} from '@ngrx/store';

export const CREATE_COMPETENCIA = '[ADMIN COMPETENCIA EDIT] CREATE COMPETENCIA';
export const CREATE_COMPETENCIA_SUCCESS = '[ADMIN COMPETENCIA EDIT] CREATE COMPETENCIA SUCCESS';

export const SAVE_COMPETENCIA = '[ADMIN COMPETENCIA EDIT] SAVE COMPETENCIA';
export const SAVE_COMPETENCIA_SUCCESS = '[ADMIN COMPETENCIA EDIT] SAVE COMPETENCIA SUCCESS';
export const SAVE_COMPETENCIA_FAILED = '[ADMIN COMPETENCIA EDIT] SAVE COMPETENCIA FAILED';

export const GET_COMPETENCIA = '[ADMIN COMPETENCIA EDIT] GET COMPETENCIA';
export const GET_COMPETENCIA_SUCCESS = '[ADMIN COMPETENCIA EDIT] GET COMPETENCIA SUCCESS';
export const GET_COMPETENCIA_FAILED = '[ADMIN COMPETENCIA EDIT] GET COMPETENCIA FAILED';

/**
 * Get VinculacaoSetorMunicipio
 */
export class GetCompetencia implements Action {
    readonly type = GET_COMPETENCIA;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoSetorMunicipio Success
 */
export class GetCompetenciaSuccess implements Action {
    readonly type = GET_COMPETENCIA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get VinculacaoSetorMunicipio Failed
 */
export class GetCompetenciaFailed implements Action {
    readonly type = GET_COMPETENCIA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save VinculacaoSetorMunicipio
 */
export class SaveCompetencia implements Action {
    readonly type = SAVE_COMPETENCIA;

    constructor(public payload: any) {
    }
}

/**
 * Save VinculacaoSetorMunicipio Success
 */
export class SaveCompetenciaSuccess implements Action {
    readonly type = SAVE_COMPETENCIA_SUCCESS;

    constructor() {
    }
}

/**
 * Save VinculacaoSetorMunicipio Failed
 */
export class SaveCompetenciaFailed implements Action {
    readonly type = SAVE_COMPETENCIA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create VinculacaoSetorMunicipio
 */
export class CreateCompetencia implements Action {
    readonly type = CREATE_COMPETENCIA;

    constructor() {
    }
}

/**
 * Create VinculacaoSetorMunicipio Success
 */
export class CreateCompetenciaSuccess implements Action {
    readonly type = CREATE_COMPETENCIA_SUCCESS;

    constructor(public payload: any) {
    }
}

export type CompetenciaEditActionsAll
    = CreateCompetencia
    | CreateCompetenciaSuccess
    | GetCompetencia
    | GetCompetenciaSuccess
    | GetCompetenciaFailed
    | SaveCompetencia
    | SaveCompetenciaSuccess
    | SaveCompetenciaFailed;
