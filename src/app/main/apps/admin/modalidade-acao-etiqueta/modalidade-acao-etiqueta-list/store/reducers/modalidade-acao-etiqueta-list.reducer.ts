import * as ModalidadeAcaoEtiquetaListActions from '../actions';

export interface ModalidadeAcaoEtiquetaListState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        gridFilter: any;
        populate: any;
        context: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    deletingErrors: any;
}

export const ModalidadeAcaoEtiquetaListInitialState: ModalidadeAcaoEtiquetaListState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        gridFilter: {},
        populate: [],
        context: {},
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletedIds: [],
    deletingIds: [],
    deletingErrors: {}
};

export function ModalidadeAcaoEtiquetaListReducer(
    state = ModalidadeAcaoEtiquetaListInitialState,
    action: ModalidadeAcaoEtiquetaListActions.ModalidadeAcaoEtiquetaListActionsAll
): ModalidadeAcaoEtiquetaListState {
    switch (action.type) {

        case ModalidadeAcaoEtiquetaListActions.GET_MODALIDADE_ACAO_ETIQUETA: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    gridFilter: action.payload.gridFilter,
                    populate: action.payload.populate,
                    context: action.payload.context,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ModalidadeAcaoEtiquetaListActions.GET_MODALIDADE_ACAO_ETIQUETA_SUCCESS: {
            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded
            };
        }

        case ModalidadeAcaoEtiquetaListActions.GET_MODALIDADE_ACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ModalidadeAcaoEtiquetaListActions.RELOAD_MODALIDADE_ACAO_ETIQUETA: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case ModalidadeAcaoEtiquetaListActions.DELETE_MODALIDADE_ACAO_ETIQUETA: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload]
            };
        }

        case ModalidadeAcaoEtiquetaListActions.DELETE_MODALIDADE_ACAO_ETIQUETA_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case ModalidadeAcaoEtiquetaListActions.DELETE_MODALIDADE_ACAO_ETIQUETA_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id)
            };
        }

        default:
            return state;
    }
}
