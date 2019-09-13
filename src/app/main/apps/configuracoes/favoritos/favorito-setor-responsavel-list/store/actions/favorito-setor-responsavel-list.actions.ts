import { Action } from '@ngrx/store';

export const GET_FAVORITO_SETOR_RESPONSAVEL = '[FAVORITO LIST] GET FAVORITO SETOR RESPONSAVEL';
export const GET_FAVORITO_SETOR_RESPONSAVEL_SUCCESS = '[FAVORITO LIST] GET FAVORITO SETOR RESPONSAVEL SUCCESS';
export const GET_FAVORITO_SETOR_RESPONSAVEL_FAILED = '[FAVORITO LIST] GET FAVORITO SETOR RESPONSAVEL FAILED';

export const GET_FAVORITOS_SETOR_RESPONSAVEL = '[FAVORITO LIST] GET FAVORITOS SETOR RESPONSAVEL';
export const GET_FAVORITOS_SETOR_RESPONSAVEL_SUCCESS = '[FAVORITO LIST] GET FAVORITOS SETOR RESPONSAVEL SUCCESS';
export const GET_FAVORITOS_SETOR_RESPONSAVEL_FAILED = '[FAVORITO LIST] GET FAVORITOS SETOR RESPONSAVEL FAILED';

export const RELOAD_FAVORITOS_SETOR_RESPONSAVEL = '[FAVORITO LIST] RELOAD FAVORITOS SETOR RESPONSAVEL';

export const DELETE_FAVORITO_SETOR_RESPONSAVEL = '[FAVORITO LIST] DELETE FAVORITO SETOR RESPONSAVEL';
export const DELETE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS = '[FAVORITO LIST] DELETE FAVORITO SETOR RESPONSAVEL SUCCESS';
export const DELETE_FAVORITO_SETOR_RESPONSAVEL_FAILED = '[FAVORITO LIST] DELETE FAVORITO SETOR RESPONSAVEL FAILED';

export const TOGGLE_FAVORITO_SETOR_RESPONSAVEL = '[FAVORITO LIST] TOGGLE FAVORITO SETOR RESPONSAVEL';
export const TOGGLE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS = '[FAVORITO LIST] TOGGLE FAVORITO SETOR RESPONSAVEL SUCCESS';
export const TOGGLE_FAVORITO_SETOR_RESPONSAVEL_FAILED = '[FAVORITO LIST] TOGGLE FAVORITO SETOR RESPONSAVEL FAILED';

export const SAVE_FAVORITO_SETOR_RESPONSAVEL = '[FAVORITO LIST] SAVE FAVORITO SETOR RESPONSAVEL';
export const SAVE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS = '[FAVORITO LIST] SAVE FAVORITO SETOR RESPONSAVEL SUCCESS';
export const SAVE_FAVORITO_SETOR_RESPONSAVEL_FAILED = '[FAVORITO LIST] SAVE FAVORITO SETOR RESPONSAVEL FAILED';

/**
 * Get Favoritos
 */
export class GetFavoritos implements Action
{
    readonly type = GET_FAVORITOS_SETOR_RESPONSAVEL;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Success
 */
export class GetFavoritosSuccess implements Action
{
    readonly type = GET_FAVORITOS_SETOR_RESPONSAVEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Failed
 */
export class GetFavoritosFailed implements Action
{
    readonly type = GET_FAVORITOS_SETOR_RESPONSAVEL_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Get Favorito
 */
export class GetFavorito implements Action
{
    readonly type = GET_FAVORITO_SETOR_RESPONSAVEL;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Success
 */
export class GetFavoritoSuccess implements Action
{
    readonly type = GET_FAVORITO_SETOR_RESPONSAVEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Failed
 */
export class GetFavoritoFailed implements Action
{
    readonly type = GET_FAVORITO_SETOR_RESPONSAVEL_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Favoritos
 */
export class ReloadFavoritos implements Action
{
    readonly type = RELOAD_FAVORITOS_SETOR_RESPONSAVEL;

    constructor()
    {
    }
}

/**
 * Delete Favorito
 */
export class DeleteFavorito implements Action
{
    readonly type = DELETE_FAVORITO_SETOR_RESPONSAVEL;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Success
 */
export class DeleteFavoritoSuccess implements Action
{
    readonly type = DELETE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Failed
 */
export class DeleteFavoritoFailed implements Action
{
    readonly type = DELETE_FAVORITO_SETOR_RESPONSAVEL_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Toggle Favorito SetorResponsavel Success
 */
export class ToggleFavoritoSetorSuccess implements Action
{
    readonly type = TOGGLE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Favorito SetorResponsavel Failed
 */
export class ToggleFavoritoSetorFailed implements Action
{
    readonly type = TOGGLE_FAVORITO_SETOR_RESPONSAVEL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Favorito SetorResponsavel
 */
export class ToggleFavoritoSetorResponsavel implements Action
{
    readonly type = TOGGLE_FAVORITO_SETOR_RESPONSAVEL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Favorito
 */
export class SaveFavorito implements Action
{
    readonly type = SAVE_FAVORITO_SETOR_RESPONSAVEL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Favorito Success
 */
export class SaveFavoritoSuccess implements Action
{
    readonly type = SAVE_FAVORITO_SETOR_RESPONSAVEL_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Favorito Failed
 */
export class SaveFavoritoFailed implements Action
{
    readonly type = SAVE_FAVORITO_SETOR_RESPONSAVEL_FAILED;

    constructor(public payload: any)
    {
    }
}

export type FavoritoListSetorResponsavelActionsAll
    = GetFavoritos
    | GetFavoritosSuccess
    | GetFavoritosFailed
    | ReloadFavoritos
    | DeleteFavorito
    | DeleteFavoritoSuccess
    | DeleteFavoritoFailed
    | ToggleFavoritoSetorResponsavel
    | ToggleFavoritoSetorSuccess
    | ToggleFavoritoSetorFailed
    | SaveFavorito
    | SaveFavoritoSuccess
    | SaveFavoritoFailed
    | GetFavorito
    | GetFavoritoSuccess
    | GetFavoritoFailed;

