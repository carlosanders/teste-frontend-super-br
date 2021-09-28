import {Action} from '@ngrx/store';

export const GET_FOLDERS = '[CAIXA EMAIL] GET FOLDER';
export const GET_FOLDERS_SUCCESS = '[CAIXA EMAIL] GET FOLDER SUCCESS';
export const GET_FOLDERS_FAILED = '[CAIXA EMAIL] GET FOLDER FAILED';

export const SET_FOLDER = '[CAIXA EMAIL] SET FOLDER';
export const UNLOAD_FOLDER = '[CAIXA EMAIL] UNLOAD FOLDER';

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

    constructor(public payload: any) {
    }
}

export class SetFolder implements Action {
    readonly type = SET_FOLDER;

    constructor(public payload: any) {
    }
}

export class UnloadFolder implements Action {
    readonly type = UNLOAD_FOLDER;
}

export type FolderActionsAll
    = GetFolders
    | GetFoldersSuccess
    | GetFoldersFailed
    | SetFolder
    | UnloadFolder
    ;
