import {Action} from '@ngrx/store';

export const GET_ESPECIE_PROCESSO = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] GET ESPECIE PROCESSO';
export const GET_ESPECIE_PROCESSO_SUCCESS = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] GET ESPECIE PROCESSO SUCCESS';
export const GET_ESPECIE_PROCESSO_FAILED = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] GET ESPECIE PROCESSO FAILED';
export const UPDATE_ESPECIE_PROCESSO = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] UPDATE ESPECIE PROCESSO';
export const UPDATE_ESPECIE_PROCESSO_SUCCESS = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] UPDATE ESPECIE PROCESSO SUCCESS';
export const UPDATE_ESPECIE_PROCESSO_FAILED = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] UPDATE ESPECIE PROCESSO FAILED';
export const RELOAD_ESPECIE_PROCESSO = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] RELOAD ESPECIE PROCESSO';
export const RELOAD_ESPECIE_PROCESSO_SUCCESS = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] RELOAD ESPECIE PROCESSO SUCCESS';
export const RELOAD_ESPECIE_PROCESSO_FAILED = '[ADMIN WORKFLOW ESPECIE PROCESSO EDIT] RELOAD ESPECIE PROCESSO FAILED';

export class GetEspecieProcesso implements Action
{
    readonly type = GET_ESPECIE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

export class GetEspecieProcessoSuccess implements Action
{
    readonly type = GET_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetEspecieProcessoFailed implements Action
{
    readonly type = GET_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UpdateEspecieProcesso implements Action
{
    readonly type = UPDATE_ESPECIE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

export class UpdateEspecieProcessoSuccess implements Action
{
    readonly type = UPDATE_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class UpdateEspecieProcessoFailed implements Action
{
    readonly type = UPDATE_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export class ReloadEspecieProcesso implements Action
{
    readonly type = RELOAD_ESPECIE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

export class ReloadEspecieProcessoSuccess implements Action
{
    readonly type = RELOAD_ESPECIE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class ReloadEspecieProcessoFailed implements Action
{
    readonly type = RELOAD_ESPECIE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

export type WorkflowEspecieProcessoEditActionsAll
    = GetEspecieProcesso
    | GetEspecieProcessoSuccess
    | GetEspecieProcessoFailed
    | UpdateEspecieProcesso
    | UpdateEspecieProcessoSuccess
    | UpdateEspecieProcessoFailed
    | ReloadEspecieProcesso
    | ReloadEspecieProcessoSuccess
    | ReloadEspecieProcessoFailed;
