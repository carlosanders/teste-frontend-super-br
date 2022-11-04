import {Action} from '@ngrx/store';

export const GET_REPRESENTANTES = '[REPRESENTANTE LIST] GET REPRESENTANTES';
export const GET_REPRESENTANTES_SUCCESS = '[REPRESENTANTE LIST] GET REPRESENTANTES SUCCESS';
export const GET_REPRESENTANTES_FAILED = '[REPRESENTANTE LIST] GET REPRESENTANTES FAILED';

export const RELOAD_REPRESENTANTES = '[REPRESENTANTE LIST] RELOAD REPRESENTANTES';

export const DELETE_REPRESENTANTE = '[REPRESENTANTE LIST] DELETE REPRESENTANTE';
export const DELETE_REPRESENTANTE_SUCCESS = '[REPRESENTANTE LIST] DELETE REPRESENTANTE SUCCESS';
export const DELETE_REPRESENTANTE_FAILED = '[REPRESENTANTE LIST] DELETE REPRESENTANTE FAILED';

export const UNLOAD_REPRESENTANTES = '[REPRESENTANTE LIST] UNLOAD REPRESENTANTES';

/**
 * Get Representantes
 */
export class GetRepresentantes implements Action
{
    readonly type = GET_REPRESENTANTES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Representantes Success
 */
export class GetRepresentantesSuccess implements Action
{
    readonly type = GET_REPRESENTANTES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Representantes Failed
 */
export class GetRepresentantesFailed implements Action
{
    readonly type = GET_REPRESENTANTES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Representantes
 */
export class ReloadRepresentantes implements Action
{
    readonly type = RELOAD_REPRESENTANTES;

    constructor()
    {
    }
}

/**
 * Delete Representante
 */
export class DeleteRepresentante implements Action
{
    readonly type = DELETE_REPRESENTANTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Representante Success
 */
export class DeleteRepresentanteSuccess implements Action
{
    readonly type = DELETE_REPRESENTANTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Representante Failed
 */
export class DeleteRepresentanteFailed implements Action
{
    readonly type = DELETE_REPRESENTANTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Representante
 */
export class UnloadRepresentante implements Action
{
    readonly type = UNLOAD_REPRESENTANTES;
}

export type RepresentanteListActionsAll
    = GetRepresentantes
    | GetRepresentantesSuccess
    | GetRepresentantesFailed
    | ReloadRepresentantes
    | DeleteRepresentante
    | DeleteRepresentanteSuccess
    | DeleteRepresentanteFailed
    | UnloadRepresentante
    ;

