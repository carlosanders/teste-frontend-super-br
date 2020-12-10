import * as RealizarTransicaoActions from '../actions';

import {Etiqueta} from '@cdk/models';

export interface RealizarTransicaoState {
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

export const RealizarTransicaoInitialState: RealizarTransicaoState = {
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
};

export function RealizarTransicaoReducer(
    state = RealizarTransicaoInitialState,
    action: RealizarTransicaoActions.RealizarTransicaoActionsAll
): RealizarTransicaoState {
    switch (action.type) {

        case RealizarTransicaoActions.GET_REALIZAR_TRANSICAO : {
            return {
                ...state,
                entitiesId: null,
                loading: true
            };
        }

        case RealizarTransicaoActions.GET_REALIZAR_TRANSICAO_SUCCESS: {

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loaded: action.payload.loaded,
                loading: false
            };
        }


        case RealizarTransicaoActions.GET_REALIZAR_TRANSICAO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case RealizarTransicaoActions.SAVE_REALIZAR_TRANSICAO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case RealizarTransicaoActions.GET_PROCESSOS: {
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
                },
            };
        }

        case RealizarTransicaoActions.GET_PROCESSOS_SUCCESS: {

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

        case RealizarTransicaoActions.GET_PROCESSOS_FAILED: {
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

