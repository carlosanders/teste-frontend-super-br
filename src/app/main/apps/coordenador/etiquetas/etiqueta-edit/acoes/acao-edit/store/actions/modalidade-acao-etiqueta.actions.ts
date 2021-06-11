import {Action} from '@ngrx/store';

export const GET_MODALIDADES_ACAO_ETIQUETA = '[ACAO EDIT COORDENACAO] GET MODALIDADES ACAO ETIQUETA';
export const GET_MODALIDADES_ACAO_ETIQUETA_SUCCESS = '[ACAO EDIT COORDENACAO] GET MODALIDADES ACAO ETIQUETA SUCCESS';
export const GET_MODALIDADES_ACAO_ETIQUETA_FAILED = '[ACAO EDIT COORDENACAO] GET MODALIDADES ACAO ETIQUETA FAILED';

export class GetModalidadesAcaoEtiqueta implements Action
{
    readonly type = GET_MODALIDADES_ACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

export class GetModalidadesAcaoEtiquetaSuccess implements Action
{
    readonly type = GET_MODALIDADES_ACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetModalidadesAcaoEtiquetaFailed implements Action
{
    readonly type = GET_MODALIDADES_ACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

export type ModalidadeAcaoEtiquetaActionsAll
    = GetModalidadesAcaoEtiqueta
    | GetModalidadesAcaoEtiquetaSuccess
    | GetModalidadesAcaoEtiquetaFailed;
