import {Action} from '@ngrx/store';

export const GET_VOLUMES = '[VISUALIZAR PROCESSO] GET VOLUMES';
export const GET_VOLUMES_SUCCESS = '[VISUALIZAR PROCESSO] GET VOLUMES SUCCESS';
export const GET_VOLUMES_FAILED = '[VISUALIZAR PROCESSO] GET VOLUMES FAILED';

export const UNLOAD_VOLUMES = '[VISUALIZAR PROCESSO] UNLOAD VOLUMES';

export const SELECT_VOLUME = '[VISUALIZAR PROCESSO] SELECT VOLUME';

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
 * Unload Volumes
 */
export class UnloadVolumes implements Action
{
    readonly type = UNLOAD_VOLUMES;

    constructor(public payload: any)
    {
    }
}

/**
 * Select Volume
 */
export class SelectVolume implements Action
{
    readonly type = SELECT_VOLUME;

    constructor(public payload: any)
    {
    }
}

export type VolumesActionsAll
    = GetVolumes
    | GetVolumesSuccess
    | GetVolumesFailed
    | UnloadVolumes
    | SelectVolume;
