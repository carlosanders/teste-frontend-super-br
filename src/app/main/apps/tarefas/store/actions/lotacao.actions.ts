import {Action} from '@ngrx/store';

export const GET_LOTACOES = '[TAREFA LOTACAO LIST] GET LOTACOES';
export const GET_LOTACOES_SUCCESS = '[TAREFA LOTACAO LIST] GET LOTACOES SUCCESS';
export const GET_LOTACOES_FAILED = '[TAREFA LOTACAO LIST] GET LOTACOES FAILED';

export const RELOAD_LOTACOES = '[TAREFA LOTACAO LIST] RELOAD LOTACOES';

export const UNLOAD_LOTACOES = '[TAREFA LOTACAO LIST] UNLOAD LOTACOES';


/**
 * Get Lotacoes
 */
export class GetLotacoes implements Action {
    readonly type = GET_LOTACOES;

    constructor(public payload: any) {
    }
}

/**
 * Get Lotacoes Success
 */
export class GetLotacoesSuccess implements Action {
    readonly type = GET_LOTACOES_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Lotacoes Failed
 */
export class GetLotacoesFailed implements Action {
    readonly type = GET_LOTACOES_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Reload Lotacoes
 */
export class ReloadLotacoes implements Action {
    readonly type = RELOAD_LOTACOES;

    constructor() {
    }
}

/**
 * Unload Lotacoes
 */
export class UnloadLotacoes implements Action {
    readonly type = UNLOAD_LOTACOES;

    constructor() {
    }
}


export type RootLotacaoListActionsAll
    = GetLotacoes
    | GetLotacoesSuccess
    | GetLotacoesFailed
    | ReloadLotacoes
    | UnloadLotacoes;

