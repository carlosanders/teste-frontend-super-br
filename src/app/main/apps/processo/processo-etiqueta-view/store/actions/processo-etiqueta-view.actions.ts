import {Action} from '@ngrx/store';

export const GET_PROCESSO_ETIQUETA = '[PROCESSO ETIQUETA] GET PROCESSO ETIQUETA';
export const GET_PROCESSO_ETIQUETA_SUCCESS = '[PROCESSO ETIQUETA] GET PROCESSO ETIQUETA SUCCESS';
export const GET_PROCESSO_ETIQUETA_FAILED = '[PROCESSO ETIQUETA] GET PROCESSO ETIQUETA FAILED';

/**
 * Get Tramitacao
 */
export class GetProcessoEtiqueta implements Action
{
    readonly type = GET_PROCESSO_ETIQUETA;

    constructor()
    {
    }
}

/**
 * GetGuia Tramitacao Success
 */
export class GetProcessoEtiquetaSuccess implements Action
{
    readonly type = GET_PROCESSO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * GetGuia Tramitacao Failed
 */
export class GetProcessoEtiquetaFailed implements Action
{
    readonly type = GET_PROCESSO_ETIQUETA_FAILED;

    constructor(public payload: string)
    {
    }
}

export type ProcessoEtiquetaViewActionsAll
    = GetProcessoEtiqueta
    | GetProcessoEtiquetaSuccess
    | GetProcessoEtiquetaFailed;
