import {Action} from '@ngrx/store';

export const GET_ANEXOS = '[ANEXAR COPIA] GET ANEXOS';
export const GET_ANEXOS_SUCCESS = '[ANEXAR COPIA] GET ANEXOS SUCCESS';
export const GET_ANEXOS_FAILED = '[ANEXAR COPIA] GET ANEXOS FAILED';

export const SAVE_COMPONENTE_DIGITAL = '[ANEXAR COPIA] SAVE COMPONENTE DIGITAL';
export const SAVE_COMPONENTE_DIGITAL_SUCCESS = '[ANEXAR COPIA] SAVE COMPONENTE DIGITAL SUCCESS';
export const SAVE_COMPONENTE_DIGITAL_FAILED = '[ANEXAR COPIA] SAVE COMPONENTE DIGITAL FAILED';
export const FINISH_UPLOAD_ANEXOS = '[ANEXAR COPIA] FINISH UPLOAD ANEXOS';

export const CHANGE_SELECTED_ANEXOS = '[ANEXAR COPIA] CHANGE SELECTED ANEXOS';
export const UNLOAD_ANEXOS = '[ANEXAR COPIA ANEXOS] UNLOAD ANEXOS';

/**
 * Get Anexos
 */
export class GetAnexos implements Action
{
    readonly type = GET_ANEXOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Anexos Success
 */
export class GetAnexosSuccess implements Action
{
    readonly type = GET_ANEXOS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Anexos Failed
 */
export class GetAnexosFailed implements Action
{
    readonly type = GET_ANEXOS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Componente Digital
 */
export class SaveComponenteDigital implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Success
 */
export class SaveComponenteDigitalSuccess implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Componente Digital Failed
 */
export class SaveComponenteDigitalFailed implements Action
{
    readonly type = SAVE_COMPONENTE_DIGITAL_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Finish Upload Anexos
 */
export class FinishUploadAnexos implements Action
{
    readonly type = FINISH_UPLOAD_ANEXOS;

    constructor(public payload: any)
    {
    }
}

/**
 * Change Selected Anexos
 */
export class ChangeSelectedAnexos implements Action {
    readonly type = CHANGE_SELECTED_ANEXOS;

    constructor(public payload: any) {
    }
}

export class UnloadAnexos implements Action
{
    readonly type = UNLOAD_ANEXOS;

    constructor() {}
}

export type AnexosActionsAll
    = GetAnexos
    | GetAnexosSuccess
    | GetAnexosFailed
    | SaveComponenteDigital
    | SaveComponenteDigitalSuccess
    | SaveComponenteDigitalFailed
    | FinishUploadAnexos
    | ChangeSelectedAnexos
    | UnloadAnexos;
