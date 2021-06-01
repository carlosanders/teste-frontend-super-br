import { Action } from '@ngrx/store';

export const GET_ESPECIE_PROCESSO = '[ADMIN ESPECIES PROCESSO LIST] GET ESPECIE_PROCESSO';
export const GET_ESPECIE_PROCESSO_SUCCESS = '[ADMIN ESPECIES PROCESSO LIST] GET ESPECIE_PROCESSO SUCCESS';
export const GET_ESPECIE_PROCESSO_FAILED = '[ADMIN ESPECIES PROCESSO LIST] GET ESPECIE_PROCESSO FAILED';

export const UNLOAD_ESPECIE_PROCESSO = '[ADMIN ESPECIES PROCESSO LIST] UNLOAD ESPECIE_PROCESSO';

export const UPDATE_ESPECIE_PROCESSO = '[ADMIN ESPECIES PROCESSO LIST] UPDATE ESPECIE_PROCESSO';
export const UPDATE_ESPECIE_PROCESSO_SUCCESS = '[ADMIN ESPECIES PROCESSO LIST] UPDATE ESPECIE_PROCESSO SUCCESS';
export const UPDATE_ESPECIE_PROCESSO_FAILED = '[ADMIN ESPECIES PROCESSO LIST] UPDATE ESPECIE_PROCESSO FAILED';

/**
 * Get EspecieProcesso
 */
export class GetEspecieProcesso implements Action
{
    readonly type = GET_ESPECIE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get EspecieProcesso Success
 */
export class GetEspecieProcessoSuccess implements Action
{
    readonly type = GET_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get EspecieProcesso Failed
 */
export class GetEspecieProcessoFailed implements Action
{
    readonly type = GET_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload EspecieProcesso
 */
export class UnloadEspecieProcesso implements Action
{
    readonly type = UNLOAD_ESPECIE_PROCESSO;

    constructor()
    {
    }
}

/**
 * Update EspecieProcesso
 */
export class UpdateEspecieProcesso implements Action
{
    readonly type = UPDATE_ESPECIE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Update EspecieProcesso Success
 */
export class UpdateEspecieProcessoSuccess implements Action
{
    readonly type = UPDATE_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Update EspecieProcesso Failed
 */
export class UpdateEspecieProcessoFailed implements Action
{
    readonly type = UPDATE_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type EspeciesProcessoListActionsAll
    = GetEspecieProcesso
    | GetEspecieProcessoSuccess
    | GetEspecieProcessoFailed
    | UnloadEspecieProcesso
    | UpdateEspecieProcesso
    | UpdateEspecieProcessoSuccess
    | UpdateEspecieProcessoFailed;

