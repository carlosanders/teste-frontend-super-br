import {Action} from '@ngrx/store';

export const GET_MODALIDADE_TRANSICAO = '[REALIZAR_DESARQUIVAMENTO] GET MODALIDADE TRANSICAO';
export const GET_MODALIDADE_TRANSICAO_SUCCESS = '[REALIZAR_DESARQUIVAMENTO] GET MODALIDADE TRANSICAO SUCCESS';
export const GET_MODALIDADE_TRANSICAO_FAILED = '[REALIZAR_DESARQUIVAMENTO] GET MODALIDADE TRANSICAO FAILED';

/**
 * Get Modalidade Transição
 */
export class GetModalidadeTransicao implements Action {
    readonly type = GET_MODALIDADE_TRANSICAO;

    constructor(public payload: any) {
    }
}

/**
 * Get Modalidade Transição Success
 */
export class GetModalidadeTransicaoSuccess implements Action {
    readonly type = GET_MODALIDADE_TRANSICAO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Modalidade Transição Failed
 */
export class GetModalidadeTransicaoFailed implements Action {
    readonly type = GET_MODALIDADE_TRANSICAO_FAILED;

    constructor(public payload: string) {
    }
}

export type ModalidadeDesarquivamentoActionsAll
    = GetModalidadeTransicao
    | GetModalidadeTransicaoSuccess
    | GetModalidadeTransicaoFailed;
