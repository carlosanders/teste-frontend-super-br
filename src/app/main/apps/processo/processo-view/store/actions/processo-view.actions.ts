import {Action} from '@ngrx/store';

export const GET_JUNTADA = '[PROCESSO VIEW] GET JUNTADA';
export const GET_JUNTADA_SUCCESS = '[PROCESSO VIEW] GET JUNTADA SUCCESS';
export const GET_JUNTADA_FAILED = '[PROCESSO VIEW] GET JUNTADA FAILED';

export const GET_JUNTADAS = '[PROCESSO VIEW] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[PROCESSO VIEW] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[PROCESSO VIEW] GET JUNTADAS FAILED';
export const EXPANDIR_PROCESSO = '[PROCESSO VIEW] EXPANDIR PROCESSO';

export const GET_JUNTADAS_ETIQUETAS = '[PROCESSO VIEW] GET JUNTADAS ETIQUETAS';
export const GET_JUNTADAS_ETIQUETAS_SUCCESS = '[PROCESSO VIEW] GET JUNTADAS ETIQUETAS SUCCESS';
export const GET_JUNTADAS_ETIQUETAS_FAILED = '[PROCESSO VIEW] GET JUNTADAS ETIQUETAS FAILED';

export const SET_CURRENT_STEP = '[JUNTADAS] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[JUNTADAS] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[JUNTADAS] SET CURRENT STEP FAILED';

export const UPDATE_INDEX = '[PROCESSO VIEW] UPDATE INDEX';

export const UNLOAD_JUNTADAS = '[JUNTADAS] UNLOAD JUNTADAS';

export const RELOAD_JUNTADAS = '[JUNTADAS] RELOAD JUNTADAS';

export const GET_CAPA_PROCESSO = '[JUNTADAS] GET CAPA PROCESSO';

export const RETIRA_JUNTADA = '[PROCESSO VIEW] RETIRA JUNTADA';

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
 * Get Juntada
 */
export class GetJuntada implements Action
{
    readonly type = GET_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Success
 */
export class GetJuntadaSuccess implements Action
{
    readonly type = GET_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Failed
 */
export class GetJuntadaFailed implements Action
{
    readonly type = GET_JUNTADA_FAILED;

    constructor(public payload: string)
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
 * Get Juntadas Etiquetas
 */
export class GetJuntadasEtiquetas implements Action
{
    readonly type = GET_JUNTADAS_ETIQUETAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Etiquetas Success
 */
export class GetJuntadasEtiquetasSuccess implements Action
{
    readonly type = GET_JUNTADAS_ETIQUETAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Etiquetas Failed
 */
export class GetJuntadasEtiquetasFailed implements Action
{
    readonly type = GET_JUNTADAS_ETIQUETAS_FAILED;

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

/**
 * Reload Juntadas
 */
export class ReloadJuntadas implements Action
{
    readonly type = RELOAD_JUNTADAS;

    constructor()
    {
    }
}

/**
 * Update Index
 */
export class UpdateIndex implements Action
{
    readonly type = UPDATE_INDEX;

    constructor(public payload: any)
    {
    }
}

/**
 * Retira Juntada
 */
export class RetiraJuntada implements Action
{
    readonly type = RETIRA_JUNTADA;

    constructor(public payload: any)
    {
    }
}

export type ProcessoViewActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | GetJuntadasEtiquetas
    | GetJuntadasEtiquetasSuccess
    | GetJuntadasEtiquetasFailed
    | GetJuntada
    | GetJuntadaSuccess
    | GetJuntadaFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed
    | UnloadJuntadas
    | GetCapaProcesso
    | ExpandirProcesso
    | ReloadJuntadas
    | UpdateIndex
    | RetiraJuntada;
