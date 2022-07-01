import {Action} from '@ngrx/store';

export const GET_PROCESSO_EXISTENTE = '[PROTOCOLO EXISTENTE] GET PROCESSO EXISTENTE';
export const GET_PROCESSO_EXISTENTE_SUCCESS = '[PROTOCOLO EXISTENTE] GET PROCESSO EXISTENTE SUCCESS';
export const GET_PROCESSO_EXISTENTE_FAILED = '[PROTOCOLO EXISTENTE] GET PROCESSO EXISTENTE FAILED';

export const GET_VISIBILIDADES_PROCESSO_TAREFA = '[PROTOCOLO VISIBILIDADE] GET VISIBILIDADES';
export const GET_VISIBILIDADES_PROCESSO_TAREFA_SUCCESS = '[PROTOCOLO VISIBILIDADE] GET VISIBILIDADES SUCCESS';
export const GET_VISIBILIDADES_PROCESSO_TAREFA_FAILED = '[PROTOCOLO VISIBILIDADE] GET VISIBILIDADES FAILED';

export const UNLOAD_PROCESSO_EXISTENTE = '[PROTOCOLO EXISTENTE] UNLOAD PROCESSO EXISTENTE';

/**
 * Get Processo
 */
export class GetProcessoExistente implements Action
{
    readonly type = GET_PROCESSO_EXISTENTE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoExistenteSuccess implements Action
{
    readonly type = GET_PROCESSO_EXISTENTE_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoExistenteFailed implements Action
{
    readonly type = GET_PROCESSO_EXISTENTE_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Visibilidades
 */
export class GetVisibilidades implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_TAREFA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Success
 */
export class GetVisibilidadesSuccess implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Visibilidades Failed
 */
export class GetVisibilidadesFailed implements Action
{
    readonly type = GET_VISIBILIDADES_PROCESSO_TAREFA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Processo
 */
export class UnloadProcessoExistente implements Action
{
    readonly type = UNLOAD_PROCESSO_EXISTENTE;

    constructor()
    {
    }
}

export type ProcessoActionsAll
    = GetProcessoExistente
    | GetProcessoExistenteSuccess
    | GetProcessoExistenteFailed
    | GetVisibilidades
    | GetVisibilidadesSuccess
    | GetVisibilidadesFailed
    | UnloadProcessoExistente;
