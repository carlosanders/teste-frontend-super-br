import * as RegraEtiquetaListActions from '../actions';

export interface RegraEtiquetaListState {
    entitiesId: number[];
    etiquetaId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const RegraEtiquetaListInitialState: RegraEtiquetaListState = {
    entitiesId: [],
    etiquetaId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function RegraEtiquetaListReducer(
    state = RegraEtiquetaListInitialState,
    action: RegraEtiquetaListActions.RegraEtiquetaListActionsAll
): RegraEtiquetaListState {
    switch (action.type) {

        case RegraEtiquetaListActions.GET_REGRAS_ETIQUETA: {
            return {
                ...state,
                loading: true,
                etiquetaId: action.payload
            };
        }

        case RegraEtiquetaListActions.GET_REGRAS_ETIQUETA_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case RegraEtiquetaListActions.RELOAD_REGRAS_ETIQUETA: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RegraEtiquetaListActions.GET_REGRAS_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.regraEtiquetaId]
            };
        }

        case RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case RegraEtiquetaListActions.DELETE_REGRA_ETIQUETA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
