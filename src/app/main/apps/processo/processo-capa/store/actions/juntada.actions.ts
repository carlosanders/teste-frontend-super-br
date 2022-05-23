import {Action} from '@ngrx/store';

export const GET_JUNTADAS = '[PROCESSO CAPA] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[PROCESSO CAPA] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[PROCESSO CAPA] GET JUNTADAS FAILED';
export const UNLOAD_JUNTADAS = '[PROCESSO CAPA] UNLOAD JUNTADAS';

export class GetJuntadas implements Action
{
    readonly type = GET_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

export class GetJuntadasSuccess implements Action
{
    readonly type = GET_JUNTADAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetJuntadasFailed implements Action
{
    readonly type = GET_JUNTADAS_FAILED;

    constructor(public payload: string)
    {
    }
}

export class UnloadJuntadas implements Action
{
    readonly type = UNLOAD_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

export type JuntadaActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | UnloadJuntadas
;

