import { Action } from '@ngrx/store';

export const SET_PROCESSO = '[DADOS BASICOS] SET PROCESSO';
export const GET_PROCESSO = '[DADOS BASICOS] GET PROCESSO';
export const UNLOAD_PROCESSO = '[DADOS BASICOS] UNLOAD PROCESSO';
export const GET_PROCESSO_SUCCESS = '[DADOS BASICOS] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[DADOS BASICOS] GET PROCESSO FAILED';
export const CREATE_PROCESSO = '[DADOS BASICOS] CREATE PROCESSO';
export const CREATE_PROCESSO_SUCCESS = '[DADOS BASICOS] CREATE PROCESSO SUCCESS';
export const SAVE_PROCESSO = '[DADOS BASICOS] SAVE PROCESSO';
export const POST_PROCESSO = '[DADOS BASICOS] POST PROCESSO';
export const PUT_PROCESSO = '[DADOS BASICOS] PUT PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[DADOS BASICOS] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[DADOS BASICOS] SAVE PROCESSO FAILED';
export const POST_PROCESSO_SUCCESS = '[DADOS BASICOS] POST PROCESSO SUCCESS';
export const POST_PROCESSO_FAILED = '[DADOS BASICOS] POST PROCESSO FAILED';
export const PUT_PROCESSO_SUCCESS = '[DADOS BASICOS] PUT PROCESSO SUCCESS';
export const PUT_PROCESSO_FAILED = '[DADOS BASICOS] PUT PROCESSO FAILED';


/**
 * Set Processo
 */
export class SetProcesso implements Action
{
    readonly type = SET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}


/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }

}

/**
 * Save Processo
 */
export class SaveProcesso implements Action
{
    readonly type = SAVE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Post Processo
 */
export class PostProcesso implements Action
{
    readonly type = POST_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Post Processo
 */
export class PutProcesso implements Action
{
    readonly type = PUT_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Success
 */
export class SaveProcessoSuccess implements Action
{
    readonly type = SAVE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Put Processo Success
 */
export class PutProcessoSuccess implements Action
{
    readonly type = PUT_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Post Processo Success
 */
export class PostProcessoSuccess implements Action
{
    readonly type = POST_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Failed
 */
export class SaveProcessoFailed implements Action
{
    readonly type = SAVE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Post Processo Failed
 */
export class PostProcessoFailed implements Action
{
    readonly type = POST_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Put Processo Failed
 */
export class PutProcessoFailed implements Action
{
    readonly type = PUT_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Processo
 */
export class CreateProcesso implements Action
{
    readonly type = CREATE_PROCESSO;

    constructor()
    {
    }
}

/**
 * Unload Processo
 */
export class UnloadProcesso implements Action
{
    readonly type = UNLOAD_PROCESSO;

    constructor()
    {
    }
}

/**
 * Create Processo Success
 */
export class CreateProcessoSuccess implements Action
{
    readonly type = CREATE_PROCESSO_SUCCESS;

    constructor()
    {
    }
}

export type DadosBasicosActionsAll
    = SetProcesso
    | UnloadProcesso
    | PostProcesso
    | PutProcesso
    | GetProcesso     
    | GetProcessoSuccess
    | GetProcessoFailed
    | CreateProcesso
    | CreateProcessoSuccess
    | SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed
    | PutProcessoSuccess
    | PutProcessoFailed
    | PostProcessoSuccess
    | PostProcessoFailed;

