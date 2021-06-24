import {Action} from '@ngrx/store';

export const GET_FOLDERS = '[BOARD TAREFAS FOLDERS] GET FOLDERS';
export const GET_FOLDERS_SUCCESS = '[BOARD TAREFAS FOLDERS] GET FOLDERS SUCCESS';
export const GET_FOLDERS_FAILED = '[BOARD TAREFAS FOLDERS] GET FOLDERS FAILED';

export const SAVE_FOLDER = '[BOARD TAREFAS FOLDER] SAVE FOLDER';
export const SAVE_FOLDER_SUCCESS = '[BOARD TAREFAS FOLDER] SAVE FOLDER SUCCESS';
export const SAVE_FOLDER_FAILED = '[BOARD TAREFAS FOLDER] SAVE FOLDER FAILED';

export const RELOAD_FOLDERS = '[BOARD TAREFAS FOLDER] RELOAD FOLDERS';

export const DELETE_FOLDER = '[BOARD TAREFAS FOLDER] DELETE FOLDER';
export const DELETE_FOLDER_SUCCESS = '[BOARD TAREFAS FOLDER] DELETE FOLDER SUCCESS';
export const DELETE_FOLDER_FAILED = '[BOARD TAREFAS FOLDER] DELETE FOLDER FAILED';

export const ADD_FOLDER_WAITING_RELOAD = '[BOARD TAREFAS FOLDER] ADD FOLDER WAITING RELOAD';
export const REMOVE_FOLDER_WAITING_RELOAD = '[BOARD TAREFAS FOLDER] REMOVE FOLDER WAITING RELOAD';

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

export class ReloadFolders implements Action
{
    readonly type = RELOAD_FOLDERS;

    constructor()
    {
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

export class AddFolderWaitingReload implements Action
{
    readonly type = ADD_FOLDER_WAITING_RELOAD;

    constructor(public payload: any)
    {
    }
}

export class RemoveFolderWaitingReload implements Action
{
    readonly type = REMOVE_FOLDER_WAITING_RELOAD;

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
    | DeleteFolderFailed
    | AddFolderWaitingReload
    | RemoveFolderWaitingReload
    ;
