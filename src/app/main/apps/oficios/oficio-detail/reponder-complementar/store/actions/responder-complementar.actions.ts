import { Action } from '@ngrx/store';

export const CREATE_RESPOSTA = '[RESPOSTA CREATE] CREATE RESPOSTA';
export const CREATE_RESPOSTA_SUCCESS = '[RESPOSTA CREATE] CREATE RESPOSTA SUCCESS';

export const SAVE_RESPOSTA = '[RESPOSTA CREATE] SAVE RESPOSTA';
export const SAVE_RESPOSTA_SUCCESS = '[RESPOSTA CREATE] SAVE RESPOSTA SUCCESS';
export const SAVE_RESPOSTA_FAILED = '[RESPOSTA CREATE] SAVE RESPOSTA FAILED';

export const CREATE_COMPLEMENTAR = '[COMPLEMENTAR CREATE] CREATE COMPLEMENTAR';
export const CREATE_COMPLEMENTAR_SUCCESS = '[COMPLEMENTAR CREATE] CREATE COMPLEMENTAR SUCCESS';

export const SAVE_COMPLEMENTAR = '[COMPLEMENTAR CREATE] SAVE COMPLEMENTAR';
export const SAVE_COMPLEMENTAR_SUCCESS = '[COMPLEMENTAR CREATE] SAVE COMPLEMENTAR SUCCESS';
export const SAVE_COMPLEMENTAR_FAILED = '[COMPLEMENTAR CREATE] SAVE COMPLEMENTAR FAILED';

/**
 * Save Resposta
 */
export class SaveResposta implements Action
{
    readonly type = SAVE_RESPOSTA;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Resposta Success
 */
export class SaveRespostaSuccess implements Action
{
    readonly type = SAVE_RESPOSTA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Resposta Failed
 */
export class SaveRespostaFailed implements Action
{
    readonly type = SAVE_RESPOSTA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Resposta
 */
export class CreateResposta implements Action
{
    readonly type = CREATE_RESPOSTA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Resposta Success
 */
export class CreateRespostaSuccess implements Action
{
    readonly type = CREATE_RESPOSTA_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Complementar
 */
export class SaveComplementar implements Action
{
    readonly type = SAVE_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Complementar Success
 */
export class SaveComplementarSuccess implements Action
{
    readonly type = SAVE_COMPLEMENTAR_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Complementar Failed
 */
export class SaveComplementarFailed implements Action
{
    readonly type = SAVE_COMPLEMENTAR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Complementar
 */
export class CreateComplementar implements Action
{
    readonly type = CREATE_COMPLEMENTAR;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Complementar Success
 */
export class CreateComplementarSuccess implements Action
{
    readonly type = CREATE_COMPLEMENTAR_SUCCESS;

    constructor()
    {
    }
}

export type ResponderComplementarActionsAll
    = CreateResposta
    | CreateRespostaSuccess
    | SaveResposta
    | SaveRespostaSuccess
    | SaveRespostaFailed
    | CreateComplementar
    | CreateComplementarSuccess
    | SaveComplementar
    | SaveComplementarSuccess
    | SaveComplementarFailed;
