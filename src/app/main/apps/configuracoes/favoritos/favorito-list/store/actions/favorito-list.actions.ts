import {Action} from '@ngrx/store';

export const GET_FAVORITOS = '[FAVORITO LIST] GET FAVORITOS';
export const GET_FAVORITOS_SUCCESS = '[FAVORITO LIST] GET FAVORITOS SUCCESS';
export const GET_FAVORITOS_FAILED = '[FAVORITO LIST] GET FAVORITOS FAILED';

export const RELOAD_FAVORITOS = '[FAVORITO LIST] RELOAD FAVORITOS';

export const DELETE_FAVORITO = '[FAVORITO LIST] DELETE FAVORITO';
export const DELETE_FAVORITO_SUCCESS = '[FAVORITO LIST] DELETE FAVORITO SUCCESS';
export const DELETE_FAVORITO_FAILED = '[FAVORITO LIST] DELETE FAVORITO FAILED';

/**
 * Get Favoritos
 */
export class GetFavoritos implements Action
{
    readonly type = GET_FAVORITOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Success
 */
export class GetFavoritosSuccess implements Action
{
    readonly type = GET_FAVORITOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Failed
 */
export class GetFavoritosFailed implements Action
{
    readonly type = GET_FAVORITOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Favoritos
 */
export class ReloadFavoritos implements Action
{
    readonly type = RELOAD_FAVORITOS;

    constructor()
    {
    }
}

/**
 * Delete Favorito
 */
export class DeleteFavorito implements Action
{
    readonly type = DELETE_FAVORITO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Success
 */
export class DeleteFavoritoSuccess implements Action
{
    readonly type = DELETE_FAVORITO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Failed
 */
export class DeleteFavoritoFailed implements Action
{
    readonly type = DELETE_FAVORITO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type FavoritoListActionsAll
    = GetFavoritos
    | GetFavoritosSuccess
    | GetFavoritosFailed
    | ReloadFavoritos
    | DeleteFavorito
    | DeleteFavoritoSuccess
    | DeleteFavoritoFailed;

