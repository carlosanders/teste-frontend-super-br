import { Action } from '@ngrx/store';

export const GET_FAVORITOS = '[PROCESSO FAVORITOS] GET FAVORITOS';
export const GET_FAVORITOS_SUCCESS = '[PROCESSO FAVORITOS] GET FAVORITOS SUCCESS';
export const GET_FAVORITOS_FAILED = '[PROCESSO FAVORITOS] GET FAVORITOS FAILED';

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

export type FavoritoActionsAll
    =  GetFavoritos
    | GetFavoritosSuccess
    | GetFavoritosFailed;
