import { Action } from '@ngrx/store';

export const GET_ESPECIES_ATIVIDADES = '[ESPECIE ATIVIDADE LIST] GET ESPECIES ATIVIDADES';
export const GET_ESPECIES_ATIVIDADES_SUCCESS = '[ESPECIE ATIVIDADE LIST] GET ESPECIES ATIVIDADES SUCCESS';
export const GET_ESPECIES_ATIVIDADES_FAILED = '[ESPECIE ATIVIDADE LIST] GET ESPECIES ATIVIDADES FAILED';

export const RELOAD_ESPECIES_ATIVIDADES = '[ESPECIE ATIVIDADE LIST] RELOAD ESPECIES ATIVIDADES';

export const DELETE_ESPECIE_ATIVIDADE = '[ESPECIE ATIVIDADE LIST] DELETE ESPECIE ATIVIDADE';
export const DELETE_ESPECIE_ATIVIDADE_SUCCESS = '[ESPECIE ATIVIDADE LIST] DELETE ESPECIE ATIVIDADE SUCCESS';
export const DELETE_ESPECIE_ATIVIDADE_FAILED = '[ESPECIE ATIVIDADE LIST] DELETE ESPECIE ATIVIDADE FAILED';

export const SAVE_ESPECIE_ATIVIDADE = '[ESPECIE ATIVIDADE LIST] SAVE ESPECIE ATIVIDADE';
export const SET_ESPECIE_ATIVIDADE = '[ESPECIE ATIVIDADE LIST] SET ESPECIE ATIVIDADE';
export const SAVE_ESPECIE_ATIVIDADE_SUCCESS = '[ESPECIE ATIVIDADE LIST] SAVE ESPECIE ATIVIDADE SUCCESS';
export const SAVE_ESPECIE_ATIVIDADE_FAILED = '[ESPECIE ATIVIDADE LIST] SAVE ESPECIE ATIVIDADE FAILED';

/**
 * Get EspeciesAtividades
 */
export class GetEspeciesAtividades implements Action
{
    readonly type = GET_ESPECIES_ATIVIDADES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get EspeciesAtividades Success
 */
export class GetEspeciesAtividadesSuccess implements Action
{
    readonly type = GET_ESPECIES_ATIVIDADES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get EspeciesAtividades Failed
 */
export class GetEspeciesAtividadesFailed implements Action
{
    readonly type = GET_ESPECIES_ATIVIDADES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload EspeciesAtividades
 */
export class ReloadEspeciesAtividades implements Action
{
    readonly type = RELOAD_ESPECIES_ATIVIDADES;

    constructor()
    {
    }
}

/**
 * Delete EspecieAtividade
 */
export class DeleteEspecieAtividade implements Action
{
    readonly type = DELETE_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete EspecieAtividade Success
 */
export class DeleteEspecieAtividadeSuccess implements Action
{
    readonly type = DELETE_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete EspecieAtividade Failed
 */
export class DeleteEspecieAtividadeFailed implements Action
{
    readonly type = DELETE_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: any)
    {
    }
}


/**
 * Set EspecieAtividade
 */
export class SetEspecieAtividade implements Action
{
    readonly type = SET_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save EspecieAtividade
 */
export class SaveEspecieAtividade implements Action
{
    readonly type = SAVE_ESPECIE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save EspecieAtividade Success
 */
export class SaveEspecieAtividadeSuccess implements Action
{
    readonly type = SAVE_ESPECIE_ATIVIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save EspecieAtividade Failed
 */
export class SaveEspecieAtividadeFailed implements Action
{
    readonly type = SAVE_ESPECIE_ATIVIDADE_FAILED;

    constructor(public payload: any)
    {
    }
}

export type EspecieAtividadeListActionsAll
    = GetEspeciesAtividades
    | GetEspeciesAtividadesSuccess
    | GetEspeciesAtividadesFailed
    | ReloadEspeciesAtividades
    | DeleteEspecieAtividade
    | DeleteEspecieAtividadeSuccess
    | DeleteEspecieAtividadeFailed
    | SaveEspecieAtividade
    | SaveEspecieAtividadeFailed
    | SaveEspecieAtividadeSuccess
    | SetEspecieAtividade;

