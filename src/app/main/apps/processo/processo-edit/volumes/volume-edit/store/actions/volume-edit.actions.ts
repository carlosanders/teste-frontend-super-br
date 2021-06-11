import {Action} from '@ngrx/store';

export const CREATE_VOLUME = '[VOLUME] CREATE VOLUME';
export const CREATE_VOLUME_SUCCESS = '[VOLUME] CREATE VOLUME SUCCESS';

export const SAVE_VOLUME = '[VOLUME] SAVE VOLUME';
export const SAVE_VOLUME_SUCCESS = '[VOLUME] SAVE VOLUME SUCCESS';
export const SAVE_VOLUME_FAILED = '[VOLUME] SAVE VOLUME FAILED';

export const GET_VOLUME = '[VOLUME] GET VOLUME';
export const GET_VOLUME_SUCCESS = '[VOLUME] GET VOLUME SUCCESS';
export const GET_VOLUME_FAILED = '[VOLUME] GET VOLUME FAILED';

export const UNLOAD_STORE = '[VOLUME-EDIT] UNLOAD STORE';

/**
 * Get Volume
 */
export class GetVolume implements Action
{
    readonly type = GET_VOLUME;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Volume Success
 */
export class GetVolumeSuccess implements Action
{
    readonly type = GET_VOLUME_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Volume Failed
 */
export class GetVolumeFailed implements Action
{
    readonly type = GET_VOLUME_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Volume
 */
export class SaveVolume implements Action
{
    readonly type = SAVE_VOLUME;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Volume Success
 */
export class SaveVolumeSuccess implements Action
{
    readonly type = SAVE_VOLUME_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Volume Failed
 */
export class SaveVolumeFailed implements Action
{
    readonly type = SAVE_VOLUME_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Volume
 */
export class CreateVolume implements Action
{
    readonly type = CREATE_VOLUME;

    constructor()
    {
    }
}

/**
 * Create Volume Success
 */
export class CreateVolumeSuccess implements Action
{
    readonly type = CREATE_VOLUME_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Unload Store
 */
export class UnloadStore implements Action
{
    readonly type = UNLOAD_STORE;

    constructor()
    {
    }
}

export type VolumeEditActionsAll
    = CreateVolume
    | CreateVolumeSuccess
    | GetVolume
    | GetVolumeSuccess
    | GetVolumeFailed
    | SaveVolume
    | SaveVolumeSuccess
    | SaveVolumeFailed
    | UnloadStore;
