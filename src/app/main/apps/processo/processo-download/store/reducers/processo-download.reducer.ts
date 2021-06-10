import * as ProcessoDownloadActions from '../actions';

export interface ProcessoDownloadState {
    loading: boolean;
    loaded: any;
    saving: boolean;
    errors: any;
}

export const ProcessoDownloadInitialState: ProcessoDownloadState = {
    loading: false,
    loaded: false,
    saving: false,
    errors: false
};

export function ProcessoDownloadReducer(
    state = ProcessoDownloadInitialState,
    action: ProcessoDownloadActions.ProcessoDownloadActionsAll
): ProcessoDownloadState {

    switch (action.type) {

         case ProcessoDownloadActions.DOWNLOAD_PROCESSO: {
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    saving: true,
                    errors: false
                };
         }

        case ProcessoDownloadActions.DOWNLOAD_PROCESSO_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false,
                errors: false
            };
        }

        case ProcessoDownloadActions.DOWNLOAD_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }
}
