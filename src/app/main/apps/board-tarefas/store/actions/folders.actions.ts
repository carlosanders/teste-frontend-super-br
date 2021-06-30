import {Action} from '@ngrx/store';

export const GET_FOLDERS = '[BOARD TAREFAS FOLDERS] GET FOLDERS';
export const GET_FOLDERS_SUCCESS = '[BOARD TAREFAS FOLDERS] GET FOLDERS SUCCESS';
export const GET_FOLDERS_FAILED = '[BOARD TAREFAS FOLDERS] GET FOLDERS FAILED';

export const SAVE_FOLDER = '[BOARD TAREFAS FOLDER] SAVE FOLDER';
export const SAVE_FOLDER_SUCCESS = '[BOARD TAREFAS FOLDER] SAVE FOLDER SUCCESS';
export const SAVE_FOLDER_FAILED = '[BOARD TAREFAS FOLDER] SAVE FOLDER FAILED';

export const DELETE_FOLDER = '[BOARD TAREFAS FOLDER] DELETE FOLDER';
export const DELETE_FOLDER_SUCCESS = '[BOARD TAREFAS FOLDER] DELETE FOLDER SUCCESS';
export const DELETE_FOLDER_FAILED = '[BOARD TAREFAS FOLDER] DELETE FOLDER FAILED';

export class GetFolders implements Action {
    readonly type = GET_FOLDERS;

    constructor(public payload: any) {
    }
}

export class GetFoldersSuccess implements Action {
    readonly type = GET_FOLDERS_SUCCESS;

    constructor(public payload: any) {
    }
}

export class GetFoldersFailed implements Action {
    readonly type = GET_FOLDERS_FAILED;

    constructor(public payload: string) {
    }
}

export class SaveFolder implements Action {
    readonly type = SAVE_FOLDER;

    constructor(public payload: any) {
    }
}

export class SaveFolderSuccess implements Action {
    readonly type = SAVE_FOLDER_SUCCESS;

    constructor(public payload: any) {
    }
}

export class SaveFolderFailed implements Action {
    readonly type = SAVE_FOLDER_FAILED;

    constructor(public payload: any) {
    }
}

export class DeleteFolder implements Action
{
    readonly type = DELETE_FOLDER;

    constructor(public payload: any)
    {
    }
}

export class DeleteFolderSuccess implements Action
{
    readonly type = DELETE_FOLDER_SUCCESS;

    constructor(public payload: any)
    {
    }
}

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
    | DeleteFolder
    | DeleteFolderSuccess
    | DeleteFolderFailed
    ;
