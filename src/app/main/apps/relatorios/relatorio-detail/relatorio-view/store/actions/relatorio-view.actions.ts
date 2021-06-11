import {Action} from '@ngrx/store';

export const GET_RELATORIOS = '[RELATORIO VIEW] GET RELATORIOS';
export const GET_RELATORIOS_SUCCESS = '[RELATORIO VIEW] GET RELATORIOS SUCCESS';
export const GET_RELATORIOS_FAILED = '[RELATORIO VIEW] GET RELATORIOS FAILED';

export const SET_CURRENT_STEP = '[RELATORIOS] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[RELATORIOS] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[RELATORIOS] SET CURRENT STEP FAILED';

export const UNLOAD_RELATORIOS = '[RELATORIO VIEW] UNLOAD RELATORIOS';

/**
 * Get Relatorios
 */
export class GetRelatorios implements Action
{
    readonly type = GET_RELATORIOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relatorios Success
 */
export class GetRelatoriosSuccess implements Action
{
    readonly type = GET_RELATORIOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relatorios Failed
 */
export class GetRelatoriosFailed implements Action
{
    readonly type = GET_RELATORIOS_FAILED;

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
 * Unload Relatorios
 */
export class UnloadRelatorios implements Action
{
    readonly type = UNLOAD_RELATORIOS;

    constructor(public payload: any)
    {
    }
}

export type RelatorioViewActionsAll
    = GetRelatorios
    | GetRelatoriosSuccess
    | GetRelatoriosFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed
    | UnloadRelatorios;
