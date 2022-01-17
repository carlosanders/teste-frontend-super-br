import {Action} from '@ngrx/store';

export const UNLOAD_ATIVIDADE = '[ATIVIDADE CREATE BLOCO] UNLOAD ATIVIDADE';

export const SAVE_ATIVIDADE = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE';
export const SAVE_ATIVIDADE_SUCCESS = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE SUCCESS';
export const SAVE_ATIVIDADE_FAILED = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE FAILED';

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
 * Unload Atividade
 */
export class UnloadAtividade implements Action
{
    readonly type = UNLOAD_ATIVIDADE;

    constructor()
    {
    }
}

export type AtividadeCreateBlocoActionsAll
    = UnloadAtividade
    | SaveAtividade
    | SaveAtividadeSuccess
    | SaveAtividadeFailed;
