import {Action} from '@ngrx/store';

export const GET_ETIQUETAS_PROCESSO = '[ACOMPANHAMENTO LIST] GET ETIQUETAS PROCESSO';
export const GET_ETIQUETAS_PROCESSO_SUCCESS = '[ACOMPANHAMENTO LIST] GET ETIQUETAS PROCESSO SUCCESS';
export const GET_ETIQUETAS_PROCESSO_FAILED = '[ACOMPANHAMENTO LIST] GET ETIQUETAS PROCESSO FAILED';

export class GetEtiquetasProcesso implements Action
{
    readonly type = GET_ETIQUETAS_PROCESSO;

    constructor(public payload: any)
    {
    }
}
export class GetEtiquetasProcessoSuccess implements Action
{
    readonly type = GET_ETIQUETAS_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}
export class GetEtiquetasProcessoFailed implements Action
{
    readonly type = GET_ETIQUETAS_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}


export type EtiquetasActionsAll
    = GetEtiquetasProcesso
    | GetEtiquetasProcessoSuccess
    | GetEtiquetasProcessoFailed;

