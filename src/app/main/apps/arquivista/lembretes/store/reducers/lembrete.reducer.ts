import * as LembreteActions from '../actions';
import {Etiqueta} from '../../../../../../../@cdk/models';

export interface LembreteState {
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

export const LembreteInitialState: LembreteState = {
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

export function LembreteReducer(
    state = LembreteInitialState,
    action: LembreteActions.LembreteActionsAll
): LembreteState {
    switch (action.type) {

        case LembreteActions.GET_LEMBRETE : {
            return {
                ...state,
                entitiesId: null,
                loading: true
            };
        }

        case LembreteActions.GET_LEMBRETE_SUCCESS: {

            return {
                ...state,
                entitiesId: action.payload.entitiesId,
                loaded: action.payload.loaded,
                loading: false
            };
        }

        case LembreteActions.CREATE_LEMBRETE: {
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

        case LembreteActions.GET_LEMBRETE_FAILED: {
            return {
                ...state,
                loading: false
            };
        }

        case LembreteActions.SAVE_LEMBRETE: {
            return {
                ...state,
                saving: true,
                errors: false
            };
        }

        case LembreteActions.SAVE_LEMBRETE_SUCCESS: {
            return {
                ...state,
                saving: false,
                errors: false
            };
        }

        case LembreteActions.SAVE_LEMBRETE_FAILED: {
            return {
                ...state,
                saving: false,
                errors: action.payload
            };
        }

        case LembreteActions.GET_PROCESSOS: {
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

        case LembreteActions.GET_PROCESSOS_SUCCESS: {

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

        case LembreteActions.GET_PROCESSOS_FAILED: {
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

