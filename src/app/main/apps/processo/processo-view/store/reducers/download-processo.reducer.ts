import * as fromStore from '../actions/download-processo.actions';


export interface DownloadProcessoState {
    saving: boolean;
    errors: any;
}

export const initialState: DownloadProcessoState = {
    saving: false,
    errors: null
};

export const downloadProcessoReducer = (state = initialState, action: fromStore.DownloadProcessoActionsAll): DownloadProcessoState => {
    switch (action.type) {

        case fromStore.DOWNLOAD_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: null
            };
        }

        case fromStore.DOWNLOAD_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
            };
        }

        case fromStore.DOWNLOAD_PROCESSO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
};
