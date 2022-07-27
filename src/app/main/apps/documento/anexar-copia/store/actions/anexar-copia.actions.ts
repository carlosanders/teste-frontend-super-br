import {Action} from '@ngrx/store';

export const GET_PROCESSO = '[ANEXAR COPIA] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[ANEXAR COPIA] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[ANEXAR COPIA] GET PROCESSO FAILED';

export const GET_JUNTADAS = '[ANEXAR COPIA] GET JUNTADAS';
export const GET_JUNTADAS_SUCCESS = '[ANEXAR COPIA] GET JUNTADAS SUCCESS';
export const GET_JUNTADAS_FAILED = '[ANEXAR COPIA] GET JUNTADAS FAILED';

export const SET_CURRENT_STEP = '[ANEXAR COPIA] SET CURRENT STEP';
export const SET_CURRENT_STEP_SUCCESS = '[ANEXAR COPIA] SET CURRENT STEP SUCCESS';
export const SET_CURRENT_STEP_FAILED = '[ANEXAR COPIA] SET CURRENT STEP FAILED';

export const UNLOAD_JUNTADAS = '[ANEXAR COPIA] UNLOAD JUNTADAS';

export const RELOAD_JUNTADAS = '[ANEXAR COPIA] RELOAD JUNTADAS';

export const START_LOADING_BINARY = '[ANEXAR COPIA] START LOADING BINARY';
export const STILL_LOADING_BINARY = '[ANEXAR COPIA] STILL LOADING BINARY';
export const DOWNLOAD_LATEST_BINARY = '[ANEXAR COPIA] DOWNLOAD LATEST';
export const DOWNLOAD_LATEST_BINARY_SUCCESS = '[ANEXAR COPIA] DOWNLOAD LATEST SUCCESS';
export const DOWNLOAD_LATEST_BINARY_FAILED = '[ANEXAR COPIA] DOWNLOAD LATEST FAILED';

export const SET_BINARY_VIEW = '[ANEXAR COPIA] SET BINARY VIEW';
export const SET_BINARY_VIEW_SUCCESS = '[ANEXAR COPIA] SET BINARY VIEW SUCCESS';
export const SET_BINARY_VIEW_FAILED = '[ANEXAR COPIA] SET BINARY VIEW FAILED';

export const UNLOAD_COPIA = '[ANEXAR COPIA] UNLOAD COPIA';

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
 * Unload Copia
 */
export class UnloadCopia implements Action
{
    readonly type = UNLOAD_COPIA;

    constructor()
    {
    }
}

export type AnexarCopiaActionsAll
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
    | UnloadCopia;
