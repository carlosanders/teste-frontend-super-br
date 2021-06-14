import {Action} from '@ngrx/store';

export const CREATE_FOLDER = '[FOLDER] CREATE FOLDER';
export const CREATE_FOLDER_SUCCESS = '[FOLDER] CREATE FOLDER SUCCESS';

export const SAVE_FOLDER = '[FOLDER] SAVE FOLDER';
export const SAVE_FOLDER_SUCCESS = '[FOLDER] SAVE FOLDER SUCCESS';
export const SAVE_FOLDER_FAILED = '[FOLDER] SAVE FOLDER FAILED';

export const GET_FOLDER = '[FOLDER] GET FOLDER';
export const GET_FOLDER_SUCCESS = '[FOLDER] GET FOLDER SUCCESS';
export const GET_FOLDER_FAILED = '[FOLDER] GET FOLDER FAILED';

/**
 * Get Folder
 */
export class GetFolder implements Action
{
    readonly type = GET_FOLDER;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Folder Success
 */
export class GetFolderSuccess implements Action
{
    readonly type = GET_FOLDER_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Folder Failed
 */
export class GetFolderFailed implements Action
{
    readonly type = GET_FOLDER_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Save Folder
 */
export class SaveFolder implements Action
{
    readonly type = SAVE_FOLDER;

    constructor(public payload: any)
    {
    }
}

/**
 * Save Folder Success
 */
export class SaveFolderSuccess implements Action
{
    readonly type = SAVE_FOLDER_SUCCESS;

    constructor()
    {
    }
}

/**
 * Save Folder Failed
 */
export class SaveFolderFailed implements Action
{
    readonly type = SAVE_FOLDER_FAILED;

    constructor(public payload: any)
    {
    }
}

/**
 * Create Folder
 */
export class CreateFolder implements Action
{
    readonly type = CREATE_FOLDER;

    constructor()
    {
    }
}

/**
 * Create Folder Success
 */
export class CreateFolderSuccess implements Action
{
    readonly type = CREATE_FOLDER_SUCCESS;

    constructor(public payload: any)
    {
    }
}

export type FolderEditActionsAll
    = CreateFolder
    | CreateFolderSuccess
    | GetFolder
    | GetFolderSuccess
    | GetFolderFailed
    | SaveFolder
    | SaveFolderSuccess
    | SaveFolderFailed;
