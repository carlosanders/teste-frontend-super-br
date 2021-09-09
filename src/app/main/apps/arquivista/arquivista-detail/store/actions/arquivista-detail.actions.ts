import {Action} from '@ngrx/store';

export const CREATE_VINCULACAO_ETIQUETA = '[ARQUIVISTA-DETAIL] VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[ARQUIVISTA-DETAIL] VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[ARQUIVISTA-DETAIL] VINCULACAO ETIQUETA FAILED';

export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA = '[ARQUIVISTA-DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS = '[ARQUIVISTA-DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA SUCCESS';
export const SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED = '[ARQUIVISTA-DETAIL] SAVE CONTEUDO VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[ARQUIVISTA-DETAIL] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[ARQUIVISTA-DETAIL] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[ARQUIVISTA-DETAIL] DELETE VINCULACAO_ETIQUETA FAILED';

export const TOGGLE_MAXIMIZADO = '[ARQUIVISTA-DETAIL] TOGGLE MAXIMIZADO';

export const DESELECT_TAREFA_ACTION = '[ARQUIVISTA-DETAIL] DESELECT TAREFA ACTION';

/**
 * Create Vinculacao Etiqueta
 */
export class CreateVinculacaoEtiqueta implements Action {
    readonly type = CREATE_VINCULACAO_ETIQUETA;

    constructor(public payload: any) {
    }
}


/**
 * Save Conteudo Vinculacao Etiqueta
 */
export class SaveConteudoVinculacaoEtiqueta implements Action {
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Success
 */
export class SaveConteudoVinculacaoEtiquetaSuccess implements Action {
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Save Conteudo Vinculacao Etiqueta Failed
 */
export class SaveConteudoVinculacaoEtiquetaFailed implements Action {
    readonly type = SAVE_CONTEUDO_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta
 */
export class DeleteVinculacaoEtiqueta implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta Success
 */
export class DeleteVinculacaoEtiquetaSuccess implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Vinculacao Etiqueta Failed
 */
export class DeleteVinculacaoEtiquetaFailed implements Action {
    readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Maximizado
 */
export class ToggleMaximizado implements Action {
    readonly type = TOGGLE_MAXIMIZADO;

    constructor(public payload: boolean = false) {
    }
}

/**
 * Deselect Tarefa Action
 */
export class DeselectTarefaAction implements Action {
    readonly type = DESELECT_TAREFA_ACTION;

    constructor() {
    }
}

export type ArquivistaDetailActionsAll
    = SaveConteudoVinculacaoEtiqueta
    | SaveConteudoVinculacaoEtiquetaFailed
    | SaveConteudoVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiqueta
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiquetaSuccess
    | ToggleMaximizado;

