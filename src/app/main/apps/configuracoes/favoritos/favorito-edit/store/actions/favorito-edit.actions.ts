import {Action} from '@ngrx/store';

export const CREATE_FAVORITO = '[FAVORITO] CREATE FAVORITO';
export const CREATE_FAVORITO_SUCCESS = '[FAVORITO] CREATE FAVORITO SUCCESS';

export const SAVE_FAVORITO = '[FAVORITO] SAVE FAVORITO';
export const SAVE_FAVORITO_SUCCESS = '[FAVORITO] SAVE FAVORITO SUCCESS';
export const SAVE_FAVORITO_FAILED = '[FAVORITO] SAVE FAVORITO FAILED';

export const GET_FAVORITO = '[FAVORITO] GET FAVORITO';
export const GET_FAVORITO_SUCCESS = '[FAVORITO] GET FAVORITO SUCCESS';
export const GET_FAVORITO_FAILED = '[FAVORITO] GET FAVORITO FAILED';

/**
 * Get Favorito
 */
export class GetFavorito implements Action
{
    readonly type = GET_FAVORITO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Success
 */
export class GetFavoritoSuccess implements Action
{
    readonly type = GET_FAVORITO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Failed
 */
export class GetFavoritoFailed implements Action
{
    readonly type = GET_FAVORITO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Favorito
 */
export class SaveFavorito implements Action
{
    readonly type = SAVE_FAVORITO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Favorito Success
 */
export class SaveFavoritoSuccess implements Action
{
    readonly type = SAVE_FAVORITO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Favorito Failed
 */
export class SaveFavoritoFailed implements Action
{
    readonly type = SAVE_FAVORITO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Favorito
 */
export class CreateFavorito implements Action
{
    readonly type = CREATE_FAVORITO;

    constructor()
    {
    }
}

/**
 * Create Favorito Success
 */
export class CreateFavoritoSuccess implements Action
{
    readonly type = CREATE_FAVORITO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type FavoritoEditActionsAll
    = CreateFavorito
    | CreateFavoritoSuccess
    | GetFavorito
    | GetFavoritoSuccess
    | GetFavoritoFailed
    | SaveFavorito
    | SaveFavoritoSuccess
    | SaveFavoritoFailed;
