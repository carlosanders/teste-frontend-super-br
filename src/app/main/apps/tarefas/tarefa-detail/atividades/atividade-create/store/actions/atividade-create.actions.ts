import {Action} from '@ngrx/store';

export const CREATE_ATIVIDADE = '[ATIVIDADE CREATE] CREATE ATIVIDADE';
export const CREATE_ATIVIDADE_SUCCESS = '[ATIVIDADE CREATE] CREATE ATIVIDADE SUCCESS';

export const SAVE_ATIVIDADE = '[ATIVIDADE CREATE] SAVE ATIVIDADE';
export const SAVE_ATIVIDADE_SUCCESS = '[ATIVIDADE CREATE] SAVE ATIVIDADE SUCCESS';
export const SAVE_ATIVIDADE_FAILED = '[ATIVIDADE CREATE] SAVE ATIVIDADE FAILED';

export const UNLOAD_ATIVIDADE = '[ATIVIDADE CREATE] UNLOAD ATIVIDADE';

/**
 * Save Atividade
 */
export class SaveAtividade implements Action
{
    readonly type = SAVE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Atividade Success
 */
export class SaveAtividadeSuccess implements Action
{
    readonly type = SAVE_ATIVIDADE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Atividade Failed
 */
export class SaveAtividadeFailed implements Action
{
    readonly type = SAVE_ATIVIDADE_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Atividade
 */
export class CreateAtividade implements Action
{
    readonly type = CREATE_ATIVIDADE;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Atividade Success
 */
export class CreateAtividadeSuccess implements Action
{
    readonly type = CREATE_ATIVIDADE_SUCCESS;

    constructor()
    {
    }
}

/**
 * Unload Atividade
 */
export class UnloadAtividade implements Action
{
    readonly type = UNLOAD_ATIVIDADE;

    constructor()
    {
    }
}

export type AtividadeCreateActionsAll
    = CreateAtividade
    | CreateAtividadeSuccess
    | SaveAtividade
    | SaveAtividadeSuccess
    | SaveAtividadeFailed
    | UnloadAtividade;
