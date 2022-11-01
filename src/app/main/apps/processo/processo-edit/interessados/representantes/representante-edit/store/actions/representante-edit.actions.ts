import {Action} from '@ngrx/store';

export const CREATE_REPRESENTANTE = '[REPRESENTANTE] CREATE REPRESENTANTE';
export const CREATE_REPRESENTANTE_SUCCESS = '[REPRESENTANTE] CREATE REPRESENTANTE SUCCESS';

export const SAVE_REPRESENTANTE = '[REPRESENTANTE] SAVE REPRESENTANTE';
export const SAVE_REPRESENTANTE_SUCCESS = '[REPRESENTANTE] SAVE REPRESENTANTE SUCCESS';
export const SAVE_REPRESENTANTE_FAILED = '[REPRESENTANTE] SAVE REPRESENTANTE FAILED';

export const GET_REPRESENTANTE = '[REPRESENTANTE] GET REPRESENTANTE';
export const GET_REPRESENTANTE_SUCCESS = '[REPRESENTANTE] GET REPRESENTANTE SUCCESS';
export const GET_REPRESENTANTE_FAILED = '[REPRESENTANTE] GET REPRESENTANTE FAILED';

export const UNLOAD_STORE = '[REPRESENTANTE-EDIT] UNLOAD STORE';

/**
 * Get Representante
 */
export class GetRepresentante implements Action
{
    readonly type = GET_REPRESENTANTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Representante Success
 */
export class GetRepresentanteSuccess implements Action
{
    readonly type = GET_REPRESENTANTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Representante Failed
 */
export class GetRepresentanteFailed implements Action
{
    readonly type = GET_REPRESENTANTE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Representante
 */
export class SaveRepresentante implements Action
{
    readonly type = SAVE_REPRESENTANTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Representante Success
 */
export class SaveRepresentanteSuccess implements Action
{
    readonly type = SAVE_REPRESENTANTE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Representante Failed
 */
export class SaveRepresentanteFailed implements Action
{
    readonly type = SAVE_REPRESENTANTE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Representante
 */
export class CreateRepresentante implements Action
{
    readonly type = CREATE_REPRESENTANTE;

    constructor()
    {
    }
}

/**
 * Create Representante Success
 */
export class CreateRepresentanteSuccess implements Action
{
    readonly type = CREATE_REPRESENTANTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Store
 */
export class UnloadStore implements Action
{
    readonly type = UNLOAD_STORE;

    constructor()
    {
    }
}

export type RepresentanteEditActionsAll
    = CreateRepresentante
    | CreateRepresentanteSuccess
    | GetRepresentante
    | GetRepresentanteSuccess
    | GetRepresentanteFailed
    | SaveRepresentante
    | SaveRepresentanteSuccess
    | SaveRepresentanteFailed
    | UnloadStore;
