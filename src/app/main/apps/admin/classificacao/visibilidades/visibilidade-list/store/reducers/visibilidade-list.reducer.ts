import * as fromStore from '../index';
import * as _ from 'lodash';

export interface ClassificacaoVisibilidadeListState {
    entitiesId: number[];
    classificacaoId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const ClassificacaoVisibilidadeListInitialState: ClassificacaoVisibilidadeListState = {
    entitiesId: [],
    classificacaoId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function ClassificacaoVisibilidadeListReducer(
    state = ClassificacaoVisibilidadeListInitialState,
    action: fromStore.VisibilidadeListActionsAll
): ClassificacaoVisibilidadeListState {
    switch (action.type) {
        case fromStore.GET_VISIBILIDADES: {
            return {
                ...state,
                loading: true,
                classificacaoId: action.payload
            };
        }

        case fromStore.GET_VISIBILIDADES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case fromStore.RELOAD_VISIBILIDADES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case fromStore.GET_VISIBILIDADES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case fromStore.DELETE_VISIBILIDADE: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.visibilidadeId]
            };
        }

        case fromStore.DELETE_VISIBILIDADE_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload]),
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case fromStore.DELETE_VISIBILIDADE_FAILED: {
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
