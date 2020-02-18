import { Action } from '@ngrx/store';

export const GET_PROCESSOS = '[PROCESSOS] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[PROCESSOS] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[PROCESSOS] GET PROCESSOS FAILED';

/*export const GET_TAREFAS = '[TAREFAS] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[TAREFAS] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[TAREFAS] GET TAREFAS FAILED';

export const SET_CURRENT_TAREFA = '[TAREFAS] SET CURRENT TAREFA';
export const SET_CURRENT_TAREFA_SUCCESS = '[TAREFAS] SET CURRENT TAREFA SUCCESS';

export const CREATE_TAREFA = '[TAREFAS] CREATE TAREFA';
export const CREATE_TAREFA_SUCCESS = '[TAREFAS] CREATE TAREFA SUCCESS';

export const DELETE_TAREFA = '[TAREFAS] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[TAREFAS] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[TAREFAS] DELETE TAREFA FAILED';

export const CHANGE_SELECTED_TAREFAS = '[TAREFAS] CHANGE SELECTED TAREFAS';

export const TOGGLE_MAXIMIZADO = '[TAREFAS] TOGGLE MAXIMIZADO';

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

export const DELETE_VINCULACAO_ETIQUETA = '[TAREFA] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[TAREFA] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[TAREFA] DELETE VINCULACAO_ETIQUETA FAILED';*/

/**
 * Get Tarefas
 */
export class GetProcessos implements Action {
    readonly type = GET_PROCESSOS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Success
 */
export class GetProcessosSuccess implements Action {
    readonly type = GET_PROCESSOS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Tarefas Failed
 */
export class GetProcessosFailed implements Action {
    readonly type = GET_PROCESSOS_FAILED;

    constructor(public payload: string) {
    }
}

// /**
//  * Select Tarefa
//  */
// export class SetCurrentTarefa implements Action {
//     readonly type = SET_CURRENT_TAREFA;
//
//     constructor(public payload: any) {
//     }
// }
//
// /**
//  * Select Tarefa Success
//  */
// export class SetCurrentTarefaSuccess implements Action {
//     readonly type = SET_CURRENT_TAREFA_SUCCESS;
//
//     constructor() {
//     }
// }
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
// /**
//  * Change Selected Tarefas
//  */
// export class ChangeSelectedTarefas implements Action {
//     readonly type = CHANGE_SELECTED_TAREFAS;
//
//     constructor(public payload: any) {
//     }
// }
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
// /**
//  * Delete Tarefa
//  */
// export class DeleteTarefa implements Action
// {
//     readonly type = DELETE_TAREFA;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Delete Tarefa Success
//  */
// export class DeleteTarefaSuccess implements Action
// {
//     readonly type = DELETE_TAREFA_SUCCESS;
//
//     constructor(public payload: any)
//     {
//     }
// }
//
// /**
//  * Delete Tarefa Failed
//  */
// export class DeleteTarefaFailed implements Action
// {
//     readonly type = DELETE_TAREFA_FAILED;
//
//     constructor(public payload: any)
//     {
//     }
// }
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
// /**
//  * Toggle Maximizado
//  */
// export class ToggleMaximizado implements Action
// {
//     readonly type = TOGGLE_MAXIMIZADO;
//
//     constructor()
//     {
//     }
// }

export type ProcessosActionsAll
    = GetProcessos
    | GetProcessosSuccess
    | GetProcessosFailed
    /*| CreateTarefa
    | CreateTarefaSuccess
    | SetCurrentTarefa
    | SetCurrentTarefaSuccess
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
    | ToggleMaximizado*/;
