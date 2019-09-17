import { Action } from '@ngrx/store';

export const GET_FAVORITO_ESPECIE_ATIVIDADE = '[FAVORITO LIST] GET FAVORITO ESPECIE ATIVIDADE';
export const GET_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS = '[FAVORITO LIST] GET FAVORITO ESPECIE ATIVIDADE SUCCESS';
export const GET_FAVORITO_ESPECIE_ATIVIDADE_FAILED = '[FAVORITO LIST] GET FAVORITO ESPECIE ATIVIDADE FAILED';

export const GET_FAVORITOS_ESPECIE_ATIVIDADE = '[FAVORITO LIST] GET FAVORITOS ESPECIE ATIVIDADE';
export const GET_FAVORITOS_ESPECIE_ATIVIDADE_SUCCESS = '[FAVORITO LIST] GET FAVORITOS ESPECIE ATIVIDADE SUCCESS';
export const GET_FAVORITOS_ESPECIE_ATIVIDADE_FAILED = '[FAVORITO LIST] GET FAVORITOS ESPECIE ATIVIDADE FAILED';

export const RELOAD_FAVORITOS_ESPECIE_ATIVIDADE = '[FAVORITO LIST] RELOAD FAVORITOS ESPECIE ATIVIDADE';

export const DELETE_FAVORITO_ESPECIE_ATIVIDADE = '[FAVORITO LIST] DELETE FAVORITO ESPECIE ATIVIDADE';
export const DELETE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS = '[FAVORITO LIST] DELETE FAVORITO ESPECIE ATIVIDADE SUCCESS';
export const DELETE_FAVORITO_ESPECIE_ATIVIDADE_FAILED = '[FAVORITO LIST] DELETE FAVORITO ESPECIE ATIVIDADE FAILED';

export const TOGGLE_FAVORITO_ESPECIE_ATIVIDADE = '[FAVORITO LIST] TOGGLE FAVORITO ESPECIE ATIVIDADE';
export const TOGGLE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS = '[FAVORITO LIST] TOGGLE FAVORITO ESPECIE ATIVIDADE SUCCESS';
export const TOGGLE_FAVORITO_ESPECIE_ATIVIDADE_FAILED = '[FAVORITO LIST] TOGGLE FAVORITO ESPECIE ATIVIDADE FAILED';

export const SAVE_FAVORITO_ESPECIE_ATIVIDADE = '[FAVORITO LIST] SAVE FAVORITO ESPECIE ATIVIDADE';
export const SAVE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS = '[FAVORITO LIST] SAVE FAVORITO ESPECIE ATIVIDADE SUCCESS';
export const SAVE_FAVORITO_ESPECIE_ATIVIDADE_FAILED = '[FAVORITO LIST] SAVE FAVORITO ESPECIE ATIVIDADE FAILED';

/**
 * Get Favoritos
 */
export class GetFavoritos implements Action
{
    readonly type = GET_FAVORITOS_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Success
 */
export class GetFavoritosSuccess implements Action
{
    readonly type = GET_FAVORITOS_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Failed
 */
export class GetFavoritosFailed implements Action
{
    readonly type = GET_FAVORITOS_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Get Favorito
 */
export class GetFavorito implements Action
{
    readonly type = GET_FAVORITO_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Success
 */
export class GetFavoritoSuccess implements Action
{
    readonly type = GET_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Failed
 */
export class GetFavoritoFailed implements Action
{
    readonly type = GET_FAVORITO_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Favoritos
 */
export class ReloadFavoritos implements Action
{
    readonly type = RELOAD_FAVORITOS_ESPECIE_ATIVIDADE;

    constructor()
    {
    }
}

/**
 * Delete Favorito
 */
export class DeleteFavorito implements Action
{
    readonly type = DELETE_FAVORITO_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Success
 */
export class DeleteFavoritoSuccess implements Action
{
    readonly type = DELETE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Failed
 */
export class DeleteFavoritoFailed implements Action
{
    readonly type = DELETE_FAVORITO_ESPECIE_ATIVIDADE_FAILED;

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
    readonly type = SAVE_FAVORITO_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Favorito Success
 */
export class SaveFavoritoSuccess implements Action
{
    readonly type = SAVE_FAVORITO_ESPECIE_ATIVIDADE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Favorito Failed
 */
export class SaveFavoritoFailed implements Action
{
    readonly type = SAVE_FAVORITO_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: any)
    {
    }
}

export type FavoritoListEspecieAtividadeActionsAll
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
    | SaveFavoritoFailed
    | GetFavorito
    | GetFavoritoSuccess
    | GetFavoritoFailed;

