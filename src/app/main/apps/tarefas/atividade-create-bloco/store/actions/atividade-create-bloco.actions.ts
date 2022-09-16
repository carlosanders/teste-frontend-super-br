import {Action} from '@ngrx/store';

export const UNLOAD_ATIVIDADE = '[ATIVIDADE CREATE BLOCO] UNLOAD ATIVIDADE';

export const SAVE_ATIVIDADE = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE';
export const SAVE_ATIVIDADE_SUCCESS = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE SUCCESS';
export const SAVE_ATIVIDADE_FAILED = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE FAILED';

export const SAVE_ATIVIDADES_LINEARES = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADES LINEARES';
export const SAVE_ATIVIDADES_LINEARES_SUCCESS = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADES LINEARES SUCCESS';
export const SAVE_ATIVIDADES_LINEARES_FAILED = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADES LINEARES FAILED';

export const SAVE_ATIVIDADE_LINEAR = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE LINEAR';
export const SAVE_ATIVIDADE_LINEAR_SUCCESS = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE LINEAR SUCCESS';
export const SAVE_ATIVIDADE_LINEAR_FAILED = '[ATIVIDADE CREATE BLOCO] SAVE ATIVIDADE LINEAR FAILED';

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
 * Save Atividades Lineares
 */
export class SaveAtividadesLineares implements Action
{
    readonly type = SAVE_ATIVIDADES_LINEARES;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Atividades Lineares Success
 */
export class SaveAtividadesLinearesSuccess implements Action
{
    readonly type = SAVE_ATIVIDADES_LINEARES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Atividades Lineares Failed
 */
export class SaveAtividadesLinearesFailed implements Action
{
    readonly type = SAVE_ATIVIDADES_LINEARES_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Atividade Linear
 */
export class SaveAtividadeLinear implements Action
{
    readonly type = SAVE_ATIVIDADE_LINEAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Atividade Linear Success
 */
export class SaveAtividadeLinearSuccess implements Action
{
    readonly type = SAVE_ATIVIDADE_LINEAR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Atividade Linear Failed
 */
export class SaveAtividadeLinearFailed implements Action
{
    readonly type = SAVE_ATIVIDADE_LINEAR_FAILED;

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
    | SaveAtividadeFailed
    | SaveAtividadeLinear
    | SaveAtividadeLinearSuccess
    | SaveAtividadeLinearFailed
    | SaveAtividadesLineares
    | SaveAtividadesLinearesSuccess
    | SaveAtividadesLinearesFailed;
