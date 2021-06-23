import { Action } from '@ngrx/store';

export const GET_VINCULACAO_PESSOA_BARRAMENTOS = '[VINCULACAO_PESSOA_BARRAMENTO LIST] GET VINCULACAO_PESSOA_BARRAMENTOS';
export const GET_VINCULACAO_PESSOA_BARRAMENTOS_SUCCESS = '[VINCULACAO_PESSOA_BARRAMENTO LIST] GET VINCULACAO_PESSOA_BARRAMENTOS SUCCESS';
export const GET_VINCULACAO_PESSOA_BARRAMENTOS_FAILED = '[VINCULACAO_PESSOA_BARRAMENTO LIST] GET VINCULACAO_PESSOA_BARRAMENTOS FAILED';

export const RELOAD_VINCULACAO_PESSOA_BARRAMENTOS = '[VINCULACAO_PESSOA_BARRAMENTO LIST] RELOAD VINCULACAO_PESSOA_BARRAMENTOS';

export const DELETE_VINCULACAO_PESSOA_BARRAMENTO = '[VINCULACAO_PESSOA_BARRAMENTO LIST] DELETE VINCULACAO_PESSOA_BARRAMENTO';
export const DELETE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS = '[VINCULACAO_PESSOA_BARRAMENTO LIST] DELETE VINCULACAO_PESSOA_BARRAMENTO SUCCESS';
export const DELETE_VINCULACAO_PESSOA_BARRAMENTO_FAILED = '[VINCULACAO_PESSOA_BARRAMENTO LIST] DELETE VINCULACAO_PESSOA_BARRAMENTO FAILED';

/**
 * Get VinculacaoPessoaBarramentos
 */
export class GetVinculacaoPessoaBarramentos implements Action
{
    readonly type = GET_VINCULACAO_PESSOA_BARRAMENTOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoPessoaBarramentos Success
 */
export class GetVinculacaoPessoaBarramentosSuccess implements Action
{
    readonly type = GET_VINCULACAO_PESSOA_BARRAMENTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get VinculacaoPessoaBarramentos Failed
 */
export class GetVinculacaoPessoaBarramentosFailed implements Action
{
    readonly type = GET_VINCULACAO_PESSOA_BARRAMENTOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload VinculacaoPessoaBarramentos
 */
export class ReloadVinculacaoPessoaBarramentos implements Action
{
    readonly type = RELOAD_VINCULACAO_PESSOA_BARRAMENTOS;

    constructor()
    {
    }
}

/**
 * Delete VinculacaoPessoaBarramento
 */
export class DeleteVinculacaoPessoaBarramento implements Action
{
    readonly type = DELETE_VINCULACAO_PESSOA_BARRAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoPessoaBarramento Success
 */
export class DeleteVinculacaoPessoaBarramentoSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_PESSOA_BARRAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete VinculacaoPessoaBarramento Failed
 */
export class DeleteVinculacaoPessoaBarramentoFailed implements Action
{
    readonly type = DELETE_VINCULACAO_PESSOA_BARRAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VinculacaoPessoaBarramentoListActionsAll
    = GetVinculacaoPessoaBarramentos
    | GetVinculacaoPessoaBarramentosSuccess
    | GetVinculacaoPessoaBarramentosFailed
    | ReloadVinculacaoPessoaBarramentos
    | DeleteVinculacaoPessoaBarramento
    | DeleteVinculacaoPessoaBarramentoSuccess
    | DeleteVinculacaoPessoaBarramentoFailed;

