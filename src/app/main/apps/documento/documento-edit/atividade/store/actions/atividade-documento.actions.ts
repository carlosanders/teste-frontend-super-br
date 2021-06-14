import {Action} from '@ngrx/store';

export const CREATE_ATIVIDADE = '[ATIVIDADE DOCUMENTO] CREATE ATIVIDADE';
export const CREATE_ATIVIDADE_SUCCESS = '[ATIVIDADE DOCUMENTO] CREATE ATIVIDADE SUCCESS';

export const SAVE_ATIVIDADE = '[ATIVIDADE DOCUMENTO] SAVE ATIVIDADE';
export const SAVE_ATIVIDADE_SUCCESS = '[ATIVIDADE DOCUMENTO] SAVE ATIVIDADE SUCCESS';
export const SAVE_ATIVIDADE_FAILED = '[ATIVIDADE DOCUMENTO] SAVE ATIVIDADE FAILED';

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

export type AtividadeDocumentoActionsAll
    = CreateAtividade
    | CreateAtividadeSuccess
    | SaveAtividade
    | SaveAtividadeSuccess
    | SaveAtividadeFailed;
