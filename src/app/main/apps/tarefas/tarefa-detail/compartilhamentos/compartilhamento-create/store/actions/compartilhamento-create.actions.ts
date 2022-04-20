import {Action} from '@ngrx/store';

export const CREATE_COMPARTILHAMENTO = '[COMPARTILHAMENTO CREATE] CREATE COMPARTILHAMENTO';
export const CREATE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO CREATE] CREATE COMPARTILHAMENTO SUCCESS';

export const SAVE_COMPARTILHAMENTO = '[COMPARTILHAMENTO CREATE] SAVE COMPARTILHAMENTO';
export const SAVE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO CREATE] SAVE COMPARTILHAMENTO SUCCESS';
export const SAVE_COMPARTILHAMENTO_FAILED = '[COMPARTILHAMENTO CREATE] SAVE COMPARTILHAMENTO FAILED';

export const SAVE_COMPARTILHAMENTO_SETOR = '[COMPARTILHAMENTO CREATE] SAVE COMPARTILHAMENTO SETOR';
export const SAVE_COMPARTILHAMENTO_SETOR_SUCCESS = '[COMPARTILHAMENTO CREATE] SAVE COMPARTILHAMENTO SETOR SUCCESS';
export const SAVE_COMPARTILHAMENTO_SETOR_FAILED = '[COMPARTILHAMENTO CREATE] SAVE COMPARTILHAMENTO SETOR FAILED';

export const GET_LOTACOES_COMPARTILHAMENTO = '[COMPARTILHAMENTO CREATE] GET LOTACAO COMPARTILHAMENTO';
export const GET_LOTACOES_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO CREATE] GET LOTACAO COMPARTILHAMENTO SUCCESS';
export const GET_LOTACOES_COMPARTILHAMENTO_FAILED = '[COMPARTILHAMENTO CREATE] GET LOTACAO COMPARTILHAMENTO FAILED';

/**
 * Save Compartilhamento
 */
export class SaveCompartilhamento implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Compartilhamento Success
 */
export class SaveCompartilhamentoSuccess implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Compartilhamento Failed
 */
export class SaveCompartilhamentoFailed implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Compartilhamento
 */
export class CreateCompartilhamento implements Action
{
    readonly type = CREATE_COMPARTILHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Compartilhamento Success
 */
export class CreateCompartilhamentoSuccess implements Action
{
    readonly type = CREATE_COMPARTILHAMENTO_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Compartilhamento Setor
 */
export class SaveCompartilhamentoSetor implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SETOR;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Compartilhamento Setor Success
 */
export class SaveCompartilhamentoSetorSuccess implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SETOR_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Compartilhamento Setor Failed
 */
export class SaveCompartilhamentoSetorFailed implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SETOR_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Compartilhamento Setor
 */
export class GetLotacoesCompartilhamento implements Action
{
    readonly type = GET_LOTACOES_COMPARTILHAMENTO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Compartilhamento Success
 */
export class GetLotacoesCompartilhamentoSuccess implements Action
{
    readonly type = GET_LOTACOES_COMPARTILHAMENTO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Compartilhamento Failed
 */
export class GetLotacoesCompartilhamentoFailed implements Action
{
    readonly type = GET_LOTACOES_COMPARTILHAMENTO_FAILED;

    constructor(public payload: string)
    {
    }
}


export type CompartilhamentoCreateActionsAll
    = CreateCompartilhamento
    | CreateCompartilhamentoSuccess
    | SaveCompartilhamento
    | SaveCompartilhamentoSuccess
    | SaveCompartilhamentoFailed
    | SaveCompartilhamentoSetor
    | SaveCompartilhamentoSetorSuccess
    | SaveCompartilhamentoSetorFailed
    | GetLotacoesCompartilhamento
    | GetLotacoesCompartilhamentoSuccess
    | GetLotacoesCompartilhamentoFailed;
