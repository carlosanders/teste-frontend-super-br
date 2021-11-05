import * as VisibilidadeListActions from '../actions';
import * as _ from 'lodash';

export interface VisibilidadeListState {
    entitiesId: number[];
    tipoRelatorioId: number;
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const VisibilidadeListInitialState: VisibilidadeListState = {
    entitiesId: [],
    tipoRelatorioId: null,
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function VisibilidadeListReducer(
    state = VisibilidadeListInitialState,
    action: VisibilidadeListActions.VisibilidadeListActionsAll
): VisibilidadeListState {
    switch (action.type) {

        case VisibilidadeListActions.GET_TIPO_RELATORIO_VISIBILIDADES: {
            return {
                ...state,
                loading: true,
                tipoRelatorioId: action.payload
            };
        }

        case VisibilidadeListActions.GET_TIPO_RELATORIO_VISIBILIDADES_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                deletingErrors: {},
                loading: false,
                loaded
            };
        }

        case VisibilidadeListActions.RELOAD_TIPO_RELATORIO_VISIBILIDADES: {
            return {
                ...state,
                deletingErrors: {},
                loading: false,
                loaded: false
            };
        }

        case VisibilidadeListActions.GET_TIPO_RELATORIO_VISIBILIDADES_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VisibilidadeListActions.DELETE_TIPO_RELATORIO_VISIBILIDADE: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.visibilidadeId]
            };
        }

        case VisibilidadeListActions.DELETE_TIPO_RELATORIO_VISIBILIDADE_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload],
                deletingErrors: _.omit(state.deletingErrors, [action.payload]),
                entitiesId: state.entitiesId.filter(id => id !== action.payload)
            };
        }

        case VisibilidadeListActions.DELETE_TIPO_RELATORIO_VISIBILIDADE_FAILED: {
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
