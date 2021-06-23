import {Action} from '@ngrx/store';

export const GET_VISIBILIDADES_DOCUMENTO = '[DOCUMENTO EDIT VISIBILIDADE] GET VISIBILIDADES';
export const GET_VISIBILIDADES_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT VISIBILIDADE] GET VISIBILIDADES SUCCESS';
export const GET_VISIBILIDADES_DOCUMENTO_FAILED = '[DOCUMENTO EDIT VISIBILIDADE] GET VISIBILIDADES FAILED';

export const RELOAD_VISIBILIDADES_DOCUMENTO = '[DOCUMENTO EDIT VISIBILIDADE] RELOAD VISIBILIDADES';

export const DELETE_VISIBILIDADE_DOCUMENTO = '[DOCUMENTO EDIT VISIBILIDADE] DELETE VISIBILIDADE';
export const DELETE_VISIBILIDADE_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT VISIBILIDADE] DELETE VISIBILIDADE SUCCESS';
export const DELETE_VISIBILIDADE_DOCUMENTO_FAILED = '[DOCUMENTO EDIT VISIBILIDADE] DELETE VISIBILIDADE FAILED';

export const GET_VISIBILIDADE_DOCUMENTO = '[DOCUMENTO EDIT VISIBILIDADE] GET VISIBILIDADE';
export const GET_VISIBILIDADE_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT VISIBILIDADE] GET VISIBILIDADE SUCCESS';
export const GET_VISIBILIDADE_DOCUMENTO_FAILED = '[DOCUMENTO EDIT VISIBILIDADE] GET VISIBILIDADE FAILED';

export const SAVE_VISIBILIDADE_DOCUMENTO = '[DOCUMENTO EDIT VISIBILIDADE] SAVE DOCUMENTO VISIBILIDADE';
export const SAVE_VISIBILIDADE_DOCUMENTO_SUCCESS = '[DOCUMENTO EDIT VISIBILIDADE] SAVE VISIBILIDADE DOCUMENTO SUCCESS';
export const SAVE_VISIBILIDADE_DOCUMENTO_FAILED = '[DOCUMENTO EDIT VISIBILIDADE] SAVE VISIBILIDADE DOCUMENTO FAILED';

/**
 * Get Visibilidades
 */
export class GetVisibilidades implements Action
{
    readonly type = GET_VISIBILIDADES_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Success
 */
export class GetVisibilidadesSuccess implements Action
{
    readonly type = GET_VISIBILIDADES_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Failed
 */
export class GetVisibilidadesFailed implements Action
{
    readonly type = GET_VISIBILIDADES_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Visibilidades
 */
export class ReloadVisibilidades implements Action
{
    readonly type = RELOAD_VISIBILIDADES_DOCUMENTO;

    constructor()
    {
    }
}

/**
 * Delete Visibilidade
 */
export class DeleteVisibilidade implements Action
{
    readonly type = DELETE_VISIBILIDADE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Success
 */
export class DeleteVisibilidadeSuccess implements Action
{
    readonly type = DELETE_VISIBILIDADE_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Visibilidade Failed
 */
export class DeleteVisibilidadeFailed implements Action
{
    readonly type = DELETE_VISIBILIDADE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Visibilidade
 */
export class GetVisibilidade implements Action
{
    readonly type = GET_VISIBILIDADE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Success
 */
export class GetVisibilidadeSuccess implements Action
{
    readonly type = GET_VISIBILIDADE_DOCUMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidade Failed
 */
export class GetVisibilidadeFailed implements Action
{
    readonly type = GET_VISIBILIDADE_DOCUMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}


/**
 * Save VisibilidadeDocumento
 */
export class SaveVisibilidadeDocumento implements Action
{
    readonly type = SAVE_VISIBILIDADE_DOCUMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Visibilidade Success
 */
export class SaveVisibilidadeDocumentoSuccess implements Action
{
    readonly type = SAVE_VISIBILIDADE_DOCUMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Visibilidade Failed
 */
export class SaveVisibilidadeDocumentoFailed implements Action
{
    readonly type = SAVE_VISIBILIDADE_DOCUMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VisibilidadeActionsAll
    = GetVisibilidades
    | GetVisibilidadesSuccess
    | GetVisibilidadesFailed
    | GetVisibilidade
    | GetVisibilidadeSuccess
    | GetVisibilidadeFailed
    | ReloadVisibilidades
    | DeleteVisibilidade
    | DeleteVisibilidadeSuccess
    | DeleteVisibilidadeFailed
    | SaveVisibilidadeDocumento
    | SaveVisibilidadeDocumentoSuccess
    | SaveVisibilidadeDocumentoFailed;

