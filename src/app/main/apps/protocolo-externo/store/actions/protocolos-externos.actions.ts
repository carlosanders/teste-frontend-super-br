
import {Action} from '@ngrx/store';

export const UNLOAD_PROCESSOS = '[PROCESSOS] UNLOAD PROCESSOS';

export const GET_PROCESSOS = '[PROTOCOLO EXTERNO] GET PROCESSOS';
export const GET_PROCESSOS_SUCCESS = '[PROTOCOLO EXTERNO] GET PROCESSOS SUCCESS';
export const GET_PROCESSOS_FAILED = '[PROTOCOLO EXTERNO] GET PROCESSOS FAILED';

export const SET_CURRENT_PROCESSO = '[PROCESSOS] SET CURRENT PROCESSO';
export const SET_CURRENT_PROCESSO_SUCCESS = '[PROCESSOS] SET CURRENT PROCESSO SUCCESS';

export const CREATE_PROCESSO = '[PROCESSOS] CREATE PROCESSO';
export const CREATE_PROCESSO_SUCCESS = '[PROCESSOS] CREATE PROCESSO SUCCESS';

export const DELETE_PROCESSO = '[PROCESSOS] DELETE PROCESSO';
export const DELETE_PROCESSO_SUCCESS = '[PROCESSOS] DELETE PROCESSO SUCCESS';
export const DELETE_PROCESSO_FAILED = '[PROCESSOS] DELETE PROCESSO FAILED';

export const CHANGE_SELECTED_PROCESSOS = '[PROCESSOS] CHANGE SELECTED PROCESSOS';

export const TOGGLE_MAXIMIZADO = '[PROCESSOS] TOGGLE MAXIMIZADO';

export const TOGGLE_LIDA_PROCESSO = '[PROCESSOS] TOGGLE LIDA PROCESSO';
export const TOGGLE_LIDA_PROCESSO_SUCCESS = '[PROCESSOS] TOGGLE LIDA PROCESSO SUCCESS';
export const TOGGLE_LIDA_PROCESSO_FAILED = '[PROCESSOS] TOGGLE LIDA PROCESSO FAILED';

export const TOGGLE_URGENTE_PROCESSO = '[PROCESSOS] TOGGLE URGENTE PROCESSO';
export const TOGGLE_URGENTE_PROCESSO_SUCCESS = '[PROCESSOS] TOGGLE URGENTE PROCESSO SUCCESS';
export const TOGGLE_URGENTE_PROCESSO_FAILED = '[PROCESSOS] TOGGLE URGENTE PROCESSO FAILED';

export const SAVE_PROCESSO = '[PROCESSO] SAVE PROCESSO';
export const SAVE_PROCESSO_SUCCESS = '[PROCESSO] SAVE PROCESSO SUCCESS';
export const SAVE_PROCESSO_FAILED = '[PROCESSO] SAVE PROCESSO FAILED';

export const CREATE_VINCULACAO_ETIQUETA = '[PROCESSO] CREATE VINCULACAO ETIQUETA';
export const CREATE_VINCULACAO_ETIQUETA_SUCCESS = '[PROCESSO] CREATE VINCULACAO ETIQUETA SUCCESS';
export const CREATE_VINCULACAO_ETIQUETA_FAILED = '[PROCESSO] CREATE VINCULACAO ETIQUETA FAILED';

export const DELETE_VINCULACAO_ETIQUETA = '[PROCESSO] DELETE VINCULACAO_ETIQUETA';
export const DELETE_VINCULACAO_ETIQUETA_SUCCESS = '[PROCESSO] DELETE VINCULACAO_ETIQUETA SUCCESS';
export const DELETE_VINCULACAO_ETIQUETA_FAILED = '[PROCESSO] DELETE VINCULACAO_ETIQUETA FAILED';

export const GET_ASSUNTOS_PROCESSO = '[PROCESSO] GET ASSUNTOS PROCESSO';
export const GET_ASSUNTOS_PROCESSO_SUCCESS = '[PROCESSO] GET ASSUNTOS PROCESSO SUCCESS';
export const GET_ASSUNTOS_PROCESSO_FAILED = '[PROCESSO] GET ASSUNTOS PROCESSO FAILED';

export const SET_LOADING_ASSUNTOS = '[PROCESSO] SET LOADING ASSUNTOS';
export const SET_LOADING_ASSUNTOS_SUCCESS = '[PROCESSO] SET LOADING ASSUNTOS SUCCESS';
export const SET_LOADING_ASSUNTOS_FAILED = '[PROCESSO] SET LOADING ASSUNTOS FAILED';

export const SET_ASSUNTOS_LOADED = '[PROCESSO] SET ASSUNTOS LOADED';
export const SET_ASSUNTOS_LOADED_SUCCESS = '[PROCESSO] SET ASSUNTOS LOADED SUCCESS';
export const SET_ASSUNTOS_LOADED_FAILED = '[PROCESSO] SET ASSUNTOS LOADED FAILED';


export const GET_PESSOA = '[PROTOCOLO EXTENO] GET PESSOA';
export const GET_PESSOA_SUCCESS = '[PROTOCOLO EXTERNO] GET PESSOA SUCCESS';
export const GET_PESSOA_FAILED = '[PROTOCOLO EXTERNO] GET PESSOA FAILED';


/**
 * Unload Tarefas
 */
export class UnloadProcessos implements Action {
    readonly type = UNLOAD_PROCESSOS;

    constructor(public payload: any) {
    }
}

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

/**
 * Creat Processo
 */
export class CreateProcesso implements Action {
    readonly type = CREATE_PROCESSO;

    constructor() {
    }
}

/**
 * Creat Processo Success
 */
export class CreateProcessoSuccess implements Action {
    readonly type = CREATE_PROCESSO_SUCCESS;

    constructor() {
    }
}

/**
 * Change Selected Processos
 */
export class ChangeSelectedProcessos implements Action {
    readonly type = CHANGE_SELECTED_PROCESSOS;

    constructor(public payload: any) {
    }
}

/**
 * Delete Processo
 */
export class DeleteProcesso implements Action
{
    readonly type = DELETE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Processo Success
 */
export class DeleteProcessoSuccess implements Action
{
    readonly type = DELETE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Processo Failed
 */
export class DeleteProcessoFailed implements Action
{
    readonly type = DELETE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo
 */
export class SaveProcesso implements Action
{
    readonly type = SAVE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Success
 */
export class SaveProcessoSuccess implements Action
{
    readonly type = SAVE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Processo Failed
 */
export class SaveProcessoFailed implements Action
{
    readonly type = SAVE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Lida Processo
 */
export class ToggleLidaProcesso implements Action
{
    readonly type = TOGGLE_LIDA_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Lida Processo Success
 */
export class ToggleLidaProcessoSuccess implements Action
{
    readonly type = TOGGLE_LIDA_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Lida Processo Failed
 */
export class ToggleLidaProcessoFailed implements Action
{
    readonly type = TOGGLE_LIDA_PROCESSO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Urgente Processo
 */
export class ToggleUrgenteProcesso implements Action
{
    readonly type = TOGGLE_URGENTE_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Urgente Processo Success
 */
export class ToggleUrgenteProcessoSuccess implements Action
{
    readonly type = TOGGLE_URGENTE_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Toggle Urgente Processo Failed
 */
export class ToggleUrgenteProcessoFailed implements Action
{
    readonly type = TOGGLE_URGENTE_PROCESSO_FAILED;

    constructor(public payload: any)
    {
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

/**
 * ISSUE-107
 */

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
 *  Get Pessoa
 */
export class GetPessoa implements Action
{
    readonly type = GET_PESSOA;

    constructor(public payload: any)
    {
    }
}


/**
 *  Get Pessoa Success
 */
export class GetPessoaSuccess implements Action
{
    readonly type = GET_PESSOA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 *  Get Pessoa Failid
 */
export class GetPessoaFailed implements Action
{
    readonly type = GET_PESSOA_FAILED;

    constructor(public payload: any)
    {
    }
}


export type ProcessosActionsAll
    = UnloadProcessos
    | GetProcessos
    | GetProcessosSuccess
    | GetProcessosFailed
    | CreateProcesso
    | CreateProcessoSuccess
    | SetCurrentProcesso
    | SetCurrentProcessoSuccess
    | ChangeSelectedProcessos
    | DeleteProcesso
    | DeleteProcessoSuccess
    | DeleteProcessoFailed
    | SaveProcesso
    | SaveProcessoSuccess
    | SaveProcessoFailed
    | ToggleLidaProcesso
    | ToggleLidaProcessoSuccess
    | ToggleLidaProcessoFailed
    | ToggleUrgenteProcesso
    | ToggleUrgenteProcessoSuccess
    | ToggleUrgenteProcessoFailed
    | CreateVinculacaoEtiqueta
    | CreateVinculacaoEtiquetaSuccess
    | CreateVinculacaoEtiquetaFailed
    | DeleteVinculacaoEtiqueta
    | DeleteVinculacaoEtiquetaSuccess
    | DeleteVinculacaoEtiquetaFailed
    | ToggleMaximizado
    | GetAssuntosProcesso
    | GetAssuntosProcessoSuccess
    | GetAssuntosProcessoFailed
    | SetLoadingAssuntos
    | SetLoadingAssuntosSuccess
    | SetLoadingAssuntosFailed
    | SetAssuntosLoaded
    | SetAssuntosLoadedSuccess
    | SetAssuntosLoadedFailed
    | GetPessoa
    | GetPessoaSuccess
    | GetPessoaFailed;
