import { Action } from '@ngrx/store';

export const GET_JUNTADAS = '[PROCESSO VIEW] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[PROCESSO VIEW] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[PROCESSO VIEW] GET JUNTADAS FAILED';

export const SET_CURRENT_STEP = '[JUNTADAS] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[JUNTADAS] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[JUNTADAS] SET CURRENT STEP FAILED';

/**
 * Get Juntadas
 */
export class GetJuntadas implements Action
{
    readonly type = GET_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Success
 */
export class GetJuntadasSuccess implements Action
{
    readonly type = GET_JUNTADAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Failed
 */
export class GetJuntadasFailed implements Action
{
    readonly type = GET_JUNTADAS_FAILED;

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

export type ProcessoViewActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed;
