import {Action} from '@ngrx/store';

export const CREATE_COMPARTILHAMENTO = '[COMPARTILHAMENTO CREATE BLOCO] CREATE COMPARTILHAMENTO';
export const CREATE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO CREATE BLOCO] CREATE COMPARTILHAMENTO SUCCESS';

export const SAVE_COMPARTILHAMENTO = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO';
export const SAVE_COMPARTILHAMENTO_SUCCESS = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO SUCCESS';
export const SAVE_COMPARTILHAMENTO_FAILED = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO FAILED';

export const SAVE_COMPARTILHAMENTO_SETOR_BLOCO = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO SETOR';
export const SAVE_COMPARTILHAMENTO_SETOR_BLOCO_SUCCESS = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO SETOR SUCCESS';
export const SAVE_COMPARTILHAMENTO_SETOR_BLOCO_FAILED = '[COMPARTILHAMENTO CREATE BLOCO] SAVE COMPARTILHAMENTO SETOR FAILED';

export const GET_LOTACOES_COMPARTILHAMENTO_BLOCO = '[COMPARTILHAMENTO CREATE BLOCO] GET LOTACAO COMPARTILHAMENTO';
export const GET_LOTACOES_COMPARTILHAMENTO_BLOCO_SUCCESS = '[COMPARTILHAMENTO CREATE BLOCO] GET LOTACAO COMPARTILHAMENTO SUCCESS';
export const GET_LOTACOES_COMPARTILHAMENTO_BLOCO_FAILED = '[COMPARTILHAMENTO CREATE BLOCO] GET LOTACAO COMPARTILHAMENTO FAILED';


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

    constructor(public payload: any)
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
export class SaveCompartilhamentoSetorBloco implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SETOR_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Compartilhamento Setor Success
 */
export class SaveCompartilhamentoSetorBlocoSuccess implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SETOR_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Compartilhamento Setor Failed
 */
export class SaveCompartilhamentoSetorBlocoFailed implements Action
{
    readonly type = SAVE_COMPARTILHAMENTO_SETOR_BLOCO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Compartilhamento Setor
 */
export class GetLotacoesCompartilhamentoBloco implements Action
{
    readonly type = GET_LOTACOES_COMPARTILHAMENTO_BLOCO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Compartilhamento Success
 */
export class GetLotacoesCompartilhamentoBlocoSuccess implements Action
{
    readonly type = GET_LOTACOES_COMPARTILHAMENTO_BLOCO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Lotacao Compartilhamento Failed
 */
export class GetLotacoesCompartilhamentoBlocoFailed implements Action
{
    readonly type = GET_LOTACOES_COMPARTILHAMENTO_BLOCO_FAILED;

    constructor(public payload: string)
    {
    }
}


export type CompartilhamentoCreateBlocoActionsAll
    = CreateCompartilhamento
    | CreateCompartilhamentoSuccess
    | SaveCompartilhamento
    | SaveCompartilhamentoSuccess
    | SaveCompartilhamentoFailed
    | SaveCompartilhamentoSetorBloco
    | SaveCompartilhamentoSetorBlocoSuccess
    | SaveCompartilhamentoSetorBlocoFailed
    | GetLotacoesCompartilhamentoBloco
    | GetLotacoesCompartilhamentoBlocoSuccess
    | GetLotacoesCompartilhamentoBlocoFailed;
