import {Action} from '@ngrx/store';

export const CREATE_RELACIONAMENTO = '[RELACIONAMENTO] CREATE RELACIONAMENTO';
export const CREATE_RELACIONAMENTO_SUCCESS = '[RELACIONAMENTO] CREATE RELACIONAMENTO SUCCESS';

export const SAVE_RELACIONAMENTO = '[RELACIONAMENTO] SAVE RELACIONAMENTO';
export const SAVE_RELACIONAMENTO_SUCCESS = '[RELACIONAMENTO] SAVE RELACIONAMENTO SUCCESS';
export const SAVE_RELACIONAMENTO_FAILED = '[RELACIONAMENTO] SAVE RELACIONAMENTO FAILED';

export const GET_RELACIONAMENTO = '[RELACIONAMENTO] GET RELACIONAMENTO';
export const GET_RELACIONAMENTO_SUCCESS = '[RELACIONAMENTO] GET RELACIONAMENTO SUCCESS';
export const GET_RELACIONAMENTO_FAILED = '[RELACIONAMENTO] GET RELACIONAMENTO FAILED';

/**
 * Get Relacionamento
 */
export class GetRelacionamento implements Action {
    readonly type = GET_RELACIONAMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Get Relacionamento Success
 */
export class GetRelacionamentoSuccess implements Action {
    readonly type = GET_RELACIONAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Relacionamento Failed
 */
export class GetRelacionamentoFailed implements Action {
    readonly type = GET_RELACIONAMENTO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Relacionamento
 */
export class SaveRelacionamento implements Action {
    readonly type = SAVE_RELACIONAMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Save Relacionamento Success
 */
export class SaveRelacionamentoSuccess implements Action {
    readonly type = SAVE_RELACIONAMENTO_SUCCESS;

    constructor() {
    }
}

/**
 * Save Relacionamento Failed
 */
export class SaveRelacionamentoFailed implements Action {
    readonly type = SAVE_RELACIONAMENTO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Create Relacionamento
 */
export class CreateRelacionamento implements Action {
    readonly type = CREATE_RELACIONAMENTO;

    constructor() {
    }
}

/**
 * Create Relacionamento Success
 */
export class CreateRelacionamentoSuccess implements Action {
    readonly type = CREATE_RELACIONAMENTO_SUCCESS;

    constructor(public payload: any) {
    }
}

export type RelacionamentoEditActionsAll
    = CreateRelacionamento
    | CreateRelacionamentoSuccess
    | GetRelacionamento
    | GetRelacionamentoSuccess
    | GetRelacionamentoFailed
    | SaveRelacionamento
    | SaveRelacionamentoSuccess
    | SaveRelacionamentoFailed;
