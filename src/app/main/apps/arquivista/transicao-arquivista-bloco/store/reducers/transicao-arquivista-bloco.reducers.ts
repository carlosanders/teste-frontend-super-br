import * as TransicaoArquivistaBlocoActions from '../actions';
import {Etiqueta} from '../../../../../../../@cdk/models';

export interface TransicaoArquivistaBlocoState {
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
    deletingIds: number[];
    deletedIds: number[];
}

export const TransicaoArquivistaBlocoInitialState: TransicaoArquivistaBlocoState = {
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
    saving: false,
    deletedIds: [],
    deletingIds: []
};

export function TransicaoArquivistaBlocoReducer(
    state = TransicaoArquivistaBlocoInitialState,
    action: TransicaoArquivistaBlocoActions.TransicaoArquivistaBlocoActionsAll
): TransicaoArquivistaBlocoState {
    switch (action.type) {

        case TransicaoArquivistaBlocoActions.GET_TRANSICAO_ARQUIVISTA_BLOCO : {
            return {
                ...state,
                entitiesId: null,
                loading: true
            };
        }

        case TransicaoArquivistaBlocoActions.GET_TRANSICAO_ARQUIVISTA_BLOCO_SUCCESS: {

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loaded: action.payload.loaded,
            };
        }


        case TransicaoArquivistaBlocoActions.GET_TRANSICAO_ARQUIVISTA_BLOCO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_BLOCO: {
            return {
                ...state,
                saving: true,
                errors: false,
                deletingIds: [...state.deletingIds, action.payload.processo.id]
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_BLOCO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false,
                deletingIds: state.deletingIds.filter(id => id !== action.payload),
                deletedIds: [...state.deletedIds, action.payload]
            };
        }

        case TransicaoArquivistaBlocoActions.SAVE_TRANSICAO_ARQUIVISTA_BLOCO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload,
                deletingIds: state.deletingIds.filter(id => id !== action.payload)
            };
        }

        case TransicaoArquivistaBlocoActions.GET_PROCESSOS: {
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

        case TransicaoArquivistaBlocoActions.GET_PROCESSOS_SUCCESS: {

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

        case TransicaoArquivistaBlocoActions.GET_PROCESSOS_FAILED: {
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

