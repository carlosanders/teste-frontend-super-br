import { Action } from '@ngrx/store';

export const GET_JUNTADAS = '[PROCESSO VIEW] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[PROCESSO VIEW] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[PROCESSO VIEW] GET JUNTADAS FAILED';
export const EXPANDIR_PROCESSO = '[PROCESSO VIEW] EXPANDIR PROCESSO';

export const SET_CURRENT_STEP = '[JUNTADAS] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[JUNTADAS] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[JUNTADAS] SET CURRENT STEP FAILED';

export const UNLOAD_JUNTADAS = '[JUNTADAS] UNLOAD JUNTADAS';

export const GET_CAPA_PROCESSO = '[JUNTADAS] GET CAPA PROCESSO';

/**
 * Expandir Processo
 */
export class ExpandirProcesso implements Action
{
    readonly type = EXPANDIR_PROCESSO;

    constructor(public payload: boolean)
    {
    }
}

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

/**
 * Unload Juntadas
 */
export class UnloadJuntadas implements Action
{
    readonly type = UNLOAD_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Step
 */
export class GetCapaProcesso implements Action {
    readonly type = GET_CAPA_PROCESSO;

    constructor() {
    }
}

export type ProcessoViewActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed
    | UnloadJuntadas
    | GetCapaProcesso
    | ExpandirProcesso;
