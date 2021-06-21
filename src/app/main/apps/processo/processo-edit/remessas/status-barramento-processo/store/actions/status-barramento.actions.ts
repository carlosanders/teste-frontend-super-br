import { Action } from '@ngrx/store';

export const GET_BARRAMENTO_PROCESSO = '[STATUS BARRAMENTO PROCESSO] GET BARRAMENTO PROCESSO';
export const GET_BARRAMENTO_SUCCESS_PROCESSO = '[STATUS BARRAMENTO PROCESSO] GET BARRAMENTO PROCESSO SUCCESS';
export const GET_BARRAMENTO_FAILED_PROCESSO = '[STATUS BARRAMENTO PROCESSO] GET BARRAMENTO PROCESSO FAILED';

/**
 * Get Barramento
 */
export class GetBarramento implements Action {
    readonly type = GET_BARRAMENTO_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Get Barramento Success
 */
export class GetBarramentoSuccess implements Action {
    readonly type = GET_BARRAMENTO_SUCCESS_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Get RemessaBarramento Failed
 */
export class GetBarramentoFailed implements Action {
    readonly type = GET_BARRAMENTO_FAILED_PROCESSO;

    constructor(public payload: string) {
    }
}

export type StatusBarramentoActionsAll
    = GetBarramento
    | GetBarramentoSuccess
    | GetBarramentoFailed;
