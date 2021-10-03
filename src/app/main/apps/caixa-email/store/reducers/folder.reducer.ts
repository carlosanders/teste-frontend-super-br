import * as fromStore from '../index';
import {Folder} from '../../models/folder.model';

export interface FolderState {
    folders: Folder[];
    total: number;
    loading: boolean;
    loaded: any;
    selectedFolder: Folder,
    error: any
}

export const FolderInitialState: FolderState = {
    folders: [],
    total: 0,
    loading: false,
    loaded: false,
    selectedFolder: null,
    error: null
};

export function FolderReducer(state = FolderInitialState, action: fromStore.FolderActionsAll): FolderState {
    switch (action.type) {

        case fromStore.GET_FOLDERS: {
            return {
                ...state,
                loading: true,
                loaded: false,
                folders: [],
                total: 0,
                selectedFolder: null,
                error: null
            };
        }

        case fromStore.GET_FOLDERS_SUCCESS: {
            return {
                ...state,
                folders: action.payload.folders,
                total: action.payload.total,
                loading: false,
                loaded: action.payload.contaEmailId,
                error: null
            };
        }

        case fromStore.GET_FOLDERS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                error: action.payload
            };
        }

        case fromStore.SET_FOLDER: {
            return {
                ...state,
                selectedFolder: action.payload,
                loading: false,
                loaded: true
            };
        }
        case fromStore.UNLOAD_FOLDER: {
            return {
                ...state,
                loading: true,
                loaded: false,
                folders: [],
                total: 0,
                selectedFolder: null,
                error: null
            };
        }

        default:
            return state;
    }
}


