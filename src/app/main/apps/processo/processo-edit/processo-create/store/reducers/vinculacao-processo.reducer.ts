import * as VinculacaoProcessoActions from '../actions/vinculacao-processo.actions';

export interface VinculacaoProcessoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        populate: any;
        sort: any;
        total: number;
    };
    loading: boolean;
    loaded: any;
    deletingIds: number[];
    deletedIds: number[];
    saving: boolean;
    errors: any;
}

export const VinculacaoProcessoInitialState: VinculacaoProcessoState = {
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletingIds: [],
    deletedIds: [],
    saving: false,
    errors: false,
};

export function VinculacaoProcessoReducer(
    state = VinculacaoProcessoInitialState,
    action: VinculacaoProcessoActions.VinculacaoProcessoActionsAll): VinculacaoProcessoState {

    switch (action.type) {

        case VinculacaoProcessoActions.GET_VINCULACOES_PROCESSOS: {
            return {
                ...state,
                loading: true,
                entitiesId: [],
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case VinculacaoProcessoActions.GET_VINCULACOES_PROCESSOS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: [...state.entitiesId, ...action.payload.entitiesId],
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                saving: false,
                loading: false,
                loaded
            };
        }

        case VinculacaoProcessoActions.GET_VINCULACOES_PROCESSOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        case VinculacaoProcessoActions.UNLOAD_VINCULACOES_PROCESSOS: {

            if (action.payload.reset) {
                return {
                    ...VinculacaoProcessoInitialState
                };
            } else {
                return {
                    ...state,
                    entitiesId: [],
                    pagination: {
                        ...state.pagination,
                        limit: 10,
                        offset: 0,
                        total: 0
                    }
                };
            }
        }

        case VinculacaoProcessoActions.DELETE_VINCULACAO_PROCESSO: {
            return {
                ...state,
                deletingIds: [...state.deletingIds, action.payload.vinculacaoProcessoId]
            };
        }

        case VinculacaoProcessoActions.DELETE_VINCULACAO_PROCESSO_SUCCESS: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case VinculacaoProcessoActions.DELETE_VINCULACAO_PROCESSO_FAILED: {
            return {
                ...state,
                deletingIds: state.deletingIds.filter(id => id !== action.payload.id),
                errors: action.payload.errors
            };
        }

        case VinculacaoProcessoActions.SAVE_VINCULACAO_PROCESSO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VinculacaoProcessoActions.SAVE_VINCULACAO_PROCESSO_SUCCESS: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case VinculacaoProcessoActions.SAVE_VINCULACAO_PROCESSO_FAILED: {
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
