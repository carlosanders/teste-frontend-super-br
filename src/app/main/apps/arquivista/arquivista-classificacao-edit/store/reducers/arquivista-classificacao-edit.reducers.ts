import * as ArquivistaClassificacaoActions from '../actions';
import {Etiqueta} from '@cdk/models';

export interface ArquivistaClassificacaoState {
    entitiesId: number[];
    pagination: {
        limit: number;
        offset: number;
        filter: any;
        listFilter: any;
        etiquetaFilter: Etiqueta[];
        populate: any;
        sort: any;
        total: number;
    };
    saving: boolean;
    errors: any;
    loading: boolean;
    loaded: any;
    deletingProcessoIds: number[];
    togglingLidaProcessoIds: number[];
    currentProcessoId: number;
    deletedProcessoIds: number[];
    selectedProcessoIds: number[];
}

export const ArquivistaClassificacaoInitialState: ArquivistaClassificacaoState = {
    errors: null,
    saving: false,
    entitiesId: [],
    pagination: {
        limit: 0,
        offset: 0,
        filter: {},
        listFilter: {},
        etiquetaFilter: [],
        populate: [],
        sort: {},
        total: 0,
    },
    loading: false,
    loaded: false,
    deletingProcessoIds: [],
    togglingLidaProcessoIds: [],
    deletedProcessoIds: [],
    selectedProcessoIds: [],
    currentProcessoId: null,
}

export function ArquivistaClassificacaoReducer(
    state = ArquivistaClassificacaoInitialState,
    action: ArquivistaClassificacaoActions.ArquivistaClassificacaoActionsAll
): ArquivistaClassificacaoState {
    switch (action.type) {

        case ArquivistaClassificacaoActions.UNLOAD_PROCESSOS: {
            if (action.payload.reset) {
                return {
                    ...ArquivistaClassificacaoInitialState
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

        case ArquivistaClassificacaoActions.GET_ARQUIVISTA_CLASSIFICACAO : {
            return {
                ...state,
                loading: true
            };
        }

        case ArquivistaClassificacaoActions.GET_ARQUIVISTA_CLASSIFICACAO_SUCCESS: {

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.UPDATE_ARQUIVISTA_CLASSIFICACAO: {
            return {
                ...state,
                loaded: {
                    id: 'classificacaoHandle',
                    value: 'classificacao'
                },
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.GET_ARQUIVISTA_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case ArquivistaClassificacaoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ArquivistaClassificacaoActions.GET_PROCESSOS: {
            return {
                ...state,
                loading: true,
                pagination: {
                    limit: action.payload.limit,
                    offset: action.payload.offset,
                    filter: action.payload.filter,
                    listFilter: action.payload.listFilter,
                    etiquetaFilter: action.payload.etiquetaFilter,
                    populate: action.payload.populate,
                    sort: action.payload.sort,
                    total: state.pagination.total
                }
            };
        }

        case ArquivistaClassificacaoActions.GET_PROCESSOS_SUCCESS: {

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

        case ArquivistaClassificacaoActions.GET_PROCESSOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false
            };
        }

        default:
            return state;
    }

}

