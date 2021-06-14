import {Action} from '@ngrx/store';

export const GET_RELEVANCIAS = '[RELEVANCIA LIST] GET RELEVANCIAS';
export const GET_RELEVANCIAS_SUCCESS = '[RELEVANCIA LIST] GET RELEVANCIAS SUCCESS';
export const GET_RELEVANCIAS_FAILED = '[RELEVANCIA LIST] GET RELEVANCIAS FAILED';

export const RELOAD_RELEVANCIAS = '[RELEVANCIA LIST] RELOAD RELEVANCIAS';

export const DELETE_RELEVANCIA = '[RELEVANCIA LIST] DELETE RELEVANCIA';
export const DELETE_RELEVANCIA_SUCCESS = '[RELEVANCIA LIST] DELETE RELEVANCIA SUCCESS';
export const DELETE_RELEVANCIA_FAILED = '[RELEVANCIA LIST] DELETE RELEVANCIA FAILED';

/**
 * Get Relevancias
 */
export class GetRelevancias implements Action
{
    readonly type = GET_RELEVANCIAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relevancias Success
 */
export class GetRelevanciasSuccess implements Action
{
    readonly type = GET_RELEVANCIAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Relevancias Failed
 */
export class GetRelevanciasFailed implements Action
{
    readonly type = GET_RELEVANCIAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Relevancias
 */
export class ReloadRelevancias implements Action
{
    readonly type = RELOAD_RELEVANCIAS;

    constructor()
    {
    }
}

/**
 * Delete Relevancia
 */
export class DeleteRelevancia implements Action
{
    readonly type = DELETE_RELEVANCIA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Relevancia Success
 */
export class DeleteRelevanciaSuccess implements Action
{
    readonly type = DELETE_RELEVANCIA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Relevancia Failed
 */
export class DeleteRelevanciaFailed implements Action
{
    readonly type = DELETE_RELEVANCIA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type RelevanciaListActionsAll
    = GetRelevancias
    | GetRelevanciasSuccess
    | GetRelevanciasFailed
    | ReloadRelevancias
    | DeleteRelevancia
    | DeleteRelevanciaSuccess
    | DeleteRelevanciaFailed;

