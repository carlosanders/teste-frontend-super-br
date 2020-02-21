import { Action } from '@ngrx/store';

export const GET_DOCUMENTOS_AVULSO = '[DOCUMENTOS_AVULSO] GET DOCUMENTOS_AVULSO';
export const GET_DOCUMENTOS_AVULSO_SUCCESS = '[DOCUMENTOS_AVULSO] GET DOCUMENTOS_AVULSO SUCCESS';
export const GET_DOCUMENTOS_AVULSO_FAILED = '[DOCUMENTOS_AVULSO] GET DOCUMENTOS_AVULSO FAILED';

export const CHANGE_SELECTED_DOCUMENTOS_AVULSO = '[DOCUMENTOS_AVULSO] CHANGE SELECTED DOCUMENTOS_AVULSO';

export const DELETE_DOCUMENTOS_AVULSO = '[DOCUMENTOS_AVULSO] DELETE DOCUMENTOS_AVULSO';
export const DELETE_DOCUMENTOS_AVULSO_SUCCESS = '[DOCUMENTOS_AVULSO] DELETE DOCUMENTOS_AVULSO SUCCESS';
export const DELETE_DOCUMENTOS_AVULSO_FAILED = '[DOCUMENTOS_AVULSO] DELETE DOCUMENTOS_AVULSO FAILED';

export const SET_CURRENT_DOCUMENTOS_AVULSO = '[DOCUMENTOS_AVULSO] SET CURRENT DOCUMENTOS_AVULSO';
export const SET_CURRENT_DOCUMENTOS_AVULSO_SUCCESS = '[DOCUMENTOS_AVULSO] SET CURRENT DOCUMENTOS_AVULSO SUCCESS';

export const TOGGLE_MAXIMIZADO = '[DOCUMENTOS_AVULSO] TOGGLE MAXIMIZADO';

/*

export const CREATE_TAREFA = '[TAREFAS] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[TAREFAS] CREATE TAREFA SUCCESS';

export const DELETE_TAREFA = '[TAREFAS] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[TAREFAS] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[TAREFAS] DELETE TAREFA FAILED';

export const CHANGE_SELECTED_TAREFAS = '[TAREFAS] CHANGE SELECTED TAREFAS';



export const TOGGLE_LIDA_TAREFA = '[TAREFAS] TOGGLE LIDA TAREFA';
export const TOGGLE_LIDA_TAREFA_SUCCESS = '[TAREFAS] TOGGLE LIDA TAREFA SUCCESS';
export const TOGGLE_LIDA_TAREFA_FAILED = '[TAREFAS] TOGGLE LIDA TAREFA FAILED';

export const TOGGLE_URGENTE_TAREFA = '[TAREFAS] TOGGLE URGENTE TAREFA';
export const TOGGLE_URGENTE_TAREFA_SUCCESS = '[TAREFAS] TOGGLE URGENTE TAREFA SUCCESS';
export const TOGGLE_URGENTE_TAREFA_FAILED = '[TAREFAS] TOGGLE URGENTE TAREFA FAILED';

export const SET_FOLDER_ON_SELECTED_TAREFAS = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS';
export const SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS SUCCESS';
export const SET_FOLDER_ON_SELECTED_TAREFAS_FAILED = '[TAREFAS] SET FOLDER ON SELECTED TAREFAS FAILED';

export const SAVE_TAREFA = '[TAREFA] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[TAREFA] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[TAREFA] SAVE TAREFA FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[TAREFA] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA] CREATE VINCULACAO ETIQUETA FAILED';



/**
 * Get Tarefas
 */
export class GetDocumentosAvulso implements Action {
    readonly type = GET_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Success
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
//
// /**
//  * Creat Tarefa
//  */
// export class CreateTarefa implements Action {
//     readonly type = CREATE_TAREFA;
//
//     constructor() {
//     }
// }
//
// /**
//  * Creat Tarefa Success
//  */
// export class CreateTarefaSuccess implements Action {
//     readonly type = CREATE_TAREFA_SUCCESS;
//
//     constructor() {
//     }
// }
//
/**
 * Change Selected DocumentosAvulso
 */
export class ChangeSelectedDocumentosAvulso implements Action {
    readonly type = CHANGE_SELECTED_DOCUMENTOS_AVULSO;

    constructor(public payload: any) {
    }
}

/**
 * Delete Tarefa
 */
export class DeleteDocumentoAvulso implements Action
{
    readonly type = DELETE_DOCUMENTOS_AVULSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tarefa Success
 */
export class DeleteDocumentoAvulsoSuccess implements Action
{
    readonly type = DELETE_DOCUMENTOS_AVULSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Tarefa Failed
 */
export class DeleteDocumentoAvulsoFailed implements Action
{
    readonly type = DELETE_DOCUMENTOS_AVULSO_FAILED;

    constructor(public payload: any)
    {
    }
}

//
// /**
//  * Set Folder on Selected Tarefas
//  */
// export class SetFolderOnSelectedTarefas implements Action {
//     readonly type = SET_FOLDER_ON_SELECTED_TAREFAS;
//
//     constructor(public payload: any) {
//     }
// }
//
// /**
//  * Set Folder on Selected Tarefas Success
//  */
// export class SetFolderOnSelectedTarefasSuccess implements Action {
//     readonly type = SET_FOLDER_ON_SELECTED_TAREFAS_SUCCESS;
//
//     constructor(public payload: any) {
//     }
// }
//
// /**
//  * Set Folder on Selected Tarefas Failed
//  */
// export class SetFolderOnSelectedTarefasFailed implements Action {
//     readonly type = SET_FOLDER_ON_SELECTED_TAREFAS_FAILED;
//
//     constructor(public payload: any) {
//     }
// }
//

//
// /**
//  * Save Tarefa
//  */
// export class SaveTarefa implements Action
// {
//     readonly type = SAVE_TAREFA;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Save Tarefa Success
//  */
// export class SaveTarefaSuccess implements Action
// {
//     readonly type = SAVE_TAREFA_SUCCESS;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Save Tarefa Failed
//  */
// export class SaveTarefaFailed implements Action
// {
//     readonly type = SAVE_TAREFA_FAILED;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
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
// /**
//  * Toggle Urgente Tarefa
//  */
// export class ToggleUrgenteTarefa implements Action
// {
//     readonly type = TOGGLE_URGENTE_TAREFA;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Toggle Urgente Tarefa Success
//  */
// export class ToggleUrgenteTarefaSuccess implements Action
// {
//     readonly type = TOGGLE_URGENTE_TAREFA_SUCCESS;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Toggle Urgente Tarefa Failed
//  */
// export class ToggleUrgenteTarefaFailed implements Action
// {
//     readonly type = TOGGLE_URGENTE_TAREFA_FAILED;
//
//     constructor(public payload: any)
//     {
//     }
// }

// /**
//  * Delete Vinculacao Etiqueta
//  */
// export class DeleteVinculacaoEtiqueta implements Action
// {
//     readonly type = DELETE_VINCULACAO_ETIQUETA;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Delete Vinculacao Etiqueta Success
//  */
// export class DeleteVinculacaoEtiquetaSuccess implements Action
// {
//     readonly type = DELETE_VINCULACAO_ETIQUETA_SUCCESS;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Delete Vinculacao Etiqueta Failed
//  */
// export class DeleteVinculacaoEtiquetaFailed implements Action
// {
//     readonly type = DELETE_VINCULACAO_ETIQUETA_FAILED;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Create Vinculacao Etiqueta
//  */
// export class CreateVinculacaoEtiqueta implements Action
// {
//     readonly type = CREATE_VINCULACAO_ETIQUETA;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Create Vinculacao Etiqueta Success
//  */
// export class CreateVinculacaoEtiquetaSuccess implements Action
// {
//     readonly type = CREATE_VINCULACAO_ETIQUETA_SUCCESS;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Create Vinculacao Etiqueta Failed
//  */
// export class CreateVinculacaoEtiquetaFailed implements Action
// {
//     readonly type = CREATE_VINCULACAO_ETIQUETA_FAILED;
//
//     constructor(public payload: any)
//     {
//     }
// }
//

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

export type DocumentosAvulsoActionsAll
    = GetDocumentosAvulso
    | GetDocumentosAvulsoSuccess
    | GetDocumentosAvulsoFailed
    | ChangeSelectedDocumentosAvulso
    | SetCurrentDocumentoAvulso
    | SetCurrentDocumantoAvulsoSuccess
    | ToggleMaximizado
    /*| CreateTarefa
    | CreateTarefaSuccess

    | ChangeSelectedTarefas
    | SetFolderOnSelectedTarefas
    | SetFolderOnSelectedTarefasSuccess
    | SetFolderOnSelectedTarefasFailed
    | DeleteTarefa
    | DeleteTarefaSuccess
    | DeleteTarefaFailed
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | ToggleLidaTarefa
    | ToggleLidaTarefaSuccess
    | ToggleLidaTarefaFailed
    | ToggleUrgenteTarefa
    | ToggleUrgenteTarefaSuccess
    | ToggleUrgenteTarefaFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    */;
