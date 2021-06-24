import {Action} from '@ngrx/store';

export const GET_TAREFAS = '[BOARD TAREFAS] GET TAREFAS';
export const GET_TAREFAS_SUCCESS = '[BOARD TAREFAS] GET TAREFAS SUCCESS';
export const GET_TAREFAS_FAILED = '[BOARD TAREFAS] GET TAREFAS FAILED';

export const DELETE_TAREFA = '[BOARD TAREFAS] DELETE TAREFA';
export const DELETE_TAREFA_SUCCESS = '[BOARD TAREFAS] DELETE TAREFA SUCCESS';
export const DELETE_TAREFA_FAILED = '[BOARD TAREFAS] DELETE TAREFA FAILED';

export const UNDELETE_TAREFA = '[BOARD TAREFAS] UNDELETE TAREFA';
export const UNDELETE_TAREFA_SUCCESS = '[BOARD TAREFAS] UNDELETE TAREFA SUCCESS';
export const UNDELETE_TAREFA_FAILED = '[BOARD TAREFAS] UNDELETE TAREFA FAILED';

export const DELETE_TAREFA_FLUSH = '[BOARD TAREFAS] DELETE TAREFA FLUSH';
export const DELETE_TAREFA_CANCEL = '[BOARD TAREFAS] DELETE TAREFA CANCEL';
export const DELETE_TAREFA_CANCEL_SUCCESS = '[BOARD TAREFAS] DELETE TAREFA CANCEL SUCCESS';

export const CHANGE_SELECTED_TAREFAS = '[BOARD TAREFAS] CHANGE SELECTED TAREFAS';

export const TOGGLE_URGENTE_TAREFA = '[BOARD TAREFAS] TOGGLE URGENTE TAREFA';
export const TOGGLE_URGENTE_TAREFA_SUCCESS = '[BOARD TAREFAS] TOGGLE URGENTE TAREFA SUCCESS';
export const TOGGLE_URGENTE_TAREFA_FAILED = '[BOARD TAREFAS] TOGGLE URGENTE TAREFA FAILED';

export const DISTRIBUIR_TAREFA = '[BOARD TAREFAS] DISTRIBUIR TAREFA';
export const DISTRIBUIR_TAREFA_SUCCESS = '[BOARD TAREFAS] DISTRIBUIR TAREFA SUCCESS';
export const DISTRIBUIR_TAREFA_FAILED = '[BOARD TAREFAS] DISTRIBUIR TAREFA FAILED';
export const DISTRIBUIR_TAREFA_FLUSH = '[BOARD TAREFAS] DISTRIBUIR TAREFA FLUSH';
export const DISTRIBUIR_TAREFA_CANCEL = '[BOARD TAREFAS] DISTRIBUIR TAREFA CANCEL';
export const DISTRIBUIR_TAREFA_CANCEL_SUCCESS = '[BOARD TAREFAS] DISTRIBUIR TAREFA CANCEL SUCCESS';

export const SAVE_TAREFA = '[BOARD TAREFAS] SAVE TAREFA';
export const SAVE_TAREFA_SUCCESS = '[BOARD TAREFAS] SAVE TAREFA SUCCESS';
export const SAVE_TAREFA_FAILED = '[BOARD TAREFAS] SAVE TAREFA FAILED';

export const DAR_CIENCIA_TAREFA = '[BOARD TAREFAS] DAR CIENCIA TAREFA';
export const DAR_CIENCIA_TAREFA_SUCCESS = '[BOARD TAREFAS] DAR CIENCIA TAREFA SUCCESS';
export const DAR_CIENCIA_TAREFA_FAILED = '[BOARD TAREFAS] DAR CIENCIA TAREFA FAILED';

export const DAR_CIENCIA_TAREFA_CANCEL = '[BOARD TAREFAS] DAR CIENCIA TAREFA CANCEL';
export const DAR_CIENCIA_TAREFA_CANCEL_SUCCESS = '[BOARD TAREFAS] DAR CIENCIA TAREFA CANCEL SUCCESS';
export const DAR_CIENCIA_TAREFA_FLUSH = '[BOARD TAREFAS] DAR CIENCIA TAREFA FLUSH';

export const REDISTRIBUIR_TAREFA = '[BOARD TAREFAS] REDISTRIBUIR TAREFA';
export const REDISTRIBUIR_TAREFA_FAILED = '[BOARD TAREFAS] REDISTRIBUIR TAREFA FAILED';
export const REDISTRIBUIR_TAREFA_SUCCESS = '[BOARD TAREFAS] REDISTRIBUIR TAREFA SUCCESS';

export const REDISTRIBUIR_TAREFA_CANCEL = '[BOARD TAREFAS] REDISTRIBUIR TAREFA CANCEL';
export const REDISTRIBUIR_TAREFA_CANCEL_SUCCESS = '[BOARD TAREFAS] REDISTRIBUIR TAREFA CANCEL SUCCESS';

export const GERAR_RELATORIO_TAREFA_EXCEL = '[BOARD TAREFAS] GERAR RELATORIO TAREFA EXCEL';
export const GERAR_RELATORIO_TAREFA_EXCEL_FAILED = '[BOARD TAREFAS] GERAR RELATORIO TAREFA EXCEL FAILED';
export const GERAR_RELATORIO_TAREFA_EXCEL_SUCCESS = '[BOARD TAREFAS] GERAR RELATORIO TAREFA EXCEL SUCCESS';

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

export class DistribuirTarefas implements Action {
    readonly type = DISTRIBUIR_TAREFA;

    constructor(public payload: any) {
    }
}

export class DistribuirTarefasSuccess implements Action {
    readonly type = DISTRIBUIR_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DistribuirTarefasFailed implements Action {
    readonly type = DISTRIBUIR_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

export class DistribuirTarefasFlush implements Action {
    readonly type = DISTRIBUIR_TAREFA_FLUSH;

    constructor() {
    }
}

export class DistribuirTarefasCancel implements Action {
    readonly type = DISTRIBUIR_TAREFA_CANCEL;

    constructor() {
    }
}

export class DistribuirTarefasCancelSuccess implements Action {
    readonly type = DISTRIBUIR_TAREFA_CANCEL_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DeleteTarefa implements Action {
    readonly type = DELETE_TAREFA;

    constructor(public payload: any) {
    }
}

export class DeleteTarefaSuccess implements Action {
    readonly type = DELETE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

export class DeleteTarefaFailed implements Action {
    readonly type = DELETE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

export class UndeleteTarefa implements Action {
    readonly type = UNDELETE_TAREFA;

    constructor(public payload: any) {
    }
}

export class UndeleteTarefaSuccess implements Action {
    readonly type = UNDELETE_TAREFA_SUCCESS;

    constructor(public payload: any) {
    }
}

export class UndeleteTarefaFailed implements Action {
    readonly type = UNDELETE_TAREFA_FAILED;

    constructor(public payload: any) {
    }
}

export class DeleteTarefaFlush implements Action {
    readonly type = DELETE_TAREFA_FLUSH;

    constructor() {
    }
}

export class DeleteTarefaCancel implements Action {
    readonly type = DELETE_TAREFA_CANCEL;

    constructor() {
    }
}

export class DeleteTarefaCancelSuccess implements Action {
    readonly type = DELETE_TAREFA_CANCEL_SUCCESS;

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

export class DarCienciaTarefa implements Action
{
    readonly type = DAR_CIENCIA_TAREFA;

    constructor(public payload: any)
    {
    }
}

export class DarCienciaTarefaSuccess implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DarCienciaTarefaFailed implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

export class DarCienciaTarefaCancel implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_CANCEL;

    constructor()
    {
    }
}

export class DarCienciaTarefaCancelSuccess implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_CANCEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class DarCienciaTarefaFlush implements Action
{
    readonly type = DAR_CIENCIA_TAREFA_FLUSH;

    constructor()
    {
    }
}

export class RedistribuirTarefa implements Action
{
    readonly type = REDISTRIBUIR_TAREFA;

    constructor(public payload: any)
    {
    }
}

export class RedistribuirTarefaFailed implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_FAILED;

    constructor(public payload: any)
    {
    }
}

export class RedistribuirTarefaSuccess implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class RedistribuirTarefaCancel implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_CANCEL;

    constructor()
    {
    }
}

export class RedistribuirTarefaCancelSuccess implements Action
{
    readonly type = REDISTRIBUIR_TAREFA_CANCEL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export class GerarRelatorioTarefaExcel implements Action
{
    readonly type = GERAR_RELATORIO_TAREFA_EXCEL;

    constructor()
    {
    }
}

export class GerarRelatorioTarefaExcelFailed implements Action
{
    readonly type = GERAR_RELATORIO_TAREFA_EXCEL_FAILED;

    constructor()
    {
    }
}

export class GerarRelatorioTarefaExcelSuccess implements Action
{
    readonly type = GERAR_RELATORIO_TAREFA_EXCEL_SUCCESS;

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

export type TarefasActionsAll
    = GetTarefas
    | GetTarefasSuccess
    | GetTarefasFailed
    | ChangeSelectedTarefas
    | DistribuirTarefas
    | DistribuirTarefasSuccess
    | DistribuirTarefasFailed
    | DistribuirTarefasCancel
    | DistribuirTarefasFlush
    | DistribuirTarefasCancelSuccess
    | DeleteTarefa
    | DeleteTarefaSuccess
    | DeleteTarefaFailed
    | UndeleteTarefa
    | UndeleteTarefaSuccess
    | UndeleteTarefaFailed
    | DeleteTarefaFlush
    | DeleteTarefaCancel
    | DeleteTarefaCancelSuccess
    | SaveTarefa
    | SaveTarefaSuccess
    | SaveTarefaFailed
    | ToggleUrgenteTarefa
    | ToggleUrgenteTarefaSuccess
    | ToggleUrgenteTarefaFailed
    | DarCienciaTarefa
    | DarCienciaTarefaSuccess
    | DarCienciaTarefaFailed
    | DarCienciaTarefaCancel
    | DarCienciaTarefaCancelSuccess
    | DarCienciaTarefaFlush
    | RedistribuirTarefa
    | RedistribuirTarefaFailed
    | RedistribuirTarefaSuccess
    | RedistribuirTarefaCancel
    | RedistribuirTarefaCancelSuccess
    | GerarRelatorioTarefaExcel
    | GerarRelatorioTarefaExcelFailed
    | GerarRelatorioTarefaExcelSuccess
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
    ;
