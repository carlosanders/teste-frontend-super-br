import { Action } from '@ngrx/store';

export const GET_PROCESSO = '[PROCESSO CAPA] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[PROCESSO CAPA] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[PROCESSO CAPA] GET PROCESSO FAILED';

export const GET_ASSUNTOS_PROCESSO = '[PROCESSO CAPA] GET ASSUNTOS PROCESSO';
export const GET_ASSUNTOS_PROCESSO_SUCCESS = '[PROCESSO CAPA] GET ASSUNTOS PROCESSO SUCCESS';
export const GET_ASSUNTOS_PROCESSO_FAILED = '[PROCESSO CAPA] GET ASSUNTOS PROCESSO FAILED';

export const SET_LOADING_ASSUNTOS = '[PROCESSO CAPA] SET LOADING ASSUNTOS';
export const SET_LOADING_ASSUNTOS_SUCCESS = '[PROCESSO CAPA] SET LOADING ASSUNTOS SUCCESS';
export const SET_LOADING_ASSUNTOS_FAILED = '[PROCESSO CAPA] SET LOADING ASSUNTOS FAILED';

export const SET_ASSUNTOS_LOADED = '[PROCESSO CAPA] SET ASSUNTOS LOADED';
export const SET_ASSUNTOS_LOADED_SUCCESS = '[PROCESSO CAPA] SET ASSUNTOS LOADED SUCCESS';
export const SET_ASSUNTOS_LOADED_FAILED = '[PROCESSO CAPA] SET ASSUNTOS LOADED FAILED';

export const GET_INTERESSADOS_PROCESSO = '[PROCESSO CAPA] GET INTERESSADOS PROCESSO';
export const GET_INTERESSADOS_PROCESSO_SUCCESS = '[PROCESSO CAPA] GET INTERESSADOS PROCESSO SUCCESS';
export const GET_INTERESSADOS_PROCESSO_FAILED = '[PROCESSO CAPA] GET INTERESSADOS PROCESSO FAILED';

export const SET_LOADING_INTERESSADOS = '[PROCESSO CAPA] SET LOADING INTERESSADOS';
export const SET_LOADING_INTERESSADOS_SUCCESS = '[PROCESSO CAPA] SET LOADING INTERESSADOS SUCCESS';
export const SET_LOADING_INTERESSADOS_FAILED = '[PROCESSO CAPA] SET LOADING INTERESSADOS FAILED';

export const SET_INTERESSADOS_LOADED = '[PROCESSO CAPA] SET INTERESSADOS LOADED';
export const SET_INTERESSADOS_LOADED_SUCCESS = '[PROCESSO CAPA] SET INTERESSADOS LOADED SUCCESS';
export const SET_INTERESSADOS_LOADED_FAILED = '[PROCESSO CAPA] SET INTERESSADOS LOADED FAILED';

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Assuntos dos processo
 */
export class GetAssuntosProcesso implements Action {
    readonly type = GET_ASSUNTOS_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Get Assuntos dos processo  Success
 */
export class GetAssuntosProcessoSuccess implements Action {
    readonly type = GET_ASSUNTOS_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Assuntos dos processo Failed
 */
export class GetAssuntosProcessoFailed implements Action {
    readonly type = GET_ASSUNTOS_PROCESSO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Seta o estado de carregando os assuntos do processo na tarefa
 */
export class SetLoadingAssuntos implements Action {
    readonly type = SET_LOADING_ASSUNTOS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os assuntos do processo na tarefa - sucesso
 */
export class SetLoadingAssuntosSuccess implements Action {
    readonly type = SET_LOADING_ASSUNTOS_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os assuntos do processo na tarefa - erro
 */
export class SetLoadingAssuntosFailed implements Action {
    readonly type = SET_LOADING_ASSUNTOS_FAILED;

    constructor() {
    }
}

/**
 * Seta o estado de assuntos carregados no processo da tarefa
 */
export class SetAssuntosLoaded implements Action {
    readonly type = SET_ASSUNTOS_LOADED;

    constructor() {
    }
}

/**
 * Seta o estado de assuntos carregados no processo da tarefa - sucesso
 */
export class SetAssuntosLoadedSuccess implements Action {
    readonly type = SET_ASSUNTOS_LOADED_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de assuntos carregados no processo da tarefa - erro
 */
export class SetAssuntosLoadedFailed implements Action {
    readonly type = SET_ASSUNTOS_LOADED_FAILED;

    constructor() {
    }
}


/**
 * Get Interessados dos processo
 */
export class GetInteressadosProcesso implements Action {
    readonly type = GET_INTERESSADOS_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados dos processo  Success
 */
export class GetInteressadosProcessoSuccess implements Action {
    readonly type = GET_INTERESSADOS_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Interessados dos processo Failed
 */
export class GetInteressadosProcessoFailed implements Action {
    readonly type = GET_INTERESSADOS_PROCESSO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Seta o estado de carregando os interessados do processo na tarefa
 */
export class SetLoadingInteressados implements Action {
    readonly type = SET_LOADING_INTERESSADOS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os interessados do processo na tarefa - sucesso
 */
export class SetLoadingInteressadosSuccess implements Action {
    readonly type = SET_LOADING_INTERESSADOS_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de carregando os interessados do processo na tarefa - erro
 */
export class SetLoadingInteressadosFailed implements Action {
    readonly type = SET_LOADING_INTERESSADOS_FAILED;

    constructor() {
    }
}

/**
 * Seta o estado de interessados carregados no processo
 */
export class SetInteressadosLoaded implements Action {
    readonly type = SET_INTERESSADOS_LOADED;

    constructor() {
    }
}

/**
 * Seta o estado de interessados carregados no processo da tarefa - sucesso
 */
export class SetInteressadosLoadedSuccess implements Action {
    readonly type = SET_INTERESSADOS_LOADED_SUCCESS;

    constructor() {
    }
}

/**
 * Seta o estado de interessados carregados no processo - erro
 */
export class SetInteressadosLoadedFailed implements Action {
    readonly type = SET_INTERESSADOS_LOADED_FAILED;

    constructor() {
    }
}

export type ProcessoCapaActionsAll
    = GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | GetAssuntosProcesso
    | GetAssuntosProcessoSuccess
    | GetAssuntosProcessoFailed
    | SetLoadingAssuntos
    | SetLoadingAssuntosSuccess
    | SetLoadingAssuntosFailed
    | SetAssuntosLoaded
    | SetAssuntosLoadedSuccess
    | SetAssuntosLoadedFailed
    | GetInteressadosProcesso
    | GetInteressadosProcessoSuccess
    | GetInteressadosProcessoFailed
    | SetLoadingInteressados
    | SetLoadingInteressadosSuccess
    | SetLoadingInteressadosFailed
    | SetInteressadosLoaded
    | SetInteressadosLoadedSuccess
    | SetInteressadosLoadedFailed;
