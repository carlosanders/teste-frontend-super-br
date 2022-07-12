import {Action} from '@ngrx/store';

export const GET_PROCESSO = '[VISUALIZAR PROCESSO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[VISUALIZAR PROCESSO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[VISUALIZAR PROCESSO] GET PROCESSO FAILED';

export const GET_JUNTADAS = '[VISUALIZAR PROCESSO] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[VISUALIZAR PROCESSO] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[VISUALIZAR PROCESSO] GET JUNTADAS FAILED';

export const SET_CURRENT_STEP = '[VISUALIZAR PROCESSO] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[VISUALIZAR PROCESSO] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[VISUALIZAR PROCESSO] SET CURRENT STEP FAILED';

export const UNLOAD_JUNTADAS = '[VISUALIZAR PROCESSO] UNLOAD JUNTADAS';

export const RELOAD_JUNTADAS = '[VISUALIZAR PROCESSO] RELOAD JUNTADAS';

export const START_LOADING_BINARY = '[VISUALIZAR PROCESSO] START LOADING BINARY';
export const STILL_LOADING_BINARY = '[VISUALIZAR PROCESSO] STILL LOADING BINARY';
export const DOWNLOAD_LATEST_BINARY = '[VISUALIZAR PROCESSO] DOWNLOAD LATEST';
export const DOWNLOAD_LATEST_BINARY_SUCCESS = '[VISUALIZAR PROCESSO] DOWNLOAD LATEST SUCCESS';
export const DOWNLOAD_LATEST_BINARY_FAILED = '[VISUALIZAR PROCESSO] DOWNLOAD LATEST FAILED';

export const SET_BINARY_VIEW = '[VISUALIZAR PROCESSO] SET BINARY VIEW';
export const SET_BINARY_VIEW_SUCCESS = '[VISUALIZAR PROCESSO] SET BINARY VIEW SUCCESS';
export const SET_BINARY_VIEW_FAILED = '[VISUALIZAR PROCESSO] SET BINARY VIEW FAILED';

export const VER_CAPA_PROCESSO = '[VISUALIZAR PROCESSO] VER CAPA PROCESSO';

export const UNLOAD_PROCESSO = '[VISUALIZAR PROCESSO] UNLOAD PROCESSO';

/**
 * Get Processo
 */
export class GetProcesso implements Action
{
    readonly type = GET_PROCESSO;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action
{
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action
{
    readonly type = GET_PROCESSO_FAILED;

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
 * Ver Capa Processo
 */
export class VerCapaProcesso implements Action {
    readonly type = VER_CAPA_PROCESSO;

    constructor() {
    }
}

/**
 * Unload Processo
 */
export class UnloadProcesso implements Action
{
    readonly type = UNLOAD_PROCESSO;

    constructor()
    {
    }
}

export type VisualizarProcessoActionsAll
    = GetProcesso
    | GetProcessoSuccess
    | GetProcessoFailed
    | GetJuntadas
    | GetJuntadasSuccess
    | GetJuntadasFailed
    | SetCurrentStep
    | SetCurrentStepSuccess
    | SetCurrentStepFailed
    | UnloadJuntadas
    | ReloadJuntadas
    | StartLoadingBinary
    | StillLoadingBinary
    | DownloadLatestBinary
    | DownloadLatestBinarySuccess
    | DownloadLatestBinaryFailed
    | SetBinaryView
    | SetBinaryViewSuccess
    | SetBinaryViewFailed
    | VerCapaProcesso
    | UnloadProcesso;
