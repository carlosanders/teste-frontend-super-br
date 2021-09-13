import * as VisibilidadeActions from '../actions';

export interface VisibilidadeState {
    entitiesId: number[];
    processoId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    visibilidadeId: number;
    saving: boolean;
    errors: any;
}

export const VisibilidadeInitialState: VisibilidadeState = {
    entitiesId: [],
    visibilidadeId: null,
    processoId: null,
    loading: false,
    loaded: false,
    saving: false,
    errors: false,
    deletedIds: [],
    deletingIds: []
};

export function VisibilidadeReducer(
    state = VisibilidadeInitialState,
    action: VisibilidadeActions.VisibilidadeActionsAll
): VisibilidadeState {
    switch (action.type) {

        case VisibilidadeActions.GET_VISIBILIDADES_PROCESSO: {
            return {
                ...state,
                loading: true,
                processoId: action.payload
            };
        }

        case VisibilidadeActions.GET_VISIBILIDADES_PROCESSO_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loading: false,
                loaded
            };
        }

        case VisibilidadeActions.RELOAD_VISIBILIDADES_PROCESSO: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VisibilidadeActions.GET_VISIBILIDADES_PROCESSO_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VisibilidadeActions.DELETE_VISIBILIDADE_PROCESSO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.visibilidadeId]
            };
        }

        case VisibilidadeActions.DELETE_VISIBILIDADE_PROCESSO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case VisibilidadeActions.DELETE_VISIBILIDADE_PROCESSO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        case VisibilidadeActions.GET_VISIBILIDADE_PROCESSO: {
            return {
                ...state,
                visibilidadeId: null,
                loading: true
            };
        }

        case VisibilidadeActions.GET_VISIBILIDADE_PROCESSO_SUCCESS: {

            return {
                ...state,
                visibilidadeId: action.payload.visibilidadeId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case VisibilidadeActions.SAVE_VISIBILIDADE_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VisibilidadeActions.SAVE_VISIBILIDADE_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case VisibilidadeActions.SAVE_VISIBILIDADE_PROCESSO_FAILED: {
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
