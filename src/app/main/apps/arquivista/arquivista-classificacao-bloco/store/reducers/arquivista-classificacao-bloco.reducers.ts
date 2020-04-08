import {Etiqueta} from '@cdk/models';
import * as ArquivistaClassificacaoBlocoActions from '../actions';

export interface ArquivistaClassificacaoBlocoState {
    entitiesId: number;
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
}

export const ArquivistaClassificacaoBlocoInitialState: ArquivistaClassificacaoBlocoState = {
    errors: false,
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
    entitiesId: null,
    loaded: false,
    loading: false,
    saving: false
}

export function ArquivistaClassificacaoBlocoReducer(
    state = ArquivistaClassificacaoBlocoInitialState,
    action: ArquivistaClassificacaoBlocoActions.ArquivistaClassificacaoBlocoActionsAll
): ArquivistaClassificacaoBlocoState {
    switch (action.type) {

        case ArquivistaClassificacaoBlocoActions.GET_ARQUIVISTA_CLASSIFICACAO_BLOCO : {
            return {
                ...state,
                entitiesId: null,
                loading: true
            };
        }

        case ArquivistaClassificacaoBlocoActions.GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS: {

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loaded: action.payload.loaded,
            };
        }

        case ArquivistaClassificacaoBlocoActions.UPDATE_ARQUIVISTA_CLASSIFICACAO_BLOCO: {
            return {
                ...state,
                entitiesId: null,
                loaded: {
                    id: 'classificacaoHandle',
                    value: 'classificacao'
                },
                loading: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.GET_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_SUCCESS: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.SAVE_ARQUIVISTA_CLASSIFICACAO_BLOCO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case ArquivistaClassificacaoBlocoActions.GET_PROCESSOS: {
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

        case ArquivistaClassificacaoBlocoActions.GET_PROCESSOS_SUCCESS: {

            const loaded = action.payload.loaded;

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                pagination: {
                    ...state.pagination,
                    total: action.payload.total
                },
                loading: false,
                loaded,
                saving: false
            };
        }

        case ArquivistaClassificacaoBlocoActions.GET_PROCESSOS_FAILED: {
            return {
                ...state,
                loading: false,
                loaded: false,
                saving: false
            };
        }

        default:
            return state;
    }

}

