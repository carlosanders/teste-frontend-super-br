import {Action} from '@ngrx/store';

export const GET_INTERESSADOS_DOSSIES = '[PROCESSO DOSSIE] GET INTERESSADOS DOSSIES';
export const GET_INTERESSADOS_DOSSIES_SUCCESS = '[PROCESSO DOSSIE] GET INTERESSADOS DOSSIES SUCCESS';
export const GET_INTERESSADOS_DOSSIES_FAILED = '[PROCESSO DOSSIE] GET INTERESSADOS DOSSIES FAILED'

export const GET_TIPOS_DOSSIES = '[PROCESSO DOSSIE] GET TIPOS DOSSIES';
export const GET_TIPOS_DOSSIES_SUCCESS = '[PROCESSO DOSSIE] GET TIPOS DOSSIES SUCCESS';
export const GET_TIPOS_DOSSIES_FAILED = '[PROCESSO DOSSIE] GET TIPOS DOSSIES FAILED'

export const SAVE_DOSSIES = '[PROCESSO DOSSIE] SAVE DOSSIES';
export const SAVE_DOSSIES_SUCCESS = '[PROCESSO DOSSIE] SAVE DOSSIES SUCCESS';
export const SAVE_DOSSIES_FAILED = '[PROCESSO DOSSIE] SAVE DOSSIES FAILED'

/**
 * Get Interessados
 */
export class GetInteressadosDossies implements Action
{
    readonly type = GET_INTERESSADOS_DOSSIES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Interessados Success
 */
export class GetInteressadosDossiesSuccess implements Action
{
    readonly type = GET_INTERESSADOS_DOSSIES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Interessados Failed
 */
export class GetInteressadosDossiesFailed implements Action
{
    readonly type = GET_INTERESSADOS_DOSSIES_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Get Tipos Dossies
 */
export class GetTiposDossies implements Action
{
    readonly type = GET_TIPOS_DOSSIES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tipos Dossies
 */
export class GetTiposDossiesSuccess implements Action
{
    readonly type = GET_TIPOS_DOSSIES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Tipos Dossies Failed
 */
export class GetTiposDossiesFailed implements Action
{
    readonly type = GET_TIPOS_DOSSIES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Dossies
 */
export class SaveDossies implements Action
{
    readonly type = SAVE_DOSSIES;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Dossies
 */
export class SaveDossiesSuccess implements Action
{
    readonly type = SAVE_DOSSIES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Dossies Failed
 */
export class SaveDossiesFailed implements Action
{
    readonly type = SAVE_DOSSIES_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoSolicitarDossiesActionsAll
    = GetInteressadosDossies
    | GetInteressadosDossiesSuccess
    | GetInteressadosDossiesFailed
    | GetTiposDossies
    | GetTiposDossiesSuccess
    | GetTiposDossiesFailed
    | SaveDossies
    | SaveDossiesSuccess
    | SaveDossiesFailed;
