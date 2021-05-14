import {Action} from '@ngrx/store';

export const GET_MODALIDADE_TRANSICAO = '[ARQUIVISTA-TRANSICAO-BLOCO] GET MODALIDADE TRANSICAO';
export const GET_MODALIDADE_TRANSICAO_SUCCESS = '[ARQUIVISTA-TRANSICAO-BLOCO] GET MODALIDADE TRANSICAO SUCCESS';
export const GET_MODALIDADE_TRANSICAO_FAILED = '[ARQUIVISTA-TRANSICAO-BLOCO] GET MODALIDADE TRANSICAO FAILED';

export const UNLOAD_MODALIDADE_TRANSICAO = '[ARQUIVISTA-TRANSICAO-BLOCO] UNLOAD MODALIDADE TRANSICAO';

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

/**
 * Unload Modalidade Transicao
 */
export class UnloadModalidadeTransicao implements Action {
    readonly type = UNLOAD_MODALIDADE_TRANSICAO;

    constructor() {
    }
}

export type ModalidadeTransicaoActionsAll
    = GetModalidadeTransicao
    | GetModalidadeTransicaoSuccess
    | GetModalidadeTransicaoFailed
    | UnloadModalidadeTransicao;
