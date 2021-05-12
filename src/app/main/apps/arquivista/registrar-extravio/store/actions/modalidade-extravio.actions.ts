import {Action} from '@ngrx/store';

export const GET_MODALIDADE_TRANSICAO = '[REGISTRAR_EXTRAVIO] GET MODALIDADE TRANSICAO';
export const GET_MODALIDADE_TRANSICAO_SUCCESS = '[REGISTRAR_EXTRAVIO] GET MODALIDADE TRANSICAO SUCCESS';
export const GET_MODALIDADE_TRANSICAO_FAILED = '[REGISTRAR_EXTRAVIO] GET MODALIDADE TRANSICAO FAILED';

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

export type ModalidadeExtravioActionsAll
    = GetModalidadeTransicao
    | GetModalidadeTransicaoSuccess
    | GetModalidadeTransicaoFailed;
