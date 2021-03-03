import { Action } from '@ngrx/store';

export const GET_MODALIDADE_ACAO_ETIQUETA = '[ACAO TRIGGER] GET MODALIDADE ACAO ETIQUETA';
export const GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS = '[ACAO TRIGGER] GET MODALIDADE ACAO ETIQUETA SUCCESS';
export const GET_MODALIDADE_ACAO_ETIQUETA_FAILED = '[ACAO TRIGGER] GET MODALIDADE ACAO ETIQUETA FAILED';

export class GetModalidadeAcaoEtiqueta implements Action
{
    readonly type = GET_MODALIDADE_ACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

export class GetModalidadeAcaoEtiquetaSuccess implements Action
{
    readonly type = GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetModalidadeAcaoEtiquetaFailed implements Action
{
    readonly type = GET_MODALIDADE_ACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ModalidadeAcaoEtiquetaActionsAll
    = GetModalidadeAcaoEtiqueta
    | GetModalidadeAcaoEtiquetaSuccess
    | GetModalidadeAcaoEtiquetaFailed;
