import * as LembreteBlocoActions from '../actions';
import {Etiqueta} from '../../../../../../../@cdk/models';

export interface LembreteBlocoState {
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

export const LembreteBlocoInitialState: LembreteBlocoState = {
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

export function LembreteBlocoReducer(
    state = LembreteBlocoInitialState,
    action: LembreteBlocoActions.LembreteBlocoActionsAll
): LembreteBlocoState {
    switch (action.type) {

        case LembreteBlocoActions.GET_LEMBRETE_BLOCO : {
            return {
                ...state,
                entitiesId: null,
                loading: true
            };
        }

        case LembreteBlocoActions.GET_LEMBRETE_BLOCO_SUCCESS: {

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LembreteBlocoActions.CREATE_LEMBRETE_BLOCO: {
            return {
                ...state,
                entitiesId: null,
                loaded: {
                    id: 'lembreteHandle',
                    value: 'criar'
                },
                loading: false
            };
        }

        case LembreteBlocoActions.GET_LEMBRETE_BLOCO_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LembreteBlocoActions.SAVE_LEMBRETE_BLOCO: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case LembreteBlocoActions.SAVE_LEMBRETE_BLOCO_SUCCESS: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case LembreteBlocoActions.SAVE_LEMBRETE_BLOCO_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case LembreteBlocoActions.GET_PROCESSOS: {
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
                saving: true
            };
        }

        case LembreteBlocoActions.GET_PROCESSOS_SUCCESS: {

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

        case LembreteBlocoActions.GET_PROCESSOS_FAILED: {
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

