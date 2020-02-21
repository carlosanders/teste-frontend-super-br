import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS_AVULSO = '[DOCUMENTOS_AVULSO] GET DOCUMENTOS_AVULSO';
export const GET_DOCUMENTOS_AVULSO_SUCCESS = '[DOCUMENTOS_AVULSO] GET DOCUMENTOS_AVULSO SUCCESS';
export const GET_DOCUMENTOS_AVULSO_FAILED = '[DOCUMENTOS_AVULSO] GET DOCUMENTOS_AVULSO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS_AVULSO = '[DOCUMENTOS_AVULSO] CHANGE SELECTED DOCUMENTOS AVULSO';

export const DELETE_VINCULACAO_ETIQUETA = '[DOCUMENTOS_AVULSO] DELETE VINCULACAO ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[DOCUMENTOS_AVULSO] DELETE VINCULACAO ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[DOCUMENTOS_AVULSO] DELETE VINCULACAO ETIQUETA FAILED';

export const SET_CURRENT_DOCUMENTOS_AVULSO = '[DOCUMENTOS_AVULSO] SET CURRENT DOCUMENTOS AVULSO';
export const SET_CURRENT_DOCUMENTOS_AVULSO_SUCCESS = '[DOCUMENTOS_AVULSO] SET CURRENT DOCUMENTOS AVULSO SUCCESS';

export const TOGGLE_MAXIMIZADO = '[DOCUMENTOS_AVULSO] TOGGLE MAXIMIZADO';

export const CREATE_VINCULACAO_ETIQUETA = '[DOCUMENTOS_AVULSO] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[DOCUMENTOS_AVULSO] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[DOCUMENTOS_AVULSO] CREATE VINCULACAO ETIQUETA FAILED';

/*
export const CHANGE_SELECTED_TAREFAS = '[TAREFAS] CHANGE SELECTED TAREFAS';
export const TOGGLE_LIDA_TAREFA = '[TAREFAS] TOGGLE LIDA TAREFA';
export const TOGGLE_LIDA_TAREFA_SUCCESS = '[TAREFAS] TOGGLE LIDA TAREFA SUCCESS';
export const TOGGLE_LIDA_TAREFA_FAILED = '[TAREFAS] TOGGLE LIDA TAREFA FAILED';
*/

/**
 *
 * Get DocumentosAvulso
 */
export class GetDocumentosAvulso implements Action {
    readonly type = GET_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Get DocumentosAvulso Success
 */
export class GetDocumentosAvulsoSuccess implements Action {
    readonly type = GET_DOCUMENTOS_AVULSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get DocumentoAvulso Failed
 */
export class GetDocumentosAvulsoFailed implements Action {
    readonly type = GET_DOCUMENTOS_AVULSO_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Select DocumantoAvulso
 */
export class SetCurrentDocumentoAvulso implements Action {
    readonly type = SET_CURRENT_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Select DocumantoAvulso Success
 */
export class SetCurrentDocumantoAvulsoSuccess implements Action {
    readonly type = SET_CURRENT_DOCUMENTOS_AVULSO_SUCCESS;

    constructor() {
    }
}

/**
 * Change Selected DocumentosAvulso
 */
export class ChangeSelectedDocumentosAvulso implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
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

    constructor()
    {
    }
}

// /**
//  * Toggle Lida Tarefa
//  */
// export class ToggleLidaTarefa implements Action
// {
//     readonly type = TOGGLE_LIDA_TAREFA;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Toggle Lida Tarefa Success
//  */
// export class ToggleLidaTarefaSuccess implements Action
// {
//     readonly type = TOGGLE_LIDA_TAREFA_SUCCESS;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Toggle Lida Tarefa Failed
//  */
// export class ToggleLidaTarefaFailed implements Action
// {
//     readonly type = TOGGLE_LIDA_TAREFA_FAILED;
//
//     constructor(public payload: any)
//     {
//     }
// }
//

export type DocumentosAvulsoActionsAll
    = GetDocumentosAvulso
    | GetDocumentosAvulsoSuccess
    | GetDocumentosAvulsoFailed
    | ChangeSelectedDocumentosAvulso
    | SetCurrentDocumentoAvulso
    | SetCurrentDocumantoAvulsoSuccess
    | ToggleMaximizado
    /*| ChangeSelectedTarefas
    | ToggleLidaTarefa
    | ToggleLidaTarefaSuccess
    | ToggleLidaTarefaFailed*/
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed;
