import * as AcaoListActions from '../actions';
import * as _ from 'lodash';

export interface AcaoListState {
    entitiesId: number[];
    etiquetaId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const AcaoListInitialState: AcaoListState = {
    entitiesId: [],
    etiquetaId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
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
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case AcaoListActions.RELOAD_ACOES: {
            return {
                ...state,
                deletingErrors: {},
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
                deletingErrors: _.omit(state.deletingErrors, [action.payload]),
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case AcaoListActions.DELETE_ACAO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                deletingErrors: {
                    ...state.deletingErrors,
                    [action.payload.id]:action.payload
                }
            };
        }

        default:
            return state;
    }
}
