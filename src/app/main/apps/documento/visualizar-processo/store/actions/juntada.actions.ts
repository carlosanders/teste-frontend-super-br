import {Action} from '@ngrx/store';

export const GET_JUNTADAS_CAPA = '[VISUALIZAR PROCESSO] GET JUNTADAS CAPA';
export const GET_JUNTADAS_CAPA_SUCCESS = '[VISUALIZAR PROCESSO] GET JUNTADAS CAPA SUCCESS';
export const GET_JUNTADAS_CAPA_FAILED = '[VISUALIZAR PROCESSO] GET JUNTADAS CAPA FAILED';
export const UNLOAD_JUNTADAS_CAPA = '[VISUALIZAR PROCESSO] UNLOAD JUNTADAS CAPA';

export class GetJuntadasCapa implements Action
{
    readonly type = GET_JUNTADAS_CAPA;

    constructor(public payload: any)
    {
    }
}

export class GetJuntadasCapaSuccess implements Action
{
    readonly type = GET_JUNTADAS_CAPA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetJuntadasCapaFailed implements Action
{
    readonly type = GET_JUNTADAS_CAPA_FAILED;

    constructor(public payload: string)
    {
    }
}

export class UnloadJuntadasCapa implements Action
{
    readonly type = UNLOAD_JUNTADAS_CAPA;

    constructor(public payload: any)
    {
    }
}

export type JuntadaActionsAll
    = GetJuntadasCapa
    | GetJuntadasCapaSuccess
    | GetJuntadasCapaFailed
    | UnloadJuntadasCapa
;

