import {Action} from '@ngrx/store';

export const SAVE_REGISTRAR_EXTRAVIO = '[REGISTRAR_EXTRAVIO] SAVE REGISTRAR_EXTRAVIO';
export const SAVE_REGISTRAR_EXTRAVIO_SUCCESS = '[REGISTRAR_EXTRAVIO] SAVE REGISTRAR_EXTRAVIO SUCCESS';
export const SAVE_REGISTRAR_EXTRAVIO_FAILED = '[REGISTRAR_EXTRAVIO] SAVE REGISTRAR_EXTRAVIO FAILED';

export const GET_PROCESSO = '[REGISTRAR_EXTRAVIO] GET PROCESSO';
export const GET_PROCESSO_SUCCESS = '[REGISTRAR_EXTRAVIO] GET PROCESSO SUCCESS';
export const GET_PROCESSO_FAILED = '[REGISTRAR_EXTRAVIO] GET PROCESSO FAILED';

/**
 * Save RegistrarExtravio
 */
export class SaveRegistrarExtravio implements Action
{
    readonly type = SAVE_REGISTRAR_EXTRAVIO;

    constructor(public payload: any)
    {
    }
}

/**
 * Save RegistrarExtravio Success
 */
export class SaveRegistrarExtravioSuccess implements Action
{
    readonly type = SAVE_REGISTRAR_EXTRAVIO_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save RegistrarExtravio Failed
 */
export class SaveRegistrarExtravioFailed implements Action
{
    readonly type = SAVE_REGISTRAR_EXTRAVIO_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Processo
 */
export class GetProcesso implements Action {
    readonly type = GET_PROCESSO;

    constructor(public payload: any) {
    }
}


/**
 * Get Processo Success
 */
export class GetProcessoSuccess implements Action {
    readonly type = GET_PROCESSO_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Processo Failed
 */
export class GetProcessoFailed implements Action {
    readonly type = GET_PROCESSO_FAILED;

    constructor(public payload: string) {
    }
}

export type RegistrarExtravioActionsAll
    = SaveRegistrarExtravio
    | SaveRegistrarExtravioSuccess
    | SaveRegistrarExtravioFailed
    | GetProcesso
    | GetProcessoFailed
    | GetProcessoSuccess;
