import * as AcaoListActions from '../actions';

export interface AcaoListState {
    entitiesId: number[];
    etiquetaId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const AcaoListInitialState: AcaoListState = {
    entitiesId: [],
    etiquetaId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: []
};

export function AcaoListReducer(
    state = AcaoListInitialState,
    action: AcaoListActions.AcaoListActionsAll
): AcaoListState {
    switch (action.type) {

        case AcaoListActions.GET_ACOES: {
            return {
                ...state,
                loading: true,
                etiquetaId: action.payload
            };
        }

        case AcaoListActions.GET_ACOES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case AcaoListActions.RELOAD_ACOES: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AcaoListActions.GET_ACOES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case AcaoListActions.DELETE_ACAO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.acaoId]
            };
        }

        case AcaoListActions.DELETE_ACAO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case AcaoListActions.DELETE_ACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
