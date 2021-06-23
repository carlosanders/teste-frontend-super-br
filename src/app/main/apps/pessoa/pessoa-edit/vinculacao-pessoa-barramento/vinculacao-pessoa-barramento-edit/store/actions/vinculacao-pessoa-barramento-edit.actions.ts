import { Action } from '@ngrx/store';

export const CREATE_VINCULACAO_PESSOA_BARRAMENTO = '[VINCULACAO_PESSOA_BARRAMENTO] CREATE VINCULACAO_PESSOA_BARRAMENTO';
export const CREATE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS = '[VINCULACAO_PESSOA_BARRAMENTO] CREATE VINCULACAO_PESSOA_BARRAMENTO SUCCESS';

export const SAVE_VINCULACAO_PESSOA_BARRAMENTO = '[VINCULACAO_PESSOA_BARRAMENTO] SAVE VINCULACAO_PESSOA_BARRAMENTO';
export const SAVE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS = '[VINCULACAO_PESSOA_BARRAMENTO] SAVE VINCULACAO_PESSOA_BARRAMENTO SUCCESS';
export const SAVE_VINCULACAO_PESSOA_BARRAMENTO_FAILED = '[VINCULACAO_PESSOA_BARRAMENTO] SAVE VINCULACAO_PESSOA_BARRAMENTO FAILED';

export const GET_VINCULACAO_PESSOA_BARRAMENTO = '[VINCULACAO_PESSOA_BARRAMENTO] GET VINCULACAO_PESSOA_BARRAMENTO';
export const GET_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS = '[VINCULACAO_PESSOA_BARRAMENTO] GET VINCULACAO_PESSOA_BARRAMENTO SUCCESS';
export const GET_VINCULACAO_PESSOA_BARRAMENTO_FAILED = '[VINCULACAO_PESSOA_BARRAMENTO] GET VINCULACAO_PESSOA_BARRAMENTO FAILED';

/**
 * Get VinculacaoPessoaBarramento
 */
export class GetVinculacaoPessoaBarramento implements Action
{
    readonly type = GET_VINCULACAO_PESSOA_BARRAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoPessoaBarramento Success
 */
export class GetVinculacaoPessoaBarramentoSuccess implements Action
{
    readonly type = GET_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoPessoaBarramento Failed
 */
export class GetVinculacaoPessoaBarramentoFailed implements Action
{
    readonly type = GET_VINCULACAO_PESSOA_BARRAMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save VinculacaoPessoaBarramento
 */
export class SaveVinculacaoPessoaBarramento implements Action
{
    readonly type = SAVE_VINCULACAO_PESSOA_BARRAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save VinculacaoPessoaBarramento Success
 */
export class SaveVinculacaoPessoaBarramentoSuccess implements Action
{
    readonly type = SAVE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save VinculacaoPessoaBarramento Failed
 */
export class SaveVinculacaoPessoaBarramentoFailed implements Action
{
    readonly type = SAVE_VINCULACAO_PESSOA_BARRAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create VinculacaoPessoaBarramento
 */
export class CreateVinculacaoPessoaBarramento implements Action
{
    readonly type = CREATE_VINCULACAO_PESSOA_BARRAMENTO;

    constructor()
    {
    }
}

/**
 * Create VinculacaoPessoaBarramento Success
 */
export class CreateVinculacaoPessoaBarramentoSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type VinculacaoPessoaBarramentoEditActionsAll
    = CreateVinculacaoPessoaBarramento
    | CreateVinculacaoPessoaBarramentoSuccess
    | GetVinculacaoPessoaBarramento
    | GetVinculacaoPessoaBarramentoSuccess
    | GetVinculacaoPessoaBarramentoFailed
    | SaveVinculacaoPessoaBarramento
    | SaveVinculacaoPessoaBarramentoSuccess
    | SaveVinculacaoPessoaBarramentoFailed;
