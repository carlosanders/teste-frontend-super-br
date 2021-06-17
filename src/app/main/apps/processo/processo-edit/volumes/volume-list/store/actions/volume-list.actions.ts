import {Action} from '@ngrx/store';

export const GET_VOLUMES = '[VOLUME LIST] GET VOLUMES';
export const GET_VOLUMES_SUCCESS = '[VOLUME LIST] GET VOLUMES SUCCESS';
export const GET_VOLUMES_FAILED = '[VOLUME LIST] GET VOLUMES FAILED';

export const RELOAD_VOLUMES = '[VOLUME LIST] RELOAD VOLUMES';

export const DELETE_VOLUME = '[VOLUME LIST] DELETE VOLUME';
export const DELETE_VOLUME_SUCCESS = '[VOLUME LIST] DELETE VOLUME SUCCESS';
export const DELETE_VOLUME_FAILED = '[VOLUME LIST] DELETE VOLUME FAILED';

/**
 * Get Volumes
 */
export class GetVolumes implements Action
{
    readonly type = GET_VOLUMES;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Volumes Success
 */
export class GetVolumesSuccess implements Action
{
    readonly type = GET_VOLUMES_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Volumes Failed
 */
export class GetVolumesFailed implements Action
{
    readonly type = GET_VOLUMES_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Reload Volumes
 */
export class ReloadVolumes implements Action
{
    readonly type = RELOAD_VOLUMES;

    constructor()
    {
    }
}

/**
 * Delete Volume
 */
export class DeleteVolume implements Action
{
    readonly type = DELETE_VOLUME;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Volume Success
 */
export class DeleteVolumeSuccess implements Action
{
    readonly type = DELETE_VOLUME_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Volume Failed
 */
export class DeleteVolumeFailed implements Action
{
    readonly type = DELETE_VOLUME_FAILED;

    constructor(public payload: any)
    {
    }
}

export type VolumeListActionsAll
    = GetVolumes
    | GetVolumesSuccess
    | GetVolumesFailed
    | ReloadVolumes
    | DeleteVolume
    | DeleteVolumeSuccess
    | DeleteVolumeFailed;

