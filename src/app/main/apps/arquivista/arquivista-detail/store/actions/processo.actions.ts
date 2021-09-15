import {Action} from '@ngrx/store';

export const EXPANDIR_TELA = '[PROCESSO VIEW] EXPANDIR PROCESSO';

export const SAVE_PROCESSO = '[ARQUIVISTA EDIT] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[ARQUIVISTA EDIT] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[ARQUIVISTA EDIT] SAVE PROCESSO FAILED';

/**
 * Save Processo
 */
export class SaveProcesso implements Action {
    readonly type = SAVE_PROCESSO;

    constructor(public payload: any) {
    }
}

/**
 * Save Processo Success
 */
export class SaveProcessoSuccess implements Action {
    readonly type = SAVE_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Processo Failed
 */
export class SaveProcessoFailed implements Action {
    readonly type = SAVE_PROCESSO_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Expandir Processo
 */
export class ExpandirTela implements Action {
    readonly type = EXPANDIR_TELA;

    constructor(public payload: boolean) {
    }
}

export type ProcessoActionsAll
    = ExpandirTela
    | SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed;
