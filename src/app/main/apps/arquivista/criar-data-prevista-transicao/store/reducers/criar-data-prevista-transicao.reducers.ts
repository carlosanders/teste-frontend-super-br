import * as DataPrevistaTransicaoActions from '../actions';

export interface DataPrevistaTransicaoState {
    dataPrevistaTransicaoId: number;
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
}

export const DataPrevistaTransicaoInitialState: DataPrevistaTransicaoState = {
    errors: false,
    dataPrevistaTransicaoId: null,
    loaded: false,
    loading: false,
    saving: false
}

export function DataPrevistaTransicaoReducer(
    state = DataPrevistaTransicaoInitialState,
    action: DataPrevistaTransicaoActions.DataPrevistaTransicaoActionsAll
): DataPrevistaTransicaoState {
    switch (action.type) {

        case DataPrevistaTransicaoActions.GET_DATA_PREVISTA_TRANSICAO : {
            return {
                ...state,
                dataPrevistaTransicaoId: null,
                loading: true
            };
        }

        case DataPrevistaTransicaoActions.GET_DATA_PREVISTA_TRANSICAO_SUCCESS: {

            return {
                ...state,
                dataPrevistaTransicaoId: action.payload.dataPrevistaTransicaoId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case DataPrevistaTransicaoActions.CREATE_DATA_PREVISTA_TRANSICAO: {
            return {
                ...state,
                dataPrevistaTransicaoId: null,
                loaded: {
                    id: 'dataPrevistaTransicaoHandle',
                    value: 'dataPrevistaTransicao'
                },
                loading: false
            };
        }

        case DataPrevistaTransicaoActions.GET_DATA_PREVISTA_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case DataPrevistaTransicaoActions.SAVE_DATA_PREVISTA_TRANSICAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case DataPrevistaTransicaoActions.SAVE_DATA_PREVISTA_TRANSICAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case DataPrevistaTransicaoActions.SAVE_DATA_PREVISTA_TRANSICAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        default:
            return state;
    }

}

