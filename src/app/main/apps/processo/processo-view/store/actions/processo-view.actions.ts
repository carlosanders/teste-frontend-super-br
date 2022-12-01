import {Action} from '@ngrx/store';

export const GET_JUNTADA = '[PROCESSO VIEW] GET JUNTADA';
export const GET_JUNTADA_SUCCESS = '[PROCESSO VIEW] GET JUNTADA SUCCESS';
export const GET_JUNTADA_FAILED = '[PROCESSO VIEW] GET JUNTADA FAILED';

export const GET_JUNTADA_DOCUMENTO_VINCULADO = '[PROCESSO VIEW] GET JUNTADA DOCUMENTO VINCULADO';
export const GET_JUNTADA_DOCUMENTO_VINCULADO_SUCCESS = '[PROCESSO VIEW] GET JUNTADA DOCUMENTO VINCULADO SUCCESS';
export const GET_JUNTADA_DOCUMENTO_VINCULADO_FAILED = '[PROCESSO VIEW] GET JUNTADA DOCUMENTO VINCULADO FAILED';

export const GET_JUNTADAS = '[PROCESSO VIEW] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[PROCESSO VIEW] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[PROCESSO VIEW] GET JUNTADAS FAILED';
export const EXPANDIR_PROCESSO = '[PROCESSO VIEW] EXPANDIR PROCESSO';

export const GET_COMPONENTES_DIGITAIS_JUNTADA = '[PROCESSO VIEW] GET COMPONENTES DIGITAIS JUNTADA';
export const GET_COMPONENTES_DIGITAIS_JUNTADA_SUCCESS = '[PROCESSO VIEW] GET COMPONENTES DIGITAIS JUNTADA SUCCESS';
export const GET_COMPONENTES_DIGITAIS_JUNTADA_FAILED = '[PROCESSO VIEW] GET COMPONENTES DIGITAIS JUNTADA FAILED';

export const SET_FIRST_JUNTADA_TRUE = '[PROCESSO VIEW] SET FIRST JUNTADA TRUE';
export const SET_FIRST_JUNTADA_FALSE = '[PROCESSO VIEW] SET FIRST JUNTADA FALSE';

export const GET_JUNTADAS_ETIQUETAS = '[PROCESSO VIEW] GET JUNTADAS ETIQUETAS';
export const GET_JUNTADAS_ETIQUETAS_SUCCESS = '[PROCESSO VIEW] GET JUNTADAS ETIQUETAS SUCCESS';
export const GET_JUNTADAS_ETIQUETAS_FAILED = '[PROCESSO VIEW] GET JUNTADAS ETIQUETAS FAILED';

export const GET_DOCUMENTOS_VINCULADOS_JUNTADA = '[PROCESSO VIEW] GET DOCUMENTOS VINCULADOS JUNTADA';
export const GET_DOCUMENTOS_VINCULADOS_JUNTADA_SUCCESS = '[PROCESSO VIEW] GET DOCUMENTOS VINCULADOS JUNTADA SUCCESS';
export const GET_DOCUMENTOS_VINCULADOS_JUNTADA_FAILED = '[PROCESSO VIEW] GET DOCUMENTOS VINCULADOS JUNTADA FAILED';

export const SET_CURRENT_STEP = '[JUNTADAS] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[JUNTADAS] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[JUNTADAS] SET CURRENT STEP FAILED';

export const UPDATE_INDEX = '[PROCESSO VIEW] UPDATE INDEX';
export const UPDATE_NODE = '[PROCESSO VIEW] UPDATE NODE';

export const UNLOAD_JUNTADAS = '[JUNTADAS] UNLOAD JUNTADAS';

export const RELOAD_JUNTADAS = '[JUNTADAS] RELOAD JUNTADAS';

export const GET_CAPA_PROCESSO = '[JUNTADAS] GET CAPA PROCESSO';

export const RETIRA_JUNTADA = '[PROCESSO VIEW] RETIRA JUNTADA';

export const START_LOADING_BINARY = '[PROCESSO VIEW] START LOADING BINARY';
export const STILL_LOADING_BINARY = '[PROCESSO VIEW] STILL LOADING BINARY';
export const DOWNLOAD_LATEST_BINARY = '[PROCESSO VIEW] DOWNLOAD LATEST';
export const DOWNLOAD_LATEST_BINARY_SUCCESS = '[PROCESSO VIEW] DOWNLOAD LATEST SUCCESS';
export const DOWNLOAD_LATEST_BINARY_FAILED = '[PROCESSO VIEW] DOWNLOAD LATEST FAILED';

export const SET_BINARY_VIEW = '[PROCESSO VIEW] SET BINARY VIEW';
export const SET_BINARY_VIEW_SUCCESS = '[PROCESSO VIEW] SET BINARY VIEW SUCCESS';
export const SET_BINARY_VIEW_FAILED = '[PROCESSO VIEW] SET BINARY VIEW FAILED';

export const LIMPA_CACHE_DOCUMENTO = '[PROCESSO VIEW] LIMPA CACHE DOCUMENTO';
export const REMOVE_CONTEUDO_BINARIO = '[PROCESSO VIEW] REMOVE CONTEUDO BINARIO';

export const SET_ACTIVE_CARD = '[PROCESSO VIEW] SET ACTIVE CARD';

export const TOGGLE_SELECT_JUNTADA_ID = '[PROCESSO VIEW] TOGGLE SELECT JUNTADA ID'
export const TOGGLE_SELECT_JUNTADA_VINCULADA_ID = '[PROCESSO VIEW] TOGGLE SELECT JUNTADA VINCULADA ID';

export const UNLOAD_SELECTED_JUNTADAS_ID = '[PROCESSO VIEW] UNLOAD SELECTED JUNTADAS ID';

/**
 * Expandir Processo
 */
export class ExpandirProcesso implements Action
{
    readonly type = EXPANDIR_PROCESSO;

    constructor(public payload: boolean)
    {
    }
}

/**
 * Get Juntada
 */
export class GetJuntada implements Action
{
    readonly type = GET_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Success
 */
export class GetJuntadaSuccess implements Action
{
    readonly type = GET_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Failed
 */
export class GetJuntadaFailed implements Action
{
    readonly type = GET_JUNTADA_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Juntada Documento Vinculado
 */
export class GetJuntadaDocumentoVinculado implements Action
{
    readonly type = GET_JUNTADA_DOCUMENTO_VINCULADO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Documento Vinculado Success
 */
export class GetJuntadaDocumentoVinculadoSuccess implements Action
{
    readonly type = GET_JUNTADA_DOCUMENTO_VINCULADO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntada Documento Vinculado Failed
 */
export class GetJuntadaDocumentoVinculadoFailed implements Action
{
    readonly type = GET_JUNTADA_DOCUMENTO_VINCULADO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas
 */
export class GetJuntadas implements Action
{
    readonly type = GET_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Success
 */
export class GetJuntadasSuccess implements Action
{
    readonly type = GET_JUNTADAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Failed
 */
export class GetJuntadasFailed implements Action
{
    readonly type = GET_JUNTADAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Componentes Digitais Juntada
 */
export class GetComponentesDigitaisJuntada implements Action
{
    readonly type = GET_COMPONENTES_DIGITAIS_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Componentes Digitais Juntada Success
 */
export class GetComponentesDigitaisJuntadaSuccess implements Action
{
    readonly type = GET_COMPONENTES_DIGITAIS_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Componentes Digitais Juntada Failed
 */
export class GetComponentesDigitaisJuntadaFailed implements Action
{
    readonly type = GET_COMPONENTES_DIGITAIS_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Set First Juntada True
 */
export class SetFirstJuntadaTrue implements Action
{
    readonly type = SET_FIRST_JUNTADA_TRUE;

    constructor(public payload: any)
    {
    }
}

/**
 * Set First Juntada False
 */
export class SetFirstJuntadaFalse implements Action
{
    readonly type = SET_FIRST_JUNTADA_FALSE;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Etiquetas
 */
export class GetJuntadasEtiquetas implements Action
{
    readonly type = GET_JUNTADAS_ETIQUETAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Etiquetas Success
 */
export class GetJuntadasEtiquetasSuccess implements Action
{
    readonly type = GET_JUNTADAS_ETIQUETAS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Juntadas Etiquetas Failed
 */
export class GetJuntadasEtiquetasFailed implements Action
{
    readonly type = GET_JUNTADAS_ETIQUETAS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Get Documentos Vinculados Juntada
 */
export class GetDocumentosVinculadosJuntada implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Juntada Success
 */
export class GetDocumentosVinculadosJuntadaSuccess implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_JUNTADA_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Documentos Vinculados Juntada Failed
 */
export class GetDocumentosVinculadosJuntadaFailed implements Action
{
    readonly type = GET_DOCUMENTOS_VINCULADOS_JUNTADA_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Step
 */
export class SetCurrentStep implements Action {
    readonly type = SET_CURRENT_STEP;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Success
 */
export class SetCurrentStepSuccess implements Action {
    readonly type = SET_CURRENT_STEP_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Current Step Failed
 */
export class SetCurrentStepFailed implements Action {
    readonly type = SET_CURRENT_STEP_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Unload Juntadas
 */
export class UnloadJuntadas implements Action
{
    readonly type = UNLOAD_JUNTADAS;

    constructor(public payload: any)
    {
    }
}

/**
 * Set Current Step
 */
export class GetCapaProcesso implements Action {
    readonly type = GET_CAPA_PROCESSO;

    constructor() {
    }
}

/**
 * Reload Juntadas
 */
export class ReloadJuntadas implements Action
{
    readonly type = RELOAD_JUNTADAS;

    constructor()
    {
    }
}

/**
 * Update Index
 */
export class UpdateIndex implements Action
{
    readonly type = UPDATE_INDEX;

    constructor(public payload: any)
    {
    }
}

/**
 * Update Node
 */
export class UpdateNode implements Action
{
    readonly type = UPDATE_NODE;

    constructor(public payload: any)
    {
    }
}

/**
 * Retira Juntada
 */
export class RetiraJuntada implements Action
{
    readonly type = RETIRA_JUNTADA;

    constructor(public payload: any)
    {
    }
}

/**
 * Start Loading Binary
 */
export class StartLoadingBinary implements Action {
    readonly type = START_LOADING_BINARY;

    constructor() {
    }
}

/**
 * Still Loading Binary
 */
export class StillLoadingBinary implements Action {
    readonly type = STILL_LOADING_BINARY;

    constructor() {
    }
}

/**
 * Download Latest Binary
 */
export class DownloadLatestBinary implements Action {
    readonly type = DOWNLOAD_LATEST_BINARY;

    constructor(public payload: any) {
    }
}

/**
 * Download Latest Binary Success
 */
export class DownloadLatestBinarySuccess implements Action {
    readonly type = DOWNLOAD_LATEST_BINARY_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Download Latest Binary Failed
 */
export class DownloadLatestBinaryFailed implements Action {
    readonly type = DOWNLOAD_LATEST_BINARY_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Set Binary View
 */
export class SetBinaryView implements Action {
    readonly type = SET_BINARY_VIEW;

    constructor(public payload: any) {
    }
}

/**
 * Set Binary View Success
 */
export class SetBinaryViewSuccess implements Action {
    readonly type = SET_BINARY_VIEW_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Set Binary View Failed
 */
export class SetBinaryViewFailed implements Action {
    readonly type = SET_BINARY_VIEW_FAILED;

    constructor(public payload: any) {
    }
}

/**
 * Limpa Cache Documento
 */
export class LimpaCacheDocumento implements Action {
    readonly type = LIMPA_CACHE_DOCUMENTO;

    constructor(public payload: any) {
    }
}

/**
 * Remove Contudo Binario
 */
export class RemoveConteudoBinario implements Action {
    readonly type = REMOVE_CONTEUDO_BINARIO;

    constructor(public payload: any) {
    }
}

/**
 * Set Active Card
 */
export class SetActiveCard implements Action {
    readonly type = SET_ACTIVE_CARD;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Select Juntada Id
 */
export class ToggleSelectJuntadaId implements Action {
    readonly type = TOGGLE_SELECT_JUNTADA_ID;

    constructor(public payload: any) {
    }
}

/**
 * Toggle Select Juntada Vinculada Id
 */
export class ToggleSelectJuntadaVinculadaId implements Action {
    readonly type = TOGGLE_SELECT_JUNTADA_VINCULADA_ID;

    constructor(public payload: any) {
    }
}

/**
 * Unload Selected Juntadas Id
 */
export class UnloadSelectedJuntadasId implements Action {
    readonly type = UNLOAD_SELECTED_JUNTADAS_ID;
}

export type ProcessoViewActionsAll
    = GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | GetJuntadaDocumentoVinculado
    | GetJuntadaDocumentoVinculadoSuccess
    | GetJuntadaDocumentoVinculadoFailed
    | GetComponentesDigitaisJuntada
    | GetComponentesDigitaisJuntadaSuccess
    | GetComponentesDigitaisJuntadaFailed
    | SetFirstJuntadaTrue
    | SetFirstJuntadaFalse
    | GetJuntadasEtiquetas
    | GetJuntadasEtiquetasSuccess
    | GetJuntadasEtiquetasFailed
    | GetJuntada
    | GetJuntadaSuccess
    | GetJuntadaFailed
    | GetDocumentosVinculadosJuntada
    | GetDocumentosVinculadosJuntadaSuccess
    | GetDocumentosVinculadosJuntadaFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed
    | UnloadJuntadas
    | GetCapaProcesso
    | ExpandirProcesso
    | ReloadJuntadas
    | UpdateIndex
    | UpdateNode
    | RetiraJuntada
    | StartLoadingBinary
    | StillLoadingBinary
    | DownloadLatestBinary
    | DownloadLatestBinarySuccess
    | DownloadLatestBinaryFailed
    | SetBinaryView
    | SetBinaryViewSuccess
    | SetBinaryViewFailed
    | LimpaCacheDocumento
    | RemoveConteudoBinario
    | SetActiveCard
    | ToggleSelectJuntadaId
    | ToggleSelectJuntadaVinculadaId
    | UnloadSelectedJuntadasId
    ;
