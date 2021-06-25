import {Action} from '@ngrx/store';

export const GET_FOLDERS = '[FOLDER LIST] GET FOLDERS';
export const GET_FOLDERS_SUCCESS = '[FOLDER LIST] GET FOLDERS SUCCESS';
export const GET_FOLDERS_FAILED = '[FOLDER LIST] GET FOLDERS FAILED';

export const RELOAD_FOLDERS = '[FOLDER LIST] RELOAD FOLDERS';
export const UNLOAD_FOLDERS = '[FOLDER LIST] UNLOAD FOLDERS';


export const DELETE_FOLDER = '[FOLDER LIST] DELETE FOLDER';
export const DELETE_FOLDER_SUCCESS = '[FOLDER LIST] DELETE FOLDER SUCCESS';
export const DELETE_FOLDER_FAILED = '[FOLDER LIST] DELETE FOLDER FAILED';

/**
 * Get Folders
 */
export class GetFolders implements Action
{
    readonly type = GET_FOLDERS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Folders Success
 */
export class GetFoldersSuccess implements Action
{
    readonly type = GET_FOLDERS_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Get Folders Failed
 */
export class GetFoldersFailed implements Action
{
    readonly type = GET_FOLDERS_FAILED;

    constructor(public payload: string)
    {
    }
}

/**
 * Unload Folders
 */
export class UnloadFolders implements Action
{
    readonly type = UNLOAD_FOLDERS;

    constructor()
    {
    }
}

/**
 * Reload Folders
 */
export class ReloadFolders implements Action
{
    readonly type = RELOAD_FOLDERS;

    constructor()
    {
    }
}

/**
 * Delete Folder
 */
export class DeleteFolder implements Action
{
    readonly type = DELETE_FOLDER;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Folder Success
 */
export class DeleteFolderSuccess implements Action
{
    readonly type = DELETE_FOLDER_SUCCESS;

    constructor(public payload: any)
    {
    }
}

/**
 * Delete Folder Failed
 */
export class DeleteFolderFailed implements Action
{
    readonly type = DELETE_FOLDER_FAILED;

    constructor(public payload: any)
    {
    }
}

export type FolderListActionsAll
    = GetFolders
    | GetFoldersSuccess
    | GetFoldersFailed
    | UnloadFolders
    | ReloadFolders
    | DeleteFolder
    | DeleteFolderSuccess
    | DeleteFolderFailed;

