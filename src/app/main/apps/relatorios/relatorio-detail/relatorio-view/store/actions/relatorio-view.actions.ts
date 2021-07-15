import {Action} from '@ngrx/store';

export const GET_RELATORIO = '[RELATORIO VIEW] GET RELATORIO';
export const GET_RELATORIO_SUCCESS = '[RELATORIO VIEW] GET RELATORIO SUCCESS';
export const GET_RELATORIO_FAILED = '[RELATORIO VIEW] GET RELATORIO FAILED';

export const SET_CURRENT_STEP = '[RELATORIO VIEW] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[RELATORIO VIEW] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[RELATORIO VIEW] SET CURRENT STEP FAILED';

export const UNLOAD_RELATORIO = '[RELATORIO VIEW] UNLOAD RELATORIO';

/**
 * Get Relatorio
 */
export class GetRelatorio implements Action
{
    readonly type = GET_RELATORIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relatorio Success
 */
export class GetRelatorioSuccess implements Action
{
    readonly type = GET_RELATORIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relatorio Failed
 */
export class GetRelatorioFailed implements Action
{
    readonly type = GET_RELATORIO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Set Current Step
 */
export class SetCurrentStep implements Action {
    readonly type = SET_CURRENT_STEP;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Success
 */
export class SetCurrentStepSuccess implements Action {
    readonly type = SET_CURRENT_STEP_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Failed
 */
export class SetCurrentStepFailed implements Action {
    readonly type = SET_CURRENT_STEP_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Relatorio
 */
export class UnloadRelatorio implements Action
{
    readonly type = UNLOAD_RELATORIO;

    constructor(public payload: any)
    {
    }
}

export type RelatorioViewActionsAll
    = GetRelatorio
    | GetRelatorioSuccess
    | GetRelatorioFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed
    | UnloadRelatorio;
