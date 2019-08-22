import { Action } from '@ngrx/store';

export const GET_FAVORITOS = '[FAVORITO LIST] GET FAVORITOS';
export const GET_FAVORITOS_SUCCESS = '[FAVORITO LIST] GET FAVORITOS SUCCESS';
export const GET_FAVORITOS_FAILED = '[FAVORITO LIST] GET FAVORITOS FAILED';

export const RELOAD_FAVORITOS = '[FAVORITO LIST] RELOAD FAVORITOS';

export const DELETE_FAVORITO = '[FAVORITO LIST] DELETE FAVORITO';
export const DELETE_FAVORITO_SUCCESS = '[FAVORITO LIST] DELETE FAVORITO SUCCESS';
export const DELETE_FAVORITO_FAILED = '[FAVORITO LIST] DELETE FAVORITO FAILED';

export const TOGGLE_FAVORITO_ESPECIE_ATIVIDADE = '[ESPECIE ATIVIDADE LIST] TOGGLE FAVORITO ESPECIE ATIVIDADE';
export const TOGGLE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS = '[ESPECIE ATIVIDADE LIST] TOGGLE FAVORITO ESPECIE ATIVIDADE SUCCESS';
export const TOGGLE_FAVORITO_ESPECIE_ATIVIDADE_FAILED = '[ESPECIE ATIVIDADE LIST] TOGGLE FAVORITO ESPECIE ATIVIDADE FAILED';

export const SAVE_FAVORITO = '[FAVORITO] SAVE FAVORITO';
export const SAVE_FAVORITO_SUCCESS = '[FAVORITO] SAVE FAVORITO SUCCESS';
export const SAVE_FAVORITO_FAILED = '[FAVORITO] SAVE FAVORITO FAILED';

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


/**
 * Toggle Favorito EspecieAtividade Success
 */
export class ToggleFavoritoEspecieSuccess implements Action
{
    readonly type = TOGGLE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Favorito EspecieAtividade Failed
 */
export class ToggleFavoritoEspecieFailed implements Action
{
    readonly type = TOGGLE_FAVORITO_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Favorito EspecieAtividade
 */
export class ToggleFavoritoEspecieAtividade implements Action
{
    readonly type = TOGGLE_FAVORITO_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
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

export type FavoritoListActionsAll
    = GetFavoritos
    | GetFavoritosSuccess
    | GetFavoritosFailed
    | ReloadFavoritos
    | DeleteFavorito
    | DeleteFavoritoSuccess
    | DeleteFavoritoFailed
    | ToggleFavoritoEspecieAtividade
    | ToggleFavoritoEspecieSuccess
    | ToggleFavoritoEspecieFailed
    | SaveFavorito
    | SaveFavoritoSuccess
    | SaveFavoritoFailed;

