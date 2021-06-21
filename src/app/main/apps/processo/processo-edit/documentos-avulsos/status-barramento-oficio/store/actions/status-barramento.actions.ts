import { Action } from '@ngrx/store';

export const GET_BARRAMENTO_OFICIO = '[STATUS BARRAMENTO OFICIO] GET BARRAMENTO OFICIO';
export const GET_BARRAMENTO_SUCCESS_OFICIO = '[STATUS BARRAMENTO OFICIO] GET BARRAMENTO OFICIO SUCCESS';
export const GET_BARRAMENTO_FAILED_OFICIO = '[STATUS BARRAMENTO OFICIO] GET BARRAMENTO OFICIO FAILED';

/**
 * Get Barramento
 */
export class GetBarramento implements Action {
    readonly type = GET_BARRAMENTO_OFICIO;

    constructor(public payload: any) {
    }
}

/**
 * Get Barramento Success
 */
export class GetBarramentoSuccess implements Action {
    readonly type = GET_BARRAMENTO_SUCCESS_OFICIO;

    constructor(public payload: any) {
    }
}

/**
 * Get RemessaBarramento Failed
 */
export class GetBarramentoFailed implements Action {
    readonly type = GET_BARRAMENTO_FAILED_OFICIO;

    constructor(public payload: string) {
    }
}

export type StatusBarramentoActionsAll
    = GetBarramento
    | GetBarramentoSuccess
    | GetBarramentoFailed;
