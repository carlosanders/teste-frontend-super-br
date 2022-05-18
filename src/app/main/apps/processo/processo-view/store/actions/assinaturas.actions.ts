import {Action} from '@ngrx/store';

export const GET_ASSINATURAS = '[PROCESSO VIEW] GET ASSINATURAS';
export const GET_ASSINATURAS_SUCCESS = '[PROCESSO VIEW] GET ASSINATURAS SUCCESS';
export const GET_ASSINATURAS_FAILED = '[PROCESSO VIEW] GET ASSINATURAS FAILED';

export const RELOAD_ASSINATURAS = '[PROCESSO VIEW] RELOAD ASSINATURAS';

export class GetAssinaturas implements Action
{
    readonly type = GET_ASSINATURAS;

    constructor(public payload: any)
    {
    }
}

export class GetAssinaturasSuccess implements Action
{
    readonly type = GET_ASSINATURAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetAssinaturasFailed implements Action
{
    readonly type = GET_ASSINATURAS_FAILED;

    constructor(public payload: any)
    {
    }
}

export class ReloadAssinaturas implements Action
{
    readonly type = RELOAD_ASSINATURAS;

    constructor(public payload: any)
    {
    }
}

export type AssinaturasActionsAll
    = GetAssinaturas
    | GetAssinaturasSuccess
    | GetAssinaturasFailed
    | ReloadAssinaturas
;
