import * as RegraListActions from '../actions';

export interface RegraListState {
    entitiesId: number[];
    etiquetaId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
}

export const RegraListInitialState: RegraListState = {
    entitiesId: [],
    etiquetaId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: []
};

export function RegraListReducer(
    state = RegraListInitialState,
    action: RegraListActions.RegraListActionsAll
): RegraListState {
    switch (action.type) {

        case RegraListActions.GET_REGRAS: {
            return {
                ...state,
                loading: true,
                etiquetaId: action.payload
            };
        }

        case RegraListActions.GET_REGRAS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case RegraListActions.RELOAD_REGRAS: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RegraListActions.GET_REGRAS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case RegraListActions.DELETE_REGRA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.regraId]
            };
        }

        case RegraListActions.DELETE_REGRA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case RegraListActions.DELETE_REGRA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        default:
            return state;
    }
}
