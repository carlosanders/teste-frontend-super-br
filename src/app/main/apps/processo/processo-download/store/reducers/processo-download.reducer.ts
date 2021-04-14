import * as ProcessoDownloadActions from '../actions';

export interface ProcessoDownloadState {
    loading: boolean;
    loaded: any;
    saving: boolean;
}

export const ProcessoDownloadInitialState: ProcessoDownloadState = {
    loading: false,
    loaded: false,
    saving: false
};

export function ProcessoDownloadReducer(
    state = ProcessoDownloadInitialState,
    action: ProcessoDownloadActions.ProcessoDownloadActionsAll
): ProcessoDownloadState {

    switch (action.type) {

         case ProcessoDownloadActions.DOWNLOAD_AS_PDF_PROCESSO: {
                return {
                    ...state,
                    loading: false,
                    loaded: false,
                    saving: true
                };
         }

        case ProcessoDownloadActions.DOWNLOAD_AS_PDF_PROCESSO_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false
            };
        }

        case ProcessoDownloadActions.DOWNLOAD_AS_PDF_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false
            };
        }

        case ProcessoDownloadActions.DOWNLOAD_AS_ZIP_PROCESSO: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: true
            };
        }

        case ProcessoDownloadActions.DOWNLOAD_AS_ZIP_PROCESSO_SUCCESS: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false
            };
        }

        case ProcessoDownloadActions.DOWNLOAD_AS_ZIP_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false
            };
        }

        default:
            return state;
    }
}
