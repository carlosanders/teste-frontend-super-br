import {Action} from '@ngrx/store';

export const GET_TAREFAS = '[BOARD TAREFAS] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[BOARD TAREFAS] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[BOARD TAREFAS] GET TAREFAS FAILED';

export const DELETE_TAREFAS = '[BOARD TAREFAS] DELETE TAREFAS';
export const DELETE_TAREFAS_SUCCESS = '[BOARD TAREFAS] DELETE TAREFAS SUCCESS';
export const DELETE_TAREFAS_FAILED = '[BOARD TAREFAS] DELETE TAREFAS FAILED';

export const UNDELETE_TAREFAS = '[BOARD TAREFAS] UNDELETE TAREFAS';
export const UNDELETE_TAREFAS_SUCCESS = '[BOARD TAREFAS] UNDELETE TAREFAS SUCCESS';
export const UNDELETE_TAREFAS_FAILED = '[BOARD TAREFAS] UNDELETE TAREFAS FAILED';

export const CHANGE_SELECTED_TAREFAS = '[BOARD TAREFAS] CHANGE SELECTED TAREFAS';

export const TOGGLE_URGENTE_TAREFA = '[BOARD TAREFAS] TOGGLE URGENTE TAREFA';
export const TOGGLE_URGENTE_TAREFA_SUCCESS = '[BOARD TAREFAS] TOGGLE URGENTE TAREFA SUCCESS';
export const TOGGLE_URGENTE_TAREFA_FAILED = '[BOARD TAREFAS] TOGGLE URGENTE TAREFA FAILED';

export const SAVE_TAREFA = '[BOARD TAREFAS] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[BOARD TAREFAS] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[BOARD TAREFAS] SAVE TAREFA FAILED';

export const DAR_CIENCIA_TAREFAS = '[BOARD TAREFAS] DAR CIENCIA TAREFAS';
export const DAR_CIENCIA_TAREFAS_SUCCESS = '[BOARD TAREFAS] DAR CIENCIA TAREFAS SUCCESS';
export const DAR_CIENCIA_TAREFAS_FAILED = '[BOARD TAREFAS] DAR CIENCIA TAREFAS FAILED';

export const UPDATE_DISPLAYED_CAMPOS = '[BOARD TAREFAS] UPDATE DISPLAYED CAMPOS';
export const DELETE_FOLDER_TAREFAS = '[BOARD TAREFAS] DELETE FOLDER TAREFA';

export const GET_TAREFAS_ASSUNTOS = '[BOARD TAREFAS] GET TAREFAS ASSUNTOS';
export const GET_TAREFAS_ASSUNTOS_FAILED = '[BOARD TAREFAS] GET TAREFAS ASSUNTOS FAILED';
export const GET_TAREFAS_ASSUNTOS_SUCCESS = '[BOARD TAREFAS] GET TAREFAS ASSUNTOS SUCCESS';

export const GET_TAREFAS_INTERESSADOS = '[BOARD TAREFAS] GET TAREFAS INTERESSADOS';
export const GET_TAREFAS_INTERESSADOS_FAILED = '[BOARD TAREFAS] GET TAREFAS INTERESSADOS FAILED';
export const GET_TAREFAS_INTERESSADOS_SUCCESS = '[BOARD TAREFAS] GET TAREFAS INTERESSADOS SUCCESS';

export const CHANGE_TAREFAS_FOLDER = '[BOARD TAREFAS] CHANGE TAREFAS FOLDER';
export const CHANGE_TAREFAS_FOLDER_FAILED = '[BOARD TAREFAS] CHANGE TAREFAS FOLDER FAILED';
export const CHANGE_TAREFAS_FOLDER_SUCCESS = '[BOARD TAREFAS] CHANGE TAREFAS FOLDER SUCCESS';

export const TOGGLE_EXPAND_TAREFAS = '[BOARD TAREFAS] TOGGLE EXPAND TAREFAS';

export class GetTarefas implements Action {
    readonly type = GET_TAREFAS;

    constructor(public payload: any) {
    }
}

export class GetTarefasSuccess implements Action {
    readonly type = GET_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetTarefasFailed implements Action {
    readonly type = GET_TAREFAS_FAILED;

    constructor(public payload: any) {
    }
}

export class ChangeSelectedTarefas implements Action {
    readonly type = CHANGE_SELECTED_TAREFAS;

    constructor(public payload: any) {
    }
}

export class DeleteTarefas implements Action {
    readonly type = DELETE_TAREFAS;

    constructor(public payload: any) {
    }
}

export class DeleteTarefasSuccess implements Action {
    readonly type = DELETE_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DeleteTarefasFailed implements Action {
    readonly type = DELETE_TAREFAS_FAILED;

    constructor(public payload: any) {
    }
}

export class UndeleteTarefas implements Action {
    readonly type = UNDELETE_TAREFAS;

    constructor(public payload: any) {
    }
}

export class UndeleteTarefasSuccess implements Action {
    readonly type = UNDELETE_TAREFAS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class UndeleteTarefasFailed implements Action {
    readonly type = UNDELETE_TAREFAS_FAILED;

    constructor(public payload: any) {
    }
}

export class SaveTarefa implements Action {
    readonly type = SAVE_TAREFA;

    constructor(public payload: any) {
    }
}

export class SaveTarefaSuccess implements Action {
    readonly type = SAVE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

export class SaveTarefaFailed implements Action {
    readonly type = SAVE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

export class ToggleUrgenteTarefa implements Action {
    readonly type = TOGGLE_URGENTE_TAREFA;

    constructor(public payload: any) {
    }
}

export class ToggleUrgenteTarefaSuccess implements Action {
    readonly type = TOGGLE_URGENTE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

export class ToggleUrgenteTarefaFailed implements Action {
    readonly type = TOGGLE_URGENTE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

export class DarCienciaTarefas implements Action
{
    readonly type = DAR_CIENCIA_TAREFAS;

    constructor(public payload: any)
    {
    }
}

export class DarCienciaTarefasSuccess implements Action
{
    readonly type = DAR_CIENCIA_TAREFAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DarCienciaTarefasFailed implements Action
{
    readonly type = DAR_CIENCIA_TAREFAS_FAILED;

    constructor(public payload: any)
    {
    }
}

export class UpdateDisplayedCampos implements Action
{
    readonly type = UPDATE_DISPLAYED_CAMPOS;

    constructor(public payload: any)
    {
    }
}

export class DeleteFolderTarefas implements Action
{
    readonly type = DELETE_FOLDER_TAREFAS;

    constructor(public payload: any)
    {
    }
}

export class GetTarefasAssuntos implements Action
{
    readonly type = GET_TAREFAS_ASSUNTOS;

    constructor(public payload: any)
    {
    }
}

export class GetTarefasAssuntosFailed implements Action
{
    readonly type = GET_TAREFAS_ASSUNTOS_FAILED;

    constructor(public payload: any)
    {
    }
}

export class GetTarefasAssuntosSuccess implements Action
{
    readonly type = GET_TAREFAS_ASSUNTOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GetTarefasInteressados implements Action
{
    readonly type = GET_TAREFAS_INTERESSADOS;

    constructor(public payload: any)
    {
    }
}

export class GetTarefasInteressadosFailed implements Action
{
    readonly type = GET_TAREFAS_INTERESSADOS_FAILED;

    constructor(public payload: any)
    {
    }
}

export class GetTarefasInteressadosSuccess implements Action
{
    readonly type = GET_TAREFAS_INTERESSADOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class ChangeTarefasFolder implements Action
{
    readonly type = CHANGE_TAREFAS_FOLDER;

    constructor(public payload: any)
    {
    }
}

export class ChangeTarefasFolderSuccess implements Action
{
    readonly type = CHANGE_TAREFAS_FOLDER_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class ChangeTarefasFolderFailed implements Action
{
    readonly type = CHANGE_TAREFAS_FOLDER_FAILED;

    constructor(public payload: any)
    {
    }
}

export class ToggleExpandTarefas implements Action
{
    readonly type = TOGGLE_EXPAND_TAREFAS;

    constructor(public payload: any)
    {
    }
}

export type TarefasActionsAll
    = GetTarefas
    | GetTarefasSuccess
    | GetTarefasFailed
    | ChangeSelectedTarefas
    | DeleteTarefas
    | DeleteTarefasSuccess
    | DeleteTarefasFailed
    | UndeleteTarefas
    | UndeleteTarefasSuccess
    | UndeleteTarefasFailed
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | ToggleUrgenteTarefa
    | ToggleUrgenteTarefaSuccess
    | ToggleUrgenteTarefaFailed
    | DarCienciaTarefas
    | DarCienciaTarefasSuccess
    | DarCienciaTarefasFailed
    | UpdateDisplayedCampos
    | DeleteFolderTarefas
    | GetTarefasAssuntos
    | GetTarefasAssuntosFailed
    | GetTarefasAssuntosSuccess
    | GetTarefasInteressados
    | GetTarefasInteressadosFailed
    | GetTarefasInteressadosSuccess
    | ChangeTarefasFolder
    | ChangeTarefasFolderSuccess
    | ChangeTarefasFolderFailed
    | ToggleExpandTarefas
    ;
