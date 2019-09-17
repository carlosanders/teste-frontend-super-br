import { Action } from '@ngrx/store';

export const GET_FAVORITO_ESPECIE_TAREFA = '[FAVORITO LIST] GET FAVORITO ESPECIE TAREFA';
export const GET_FAVORITO_ESPECIE_TAREFA_SUCCESS = '[FAVORITO LIST] GET FAVORITO ESPECIE TAREFA SUCCESS';
export const GET_FAVORITO_ESPECIE_TAREFA_FAILED = '[FAVORITO LIST] GET FAVORITO ESPECIE TAREFA FAILED';

export const GET_FAVORITOS_ESPECIE_TAREFA = '[FAVORITO LIST] GET FAVORITOS ESPECIE TAREFA';
export const GET_FAVORITOS_ESPECIE_TAREFA_SUCCESS = '[FAVORITO LIST] GET FAVORITOS ESPECIE TAREFA SUCCESS';
export const GET_FAVORITOS_ESPECIE_TAREFA_FAILED = '[FAVORITO LIST] GET FAVORITOS ESPECIE TAREFA FAILED';

export const RELOAD_FAVORITOS_ESPECIE_TAREFA = '[FAVORITO LIST] RELOAD FAVORITOS ESPECIE TAREFA';

export const DELETE_FAVORITO_ESPECIE_TAREFA = '[FAVORITO LIST] DELETE FAVORITO ESPECIE TAREFA';
export const DELETE_FAVORITO_ESPECIE_TAREFA_SUCCESS = '[FAVORITO LIST] DELETE FAVORITO ESPECIE TAREFA SUCCESS';
export const DELETE_FAVORITO_ESPECIE_TAREFA_FAILED = '[FAVORITO LIST] DELETE FAVORITO ESPECIE TAREFA FAILED';

export const TOGGLE_FAVORITO_ESPECIE_TAREFA = '[FAVORITO LIST] TOGGLE FAVORITO ESPECIE TAREFA';
export const TOGGLE_FAVORITO_ESPECIE_TAREFA_SUCCESS = '[FAVORITO LIST] TOGGLE FAVORITO ESPECIE TAREFA SUCCESS';
export const TOGGLE_FAVORITO_ESPECIE_TAREFA_FAILED = '[FAVORITO LIST] TOGGLE FAVORITO ESPECIE TAREFA FAILED';

export const SAVE_FAVORITO_ESPECIE_TAREFA = '[FAVORITO LIST] SAVE FAVORITO ESPECIE TAREFA';
export const SAVE_FAVORITO_ESPECIE_TAREFA_SUCCESS = '[FAVORITO LIST] SAVE FAVORITO ESPECIE TAREFA SUCCESS';
export const SAVE_FAVORITO_ESPECIE_TAREFA_FAILED = '[FAVORITO LIST] SAVE FAVORITO ESPECIE TAREFA FAILED';

/**
 * Get Favoritos
 */
export class GetFavoritos implements Action
{
    readonly type = GET_FAVORITOS_ESPECIE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Success
 */
export class GetFavoritosSuccess implements Action
{
    readonly type = GET_FAVORITOS_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favoritos Failed
 */
export class GetFavoritosFailed implements Action
{
    readonly type = GET_FAVORITOS_ESPECIE_TAREFA_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Get Favorito
 */
export class GetFavorito implements Action
{
    readonly type = GET_FAVORITO_ESPECIE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Success
 */
export class GetFavoritoSuccess implements Action
{
    readonly type = GET_FAVORITO_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Favorito Failed
 */
export class GetFavoritoFailed implements Action
{
    readonly type = GET_FAVORITO_ESPECIE_TAREFA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Favoritos
 */
export class ReloadFavoritos implements Action
{
    readonly type = RELOAD_FAVORITOS_ESPECIE_TAREFA;

    constructor()
    {
    }
}

/**
 * Delete Favorito
 */
export class DeleteFavorito implements Action
{
    readonly type = DELETE_FAVORITO_ESPECIE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Success
 */
export class DeleteFavoritoSuccess implements Action
{
    readonly type = DELETE_FAVORITO_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Favorito Failed
 */
export class DeleteFavoritoFailed implements Action
{
    readonly type = DELETE_FAVORITO_ESPECIE_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Toggle Favorito EspecieTarefa Success
 */
export class ToggleFavoritoEspecieSuccess implements Action
{
    readonly type = TOGGLE_FAVORITO_ESPECIE_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Favorito EspecieTarefa Failed
 */
export class ToggleFavoritoEspecieFailed implements Action
{
    readonly type = TOGGLE_FAVORITO_ESPECIE_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Favorito EspecieTarefa
 */
export class ToggleFavoritoEspecieTarefa implements Action
{
    readonly type = TOGGLE_FAVORITO_ESPECIE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Favorito
 */
export class SaveFavorito implements Action
{
    readonly type = SAVE_FAVORITO_ESPECIE_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Favorito Success
 */
export class SaveFavoritoSuccess implements Action
{
    readonly type = SAVE_FAVORITO_ESPECIE_TAREFA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Favorito Failed
 */
export class SaveFavoritoFailed implements Action
{
    readonly type = SAVE_FAVORITO_ESPECIE_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type FavoritoListEspecieTarefaActionsAll
    = GetFavoritos
    | GetFavoritosSuccess
    | GetFavoritosFailed
    | ReloadFavoritos
    | DeleteFavorito
    | DeleteFavoritoSuccess
    | DeleteFavoritoFailed
    | ToggleFavoritoEspecieTarefa
    | ToggleFavoritoEspecieSuccess
    | ToggleFavoritoEspecieFailed
    | SaveFavorito
    | SaveFavoritoSuccess
    | SaveFavoritoFailed
    | GetFavorito
    | GetFavoritoSuccess
    | GetFavoritoFailed;

