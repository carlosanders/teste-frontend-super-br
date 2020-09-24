import {Action} from '@ngrx/store';

export const GET_FOLDERS = '[FOLDERS] GET FOLDERS';
export const GET_FOLDERS_SUCCESS = '[FOLDERS] GET FOLDERS SUCCESS';
export const GET_FOLDERS_FAILED = '[FOLDERS] GET FOLDERS FAILED';

export const SAVE_FOLDER = '[FOLDER MAIN] SAVE FOLDER';
export const SAVE_FOLDER_SUCCESS = '[FOLDER MAIN] SAVE FOLDER SUCCESS';
export const SAVE_FOLDER_FAILED = '[FOLDER MAIN] SAVE FOLDER FAILED';

export const RELOAD_FOLDERS = '[FOLDER MAIN] RELOAD FOLDERS';

export const DELETE_FOLDER = '[FOLDER MAIN] DELETE FOLDER';
export const DELETE_FOLDER_SUCCESS = '[FOLDER MAIN] DELETE FOLDER SUCCESS';
export const DELETE_FOLDER_FAILED = '[FOLDER MAIN] DELETE FOLDER FAILED';

/**
 * Get Folders
 */
export class GetFolders implements Action {
    readonly type = GET_FOLDERS;

    constructor(public payload: any) {
    }
}

/**
 * Get Folders Success
 */
export class GetFoldersSuccess implements Action {
    readonly type = GET_FOLDERS_SUCCESS;

    constructor(public payload: any) {
    }
}

/**
 * Get Folders Failed
 */
export class GetFoldersFailed implements Action {
    readonly type = GET_FOLDERS_FAILED;

    constructor(public payload: string) {
    }
}

/**
 * Save Folder
 */
export class SaveFolder implements Action {
    readonly type = SAVE_FOLDER;

    constructor(public payload: any) {
    }
}

/**
 * Save Folder Success
 */
export class SaveFolderSuccess implements Action {
    readonly type = SAVE_FOLDER_SUCCESS;

    constructor() {
    }
}

/**
 * Save Folder Failed
 */
export class SaveFolderFailed implements Action {
    readonly type = SAVE_FOLDER_FAILED;

    constructor(public payload: any) {
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

export type FoldersActionsAll
    = GetFolders
    | GetFoldersSuccess
    | GetFoldersFailed
    | SaveFolder
    | SaveFolderSuccess
    | SaveFolderFailed
    | ReloadFolders
    | DeleteFolder
    | DeleteFolderSuccess
    | DeleteFolderFailed;
