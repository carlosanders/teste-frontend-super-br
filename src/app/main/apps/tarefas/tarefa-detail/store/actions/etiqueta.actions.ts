import {Action} from '@ngrx/store';

export const CREATE_ETIQUETA = '[TAREFA DETAIL ETIQUETA] CREATE ETIQUETA';

export const GET_ETIQUETA = '[TAREFA DETAIL ETIQUETA] GET ETIQUETA';
export const GET_ETIQUETA_SUCCESS = '[TAREFA DETAIL ETIQUETA] GET ETIQUETA SUCCESS';
export const GET_ETIQUETA_FAILED = '[TAREFA DETAIL ETIQUETA] GET ETIQUETA FAILED';

export const SAVE_ETIQUETA = '[TAREFA DETAIL ETIQUETA] SAVE ETIQUETA';
export const SAVE_ETIQUETA_SUCCESS = '[TAREFA DETAIL ETIQUETA] SAVE ETIQUETA SUCCESS';
export const SAVE_ETIQUETA_FAILED = '[TAREFA DETAIL ETIQUETA] SAVE ETIQUETA FAILED';

export const GET_ACOES_ETIQUETA = '[TAREFA DETAIL ETIQUETA] GET ACOES ETIQUETA';
export const GET_ACOES_ETIQUETA_SUCCESS = '[TAREFA DETAIL ETIQUETA] GET ACOES ETIQUETA SUCCESS';
export const GET_ACOES_ETIQUETA_FAILED = '[TAREFA DETAIL ETIQUETA] GET ACOES ETIQUETA FAILED';

/**
 * Create Etiqueta
 */
export class CreateEtiqueta implements Action {
    readonly type = CREATE_ETIQUETA;

    constructor() {
    }
}

/**
 * Get Etiqueta
 */
export class GetEtiqueta implements Action {
    readonly type = GET_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Get Etiqueta Success
 */
export class GetEtiquetaSuccess implements Action {
    readonly type = GET_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Etiqueta Failed
 */
export class GetEtiquetaFailed implements Action {
    readonly type = GET_ETIQUETA_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Etiqueta
 */
export class SaveEtiqueta implements Action {
    readonly type = SAVE_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Save Etiqueta Success
 */
export class SaveEtiquetaSuccess implements Action {
    readonly type = SAVE_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Etiqueta Failed
 */
export class SaveEtiquetaFailed implements Action {
    readonly type = SAVE_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

export class GetAcoesEtiqueta implements Action {
    readonly type = GET_ACOES_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

export class GetAcoesEtiquetaSuccess implements Action {
    readonly type = GET_ACOES_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetAcoesEtiquetaFailed implements Action {
    readonly type = GET_ACOES_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type EtiquetaActionsAll
    = CreateEtiqueta
    | GetEtiqueta
    | GetEtiquetaSuccess
    | GetEtiquetaFailed
    | SaveEtiqueta
    | SaveEtiquetaSuccess
    | SaveEtiquetaFailed
    | GetAcoesEtiqueta
    | GetAcoesEtiquetaSuccess
    | GetAcoesEtiquetaFailed
    ;
