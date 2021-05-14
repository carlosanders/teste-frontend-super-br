import {Action} from '@ngrx/store';

export const UNLOAD_PROCESSOS = '[ARQUIVISTA-LIST] UNLOAD PROCESSOS';

export const GET_PROCESSOS = '[ARQUIVISTA-LIST] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[ARQUIVISTA-LIST] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[ARQUIVISTA-LIST] GET PROCESSOS FAILED';

export const SET_CURRENT_PROCESSO = '[ARQUIVISTA-LIST] SET CURRENT PROCESSO';
export const SET_CURRENT_PROCESSO_SUCCESS = '[ARQUIVISTA-LIST] SET CURRENT PROCESSO SUCCESS';

export const RELOAD_PROCESSOS = '[ARQUIVISTA-LIST] RELOAD PROCESSOS';

export const CHANGE_PROCESSOS = '[ARQUIVISTA-LIST] CHANGE PROCESSOS';
export const CHANGE_SELECTED_PROCESSOS = '[ARQUIVISTA-LIST] CHANGE SELECTED PROCESSOS';

export const TOGGLE_MAXIMIZADO = '[ARQUIVISTA-DETAIL] TOGGLE MAXIMIZADO';

export const CREATE_VINCULACAO_ETIQUETA = '[ARQUIVISTA-LIST] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[ARQUIVISTA-LIST] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[ARQUIVISTA-LIST] CREATE VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[ARQUIVISTA-LIST] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[ARQUIVISTA-LIST] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[ARQUIVISTA-LIST] DELETE VINCULACAO_ETIQUETA FAILED';

/**
 * Unload Processos
 */
export class UnloadProcessos implements Action {
    readonly type = UNLOAD_PROCESSOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processos
 */
export class GetProcessos implements Action {
    readonly type = GET_PROCESSOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processos Success
 */
export class GetProcessosSuccess implements Action {
    readonly type = GET_PROCESSOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processos Failed
 */
export class GetProcessosFailed implements Action {
    readonly type = GET_PROCESSOS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Select Processo
 */
export class SetCurrentProcesso implements Action {
    readonly type = SET_CURRENT_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Select Processo Success
 */
export class SetCurrentProcessoSuccess implements Action {
    readonly type = SET_CURRENT_PROCESSO_SUCCESS;

    constructor() {
    }
}

export class ChangeProcessos implements Action {
    readonly type = CHANGE_PROCESSOS;

    constructor(public payload: any) {
    }
}


/**
 * Change Selected Processos
 */
export class ChangeSelectedProcessos implements Action {
    readonly type = CHANGE_SELECTED_PROCESSOS;

    constructor(public payload: any, public redirect: boolean = true) {
    }
}


/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action
{
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Success
 */
export class CreateVinculacaoEtiquetaSuccess implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Vinculacao Etiqueta Failed
 */
export class CreateVinculacaoEtiquetaFailed implements Action
{
    readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Maximizado
 */
export class ToggleMaximizado implements Action
{
    readonly type = TOGGLE_MAXIMIZADO;

    constructor(public payload: boolean = false)
    {
    }
}

/**
 * Reload Processos
 */
export class ReloadProcessos implements Action {
    readonly type = RELOAD_PROCESSOS;

    constructor() {
    }
}

export type ArquivistaActionsAll
    = UnloadProcessos
    | GetProcessos
    | GetProcessosSuccess
    | GetProcessosFailed
    | SetCurrentProcesso
    | SetCurrentProcessoSuccess
    | ChangeProcessos
    | ChangeSelectedProcessos
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | ToggleMaximizado
    | ReloadProcessos;
