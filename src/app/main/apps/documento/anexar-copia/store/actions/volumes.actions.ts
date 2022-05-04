import {Action} from '@ngrx/store';

export const GET_VOLUMES = '[ANEXAR COPIA] GET VOLUMES';
export const GET_VOLUMES_SUCCESS = '[ANEXAR COPIA] GET VOLUMES SUCCESS';
export const GET_VOLUMES_FAILED = '[ANEXAR COPIA] GET VOLUMES FAILED';

export const UNLOAD_VOLUMES = '[ANEXAR COPIA] UNLOAD VOLUMES';

export const SELECT_VOLUME = '[ANEXAR COPIA] SELECT VOLUME';

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
