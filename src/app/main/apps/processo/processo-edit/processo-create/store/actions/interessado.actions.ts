import {Action} from '@ngrx/store';

export const GET_INTERESSADOS = '[DADOS BASICOS STEPS] GET INTERESSADOS';
export const GET_INTERESSADOS_SUCCESS = '[DADOS BASICOS STEPS] GET INTERESSADOS SUCCESS';
export const GET_INTERESSADOS_FAILED = '[DADOS BASICOS STEPS] GET INTERESSADOS FAILED';

export const RELOAD_INTERESSADOS = '[DADOS BASICOS STEPS] RELOAD INTERESSADOS';
export const UNLOAD_INTERESSADOS = '[DADOS BASICOS STEPS] UNLOAD INTERESSADOS';

export const SAVE_INTERESSADO = '[DADOS BASICOS STEPS] SAVE INTERESSADO';
export const SAVE_INTERESSADO_SUCCESS = '[DADOS BASICOS STEPS] SAVE INTERESSADO SUCCESS';
export const SAVE_INTERESSADO_FAILED = '[DADOS BASICOS STEPS] SAVE INTERESSADO FAILED';

export const DELETE_INTERESSADO = '[DADOS BASICOS STEPS] DELETE INTERESSADO';
export const DELETE_INTERESSADO_SUCCESS = '[DADOS BASICOS STEPS] DELETE INTERESSADO SUCCESS';
export const DELETE_INTERESSADO_FAILED = '[DADOS BASICOS STEPS] DELETE INTERESSADO FAILED';

/**
 * Get Assuntos Processo
 */
export class GetInteressados implements Action {
    readonly type = GET_INTERESSADOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados Processo
 */
export class GetInteressadosSuccess implements Action {
    readonly type = GET_INTERESSADOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados Processo
 */
export class GetInteressadosFailed implements Action {
    readonly type = GET_INTERESSADOS_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Interessados
 */
export class ReloadInteressados implements Action
{
    readonly type = RELOAD_INTERESSADOS;

    constructor()
    {
    }
}

/**
 * Unload Interessados
 */
export class UnloadInteressados implements Action
{
    readonly type = UNLOAD_INTERESSADOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Interessado
 */
export class DeleteInteressado implements Action
{
    readonly type = DELETE_INTERESSADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Interessado Success
 */
export class DeleteInteressadoSuccess implements Action
{
    readonly type = DELETE_INTERESSADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Interessado Failed
 */
export class DeleteInteressadoFailed implements Action
{
    readonly type = DELETE_INTERESSADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Interessado
 */
export class SaveInteressado implements Action
{
    readonly type = SAVE_INTERESSADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Interessado Success
 */
export class SaveInteressadoSuccess implements Action
{
    readonly type = SAVE_INTERESSADO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Interessado Failed
 */
export class SaveInteressadoFailed implements Action
{
    readonly type = SAVE_INTERESSADO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type InteressadoActionsAll
    = GetInteressados
    | GetInteressadosSuccess
    | GetInteressadosFailed
    | ReloadInteressados
    | UnloadInteressados
    | DeleteInteressado
    | DeleteInteressadoSuccess
    | DeleteInteressadoFailed
    | SaveInteressado
    | SaveInteressadoSuccess
    | SaveInteressadoFailed;
